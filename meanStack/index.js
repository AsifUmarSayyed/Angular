const express = require("express");
const app = express();
const authRouter = require("./routers/auth");
const mongoose = require("mongoose");
const bodyParser=require("body-parser")
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config();
app.use(bodyParser.json());
// app.use(cors({origin:"*"}));
app.use("*", cors());
// app.use(cors({origin:"http://localhost:4200/"}));
app.use('/api/product', authRouter);


mongoose.connect(process.env.DB_CONNECT,{  useNewUrlParser: true}, () => console.log('connected to db')
)

app.listen(3002, () => console.log('server running!!'));
