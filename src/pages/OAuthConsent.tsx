import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import southstarLogo from "@/assets/southstar-logo.png";

type AuthDetails = {
  client?: { name?: string; redirect_uri?: string };
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
};

const authOAuth = (supabase.auth as any).oauth as {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: AuthDetails | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: AuthDetails | null; error: { message: string } | null }>;
};

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        navigate(`/login?next=${encodeURIComponent(next)}`);
        return;
      }
      setEmail(sess.session.user.email ?? null);
      try {
        const { data, error } = await authOAuth.getAuthorizationDetails(authorizationId);
        if (!active) return;
        if (error) {
          setError(error.message);
          return;
        }
        const immediate = data?.redirect_url ?? data?.redirect_to;
        if (immediate && !data?.client) {
          window.location.href = immediate;
          return;
        }
        setDetails(data);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load authorization details");
      }
    })();
    return () => {
      active = false;
    };
  }, [authorizationId, navigate]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    setError(null);
    try {
      const { data, error } = approve
        ? await authOAuth.approveAuthorization(authorizationId)
        : await authOAuth.denyAuthorization(authorizationId);
      if (error) {
        setError(error.message);
        setBusy(false);
        return;
      }
      const target = data?.redirect_url ?? data?.redirect_to;
      if (!target) {
        setError("No redirect returned by the authorization server.");
        setBusy(false);
        return;
      }
      window.location.href = target;
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
      setBusy(false);
    }
  };

  return (
    <>
      <header className="site-header">
        <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={southstarLogo} alt="SouthStar Realty logo" className="header-logo" />
          <h1>SouthStar Realty</h1>
        </Link>
      </header>
      <main
        className="wrap main-content"
        style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}
      >
        <div className="login-card" style={{ maxWidth: 480 }}>
          {error ? (
            <>
              <h2 style={{ marginBottom: 12 }}>Authorization failed</h2>
              <p style={{ color: "#a00", marginBottom: 16 }}>{error}</p>
              <Link to="/" className="buy-btn">Back to SouthStar Realty</Link>
            </>
          ) : !details ? (
            <p style={{ textAlign: "center" }}>Loading authorization request…</p>
          ) : (
            <>
              <h2 style={{ marginBottom: 8 }}>
                Connect {details.client?.name ?? "an app"} to SouthStar Realty
              </h2>
              {email && (
                <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: 12 }}>
                  Signed in as <strong>{email}</strong>
                </p>
              )}
              <p style={{ marginBottom: 12 }}>
                This lets <strong>{details.client?.name ?? "the client"}</strong> use SouthStar Realty as you —
                including booking appointments, sending contact messages, and submitting reviews on your behalf.
              </p>
              <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: 20 }}>
                This does not bypass this app's permissions or backend policies.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  className="login-submit"
                  style={{ flex: 1 }}
                  disabled={busy}
                  onClick={() => decide(true)}
                >
                  {busy ? "Please wait…" : "Approve"}
                </button>
                <button
                  className="login-submit"
                  style={{ flex: 1, background: "#eee", color: "#333" }}
                  disabled={busy}
                  onClick={() => decide(false)}
                >
                  Cancel connection
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default OAuthConsent;
