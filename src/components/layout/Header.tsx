import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="gradient-header text-primary-foreground py-4 md:py-5">
      <div className="max-w-[1100px] mx-auto px-4 flex items-center justify-center gap-3">
        <img
          src="https://th.bing.com/th/id/OIP.2pfvKpHfX1z7Cen5GSLDFQHaHa?w=180&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
          alt="SouthStar Realty logo"
          className="w-12 h-12 rounded-md object-cover border border-dashed border-black/10 bg-white"
        />
        <Link to="/">
          <h1 className="text-xl md:text-2xl font-bold m-0">SouthStar Realty</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
