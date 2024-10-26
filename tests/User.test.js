const request = require("supertest");
const app = require("../index");
/*
==POST==
1. testing sukses
2. ketika data kosong semua
3. ketika salah satu data kosong
4. ketika email ada di database
==GET==
1. sukses menampilkan daftar user
2. ketika data tidak ada atau daftar user
==GETBYID==
1. sukses menampilkan detai user
2. ketika data tidak ada atau daftar user
==PUT==
1. sukses mengedit data
2. ketika data tidak ada
3. ketika input email sama
4. ketika input kosong
5. ketika salah satu kosong
==DELETE==
1. sukses menghapus data
2. data tidak ada
*/
describe("API routes user sukses", () => {
  // test("sukses membuat users dan error handling email yang sama", async () => {
  //   const newUser = {
  //     name: "ahmadfarid",
  //     email: "ayusi@gmail.com",
  //     password: "123",
  //     profile: {
  //       identify_type: "KTP",
  //       identify_number: "0858381928299",
  //       address: "jalan mawar",
  //     },
  //   };

  //   try {
  //     const response = await request(app).post("/api/v1/users").send(newUser);
  //     expect(response.status).toBe(201);
  //     expect(response.body).toHaveProperty(
  //       "message",
  //       "Data user berhasil ditambahkan"
  //     );
  //     expect(response.body).toHaveProperty("insertData");
  //   } catch (error) {
  //     console.error("Error:", error);
  //     expect(error).toBeDefined();
  //   }
  // });
  test("sukses menampilkan daftar user", async () => {
    const response = await request(app).get("/api/v1/users");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
  });
  test("gagal menampilkan daftar user ketika data tidak ada", async () => {
    const response = await request(app).get("/api/v1/users");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Data tidak ditemukan");
    expect(response.body).toHaveProperty("data", []);
  });
  test("gagal menampilkan detail user ketika data tidak ditemukan", async () => {
    const response = await request(app).get("/api/v1/users/999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Data tidak ditemukan");
    // expect(response.body).toHaveProperty("data", null);
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
