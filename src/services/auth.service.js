import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export const register = async ({ username, email, password }) => {
  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existing) {
    throw new Error("Username or email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const login = async ({ username, password }) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error("Invalid user or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid user or password");
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return { token };
};
