import {
  Resolver,
  Mutation,
  Arg,
  Field,
  Ctx,
  ObjectType,
  Query,
  UseMiddleware,
} from "type-graphql";
import { User } from "../entity/User";
import { RegisterInput } from "../validation/RegisterInput";
import bcrypt from "bcryptjs";
import { ErrorType } from "../validation/Error";
import { getConnection, getRepository } from "typeorm";
import { MyContext } from "../types/MyContext";
import { createAccessToken, createRefreshToken } from "../middleware/auth";
import { isAuth } from "../middleware/isAuth";
import { sendRefreshToken } from "../helpers/sendRefreshToken";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import path from "path";

@ObjectType()
class UserResponse {
  @Field(() => [ErrorType], { nullable: true })
  errors?: ErrorType[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class DeleteResponse {
  @Field(() => [ErrorType], { nullable: true })
  errors?: ErrorType[];

  @Field(() => Boolean)
  deleted?: Boolean;
}

@ObjectType()
class LoginResponse {
  @Field(() => [ErrorType], { nullable: true })
  errors?: ErrorType[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field()
  accessToken?: string;
}

@ObjectType()
class ProfileResponse {
  @Field(() => [ErrorType], { nullable: true })
  errors?: ErrorType[];

  @Field(() => String)
  filename?: String;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(@Arg("data") data: RegisterInput): Promise<UserResponse> {
    const userRepository = getRepository(User);

    if (data.confirmPassword !== data.password) {
      return {
        errors: [
          {
            path: "password",
            message: "Las contraseñas no son iguales.",
          },
        ],
      };
    }
    try {
      const emailExists = await userRepository.findOne({
        where: { email: data.email },
      });

      if (emailExists) {
        return {
          errors: [
            {
              path: "email",
              message: "Este email ya está tomado.",
            },
          ],
        };
      }

      const usernameExists = await userRepository.findOne({
        where: { username: data.username },
      });

      if (usernameExists) {
        return {
          errors: [
            {
              path: "username",
              message: "Este nombre de usuario ya existe.",
            },
          ],
        };
      }

      const hashedPassword = await bcrypt.hash(data.password, 12);

      const user = userRepository.create({
        username: data.username,
        email: data.email,
        password: hashedPassword,
      });

      const result = await user.save();

      console.log(result);

      return { user: result };
    } catch (e) {
      console.log(e);
    }
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { req, payload }: MyContext) {
    console.log(payload);
    if (!payload) {
      return null;
    }
    const { userId } = payload;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    return user ? user : null;
  }

  @Query(() => [User], { nullable: true })
  async users(@Ctx() { req }: MyContext) {
    const users = await User.find();

    return users;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req, res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : {
            where: {
              username: usernameOrEmail,
            },
          }
    );

    if (!user) {
      return {
        errors: [
          {
            path: "usernameOrEmail",
            message: "Ese usuario no existe.",
          },
        ],
      };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return {
        errors: [
          {
            path: "password",
            message: "Las contraseñas no son iguales",
          },
        ],
      };
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      user,
      accessToken: createRefreshToken(user),
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {}

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    console.log(payload);
    return ` Tu id es ${payload.userId} `;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(
    @Arg("userId", () => String) userId: string
  ) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }
  // MINUTO 1:24:00 PROBAR SI FUNCIONA EL REVOQUE DE TOKENS

  @Mutation(() => DeleteResponse)
  async deleteUser(@Arg("userId", () => String) userId: string) {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return {
        errors: [
          {
            path: "delete user",
            message: "El usuario que se quiere eliminar no se encontró",
          },
        ],
        deleted: false,
      };
    }

    const result = await user.remove();
    if (result) return { deleted: true };
  }

  @Mutation(() => ProfileResponse)
  @UseMiddleware(isAuth)
  async profilePicture(
    @Ctx() { payload }: MyContext,
    @Arg("file", () => GraphQLUpload)
    file: FileUpload
  ): Promise<ProfileResponse> {
    const { createReadStream, filename } = await file;
    const date = new Date().toISOString().replace(/[-:.]/g, "");
    const fileNameUpload =
      path.parse(filename).name + date + path.parse(filename).ext;

    console.log("NOMBRE DEL ARCHIVO: ", fileNameUpload);
    if (!payload.userId) {
      return {
        errors: [
          {
            path: "profilePicture",
            message: "User id does not exists.",
          },
        ],
      };
    }
    new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../images/${fileNameUpload}`))
        .on("finish", () => resolve(true))
        .on("error", () => reject(false))
    );

    // KEY: operations VALUE: Here goes the cURL query
    // KEY: map VALUE: {'0':['variables.nombre']}
    // KEY: 0 VALUE: choose file

    return {
      errors: null,
      filename: filename,
    };
  }
}
