const express = require("express");


const app = express();

const dotenv = require("dotenv").config();

app.use(express.json());

app.set("view engine", "ejs");

const { GetProducts, CreateProduct, GetAllProducts, LoginUsers } = require("./Controllers/ProductsController");

app.route("/").post(CreateProduct).get(GetProducts);

app.route("/GetAllProducts").get(GetAllProducts);



app.listen(process.env.PORT, function () {
    console.log(`App is running on port${process.env.PORT}`)
})