const request = require("supertest");
const app = require("../index");

describe("authentication api jwt", () => {
  let token;

  test("sukses register", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({
        name: "erika",
        email: "erika@gmail.com",
        password: "123",
        profile: {
          identify_type: "KTP",
          identify_number: "082642902",
          address: "Jakarta",
        },
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Register sukses");
  });
  test("401 JSON response with invalid token", async () => {
    const response = await request(app)
      .get("/auth/authentication")
      .set("Authorization", "Bearer invalid_token")
      .set("Accept", "application/json");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Tidak terautentikasi, token tidak valid"
    );
  });

  test("sukses login", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "erika@gmail.com",
        password: "123",
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Login sukses");
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    token = response.body.token;
  });

  test("authentication ke endpoint", async () => {
    const response = await request(app)
      .get("/auth/authentication")
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "text/html");

    expect(response.status).toBe(200);
    expect(response.text).toContain("Daftar User");
  });
});
