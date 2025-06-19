import { User } from "../models/User";

export type UserRole = "ADMIN" | "USER";
export type UserPayload = Omit<User, "password">;
