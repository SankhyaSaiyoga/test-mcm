'use strict';
module.exports = (sequelize, DataTypes) => {
  const mahasiswa = sequelize.define('mahasiswa', {
    name: DataTypes.STRING,
    nim: DataTypes.INTEGER
  }, {
    tableName:'mahasiswas'
  });
  mahasiswa.associate = function(models) {
    // script dibawah ini artinya kita membuat model mahasiswa ber-relasi dengan model matakuliah. status model mahasiswa disini adalah hasMany yang artinya data mahasiswa itu dimiliki oleh banyak data matakuliah dan dihubungkan melalui matakuliah.prodi_id = mahasiswa.id
    // kemudian kita juga bisa mengambil data matakuliah yang sudah ter-relasi tadi melalui column 'mahasiswas' yang kita deklarasikan dibawah ini
    mahasiswa.hasMany(models.matakuliah, {
      foreignKey: 'mahasiswa_id',
      as: 'matakuliahs'
    });
  };
  return mahasiswa;
};