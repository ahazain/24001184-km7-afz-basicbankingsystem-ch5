const request = require("supertest");
const app = require("../index");

describe("POST /auth/register", () => {
  it("should return 201 for successful registration", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({
        name: "kopling1",
        email: "wawan@gmail.com",
        password: "123",
        profile: {
          identify_type: "KTP",
          identify_number: "082642902",
          address: "Jl. Contoh No. 1",
        },
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Register sukses");
  });

  it("should return 409 for already registered email", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({
        name: "kopling2",
        email: "ama2@gmail.com",
        password: "password123",
        profile: {
          identify_type: "KTP",
          identify_number: "082642902",
          address: "Jl. Contoh No. 1",
        },
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "Email sudah terdaftar");
  });

  it("should return 500 for server error", async () => {});
});

describe("POST /auth/login", () => {
  it("should return 200 and login successfully", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "wawan@gmail.com",
        password: "123",
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Login sukses");
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user).toHaveProperty("email", "wawan@gmail.com");
  });

  it("should return 401 for invalid email or password", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "invalidemail@gmail.com",
        password: "wrongpassword",
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Email or password is wrong"
    );
  });

  it("should return 500 for server error", async () => {});
});
