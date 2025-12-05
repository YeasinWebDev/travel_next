export interface IDestination {
  _id?: string;
  name: string;
  location: string;
  description: string;
  image: string[];
  interests: string[];
  division: string;
  price: number;
  bestTimeToVisit: string;
  activities: string[];
  isFeatured: boolean;
  status: "active" | "inactive";
  reviews: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}