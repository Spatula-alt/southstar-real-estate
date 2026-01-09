import Layout from "@/components/layout/Layout";
import PropertyTile from "@/components/PropertyTile";
import { places } from "@/data/properties";

const Popular = () => {
  return (
    <Layout showSearch={false}>
      <div className="max-w-[1100px] mx-auto px-4 py-5">
        <h2 className="text-2xl font-bold text-primary-dark text-center mb-5">
          Municipalities & Cities of Oriental Mindoro
        </h2>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {places.map((place) => (
            <PropertyTile
              key={place.id}
              id={place.id}
              name={place.name}
              image={place.image || `https://via.placeholder.com/600x400.png?text=${encodeURIComponent(place.name)}`}
            />
          ))}
        </section>
      </div>
    </Layout>
  );
};

export default Popular;
