import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./IsEmailAlreadyExist";

@InputType()
export class RegisterInput {
  @Field()
  @Length(5, 40)
  username: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email ya está en uso." })
  email: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;
}
