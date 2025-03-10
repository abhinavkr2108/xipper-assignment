import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Hotel } from "../../../../lib/types";
import { Badge } from "../../../../components/ui/badge";
import { MapPinIcon, Star } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Link } from "react-router";
import { useAuthStore } from "../../../../store";

interface ListingCardProps {
  hotel: Hotel;
}

export default function ListingCard({ hotel }: ListingCardProps) {
  const { isAuthenticated } = useAuthStore();
  return (
    <Card>
      <CardHeader>
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full rounded-lg object-cover overflow-hidden" /* Removes gap & rounds top corners */
        />
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl">{hotel.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              <MapPinIcon className="inline-block mr-1" />
              {hotel.city}
            </p>
          </div>
          <Badge>
            {hotel.stars} <Star />
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p>{hotel.description}</p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between items-center">
          <h1 className="font-bold text-sm">${hotel.pricePerNight} / night</h1>
          {isAuthenticated ? (
            <Link to={`/book/${hotel.id}`}>
              <Button>Book</Button>
            </Link>
          ) : (
            <Link to={"/login"}>
              <Button>Login to book</Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
