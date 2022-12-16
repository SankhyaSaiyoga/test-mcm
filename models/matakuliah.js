'use strict';
module.exports = (sequelize, DataTypes) => {
  const matakuliah = sequelize.define('matakuliah', {
    matakuliah: DataTypes.STRING,
    mahasiswa_id: DataTypes.INTEGER
  }, {
    tableName: 'matakuliahs'
  });
  matakuliah.associate = function(models) {
    // script dibawah ini artinya kita membuat model matakuliah ber-relasi dengan model mahasiswa. status model matakuliah disini adalah belongsTo yang artinya data mahasiswa_id itu berasal dari model mahasiswa dan dihubungkan melalui matakuliah.mahasiswa_id = mahasiswa.id
    // kemudian kalau kita inisialisasi data mahasiswa_id tersebut dengan nama field mahasiswa
    matakuliah.belongsTo(models.mahasiswa, {
      foreignKey: 'mahasiswa_id',
      as: 'mahasiswas'
    });
  };
  return matakuliah;
};