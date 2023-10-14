require("dotenv").config();
var { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var stringcon = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PW_DB}@cluster0.hw29l.mongodb.net/GerejaDB`;
const conn = mongoose.createConnection(stringcon);
const connect = async (e) => {
  await mongoose
    .connect(stringcon, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connect");
    })
    .catch((err) => {
      console.log("Database Failed to Connect " + err);
    });
};

const adminscheme = new Schema(
  {
    password: String,
    user: String,
  },
  { collection: "admin" }
);
var admin = mongoose.model("admin", adminscheme);

const gerejascheme = new Schema(
  {
    nama: String,
    address: String,
    paroki: String,
    lingkungan: String,
    deskripsi: String,
    lat: Number,
    lng: Number,
    banned: Number,
    gambar: String,
    createdAt: Date,
    createdBy: Date,
    updatedAt: Date,
    updatedBy: Date,
  },
  { collection: "Gereja" }
);
var gereja = mongoose.model("Gereja", gerejascheme);

const userscheme = new Schema(
  {
    email: String,
    password: String,
    picture: String,
    banned: Number,
    notifGD: Boolean,
    tanggalDaftar: Date,
    paroki: String,
    alamat: String,
    lingkungan: String,
    notelp: String,
    token: String,
    updatedAt: Date,
    nama: String,
  },
  { collection: "user" }
);
var user = mongoose.model("user", userscheme);

const imamcheme = new Schema(
  {
    email: String,
    password: String,
    idGereja: ObjectId,
    picture: String,
    statusPemberkatan: Number,
    notelp: String,
    banned: Number,
    statusPerminyakan: Number,
    statusTobat: Number,
    statusPerkawinan: Number,
    createdAt: Date,
    updatedAt: Date,
    updatedBy: Date,
    role: Number,
    nama: String,
    createdBy: Date,
  },
  { collection: "imam" }
);
var imam = mongoose.model("imam", imamcheme);

const userBaptisscheme = new Schema(
  {
    idBaptis: ObjectId,
    idUser: ObjectId,
    status: Number,
    tanggalDaftar: Date,
    updatedAt: Date,
    updatedBy: Date,
  },
  { collection: "userBaptis" }
);

var userBaptis = mongoose.model("userBaptis", userBaptisscheme);

const userKomunischeme = new Schema(
  {
    idKomuni: ObjectId,
    idUser: ObjectId,
    status: Number,
    tanggalDaftar: Date,
    updatedAt: Date,
    updatedBy: Date,
  },
  { collection: "userKomuni" }
);

var userKomuni = mongoose.model("userKomuni", userKomunischeme);

const userKrismascheme = new Schema(
  {
    idKrisma: ObjectId,
    idUser: ObjectId,
    status: Number,
    tanggalDaftar: Date,
    updatedAt: Date,
    updatedBy: Date,
  },
  { collection: "userKrisma" }
);

var userKrisma = mongoose.model("userKrisma", userKrismascheme);

const userUmumscheme = new Schema(
  {
    idKegiatan: ObjectId,
    idUser: ObjectId,
    status: Number,
    tanggalDaftar: Date,
    updatedAt: Date,
    updatedBy: Date,
  },
  { collection: "userUmum" }
);
var userUmum = mongoose.model("userUmum", userUmumscheme);

const pemberkatanscheme = new Schema(
  {
    idUser: ObjectId,
    namaLengkap: String,
    paroki: String,
    lingkungan: String,
    notelp: String,
    alamat: String,
    jenis: String,
    tanggal: Date,
    note: String,
    idGereja: ObjectId,
    idImam: ObjectId,
    status: Number,
    updatedAt: Date,
    updatedBy: Date,
    createdAt: Date,
  },
  { collection: "pemberkatan" }
);

var userPemberkatan = mongoose.model("pemberkatan", pemberkatanscheme);

const perkawinanscheme = new Schema(
  {
    idUser: ObjectId,
    namaPria: String,
    namaPerempuan: String,
    notelp: String,
    alamat: String,
    email: String,
    tanggal: Date,
    note: String,
    idGereja: ObjectId,
    idImam: ObjectId,
    status: Number,
    updatedAt: Date,
    updatedBy: Date,
    createdAt: Date,
  },
  { collection: "perkawinan" }
);

var userPerkawinan = mongoose.model("perkawinan",perkawinanscheme);

async function getAllGereja() {
  var arr = [];
  await gereja
    .find()
    .then((res) => {
      arr = res;
    })
    .catch((e) => {
      console.log(e);
    });
  return arr;
}

async function getAllUser() {
  var arr = [];
  await user
    .find()
    .then((res) => {
      arr = res;
    })
    .catch((e) => {
      console.log(e);
    });
  return arr;
}

async function getAllData() {
  var arr = [];
  await user
    .find()
    .then((res) => {
      arr.push(res);
    })
    .catch((e) => {
      console.log(e);
    });
  await gereja
    .find()
    .then((res) => {
      arr.push(res);
    })
    .catch((e) => {
      console.log(e);
    });
  await imam
    .find()
    .then((res) => {
      arr.push(res);
    })
    .catch((e) => {
      console.log(e);
    });
  await userBaptis
    .find()
    .then((res) => {
      arr.push(res);
    })
    .catch((e) => {
      console.log(e);
    });
  await userKomuni
    .find()
    .then((res) => {
      arr.push(res);
    })
    .catch((e) => {
      console.log(e);
    });
  await userKrisma
    .find()
    .then((res) => {
      arr.push(res);
    })
    .catch((e) => {
      console.log(e);
    });
  await userPerkawinan
    .find()
    .then((res) => {
      arr.push(res);
    })
    .catch((e) => {
      console.log(e);
    });
  await userUmum
    .find()
    .then((res) => {
      arr.push(res);
    })
    .catch((e) => {
      console.log(e);
    });
  await userPemberkatan
    .find()
    .then((res) => {
      arr.push(res);
    })
    .catch((e) => {
      console.log(e);
    });

  return arr;
}

async function getIdUser(id, pw) {
  var arr = [];
  console.log(id);
  await admin
    .find({
      $and: [{ user: id }, { password: pw }],
    })
    .then((res) => {
      arr = res;
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
  return arr;
}

async function getUserEmail(email) {
  var arr = [];
  await user
    .find({
      $and: [{ email: email }],
    })
    .then((res) => {
      arr = res;
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
  return arr;
}

async function getIdGereja(id) {
  var arr = [];
  console.log(id);
  await gereja
    .findById(id)
    .then((res) => {
      arr = res;
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
  return arr;
}

async function updateGereja(item) {
  await gereja.updateOne(
    { _id: item.id },
    {
      $set: {
        nama: item.nama,
        address: item.address,
        kapasitas: item.kapasitas,
        paroki: item.paroki,
        lingkungan: item.lingkungan,
      },
    },
    { upsert: true } // Make this update into an upsert
  );
}

async function updatePassword(item) {
  await user.updateOne(
    { email: item.email },
    { $set: { password: item.password } },
    { upsert: true } // Make this update into an upsert
  );
}

function addGereja(item) {
  const newData = {
    nama: item.body.nama,
    address: item.body.address,
    kapasitas: item.body.kapasitas,
    paroki: item.body.paroki,
    lingkungan: item.body.lingkungan,
  };
  var data = new gereja(newData);
  data.save();
}
function deletegereja(item) {
  gereja.findByIdAndRemove(item).exec();
}

function deleteUser(item) {
  user.findByIdAndRemove(item).exec();
}

async function bannedUser(item) {
  console.log(item.id);
  if (item.banned == 0) {
    await user
      .updateOne(
        { _id: item.id },
        { $set: { banned: "1" } },
        { upsert: true } // Make this update into an upsert
      )
      .catch((e) => {
        console.log(e);
      });
  } else {
    await user
      .updateOne(
        { _id: item.id },
        { $set: { banned: "0" } },
        { upsert: true } // Make this update into an upsert
      )
      .catch((e) => {
        console.log(e);
      });
  }
}

module.exports = {
  connect: connect,
  getIdUser: getIdUser,
  getAllGereja: getAllGereja,
  getAllUser: getAllUser,
  getIdGereja: getIdGereja,
  updateGereja: updateGereja,
  addGereja: addGereja,
  deletegereja: deletegereja,
  deleteUser: deleteUser,
  bannedUser: bannedUser,
  updatePassword: updatePassword,
  getUserEmail: getUserEmail,
  getAllData: getAllData,
};
