'use strict';
module.exports = (sequelize, DataTypes) => {
  const matakuliah = sequelize.define('matakuliah', {
    nama: DataTypes.STRING,
    mahasiswa_id: DataTypes.INTEGER
  }, {
    tableName: 'matakuliahs'
  });
  matakuliah.associate = function(models) {
    // script dibawah ini artinya kita membuat model mahasiswa ber-relasi dengan model prodi. status model mahasiswa disini adalah belongsTo yang artinya data prodi_id itu berasal dari model prodi dan dihubungkan melalui mahasiswa.prodi_id = prodi.id
    // kemudian kalau kita inisialisasi data prodi_id tersebut dengan nama field prodi
    matakuliah.belongsTo(models.mahasiswa, {
      foreignKey: 'mahasiswa_id',
      as: 'mahasiswas'
    });
  };
  return matakuliah;
};