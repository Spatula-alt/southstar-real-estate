import { ReactNode } from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

const Layout = ({ children, onSearch, showSearch = true }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation onSearch={onSearch} showSearch={showSearch} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
