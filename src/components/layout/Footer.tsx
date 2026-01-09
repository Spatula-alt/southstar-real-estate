const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-center items-center gap-3 py-5 px-3 text-muted-foreground text-sm mt-5">
      <div className="flex items-center gap-3">
        <div className="flex flex-col leading-tight">
          <strong className="text-foreground">SouthStar Realty</strong>
          <small>Reliable • Affordable • Trusted</small>
        </div>
      </div>
      <div>© {new Date().getFullYear()}</div>
    </footer>
  );
};

export default Footer;
