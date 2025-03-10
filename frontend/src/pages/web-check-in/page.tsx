import React from "react";
import { useAuthStore, useDateStore, useGuestStore } from "../../store";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

export default function WebCheckInPage() {
  const { user } = useAuthStore();
  const { guests } = useGuestStore();
  const { fromDate, toDate } = useDateStore();
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const handleWebCheckIn = async () => {
    const formattedGuests = guests.map((guest) => ({
      name: guest.name,
      aadhaarNumber: guest.aadhar,
    }));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/web-check-in/${bookingId}`,
        {
          guests: formattedGuests,
          userId: user?.id,
        }
      );
      toast.success("Web check-in successful");
      navigate("/");
    } catch (error) {
      console.error("Error during web check-in", error);
      toast.error("Error during web check-in");
    }
  };
  return (
    <div className="max-w-xl mx-auto w-screen h-screen flex flex-col justify-center items-center px-6 md:px-0">
      <h1 className="font-bold text-2xl">Web Check In Now</h1>
      <h2 className="text-xl font-medium text-gray-500">Your Details are:</h2>
      <div className="flex flex-col gap-1">
        <span className="text-lg">Name: {user?.name}</span>
        <span className="text-lg">Email: {user?.email}</span>
        <span className="text-lg">Guest Details: </span>
        <div className="flex flex-col gap-1">
          {guests.map((guest) => (
            <div key={guest.name}>
              <span>Name: {guest.name}</span>
              <br />
              <span>Aadhaar Number: {guest.aadhar}</span>
            </div>
          ))}
        </div>
        <span>
          Your Check In Timings will be 12PM at{" "}
          {new Intl.DateTimeFormat("en-Us", { dateStyle: "full" }).format(
            fromDate
          )}
        </span>
        <span>
          Your Check Out Timings will be 01PM at{" "}
          {new Intl.DateTimeFormat("en-Us", { dateStyle: "full" }).format(
            toDate
          )}
        </span>
      </div>
      <Button className="mt-4 w-full" onClick={handleWebCheckIn}>
        I Confirm! Web Check In Now
      </Button>
    </div>
  );
}
