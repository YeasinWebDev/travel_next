import { IDestination } from "./destination.types";

export interface IPrecipitants {
  user:IUser ;
  paymentId: string;
  numberOfGuests: number;
  joinedAt: Date;
}

export interface ITrip extends Document {
  _id?: string;
  title: string;
  image: string;
  creator: IUser;
  destination: IDestination;
  startDate: Date;
  endDate: Date;
  capacity: number;
  participants?: IPrecipitants[];
  isFull?: boolean;
  status?: "active" | "completed" | "cancelled";
}


export interface IUser {
  _id?: string;
  name: string;
  email: string;
  profileImage: string;
  password: string;
  role: "admin" | "user";
  travelInterests?: string[];
  location?: string;
  status?: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}
