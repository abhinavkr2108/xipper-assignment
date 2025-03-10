import React from "react";
import { Button } from "../../components/ui/button";
import { Link, useParams } from "react-router";
import { CircleCheckBig } from "lucide-react";

export default function CheckInPage() {
  const { bookingId } = useParams();
  return (
    <div className="max-w-xl mx-auto w-screen h-screen flex flex-col justify-center items-center px-6 md:px-0">
      <CircleCheckBig className="text-green-500" size={128} />
      <h1 className="font-bold text-2xl">Your Booking has been confirmed!</h1>
      <h2 className="text-lg text-gray-500 font-medium">
        You can Web check in now or at the hotel.
      </h2>
      <Link to={`/web-check-in/${bookingId}`} className="w-full">
        <Button className="mt-4 w-full">Web Check in now</Button>
      </Link>
      <Link to={"/"} className="w-full">
        <Button className="mt-4 w-full" variant={"outline"}>
          I will Check in at the hotel
        </Button>
      </Link>
    </div>
  );
}
