const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")

const UserModel = require("./models/Users")
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://root:root@cluster0.lknvzlq.mongodb.net/ecommerce?retryWrites=true&w=majority")

app.get("/getUsers", (request, response) => {
    UserModel.find({}, (err, result) => {
        if (!err) {
            response.json(result)
        } else {
            response.json(err)
        }
    })
})
app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save()

    res.json(user)
})

const PORT = "8000"
app.listen(PORT, () => {
    console.log(`Server is running perfectly on port ${PORT}`)
})