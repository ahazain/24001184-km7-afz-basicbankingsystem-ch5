const request = require("supertest");
const app = require("../index");
//restart lagi dbnya kak dan restart id supaya passed:)
describe("kegagalan get all user", () => {
  test("daftar user kosong", async () => {
    const response = await request(app).get("/api/v1/users");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Daftar Users tidak ada" });
  });
});

describe("CRU user sukses", () => {
  test("sukses menambah 1 user sekaligus profil", async () => {
    const user = {
      name: "ahmadfarid",
      email: "test@gmail.com",
      password: "123",
      profile: {
        identify_type: "KTP",
        identify_number: "0858381928299",
        address: "jalan mawar",
      },
    };
    const response = await request(app).post("/api/v1/users").send(user);
    expect(response.body).toHaveProperty("status", 201);
    expect(response.body).toHaveProperty(
      "message",
      "Data user berhasil ditambahkan"
    );
    expect(response.body).toHaveProperty("insertData");
    expect(response.body.insertData).toHaveProperty("name", user.name);
    expect(response.body.insertData).toHaveProperty("email", user.email);
    expect(response.body.insertData).toHaveProperty("profile");
    expect(response.body.insertData.profile).toHaveProperty(
      "identify_type",
      user.profile.identify_type
    );
    expect(response.body.insertData.profile).toHaveProperty(
      "identify_number",
      user.profile.identify_number
    );
    expect(response.body.insertData.profile).toHaveProperty(
      "address",
      user.profile.address
    );
  });
  test("sukses menambah data ke 2: user sekaligus profil", async () => {
    const user = {
      name: "zain",
      email: "data2@gmail.com",
      password: "123",
      profile: {
        identify_type: "KTP",
        identify_number: "0858381928299",
        address: "jalan mawar",
      },
    };
    const response = await request(app).post("/api/v1/users").send(user);
    expect(response.body).toHaveProperty("status", 201);
    expect(response.body).toHaveProperty(
      "message",
      "Data user berhasil ditambahkan"
    );
    expect(response.body).toHaveProperty("insertData");
    expect(response.body.insertData).toHaveProperty("name", user.name);
    expect(response.body.insertData).toHaveProperty("email", user.email);
    expect(response.body.insertData).toHaveProperty("profile");
    expect(response.body.insertData.profile).toHaveProperty(
      "identify_type",
      user.profile.identify_type
    );
    expect(response.body.insertData.profile).toHaveProperty(
      "identify_number",
      user.profile.identify_number
    );
    expect(response.body.insertData.profile).toHaveProperty(
      "address",
      user.profile.address
    );
  });
  test("sukses menambah data ke 3: user sekaligus profil", async () => {
    const user = {
      name: "rehan",
      email: "data3@gmail.com",
      password: "123",
      profile: {
        identify_type: "KTP",
        identify_number: "0858381928299",
        address: "jalan mawar",
      },
    };
    const response = await request(app).post("/api/v1/users").send(user);
    expect(response.body).toHaveProperty("status", 201);
    expect(response.body).toHaveProperty(
      "message",
      "Data user berhasil ditambahkan"
    );
    expect(response.body).toHaveProperty("insertData");
    expect(response.body.insertData).toHaveProperty("name", user.name);
    expect(response.body.insertData).toHaveProperty("email", user.email);
    expect(response.body.insertData).toHaveProperty("profile");
    expect(response.body.insertData.profile).toHaveProperty(
      "identify_type",
      user.profile.identify_type
    );
    expect(response.body.insertData.profile).toHaveProperty(
      "identify_number",
      user.profile.identify_number
    );
    expect(response.body.insertData.profile).toHaveProperty(
      "address",
      user.profile.address
    );
  });
  //==
  test("sukses get all user", async () => {
    const respons = await request(app).get("/api/v1/users");
    expect(respons.status).toBe(200);
    expect(respons.body).toHaveProperty("data");
    expect(respons.body).toHaveProperty(
      "message",
      "Berhasil menampilkan daftar user"
    );
  });
  //==
  test("sukses get detail user", async () => {
    const respons = await request(app).get("/api/v1/users/1");
    expect(respons.status).toBe(200);
    expect(respons.body).toHaveProperty("data");
    expect(respons.body).toHaveProperty(
      "message",
      "berhasil menampilkan detail user"
    );
  });
  //==
  test("sukses update user dan profil", async () => {
    const userEdit = {
      name: "ahmadfarid",
      email: "testEdit@gmail.com",
      password: "123",
      profile: {
        identify_type: "KTP",
        identify_number: "0858381928299",
        address: "jalan mawar",
      },
    };

    const response = await request(app).put("/api/v1/users/1").send(userEdit);
    expect(response.body).toHaveProperty("status", 200);
    expect(response.body).toHaveProperty(
      "message",
      "Data user berhasil diupdate"
    );
  });
});

