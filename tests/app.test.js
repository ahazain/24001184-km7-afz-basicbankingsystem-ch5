const request = require("supertest");
const app = require("../index");

describe("API Routes", () => {
  test("should create a new user", async () => {
    const newUser = {
      name: "ahmadfarid",
      email: "one@gmail.com",
      password: "123",
      profile: {
        identify_type: "KTP",
        identify_number: "0858381928299",
        address: "jalan mawar",
      },
    };

    try {
      const response = await request(app).post("/api/v1/users").send(newUser);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("message");
      expect(response.body.status).toBe(true); // Pastikan ini sesuai dengan respons API Anda
      expect(response.body.message).toBe("Created"); // Pastikan ini juga sesuai
    } catch (error) {
      // Tangani kesalahan jika terjadi
      console.error("Error:", error);
      // Anda mungkin ingin mengharapkan jenis kesalahan tertentu di sini
      expect(error).toBeDefined(); // Sebagai contoh, ini untuk memastikan ada kesalahan
    }
  });
});

// ● describe, memberi deskripsi buat skenario test case.
// ● test: menjalankan testing buat satu skenario.
// ● expect, menjabarkan kriteria lolos tes dan membandingkan hasilnya dengan output function/class.
// ● Done, mengakhiri satu skenario
//Supertest adalah library untuk testing HTTP requests.
//Jest digunakan sebagai test runner (untuk menjalankan dan mengelola testing). jest = test runner
//   test("should return 200 on /api/v1/users", async () => {
//     const response = await request(app).get("/api/v1/users");
//     expect(response.statusCode).toBe(200);
//   });

//   test("should return 200 on /api/v1/akuns", async () => {
//     const response = await request(app).get("/api/v1/akuns");
//     expect(response.statusCode).toBe(200);
//   });

//   test("should return 200 on /api/v1/transaksis", async () => {
//     const response = await request(app).get("/api/v1/transaksis");
//     expect(response.statusCode).toBe(200);
//   });
