import React from "react";
import { useDateStore, useGuestStore } from "../../../store";

export default function ConfirmBooking() {
  const { fromDate, toDate, setFromDate, setToDate } = useDateStore();
  const { guests } = useGuestStore();
  return (
    <div>
      <h1 className="text-lg font-medium">Confirm Booking</h1>
      <p>Please confirm your booking details.</p>
      <p>
        <span className="font-bold">Check in date:</span>{" "}
        {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
          fromDate
        )}{" "}
      </p>
      <p>
        <span className="font-bold">Check out date: </span>
        {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
          toDate
        )}{" "}
      </p>
      <div>
        <span className="font-bold">
          Guest Details:
          <br />{" "}
        </span>
        {/* Display the number of guests */}
        {guests.map((guest, index) => (
          <div key={index} className="flex flex-col gap-0.5">
            <span>
              Person {index + 1} Name: {guest.name}{" "}
            </span>

            <span>Aadhar Number: {guest.aadhar}</span>

            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
