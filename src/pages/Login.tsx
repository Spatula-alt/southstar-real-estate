import { useState } from "react";
import southstarLogo from "@/assets/southstar-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        toast({ title: "Welcome back!", description: "You're now logged in." });
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: { full_name: formData.name },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast({ title: "Account created!", description: "You can now log in." });
        setIsLogin(true);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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

      <nav className="tab-nav">
        <div className="nav-container">
          <Link to="/">PROPERTIES</Link>
          <Link to="/popular">POPULAR</Link>
          <Link to="/about">ABOUT US</Link>
          <Link to="/contact">CONTACT</Link>
          <Link to="/agents">AGENTS</Link>
          <Link to="/login" className="active">LOG IN</Link>
        </div>
      </nav>

      <main className="wrap main-content" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div className="login-card">
          {/* Tabs */}
          <div className="login-tabs">
            <button
              className={`login-tab ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`login-tab ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="login-field">
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="login-field">
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-field">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? "Please wait..." : isLogin ? "Log In" : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: "center", color: "#888", fontSize: "0.85rem", marginTop: "16px" }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={{ color: "var(--primary)", background: "none", border: "none", cursor: "pointer", fontWeight: 600, textDecoration: "underline" }}
            >
              {isLogin ? "Register" : "Log In"}
            </button>
          </p>

          <Link to="/" style={{ display: "block", textAlign: "center", marginTop: "12px", color: "var(--primary)", fontSize: "0.85rem" }}>
            ← Back to SouthStar Realty
          </Link>
        </div>
      </main>
    </>
  );
};

export default Login;
