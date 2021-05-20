import "reflect-metadata";
import { buildSchema } from "type-graphql";
import Container from "typedi";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import Express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";

import { User } from "./entity/user.entity";
import { AppResolver } from "./resolvers/app.resolver";

const bootstrap = async () => {
  // create connection
  await createConnection({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    authSource: "admin",
    username: "root",
    password: "example",
    database: "test01",
    useUnifiedTopology: true,
    synchronize: true,
    entities: [User],
  });

  // build schema
  const schema = await buildSchema({
    resolvers: [AppResolver],
    container: Container,
  });

  const app = Express();

  const server = new ApolloServer({
    schema,
    playground: true,
  });

  server.applyMiddleware({ app });

  app.use(cookieParser());

  app.get(
    "/refresh_token",
    (req: Request, res: Response, next: NextFunction) => {
      res.send("OK");
    }
  );

  const port = 4000;
  app.listen(port, () => console.log("Server listenning at:", port));
};

bootstrap();
