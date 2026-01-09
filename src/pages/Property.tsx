import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { propertyData, places } from "@/data/properties";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Property = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const placeId = (searchParams.get("place") || "calapan").toLowerCase();
  const property = propertyData[placeId] || propertyData.calapan;
  const placeInfo = places.find((p) => p.id === placeId);

  const [mapIndex, setMapIndex] = useState(0);
  const hasMultipleMaps = Array.isArray(property.map);
  const currentMap = hasMultipleMaps ? (property.map as string[])[mapIndex] : (property.map as string);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    setMapIndex(0);
  }, [placeId]);

  const handlePrevMap = () => {
    if (hasMultipleMaps) {
      setMapIndex((prev) => (prev - 1 + property.map.length) % property.map.length);
    }
  };

  const handleNextMap = () => {
    if (hasMultipleMaps) {
      setMapIndex((prev) => (prev + 1) % property.map.length);
    }
  };

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
      title: "Inquiry Sent!",
      description: `Thanks ${formData.name}! Your inquiry for ${property.title} has been recorded. We will contact you at ${formData.email} within 1-2 business days.`,
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="gradient-header text-primary-foreground py-4 md:py-5 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-accent text-accent-foreground border-none rounded-md px-3 py-2 cursor-pointer font-bold z-20 flex items-center gap-1 hover:bg-yellow-400 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold m-0">SouthStar Realty</h1>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 py-6 flex-1">
        {/* Map Section */}
        <section className="mb-5">
          <h2 className="text-xl font-bold text-primary-dark mb-3">{property.title}</h2>
          <div className="relative rounded-lg overflow-hidden">
            <iframe
              src={typeof currentMap === 'string' ? currentMap : currentMap}
              className="w-full h-[300px] md:h-[420px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Property Location Map"
            />

            {hasMultipleMaps && (
              <>
                <button
                  onClick={handlePrevMap}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-accent text-accent-foreground border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-10 hover:bg-yellow-400 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextMap}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-accent text-accent-foreground border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-10 hover:bg-yellow-400 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </section>

        {/* Property Overview */}
        <section className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-5 mt-5">
          {/* Gallery */}
          <div className="bg-card p-4 rounded-xl border-2 border-accent shadow-lg">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={property.img}
                alt={`${property.title} Main Image`}
                className="w-full h-[300px] md:h-[420px] object-cover"
              />
              <span className="absolute top-3 left-3 bg-accent text-accent-foreground font-bold py-1.5 px-2.5 rounded-md text-sm">
                FEATURED
              </span>
            </div>
          </div>

          {/* Inquiry Box */}
          <aside className="bg-card border-2 border-accent p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-primary-dark mb-3">Inquire Now</h3>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-accent text-accent-foreground w-11 h-11 rounded-full flex items-center justify-center font-bold">
                R
              </div>
              <div>
                <div className="font-bold">
                  Ram Felix Jarabe <span className="text-primary">✔</span>
                </div>
                <div className="text-sm text-muted-foreground">Listed by SouthStar Realty</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div>
                <label htmlFor="name" className="text-sm font-semibold text-primary-dark">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-border rounded-md outline-none focus:ring-2 focus:ring-primary mt-1"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-semibold text-primary-dark">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-border rounded-md outline-none focus:ring-2 focus:ring-primary mt-1"
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-sm font-semibold text-primary-dark">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-border rounded-md outline-none focus:ring-2 focus:ring-primary mt-1"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-semibold text-primary-dark">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border border-border rounded-md outline-none focus:ring-2 focus:ring-primary resize-none mt-1"
                />
              </div>

              <button
                type="submit"
                className="bg-accent text-accent-foreground font-semibold py-2.5 px-3 rounded-md w-full hover:bg-yellow-400 transition-colors mt-2"
              >
                Contact agent
              </button>
            </form>
          </aside>
        </section>

        {/* Property Details */}
        <section className="bg-card rounded-xl border-2 border-accent p-5 mt-5 shadow-lg">
          <h2 className="text-xl font-bold text-primary-dark mb-3">Property Details</h2>
          <div className="flex flex-wrap gap-5 mb-3 text-muted-foreground">
            <div>
              <strong>Location:</strong> {property.title}, Oriental Mindoro
            </div>
            <div>
              <strong>Price:</strong> {placeInfo?.price || "Contact for pricing"}
            </div>
            <div>
              <strong>Type:</strong> {placeInfo?.type || "Land"}
            </div>
          </div>

          <h3 className="text-primary font-bold mt-4 mb-2">Description</h3>
          <p className="text-muted-foreground">
            Prime real estate opportunity in {property.title}, Oriental Mindoro. This property offers excellent value with potential for residential or commercial development. Contact us for more details about lot sizes, pricing, and available financing options.
          </p>

          <h3 className="text-primary font-bold mt-4 mb-2">Essentials</h3>
          <ul className="list-disc ml-5 text-muted-foreground space-y-1">
            <li>Clean title</li>
            <li>Road accessible</li>
            <li>Near public utilities</li>
            <li>Flexible payment terms available</li>
            <li>Pag-IBIG financing may apply</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Property;
