export interface IUser {
  _id: string;
  name: string;
  email: string;
  location: string;
  profileImage: string;
  role: "user" | "admin";
  status: "active" | "inactive";
  travelInterests: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IReview {
  _id: string;
  comment: string;
  rating: number;
  destination: any; // Destination ID
  user: IUser;
  createdAt: string;
  updatedAt: string;
}
