import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Post } from "./Post";
import { Upvote } from "./Upvote";
import { Comment } from "./Comment";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @Field(() => [Upvote])
  @OneToMany(() => Upvote, (upvote) => upvote.user)
  upvotes: Upvote[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @Field()
  @Column({ type: "int", default: () => 0 })
  tokenVersion: number;

  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
