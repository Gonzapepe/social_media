import {
  Query,
  Resolver,
  FieldResolver,
  InputType,
  Field,
  Mutation,
  UseMiddleware,
  Arg,
  Ctx,
  Root,
  Int,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Comment } from "../entity/Comment";
import { Post } from "../entity/Post";
import { Upvote } from "../entity/Upvote";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types/MyContext";

@InputType()
class PostInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => Int, { nullable: true })
  async voteStatus(
    @Root() post: Post,
    @Ctx() { payload, upvoteLoader }: MyContext
  ) {
    if (!payload.userId) {
      return null;
    }

    const upvote = await upvoteLoader.load({
      postId: post.id,
      userId: payload.userId,
    });

    return upvote ? upvote.value : null;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async postComment(
    @Arg("text", () => String) text: string,
    @Arg("postId", () => String) postId: string,
    @Arg("commentId", () => String, { nullable: true }) commentId: string,
    @Ctx() { payload }: MyContext
  ): Promise<Boolean> {
    if (!payload.userId) {
      return false;
    }
    const { userId } = payload;
    let commentaryNumber = text ? 1 : null;

    const comment = await Comment.findOne({
      where: { postId, creatorId: userId, id: commentId },
    });

    if (comment) {
      commentaryNumber = 0;
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          update comment
          set "text" = $1
          where "postId" = $2 and "creatorId" = $3
        `,
          [text, postId, userId]
        );

        await tm.query(
          `
          update post
          set commentaries = commentaries + $1
          where "id" = $2
        `,
          [commentaryNumber, postId]
        );
      });
    } else if (!comment) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          insert into comment ("postId", "creatorId", "text") values ($1, $2, $3)
        `,
          [postId, userId, text]
        );

        await tm.query(
          `
            update post
            set commentaries = commentaries + $1
            where "id" = $2
          `,
          [commentaryNumber, postId]
        );
      });
    }
    return true;
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { payload }: MyContext
  ): Promise<Post> {
    return Post.create({
      ...input,
      creatorId: payload.userId,
    }).save();
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg("id", () => String) id: string,
    @Arg("title") title: string,
    @Arg("text") text: string,
    @Ctx() { payload }: MyContext
  ): Promise<Post | null> {
    const { userId } = payload;
    const result = await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({ title, text })
      .where("id = :id and creatorId = :creatorId", {
        id,
        creatorId: userId,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg("postId", () => String) postId: string,
    @Arg("value", () => Int) value: number,
    @Ctx() { payload }: MyContext
  ) {
    const isUpvote = value !== -1;
    const realValue = isUpvote ? 1 : -1;
    const { userId } = payload;

    const upvote = await Upvote.findOne({ where: { postId, userId } });

    if (upvote && upvote.value !== realValue) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          update upvote
          set value = $1
          where "postId" = $2 and "userId" = $3
        `,
          [realValue, postId, userId]
        );

        await tm.query(
          `
          update post
          set votes = votes + $1
          where id = $2
        `,
          [realValue, postId]
        );
      });
    } else if (!upvote) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          insert into upvote ("userId", "postId", value) values ($1, $2, $3)
        `,
          [userId, postId, realValue]
        );

        await tm.query(
          `
          update post
          set votes = votes + $1
          where id = $2
        `,
          [realValue, postId]
        );
      });
    }

    return true;
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id", () => String) id: string): Promise<Post | undefined> {
    return Post.findOne(id);
  }
  @Query(() => [Post], { nullable: true })
  posts(): Promise<Post[] | undefined> {
    return Post.find();
  }

  @Query(() => [Comment], { nullable: true })
  async commentsFromPosts(
    @Arg("postId", () => String) postId: string
  ): Promise<Comment[] | null> {
    if (!postId) {
      return null;
    }

    const result = await Comment.find({ where: { postId } });
    return result;
  }
}
