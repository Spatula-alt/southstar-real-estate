import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout showSearch={false}>
      {/* Hero */}
      <section
        className="py-16 md:py-20 text-center text-white relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url(https://travelorientalmindoro.ph/Content/img/uploads/default.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-[800px] mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Building Dreams in Oriental Mindoro</h2>
          <p className="text-base md:text-lg opacity-95">
            We connect families, investors, and businesses to properties that enrich lives and uplift communities — guided by our values of trust, affordability, and reliability.
          </p>
        </div>
      </section>

      <main className="max-w-[1100px] mx-auto px-4 py-7">
        {/* About Section */}
        <section className="mb-5">
          <h2 className="text-lg font-extrabold text-primary-dark mb-3 inline-block px-3 py-2 rounded-lg bg-gradient-to-r from-primary/5 to-primary/[0.03]">
            About SouthStar Realty
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <img
              src="https://scontent.fmnl17-6.fna.fbcdn.net/v/t39.30808-6/558088971_122140095146909446_312887583566325529_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=jxFK7AQqRycQ7kNvwEHyskq&_nc_oc=AdndmQT9dHYMYDxGirBcUKjcWg7bWae5lK82IAh3Brj4ryLkzPlThhrnwcWIaSlqX4c&_nc_zt=23&_nc_ht=scontent.fmnl17-6.fna&_nc_gid=I32UcQrvp_SjtVjU472PEw&oh=00_AfimqyDSTbuHondFHDZuSaOahyt0An2tdlLyH1hFeSXetA&oe=69172CD2"
              alt="SouthStar Realty Office"
              className="w-full rounded-xl shadow-lg"
            />
            <div>
              <p className="font-semibold text-primary-dark mb-3">
                SouthStar Realty is a growing real estate service provider in Oriental Mindoro, dedicated to helping families, investors, and businesses find the perfect property.
              </p>
              <p className="text-muted-foreground">
                From residential lots to agricultural and commercial lands, we are trusted by many for our <strong>affordable, reliable, and transparent property solutions.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mt-5">
          <h2 className="text-lg font-extrabold text-primary-dark mb-3 inline-block px-3 py-2 rounded-lg bg-gradient-to-r from-primary/5 to-primary/[0.03]">
            Mission & Vision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
            <article className="bg-card rounded-xl overflow-hidden shadow-lg border border-border/5 hover:-translate-y-1.5 transition-transform">
              <div className="p-4">
                <h3 className="text-primary-dark font-bold mb-2">Our Mission</h3>
                <p className="text-muted-foreground">
                  To connect people with their dream properties by making land ownership <strong>accessible, affordable, and secure</strong>. We guide clients with honesty and professionalism.
                </p>
              </div>
            </article>
            <article className="bg-card rounded-xl overflow-hidden shadow-lg border border-border/5 hover:-translate-y-1.5 transition-transform">
              <div className="p-4">
                <h3 className="text-primary-dark font-bold mb-2">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become the <strong>most reliable and community-driven real estate company in Oriental Mindoro</strong>, uplifting lives while ensuring long-term value in every investment.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Core Values */}
        <section className="mt-5">
          <h2 className="text-lg font-extrabold text-primary-dark mb-3 inline-block px-3 py-2 rounded-lg bg-gradient-to-r from-primary/5 to-primary/[0.03]">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {[
              { title: "Trust", desc: "Every deal is built on integrity and transparency — earning the confidence of our clients." },
              { title: "Affordability", desc: "We provide cost-effective solutions without compromising location value or clarity of process." },
              { title: "Local Expertise", desc: "Our deep knowledge of Oriental Mindoro ensures we match people to the best opportunities." },
            ].map((value) => (
              <article key={value.title} className="bg-card rounded-xl overflow-hidden shadow-lg border border-border/5 hover:-translate-y-1.5 transition-transform">
                <div className="p-4">
                  <h3 className="text-primary-dark font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="mt-5">
          <h2 className="text-lg font-extrabold text-primary-dark mb-3 inline-block px-3 py-2 rounded-lg bg-gradient-to-r from-primary/5 to-primary/[0.03]">
            Our Journey
          </h2>
          <div className="border-l-[3px] border-primary pl-5 my-4 space-y-2">
            <p><strong>2019:</strong> Founded to bring affordable housing to Mindoreños.</p>
            <p><strong>2020:</strong> Expanded services to agricultural to residential properties.</p>
            <p><strong>2023:</strong> Trusted partner for investors & landowners across Oriental Mindoro.</p>
            <p><strong>Today:</strong> Growing stronger, serving families & communities with dedication.</p>
          </div>
        </section>

        {/* Office & Map */}
        <section className="mt-5">
          <h2 className="text-lg font-extrabold text-primary-dark mb-3 inline-block px-3 py-2 rounded-lg bg-gradient-to-r from-primary/5 to-primary/[0.03]">
            Visit Our Office
          </h2>
          <p className="text-muted-foreground mt-1.5">
            📍 In front of Gloria Central School, near Andok's, Poblacion Maligaya, Gloria, Oriental Mindoro.
          </p>
          <div className="max-w-[900px] mx-auto mt-3 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238.2567177562571!2d121.47774517536163!3d12.968916031341093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bca8c51d3e4ae5%3A0xbb2d39ec13343e47!2sSTAR%20GYM%20AND%20SALON!5e1!3m2!1sen!2sph!4v1762691999295!5m2!1sen!2sph"
              className="w-full h-[280px] md:h-[360px] border-0"
              allowFullScreen
              loading="lazy"
              title="SouthStar Realty Office Location"
            />
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-5">
          <h2 className="text-lg font-extrabold text-primary-dark mb-3 inline-block px-3 py-2 rounded-lg bg-gradient-to-r from-primary/5 to-primary/[0.03]">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {[
              { text: "SouthStar Realty made my dream lot in Pinamalayan possible. Honest service and smooth process!", author: "Maria D." },
              { text: "Reliable and professional. They helped me secure farmland with clear documents and no hassle.", author: "Roberto G." },
            ].map((testimonial, i) => (
              <article key={i} className="bg-card rounded-xl overflow-hidden shadow-lg border border-border/5">
                <div className="p-4">
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  <p className="text-primary-dark font-semibold mt-2">- {testimonial.author}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-card rounded-xl overflow-hidden shadow-lg border-2 border-accent mt-7">
          <div className="p-5 text-center">
            <h3 className="text-primary-dark font-bold text-lg mb-2">Join Our Mission</h3>
            <p className="text-muted-foreground max-w-[820px] mx-auto mb-3">
              Looking for a trusted real estate partner or career opportunity? Be part of our journey in building Oriental Mindoro's future.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-gradient-to-r from-accent to-yellow-500 text-accent-foreground px-5 py-2.5 rounded-md font-bold hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default About;
