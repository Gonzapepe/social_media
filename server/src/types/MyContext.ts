import { Request, Response } from "express";
import { createUpvoteLoader } from "../utils/createUpvoteLoader";

export interface MyContext {
  req: Request;
  res: Response;
  payload?: { userId: string };
  upvoteLoader: ReturnType<typeof createUpvoteLoader>;
}
