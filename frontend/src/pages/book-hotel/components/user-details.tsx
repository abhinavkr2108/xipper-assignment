import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { Input } from "../../../components/ui/input";
import { useGuestStore } from "../../../store";
import { Button } from "../../../components/ui/button";

export default function UserDetails() {
  const { numGuests, guests, setNumGuests, updateGuest } = useGuestStore();

  return (
    <React.Fragment>
      <h1 className="text-lg text-gray-500 font-normal">
        Enter number of guests:
      </h1>
      <Input
        type="number"
        min={1}
        max={10}
        value={numGuests}
        onChange={(e) => setNumGuests(Number(e.target.value))}
        className="mb-4"
      />

      {/* Dynamic Accordion */}
      <Accordion type="single" collapsible className="w-full">
        {guests.map((guest, index) => (
          <AccordionItem key={index} value={`guest-${index + 1}`}>
            <AccordionTrigger>Person {index + 1} Details</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600">
                Enter details for Person {index + 1}.
              </p>
              <div className="flex flex-col space-y-2 mt-2">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={guest.name}
                  onChange={(e) => updateGuest(index, "name", e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Aadhar Number"
                  value={guest.aadhar}
                  onChange={(e) => updateGuest(index, "aadhar", e.target.value)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </React.Fragment>
  );
}
