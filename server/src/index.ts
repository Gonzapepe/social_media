import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { User } from "./entity/User";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/PostResolver";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { verify } from "jsonwebtoken";
import { UserResolver } from "./resolvers/UserResolver";
import { createAccessToken, createRefreshToken } from "./middleware/auth";
import { sendRefreshToken } from "./helpers/sendRefreshToken";
import { Upvote } from "./entity/Upvote";
import { Post } from "./entity/Post";
import { graphqlUploadExpress } from "graphql-upload";
import bodyParser from "body-parser";
require("dotenv").config({ path: __dirname + "/.env" });

const main = async () => {
  const conn: Connection = await createConnection({
    type: "postgres",
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true, // Use synchronize: false if you're running migrations, otherwise leave it in true
    logging: true,
    port: (process.env.PORT as any) || 5432,
    migrations: [path.join(__dirname, "./migration/*")],
    entities: [User, Post, Upvote],
  });

  // await conn.runMigrations();

  const app = express();

  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;

    try {
      payload = verify(token, process.env.REFRESH_SECRET);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (!user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });
  // MINUTO 1:12:27

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),

    uploads: false,
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("Servidor corriendo en puerto 4000");
  });
};

main().catch((err) => {
  console.log(err);
});
