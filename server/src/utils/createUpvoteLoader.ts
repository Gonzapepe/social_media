import { Upvote } from "../entity/Upvote";
import DataLoader from "dataloader";

export const createUpvoteLoader = () =>
  new DataLoader<{ postId: string; userId: string }, Upvote | null>(
    async (keys) => {
      const upvotes = await Upvote.findByIds(keys as any);
      const upvotesIdsToUpvote: Record<string, Upvote> = {};
      upvotes.forEach((upvote) => {
        upvotesIdsToUpvote[`${upvote.userId}|${upvote.postId}`] = upvote;
      });

      return keys.map(
        (key) => upvotesIdsToUpvote[`${key.userId}|${key.postId}`]
      );
    }
  );