describe("kegagalan get by id user", () => {
  test("gagal get detail users", async () => {
    const response = await request(app).get("/api/v1/users/100");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Data Detail User tidak ada" });
  });
});

describe("kemungkinan kegagalan create user", () => {
  test("seluruh field kosong", async () => {
    const user = {
      name: "",
      email: "",
      password: "",
      profile: {
        identify_type: "",
        identify_number: "",
        address: "",
      },
    };
    const response = await request(app).post("/api/v1/users").send(user);

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: "mohon lengkapi data yang ada",
    });
  });
  //==
  test("beberapa field kosong", async () => {
    const user = {
      name: "nama",
      email: "",
      password: "",
      profile: {
        identify_type: "KTP",
        identify_number: "",
        address: "",
      },
    };
    const response = await request(app).post("/api/v1/users").send(user);

    expect(response.status).toBe(400);

    const expectedMissingFields = [];
    if (!user.name) expectedMissingFields.push("name");
    if (!user.email) expectedMissingFields.push("email");
    if (!user.password) expectedMissingFields.push("password");
    if (!user.profile) {
      missingFields.push("profile");
    } else {
      if (!user.profile.identify_type)
        expectedMissingFields.push("tipe identitas profil");
      if (!user.profile.identify_number)
        expectedMissingFields.push("nomor identitas profil");
      if (!user.profile.address) expectedMissingFields.push("alamat profil");
    }
    const expectedMessage = `Data yang diperlukan tidak lengkap: ${expectedMissingFields.join(
      ", "
    )}`;
    expect(response.body).toEqual({
      message: expectedMessage,
    });
  });

  test("email sudah ada di db", async () => {
    const user = {
      name: "ahmadfarid",
      email: "testEdit@gmail.com",
      password: "123",
      profile: {
        identify_type: "KTP",
        identify_number: "0858381928299",
        address: "jalan mawar",
      },
    };
    const respons = await request(app).post("/api/v1/users").send(user);
    expect(respons.status).toBe(400);
    expect(respons.body).toEqual({ message: "Email sudah terdaftar" });
  });
});

describe("beberapa kegagalan dalam melakukan update users", () => {
  test("email sudah ada di db", async () => {
    const user = {
      name: "ahmadfarid",
      email: "testEdit@gmail.com",
      password: "123",
      profile: {
        identify_type: "KTP",
        identify_number: "0858381928299",
        address: "jalan mawar",
      },
    };
    const response = await request(app).put("/api/v1/users/1").send(user);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Email sudah terdaftar" });
  });
  //==
  test("data tidak ada di db", async () => {
    const user = {
      name: "ahmadfarid",
      email: "test@gmail.com",
      password: "123",
      profile: {
        identify_type: "KTP",
        identify_number: "0858381928299",
        address: "jalan mawar",
      },
    };
    const respons = await request(app).put("/api/v1/users/100").send(user);
    expect(respons.status).toBe(404);
    expect(respons.body).toEqual({
      message: "Data pengguna tidak ada untuk diupdate",
    });
  });
  test("beberap field kosong", async () => {
    const user = {
      name: "ahmadfarid",
      email: "",
      password: "123",
      profile: {
        identify_type: "KTP",
        identify_number: "",
        address: "jalan mawar",
      },
    };
    const response = await request(app).put("/api/v1/users/1").send(user);
    expect(response.status).toBe(404);

    const expectedMissingFields = [];
    if (!user.name) expectedMissingFields.push("name");
    if (!user.email) expectedMissingFields.push("email");
    if (!user.password) expectedMissingFields.push("password");
    if (!user.profile) {
      missingFields.push("profile");
    } else {
      if (!user.profile.identify_type)
        expectedMissingFields.push("tipe identitas profil");
      if (!user.profile.identify_number)
        expectedMissingFields.push("nomor identitas profil");
      if (!user.profile.address) expectedMissingFields.push("alamat profil");
    }
    const expectedMessage = `Data yang diperlukan tidak lengkap: ${expectedMissingFields.join(
      ", "
    )}`;
    expect(response.body).toEqual({
      message: expectedMessage,
    });
  });

  describe("Delete users", () => {
    test("Data user tidak ada", async () => {
      const response = await request(app).delete("/api/v1/users/100");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Data user tidak ada" });
    });
    test("Sukses hapus user sekaligus profil", async () => {
      const response = await request(app).delete("/api/v1/users/1");
      expect(response.body).toHaveProperty("status", 200);
    });
  });
});
