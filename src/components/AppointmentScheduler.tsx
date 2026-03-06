import { useState } from "react";
import { places } from "@/data/properties";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const isSunday = (d: string) => new Date(d).getDay() === 0;

const AppointmentScheduler = () => {
  const [step, setStep] = useState(1);
  const [property, setProperty] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [agreed, setAgreed] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmNum, setConfirmNum] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date(Date.now() + 60 * 86400000).toISOString().split("T")[0];

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      toast({ title: "Error", description: "Name and email are required.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const selectedPlace = places.find(p => p.id === property);
    const { error } = await supabase.from("appointments" as any).insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      municipality: selectedPlace?.name || null,
      property_id: property || null,
      preferred_date: date,
      preferred_time: time,
      message: form.message.trim() || null,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: "Could not book appointment. Please try again.", variant: "destructive" });
      return;
    }
    const num = `OM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmNum(num);
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="scheduler-confirm">
        <div className="confirm-icon">📅</div>
        <h3>Appointment Booked!</h3>
        <p>Confirmation #: <strong>{confirmNum}</strong></p>
        <div className="confirm-details">
          <p><strong>Property:</strong> {places.find(p => p.id === property)?.name || "Any"}</p>
          <p><strong>Date:</strong> {new Date(date).toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
          <p><strong>Time:</strong> {time}</p>
          <p><strong>Name:</strong> {form.name}</p>
        </div>
        <p style={{ color: "#666", marginTop: 16, fontSize: "0.9rem" }}>We'll confirm your appointment within 24 hours.</p>
        <a
          href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Property+Viewing+-+SouthStar+Realty&dates=${date.replace(/-/g, "")}T${time.includes("AM") ? String(parseInt(time)).padStart(2, "0") : String(parseInt(time) + 12).padStart(2, "0")}0000/${date.replace(/-/g, "")}T${time.includes("AM") ? String(parseInt(time) + 1).padStart(2, "0") : String(parseInt(time) + 13).padStart(2, "0")}0000&details=Confirmation+${confirmNum}`}
          target="_blank"
          rel="noopener noreferrer"
          className="buy-btn"
          style={{ marginTop: 12, display: "inline-block" }}
        >
          Add to Google Calendar
        </a>
      </div>
    );
  }

  return (
    <div className="scheduler-section">
      <h2 className="section-title" style={{ textAlign: "left" }}>📅 Schedule a Property Viewing</h2>

      <div className="scheduler-steps">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={`step-dot ${step >= s ? "active" : ""}`}>{s}</div>
        ))}
      </div>

      {step === 1 && (
        <div className="scheduler-step">
          <h4>Select Property (optional)</h4>
          <select value={property} onChange={(e) => setProperty(e.target.value)} className="scheduler-select">
            <option value="">Any property</option>
            {places.map((p) => <option key={p.id} value={p.id}>{p.name} - {p.price}</option>)}
          </select>
          <button className="buy-btn" onClick={() => setStep(2)} style={{ marginTop: 16 }}>Next →</button>
        </div>
      )}

      {step === 2 && (
        <div className="scheduler-step">
          <h4>Pick a Date</h4>
          <input
            type="date"
            min={today}
            max={maxDate}
            value={date}
            onChange={(e) => {
              if (isSunday(e.target.value)) {
                toast({ title: "Unavailable", description: "Sundays are not available.", variant: "destructive" });
                return;
              }
              setDate(e.target.value);
            }}
            className="scheduler-date"
          />
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button className="view-btn" onClick={() => setStep(1)}>← Back</button>
            <button className="buy-btn" onClick={() => setStep(3)} disabled={!date}>Next →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="scheduler-step">
          <h4>Pick a Time Slot</h4>
          <div className="time-slots">
            {timeSlots.map((t) => (
              <button key={t} className={`time-chip ${time === t ? "selected" : ""}`} onClick={() => setTime(t)}>{t}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button className="view-btn" onClick={() => setStep(2)}>← Back</button>
            <button className="buy-btn" onClick={() => setStep(4)} disabled={!time}>Next →</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="scheduler-step">
          <h4>Your Details</h4>
          <div className="scheduler-form">
            <input placeholder="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input placeholder="Email *" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <textarea placeholder="Message (optional)" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} />
            <label style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer", fontSize: "0.9rem" }}>
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              I agree to be contacted by an agent
            </label>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button className="view-btn" onClick={() => setStep(3)}>← Back</button>
            <button className="buy-btn" onClick={handleSubmit} disabled={!agreed || !form.name || !form.email || submitting}>
              {submitting ? "Booking..." : "Book Appointment"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentScheduler;
