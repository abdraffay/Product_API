const jwt = require("jsonwebtoken")

// @METHOD        GET
// API            localhost:5000/

const GetProducts = (req, res) => {
    return res.render("Products")
}




// @METHOD        POST
// API            http:/localhost:5000/

async function CreateProduct(req, res) {
    try {
        const { productName, productPrice, productDescription, productCategory } = req.body;

        const NameChecker = /^(?! )[A-Za-z0-9.,!?'"-]+( [A-Za-z0-9.,!?'"-]+){0,50}(?! )$/;
        const PriceChecker = /^\$?(0|[1-9]\d{0,2}(,\d{3})*)(\.\d{1,2})?$/; // No spaces needed
        const DescriptionChecker = /^(?! )(?!.*\s{2})[A-Za-z0-9\s.,!?'"()-]{10,100}(?! )$/;
        const CategoryChecker = /^(?! )[A-Za-z&-]{1,49}( [A-Za-z&-]+)*(?! )$/;

        // Validation Checking
        const NameValidation = NameChecker.test(productName);
        const PriceValidation = PriceChecker.test(productPrice);
        const DescriptionValidation = DescriptionChecker.test(productDescription);
        const CategoryValidation = CategoryChecker.test(productCategory);

        console.log(NameValidation);
        console.log(PriceValidation);
        console.log(DescriptionValidation);
        console.log(CategoryValidation);

        // Validate product name
        if (!NameValidation) {
            return res.send("Product name must be 3-50 characters, start and end without spaces, and use only letters, numbers, punctuation, and single spaces.");
        }

        // Validate product price
        if (!PriceValidation) {
            return res.send("Product price must be a valid format with an optional '$', commas as separators, and up to two decimals.");
        }

        // Validate product description
        if (!DescriptionValidation) {
            return res.send("Description must be 10-100 characters, no leading/trailing spaces, with letters, numbers, punctuation, and single spaces.");
        }

        // Validate product category
        if (!CategoryValidation) {
            return res.send("Category must be 1-49 characters, no leading/trailing spaces, with letters, &, -, and single spaces.");
        }

        const productData = {
            productName,
            productPrice,
            productDescription,
            productCategory
        };

        console.log(productData);

        const response = await fetch("https://66d80e5037b1cadd80532ebf.mockapi.io/users/products", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(productData)
        });

        const responseData = await response.json();
        const Secret_Key = process.env.TOKEN_SECRET_KEY;

        const Token = jwt.sign({ data: responseData }, Secret_Key, { expiresIn: "1h" });

        return res.status(201).send({ Product: Token, message: "Product Added Successfully" });

    } catch (error) {
        return res.status(500).send(error.message);
    }
}


// @METHOD        POST
// API            localhost:5000/GetAllProducts

const GetAllProducts = async (req, res) => {

    const respone = await fetch("https://66d80e5037b1cadd80532ebf.mockapi.io/users/products");
    const allUsers = await respone.json();

    return res.send(allUsers)
}




module.exports = { GetProducts, CreateProduct, GetAllProducts }