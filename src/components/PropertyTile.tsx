import { Link } from "react-router-dom";

interface PropertyTileProps {
  id: string;
  name: string;
  image: string;
}

const PropertyTile = ({ id, name, image }: PropertyTileProps) => {
  return (
    <div
      className="relative h-[160px] md:h-[160px] bg-cover bg-center rounded-lg overflow-hidden shadow-lg group grayscale hover:grayscale-0 transition-all duration-300 hover:scale-[1.02]"
      style={{ backgroundImage: `url('${image}')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
        <h3 className="m-0 mb-1.5 font-bold">{name}</h3>
        <Link
          to={`/property?place=${id}`}
          className="bg-accent text-accent-foreground py-1.5 px-2.5 rounded-md font-bold no-underline inline-block w-fit hover:bg-yellow-400 transition-colors"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default PropertyTile;
