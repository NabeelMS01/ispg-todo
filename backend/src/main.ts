import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(
  //   session({
  //     secret: 'secret',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { maxAge: 3600000 },
  //   }),
  // );

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
  });

  // app.use(passport.initialize());
  // app.use(passport.session());
  await app.listen(5000);
}
bootstrap();
