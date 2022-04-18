const express = require("express");
const app = express();
const authProductRouter = require("./routers/product");
const authUserRouter = require("./routers/user");
const mongoose = require("mongoose");
const bodyParser=require("body-parser")
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config();
app.use(express.json());
// app.use(cors({origin:"*"}));
app.use("*", cors());
// app.use(cors({origin:"http://localhost:4200/"}));
app.use('/api/product', authProductRouter);
 app.use('/api/user', authUserRouter);


mongoose.connect(process.env.DB_CONNECT,{  useNewUrlParser: true}, () => console.log('connected to db')
)

app.listen(3001, () => console.log('server running!!'));
