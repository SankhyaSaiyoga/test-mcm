// import model matakuliah dari models/index (semua file di folder models bisa kita akses melalui models/index)
const { matakuliah, Sequelize } = require('../models/index.js');
// import fungsi rs dan re agar kita tidak perlu menulis hasil response untuk tiap function di controller
const { rs, re } = require('./function/rr_function.js');

const jawt = require('jsonwebtoken')

// self ini nantinya akan kita export, kita buat berupa variable objek yang akan berisi fungsi untuk manipulasi database matakuliah
let self = {};

// fungsi untuk create new data ke tabel matakuliah, selain itu juga menambah fungsi verifikasi
// jika sudah terverivikasi user di ijinkan untuk meng-create matakuliah
self.save = verifyUser, (req, res) => {
  // new data berisi input yang didapat dari req.body
  matakuliah.create(req.body).then((data) => {
    // kalau input sukses maka akan memberi menjalankan fungsi rs
    if (data) {
      rs(res, data);
    }
    // kalau gagal atau terjadi error akan menjalankan fungsi re
    else {
      re(res, false, 400, 'create fail');
    }
  }).catch((err) => {
    re(res, err);
  });
};

// fungsi untuk meneentukan token
self.save1 = (req, res) => {
  const user = {
    id: 1,
    username: 'Sankhya',
    email: 'email@gmail.com'
  }
  // token expire dalam waktu 30 menit
  jawt.sign(user, 'rahasia', { expiresIn: '30m' }, (err, token) => {
    if (err) {
      console.log(err)
      res.sendStatus(304)
      return
    }
    const Token = token;
    res.json({
      user: user,
      token: Token
    })
  })
}

// fungsi untuk verifikasi
function verifyUser(req, res, next) {
  const bearer = req.headers.bearer;
  jawt.verify(bearer, 'rahasia', (err, data) => {
    if (err) {
      console.log(err.message)
      res.json(err)
      return
    }
    matakuliah.create(req.body).then((data) => {
      // kalau input sukses maka akan memberi menjalankan fungsi rs
      if (data) {
        rs(res, data);
      }
      // kalau gagal atau terjadi error akan menjalankan fungsi re
      else {
        re(res, false, 400, 'create fail');
      }
    })
  })
}

// fungsi untuk mengambil seluruh data dari tabel matakuliah
self.getAll = (req, res) => {
  // disini kita mengambil semua data tapi persyaratan / kondisi tertentu, kita bisa saja mengisikan kondisi nya tapi kalian bisa explore atau tanyakan di kolom komentar kalau ingin tau lebih lanjut
  // kita juga meng-include column prodi yang artinya kita memanggil relasi one to many antara matakuliah dan prodi. data prodi bisa kita akses dalam json nantinya dengan key prodi 
  matakuliah.findAll(
    {
      include: [
        'mahasiswas'
      ]
    }
  ).then((data) => {
    // kalau kita berhasil mendapatkan data / database tidak kosong maka akan menjalankan fungsi rs kalau sebaliknya maka akan menjalankan fungsi re
    if (data.length > 0) {
      rs(res, data);
    } else {
      re(res, false, 404, 'database empty');
    }
  }).catch((err) => {
    re(res, err);
  });
};

// fungsi untuk mengambil data berdasarkan id dari tabel matakuliah
self.get = (req, res) => {
  // ini merupakan salah satu penerapan pengambilan data dengan perkondisian
  // kita juga meng-include column prodi yang artinya kita memanggil relasi one to many antara matakuliah dan prodi. data prodi bisa kita akses dalam json nantinya dengan key prodi
  matakuliah.findOne({
    include: [
      'prodi'
    ],
    where: {
      id: req.params.matakuliahId
    }
  }).then((data) => {
    // kalau kita berhasil mendapatkan data maka akan menjalankan fungsi rs kalau sebaliknya maka akan menjalankan fungsi re
    if (data) {
      rs(res, data);
    } else {
      re(res, false, 404, 'id doesnt exist');
    }
  }).catch((err) => {
    re(res, err);
  });
};

// fungsi untuk mengupdate data matakuliah berdasarkan id
self.update = (req, res) => {
  matakuliah.update(req.body, {
    where: {
      id: req.params.matakuliahId
    }
  }).then((data) => {
    // kalau kita berhasil mengupdate data maka akan menjalankan fungsi rs kalau sebaliknya maka akan menjalankan fungsi re
    if (data) {
      rs(res, data);
    } else {
      re(res, false, 400, 'update fail');
    }
  }).catch((err) => {
    re(res, err);
  });
};

// fungsi untuk menghapus data matakuliah berdasarkan id
self.delete = (req, res) => {
  matakuliah.destroy({
    where: {
      id: req.params.matakuliahId
    }
  }).then((data) => {
    // kalau kita berhasil menghapus data maka akan menjalankan fungsi rs kalau sebaliknya maka akan menjalankan fungsi re
    if (data) {
      rs(res, data);
    } else {
      re(res, false, 400, 'delete fail');
    }
  }).catch((err) => {
    re(res, err);
  });
};

// disini kita export semua fungsi diatas agar kita bisa panggil di routes nantinya
module.exports = self;