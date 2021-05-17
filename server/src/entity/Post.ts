import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./User";
import { Upvote } from "./Upvote";
import { Comment } from "./Comment";
@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column()
  creatorId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @Field(() => [Upvote])
  @OneToMany(() => Upvote, (upvote) => upvote.post)
  upvotes: Upvote[];

  @Field()
  @Column({ type: "int", default: 0 })
  votes!: number;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Field()
  @Column({ type: "int", default: 0 })
  commentaries!: number;

  @Field(() => Int, { nullable: true })
  voteStatus: number | null;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  UpdatedAt: Date;
}
