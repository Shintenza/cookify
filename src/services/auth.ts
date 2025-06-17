import { compare } from "bcrypt";
import AppDataSource from "../config/data-source";
import { LoginData, RegisterData } from "../controllers/types";
import { User } from "../models/User";
import { comparePassword, hashPassword } from "../utils/hash";
import { UserExists } from "./errors";

const userRepository = AppDataSource.getRepository(User);

export const registerUser = async ({
  fullName,
  email,
  password,
}: RegisterData) => {
  const existing = await userRepository.findOneBy({ email });
  if (existing) {
    throw new UserExists();
  }

  const hashedPassword = await hashPassword(password);
  const user = userRepository.create({
    email,
    password: hashedPassword,
    fullName,
  });

  await userRepository.save(user);
  return user;
};

export const loginUser = async ({ email, password }: LoginData) => {
  const user = await userRepository.findOneBy({ email });

  if (!user) {
    throw new Error();
  }

  const isPasswordMatching = await comparePassword(password, user.password);
  if (!isPasswordMatching) {
    throw new Error();
  }

  return user;
};
