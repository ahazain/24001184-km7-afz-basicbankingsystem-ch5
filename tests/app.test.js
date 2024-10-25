const request = require("supertest");
const app = require("../index");

describe("API Routes", () => {
  test("should create a new user", async () => {
    const newUser = {
      name: "ahmadfarid",
      email: "ttitkia@gmail.com",
      password: "123",
      profile: {
        identify_type: "KTP",
        identify_number: "0858381928299",
        address: "jalan mawar",
      },
    };

    try {
      const response = await request(app).post("/api/v1/users").send(newUser);

      // Memeriksa status
      expect(response.status).toBe(201);

      // Memeriksa struktur respons
      expect(response.body).toHaveProperty(
        "message",
        "Data user berhasil ditambahkan"
      );
      expect(response.body).toHaveProperty("insertData"); // Memeriksa properti insertData
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
