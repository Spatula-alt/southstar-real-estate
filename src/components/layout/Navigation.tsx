import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

const Navigation = ({ onSearch, showSearch = true }: NavigationProps) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const navLinks = [
    { path: "/popular", label: "POPULAR" },
    { path: "/about", label: "ABOUT US" },
    { path: "/contact", label: "CONTACT" },
  ];

  return (
    <div className="bg-primary-dark py-2">
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 md:justify-between">
          {showSearch && (
            <div className="flex items-center gap-2">
              <div className="flex items-center max-w-[420px]">
                <div className="flex items-center justify-center w-11 bg-white border border-border border-r-0 rounded-l-lg p-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  className="h-10 min-w-[140px] md:min-w-[220px] bg-white border border-border px-3 font-semibold rounded-r-lg outline-none text-foreground"
                  placeholder="Search municipality (e.g. Gloria, Naujan)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <button
                onClick={handleSearch}
                className="h-10 bg-blue-500 hover:bg-blue-600 text-white px-3 rounded-lg font-bold transition-colors"
              >
                Search
              </button>
            </div>
          )}

          <nav className="flex gap-4 md:gap-6 items-center">
            <Link
              to="/"
              className={`text-accent font-bold px-3 py-2 rounded-md hover:text-white transition-colors ${
                location.pathname === "/" ? "text-white bg-white/5" : ""
              }`}
            >
              PROPERTIES
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-accent font-bold px-3 py-2 rounded-md hover:text-white transition-colors whitespace-nowrap ${
                  location.pathname === link.path ? "text-white bg-white/5" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
