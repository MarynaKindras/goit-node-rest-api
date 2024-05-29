import mongoose from "mongoose";
import app from "../app.js";
import * as userService from "../services/userServices.js";
import request from "supertest";

const userDto = {
  email: "che-1@gmail.com",
  password: "123456",
};

const PORT = 5050;
const { DB_TEST_HOST } = process.env;

const ENDPOINT_LOGIN = "/api/users/login";

describe("test /api/users/login", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  beforeEach(async () => {
    await userService.saveUser(userDto);
  });

  afterEach(async () => {
    await userService.removeUsers();
  });

  test("login with correct response", async () => {
    const { body, statusCode } = await request(app).post(ENDPOINT_LOGIN).send(userDto);

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("token");
    expect(body).toHaveProperty("user");
    expect(Object.keys(body.user).length).toEqual(2);
    expect(body.user).toHaveProperty("email");
    expect(body.user).toHaveProperty("subscription");
    expect(typeof body.user.email).toEqual("string");
    expect(typeof body.user.subscription).toEqual("string");
  });

  test("login with wrong credentials", async () => {
    const { body, statusCode } = await request(app)
      .post(ENDPOINT_LOGIN)
      .send({ email: "_che-1@gmail.com", password: "654321" });

    expect(statusCode).toBe(401);
    expect(body).toHaveProperty("message");
    expect(body.message).toBe("Email or password is wrong");
  });

  test("login with empty body", async () => {
    const { body, statusCode } = await request(app).post(ENDPOINT_LOGIN).send({});

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty("message");
    expect(body.message).toBe("Body must have at least one field");
  });

  test("login without credentials return status 400", async () => {
    const { statusCode } = await request(app).post(ENDPOINT_LOGIN).send({ randomField: "_" });

    expect(statusCode).toBe(400);
  });
});
