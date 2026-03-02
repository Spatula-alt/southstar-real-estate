import { useState } from "react";

interface Props {
  title: string;
}

const SharePanel = ({ title }: Props) => {
  const [showReport, setShowReport] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <>
      <div className="share-panel">
        <h4>Share</h4>
        <div className="share-icons">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener noreferrer" className="share-icon fb" aria-label="Facebook">f</a>
          <a href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="share-icon tw" aria-label="X">𝕏</a>
          <a href={`mailto:?subject=${encodedTitle}&body=${encoded}`} className="share-icon em" aria-label="Email">✉</a>
          <a href={`https://wa.me/?text=${encodedTitle}%20${encoded}`} target="_blank" rel="noopener noreferrer" className="share-icon wa" aria-label="WhatsApp">W</a>
        </div>
      </div>

      <div className="share-actions">
        <button onClick={() => window.print()} className="action-btn">🖨 Print</button>
        <button onClick={() => setShowReport(true)} className="action-btn">🚩 Report Listing</button>
      </div>

      {showReport && (
        <div className="buyability-overlay" onClick={() => setShowReport(false)}>
          <div className="buyability-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <button className="buyability-close" onClick={() => setShowReport(false)}>✕</button>
            <h3>Report Listing</h3>
            <form onSubmit={(e) => { e.preventDefault(); setShowReport(false); }}>
              {["Inaccurate information", "Spam or scam", "Already sold", "Other"].map((r) => (
                <label key={r} style={{ display: "flex", gap: 8, margin: "8px 0", cursor: "pointer" }}>
                  <input type="checkbox" /> {r}
                </label>
              ))}
              <button type="submit" className="buyability-submit" style={{ marginTop: 12 }}>Submit Report</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SharePanel;
