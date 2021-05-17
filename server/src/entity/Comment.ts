import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./User";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column()
  creatorId!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Field()
  @PrimaryColumn()
  postId: string;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: "CASCADE",
  })
  post: Post;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  UpdatedAt: Date;
}
