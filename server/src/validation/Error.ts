import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ErrorType {
  @Field()
  path: string;

  @Field()
  message: string;
}
