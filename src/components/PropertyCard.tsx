import { useNavigate } from "react-router-dom";
import { Place } from "@/data/properties";

interface PropertyCardProps {
  place: Place;
}

const PropertyCard = ({ place }: PropertyCardProps) => {
  const navigate = useNavigate();

  const handleInquire = () => {
    navigate(`/property?place=${place.id}`);
  };

  return (
    <article className="flex flex-col justify-between border-2 border-accent rounded-lg overflow-hidden bg-card min-h-[160px] hover:-translate-y-1 transition-transform shadow-md">
      <img
        src={place.image || `https://via.placeholder.com/900x300.png?text=${encodeURIComponent(place.name)}`}
        alt={place.name}
        className="h-[88px] object-cover w-full"
      />
      <div className="p-3.5 flex flex-col gap-2 text-left">
        <div>
          <h3 className="m-0 text-base font-semibold text-primary-dark">{place.name}</h3>
          <p className="m-0 text-muted-foreground text-sm">
            {place.price} · {place.type}
          </p>
        </div>
        <button
          onClick={handleInquire}
          className="bg-accent text-accent-foreground font-semibold py-2.5 px-3 rounded-md text-center w-full mt-2 hover:bg-yellow-400 transition-colors"
        >
          Inquire Now
        </button>
      </div>
    </article>
  );
};

export default PropertyCard;
