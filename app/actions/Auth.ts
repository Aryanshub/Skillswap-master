"use server";
import prisma from "@/db";
import bcrypt from "bcryptjs";
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
  const salt = bcrypt.genSaltSync(10);
  //hashing password
 const  hashPassword = bcrypt.hashSync(password, salt);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
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
    const lookForUserinDB = await prisma.user.findUnique({ where: { email } });
   const storedHashedPassword = lookForUserinDB?.password;
   if (!storedHashedPassword) { 
      console.log("user not found");
      return "User not found";
    }
    //compare password
    const isPasswordValid = bcrypt.compareSync(password, storedHashedPassword);
    if (!isPasswordValid) {
      console.log("wrong password");
      return "Wrong password";
    }
    const user = await prisma.user.findUnique({
      where: {
        email
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
