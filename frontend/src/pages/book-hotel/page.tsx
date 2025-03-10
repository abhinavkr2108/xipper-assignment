import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Hotel } from "../../lib/types";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useMultiForm } from "../../hooks/useMultiForm";
import SelectDate from "./components/date";
import UserDetails from "./components/user-details";

import { Button } from "../../components/ui/button";
import ConfirmBooking from "./components/confirm-booking";
import { useAuthStore, useDateStore } from "../../store";

export default function BookHotelPage() {
  const { id } = useParams();
  const { currentStep, goToStep, isFirstStep, isLastStep, nextStep, prevStep } =
    useMultiForm([<SelectDate />, <UserDetails />, <ConfirmBooking />]);
  const { fromDate, toDate } = useDateStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(false);
  const [bid, setBid] = useState("");

  const fetchHotelById = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/hotels/${id}`
      );
      const data = response.data;
      setHotel(data);
      console.log("Hotel details:", response);
    } catch (error: any) {
      console.error(error);
      toast.error("Error fetching hotel details");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/bookings/${id}`,
        {
          hotelId: hotel?.id,
          userId: user?.id,
          checkInDate: fromDate,
          checkOutDate: toDate,
          totalPrice: hotel?.pricePerNight,
        }
      );

      const bookingId = res.data.id;
      toast.success("Booking confirmed!");

      navigate(`/check-in/${bookingId}`);
    } catch (error) {
      console.error(error);
      toast.error("Error confirming booking");
    }
  };

  useEffect(() => {
    if (id) {
      fetchHotelById(id);
    }
  }, [id]);

  return (
    <div>
      {loading && (
        <div className="h-screen w-screen flex items-center justify-center">
          <Loader className="animate-spin" />
          Loading...
        </div>
      )}

      {hotel && (
        <React.Fragment>
          <div className="max-w-7xl mx-auto h-screen place-items-center grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 lg:gap-8">
            <div>
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-2/5"
              />
            </div>
            <div>
              <div className="font-bold text-2xl pb-4">
                Book your stay at {hotel?.name}
              </div>
              {isFirstStep && <SelectDate />}
              {isLastStep && <ConfirmBooking />}
              {!isFirstStep && !isLastStep && <UserDetails />}
              <div className="flex justify-end w-full mt-4">
                {isFirstStep ? (
                  <Button onClick={nextStep}>Next Step</Button>
                ) : isLastStep ? (
                  <div className="flex items-center gap-4">
                    <Button onClick={prevStep} variant={"secondary"}>
                      Previous Step
                    </Button>
                    <Button onClick={handleConfirmBooking}>
                      Confirm Booking
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Button onClick={prevStep} variant={"secondary"}>
                      Previous Step
                    </Button>
                    <Button onClick={nextStep}>Next Step</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
