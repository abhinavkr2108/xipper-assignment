export type Hotel = {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  stars: number;
  pricePerNight: number;
  image: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};
