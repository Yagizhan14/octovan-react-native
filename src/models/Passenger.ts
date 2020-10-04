import { IAirline } from "./Airline";

export interface IPassenger {
  _id: string;
  airline: IAirline;
  name: string;
  trips: number;
}
