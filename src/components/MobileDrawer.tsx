import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  { path: "/", label: "Buy", icon: "🏠" },
  { path: "/popular", label: "Popular", icon: "🔥" },
  { path: "/about", label: "About Us", icon: "ℹ️" },
  { path: "/contact", label: "Contact", icon: "📅" },
  { path: "/agents", label: "Find an Agent", icon: "👤" },
  { path: "/login", label: "Sign In", icon: "🔑" },
];

const MobileDrawer = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <>
      <button className="mobile-hamburger" onClick={() => setOpen(true)} aria-label="Menu">☰</button>
      {open && <div className="drawer-backdrop" onClick={() => setOpen(false)} />}
      <div className={`mobile-drawer ${open ? "open" : ""}`}>
        <div className="drawer-header">
          {user ? (
            <div className="drawer-user">
              <img src={`https://i.pravatar.cc/80?u=${user.email}`} alt="Avatar" className="drawer-avatar" />
              <span>{user.user_metadata?.full_name || user.email}</span>
            </div>
          ) : (
            <Link to="/login" className="drawer-signin">Sign In</Link>
          )}
        </div>
        <nav className="drawer-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`drawer-link ${location.pathname === item.path ? "active" : ""}`}
            >
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
        <div className="drawer-footer">
          <p>© {new Date().getFullYear()} SouthStar Realty</p>
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
