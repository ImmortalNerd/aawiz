"use server";

import { IUser } from "@/types/user/user.interface";

export const getUsers = async (): Promise<IUser[]> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      next: { revalidate: 60 },
    });
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    throw new Error(`An error happened: ${error}`);
  }
};
