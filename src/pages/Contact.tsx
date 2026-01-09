import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: `Thank you for your inquiry, ${formData.name}! We will contact you at ${formData.email} within 1-2 business days.`,
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout showSearch={false}>
      <div className="max-w-[1100px] mx-auto px-4 py-5">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-5 items-start">
          {/* Contact Form */}
          <article className="bg-card border-2 border-accent rounded-lg p-5">
            <h2 className="text-xl font-bold text-primary-dark mb-4">Contact Us</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label htmlFor="name" className="font-semibold text-primary-dark block mb-1">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-border rounded-md outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="font-semibold text-primary-dark block mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-border rounded-md outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="phone" className="font-semibold text-primary-dark block mb-1">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+63 912 345 6789"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-border rounded-md outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="font-semibold text-primary-dark block mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border border-border rounded-md outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-accent text-accent-foreground font-bold py-3 px-4 rounded-md hover:bg-yellow-400 transition-colors mt-2"
              >
                Send Message
              </button>

              <p className="text-muted-foreground text-sm mt-2">
                We reply within 1-2 business days. By sending this message you agree to be contacted regarding your inquiry.
              </p>
            </form>
          </article>

          {/* Office Info */}
          <article className="bg-card border-2 border-accent rounded-lg p-5">
            <h3 className="text-lg font-bold text-primary-dark mb-3">Our Office</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>📍 Calapan City, Oriental Mindoro</p>
              <p>📞 +63 912 345 6789</p>
              <p>
                📧{" "}
                <a href="mailto:info@southstarrealty.com" className="text-primary hover:underline">
                  info@southstarrealty.com
                </a>
              </p>
            </div>

            <h4 className="font-bold text-primary-dark mt-4 mb-2">Office Hours</h4>
            <p className="text-muted-foreground">
              Mon — Fri: 8:30 AM — 5:30 PM
              <br />
              Sat: 9:00 AM — 10:00 AM
            </p>

            <div className="mt-4">
              <h4 className="font-bold text-primary-dark mb-2">Quick Links</h4>
              <div className="space-y-1">
                <p>
                  <Link to="/" className="text-primary hover:underline">
                    View Properties
                  </Link>
                </p>
                <p>
                  <Link to="/about" className="text-primary hover:underline">
                    About Us
                  </Link>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
