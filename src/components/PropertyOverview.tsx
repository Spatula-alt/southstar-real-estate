interface Props {
  title: string;
  type: string;
  price: string;
  placeId: string;
}

const PropertyOverview = ({ title, type, price, placeId }: Props) => {
  const listingNumber = Math.abs(placeId.split("").reduce((a, c) => a + c.charCodeAt(0), 0) * 123456) % 999999999;
  const now = new Date();
  const listingDate = now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const rows = [
    ["Listing Number", listingNumber.toString()],
    ["Type of Property", type || "Lot"],
    ["Listing Date", listingDate],
    ["Zoning", "Single Residential"],
    ["Land Area", "Varies per lot"],
    ["Title", "TCT / OCT"],
    ["Road Frontage", "Yes"],
  ];

  return (
    <section className="property-overview-section">
      <h3 className="overview-title">— Property Overview</h3>
      <table className="overview-table">
        <tbody>
          {rows.map(([label, value], i) => (
            <tr key={i} className={i % 2 === 0 ? "row-alt" : ""}>
              <td className="overview-label">{label}</td>
              <td className="overview-value">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default PropertyOverview;
