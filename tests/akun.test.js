const app = require("../index");
const request = require("supertest");

describe("kegagalan get all akun", () => {
  test("daftar akun kosong", async () => {
    const response = await request(app).get("/api/v1/accounts");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Daftar akun tidak ada" });
  });

  describe("CRU akun sukses", () => {
    test("sukses menambah 1 akun ", async () => {
      const akun = {
        bank_name: "BNI",
        bank_account_number: "93758209485738",
        balance: 1000,
        userId: 2,
      };
      const response = await request(app).post("/api/v1/accounts").send(akun);
      expect(response.body).toHaveProperty("status", 201);
      expect(response.body).toHaveProperty("message", "berhasil membuat akun");
      expect(response.body).toHaveProperty("insertData");
      expect(response.body.insertData).toHaveProperty(
        "bank_name",
        akun.bank_name
      );
      expect(response.body.insertData).toHaveProperty(
        "bank_account_number",
        akun.bank_account_number
      );
      expect(response.body.insertData).toHaveProperty("balance", akun.balance);
      expect(response.body.insertData).toHaveProperty("userId", akun.userId);
    });

    test("sukses menambah akun ke 2", async () => {
      const akun = {
        bank_name: "BRI",
        bank_account_number: "6482074729",
        balance: 1000,
        userId: 2,
      };
      const response = await request(app).post("/api/v1/accounts").send(akun);
      expect(response.body).toHaveProperty("status", 201);
      expect(response.body).toHaveProperty("message", "berhasil membuat akun");
      expect(response.body).toHaveProperty("insertData");
      expect(response.body.insertData).toHaveProperty(
        "bank_name",
        akun.bank_name
      );
      expect(response.body.insertData).toHaveProperty(
        "bank_account_number",
        akun.bank_account_number
      );
      expect(response.body.insertData).toHaveProperty("balance", akun.balance);
      expect(response.body.insertData).toHaveProperty("userId", akun.userId);
    });
    test("sukses menambah akun ke 3", async () => {
      const akun = {
        bank_name: "JATIM",
        bank_account_number: "6482074729",
        balance: 1000,
        userId: 3,
      };
      const response = await request(app).post("/api/v1/accounts").send(akun);
      expect(response.body).toHaveProperty("status", 201);
      expect(response.body).toHaveProperty("message", "berhasil membuat akun");
      expect(response.body).toHaveProperty("insertData");
      expect(response.body.insertData).toHaveProperty(
        "bank_name",
        akun.bank_name
      );
      expect(response.body.insertData).toHaveProperty(
        "bank_account_number",
        akun.bank_account_number
      );
      expect(response.body.insertData).toHaveProperty("balance", akun.balance);
      expect(response.body.insertData).toHaveProperty("userId", akun.userId);
    });

    //==
    test("sukses get all akun", async () => {
      const respons = await request(app).get("/api/v1/accounts");
      expect(respons.status).toBe(200);
      expect(respons.body).toHaveProperty("data");
      expect(respons.body).toHaveProperty(
        "message",
        "berhasil menampilkan daftar akun"
      );
    });
    //==
    test("sukses get detail akun", async () => {
      const respons = await request(app).get("/api/v1/accounts/1");
      expect(respons.status).toBe(200);
      expect(respons.body).toHaveProperty("data");
      expect(respons.body).toHaveProperty(
        "message",
        "berhasil menampilkan detail akun"
      );
    });
    //==
    test("sukses update akun", async () => {
      const akun = {
        bank_name: "BRI",
        bank_account_number: "12345678",
        balance: 1000,
        userId: 1,
      };

      const response = await request(app).put("/api/v1/accounts/1").send(akun);
      expect(response.body).toHaveProperty("status", 200);
      expect(response.body).toHaveProperty("message", "berhasil update akun");
    });
  });

  describe("kegagalan get by id akun", () => {
    test("gagal get detail akun", async () => {
      const response = await request(app).get("/api/v1/accounts/100");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Detail akun tidak ada" });
    });
  });

  describe("kemungkinan kegagalan create akun", () => {
    test("seluruh field kosong", async () => {
      const akun = {
        bank_name: "",
        bank_account_number: "",
        balance: "",
        userId: "",
      };
      const response = await request(app).post("/api/v1/accounts").send(akun);

      expect(response.status).toBe(400);

      expect(response.body).toEqual({
        message: "mohon lengkapi data yang ada",
      });
    });
    //==
    test("beberapa field kosong", async () => {
      const akun = {
        bank_name: "BNI",
        bank_account_number: "454545",
        balance: "",
        userId: "",
      };
      const response = await request(app).post("/api/v1/accounts").send(akun);

      expect(response.status).toBe(400);

      const fields = [];
      if (!akun.bank_name) fields.push("bank_name");
      if (!akun.bank_account_number) fields.push("bank_account_number");
      if (!akun.balance) fields.push("balance"); // Memeriksa null atau undefined
      if (!akun.userId) fields.push("userId");

      const fieldke = `lengkapi data yang kosong : ${fields.join(", ")}`;

      expect(response.body).toEqual({
        message: fieldke,
      });
    });
  });

  describe("beberapa kegagalan dalam melakukan update akun", () => {
    test("data tidak ada di db", async () => {
      const akun = {
        bank_name: "BNI",
        bank_account_number: "12345678",
        balance: 1000,
        userId: 1,
      };
      const respons = await request(app).put("/api/v1/accounts/100").send(akun);
      expect(respons.status).toBe(404);
      expect(respons.body).toEqual({
        message: "Data akun tidak ada untuk diupdate",
      });
    });
    test("beberap field kosong", async () => {
      const akun = {
        bank_name: "BNI",
        bank_account_number: "",
        balance: "",
        userId: "",
      };
      const response = await request(app).put("/api/v1/accounts/1").send(akun);
      expect(response.status).toBe(400);

      const fields = [];
      if (!akun.bank_name) fields.push("nama bank");
      if (!akun.bank_account_number) fields.push("nomor rekening");
      if (!akun.balance) fields.push("saldo");
      if (!akun.userId) fields.push("id user");

      const fieldke = `lengkapi data yang kosong : ${fields.join(", ")}`;

      expect(response.body).toEqual({
        message: fieldke,
      });
    });

    describe("Delete akun", () => {
      test("Data akun tidak ada", async () => {
        const response = await request(app).delete("/api/v1/accounts/100");
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "Data Akun tidak ada" });
      });
      test("Sukses hapus akun", async () => {
        const response = await request(app).delete("/api/v1/accounts/1");
        expect(response.body).toHaveProperty("status", 200);
      });
    });
  });
});
