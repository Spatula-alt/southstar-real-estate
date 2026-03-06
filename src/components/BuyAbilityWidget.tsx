import { useState } from "react";
import { places } from "@/data/properties";

const BuyAbilityWidget = () => {
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState<null | {
    targetPrice: number;
    monthlyPayment: number;
    buyAbility: number;
  }>(null);
  const [form, setForm] = useState({
    location: "",
    creditScore: "",
    annualIncome: "",
    downPayment: "",
    monthlyDebt: "",
  });

  const allFilled = Object.values(form).every((v) => v.trim() !== "");

  const calculate = () => {
    const income = parseFloat(form.annualIncome) || 0;
    const down = parseFloat(form.downPayment) || 0;
    const debt = parseFloat(form.monthlyDebt) || 0;
    const monthlyIncome = income / 12;
    const maxMonthly = monthlyIncome * 0.43 - debt;
    const rate = 0.07 / 12;
    const n = 360;
    const loanAmount = maxMonthly > 0 ? (maxMonthly * (1 - Math.pow(1 + rate, -n))) / rate : 0;
    const targetPrice = loanAmount + down;
    const payment = maxMonthly > 0 ? maxMonthly : 0;

    setResults({
      targetPrice: Math.round(targetPrice),
      monthlyPayment: Math.round(payment),
      buyAbility: Math.round(targetPrice),
    });
  };

  const fmt = (n: number) => "₱" + n.toLocaleString();

  return (
    <>
      {/* Collapsed Card */}
      <div className="buyability-card">
        <h3>Find homes you can afford with BuyAbility™</h3>
        <p className="buyability-sub">Answer a few questions. We'll highlight homes you're likely to qualify for.</p>
        <div className="buyability-stats">
          <div><span className="buyability-val">{results ? fmt(results.targetPrice) : "₱ --"}</span><br /><small>Suggested target price</small></div>
          <div><span className="buyability-val">{results ? fmt(results.buyAbility) : "₱ --"}</span><br /><small>BuyAbility™</small></div>
          <div><span className="buyability-val">{results ? fmt(results.monthlyPayment) : "₱ --"}</span><br /><small>Mo. payment</small></div>
          <div><span className="buyability-val">7.0 %</span><br /><small>Today's rate</small></div>
          <div><span className="buyability-val">7.25 %</span><br /><small>APR</small></div>
        </div>
        <button className="buyability-cta" onClick={() => setShowModal(true)}>Let's Get Started</button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="buyability-overlay" onClick={() => setShowModal(false)}>
          <div className="buyability-modal" onClick={(e) => e.stopPropagation()}>
            <button className="buyability-close" onClick={() => setShowModal(false)}>✕</button>
            <h3>BuyAbility™</h3>
            <p style={{ color: "#666", marginBottom: 20 }}>See a real-time view of what you can afford in today's market.</p>

            <div className="buyability-form-grid">
              <div>
                <label>Location</label>
                <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}>
                  <option value="">Select municipality</option>
                  {places.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label>Credit Score</label>
                <select value={form.creditScore} onChange={(e) => setForm({ ...form, creditScore: e.target.value })}>
                  <option value="">Select</option>
                  <option value="excellent">Excellent (750+)</option>
                  <option value="good">Good (700–749)</option>
                  <option value="fair">Fair (650–699)</option>
                  <option value="poor">Poor (&lt;650)</option>
                </select>
              </div>
            </div>

            <div className="buyability-field">
              <label>Annual Income</label>
              <div className="buyability-input-wrap">
                <span>₱</span>
                <input type="number" placeholder="0" min="0" value={form.annualIncome} onChange={(e) => setForm({ ...form, annualIncome: e.target.value })} />
                <span>/year</span>
              </div>
              <small>Pre-tax income</small>
            </div>

            <div className="buyability-form-grid">
              <div className="buyability-field">
                <label>Down Payment</label>
                <div className="buyability-input-wrap">
                  <span>₱</span>
                  <input type="number" placeholder="0" min="0" value={form.downPayment} onChange={(e) => setForm({ ...form, downPayment: e.target.value })} />
                </div>
                <small>At least ₱50,000</small>
              </div>
              <div className="buyability-field">
                <label>Monthly Debt</label>
                <div className="buyability-input-wrap">
                  <span>₱</span>
                  <input type="number" placeholder="0" min="0" value={form.monthlyDebt} onChange={(e) => setForm({ ...form, monthlyDebt: e.target.value })} />
                  <span>/month</span>
                </div>
                <small>Loans, credit cards, amortization</small>
              </div>
            </div>

            <button className="buyability-submit" disabled={!allFilled} onClick={() => { calculate(); setShowModal(false); }}>
              Get your BuyAbility™
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyAbilityWidget;
