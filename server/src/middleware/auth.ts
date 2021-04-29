import { User } from "../entity/User";
import { sign } from "jsonwebtoken";
require("dotenv").config({
  path:
    "C:\\Users\\gonzapepe\\Desktop\\proyectos\\social_media\\server\\src\\.env",
});

export const createAccessToken = (user: User) => {
  console.log(process.env.ACCESS_SECRET);
  return sign({ userId: user.id }, process.env.ACCESS_SECRET, {
    expiresIn: "30m",
  });
};

export const createRefreshToken = (user: User) => {
  return sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });
};
