"use server";
import prisma from "@/db";
import jwt from "jsonwebtoken";

interface User {
  name: string;
  email: string;
  password: string;
}

interface User2 {
  email: string;
  password: string;
}



export const Signup = async ({ name, email, password }: User) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
    select: {
      name: true,
      id: true,
      email: true,
    },
  });
  //token generate
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

  return {
    success: true,
    message: "User created successfully",
    user,
    token,
  };
};



export const Signin = async ({ email, password }: User2) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        posts: true,
        comments: true,
        likes: true,
      },
    });

    if (!user) {
      console.log("user not found");
     return "User not found";
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

    console.log("User found!");
    return {user,token}
  } catch (error) {
    console.log("wrong ");
  }
};
