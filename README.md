# Panduan Menjalankan Program

* [Create Database]
* [Install Dependencies]
* [Migrate Database]
* [Update scripts pada package.json]
* [Jalankan Nodemon]
* [Menambah Headers untuk JSON web Token]

## Create Database

Jalankan server apache dan Mysql. Lalu create database pada Phpmyadmin.

#### Contoh

```
kampus_db
```

## Install Dependencies

Install Dependencies seperti sequelize express mysql2 jawt sequelize dan lainnya.



#### Contoh

```
npm install
```

```
npm install — save mysql2 sequelize cors sequelize-cli jawt
```

```
npm install nodemon — save-dev
```

## Migrate Database

Jangan lupa untuk melakukan migrate pada database.


```
npx sequelize db:migrate
```


## Update scripts pada package.json

Update scripts start pada package.json.

```
"start": "node ./bin/www"
```



## Jalankan Nodemon

Jalankan nodemon untuk menjalankan server.


```
nodemon
```


### Menambah Headers untuk JSON web TOken

Untuk secure sebuah API dengan token dengan menggunakan JWT.
Silahkan tambahkan "content-type" : "application/json" dan "bearer" : yang berisikan token setalah kita mengakses "localhost:4000/api/matakuliah/login".


#### Contoh hasil token

```
{
    "user": {
        "id": 1,
        "username": "Sankhya",
        "email": "email@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYW5raHlhIiwiZW1haWwiOiJlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE2NzExOTkyMjEsImV4cCI6MTY3MTIwMTAyMX0.t8PnW4RIeYZ5GlwYUrzhpb6JqV-qTqAQJW658nHvEZ8"
}
```
Setelah berhasil menginputkan token key pada Headers Bearer maka 
akan berhasil untuk create data matakuliah.


# test-mcm
