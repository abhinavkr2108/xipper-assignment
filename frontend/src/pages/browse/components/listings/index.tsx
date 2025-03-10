import { useEffect, useState } from "react";
import axios from "axios";
import { Hotel } from "../../../../lib/types";
import ListingCard from "./listing-card";

export default function Listings() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const getHotels = async () => {
    const hotels = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/hotels`
    );
    setHotels(hotels.data);
    console.log(hotels.data);
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <div className="max-w-6xl mx-6 lg:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
      {hotels.map((hotel, idx) => (
        <div key={idx}>
          <ListingCard hotel={hotel} />
        </div>
      ))}
    </div>
  );
}
