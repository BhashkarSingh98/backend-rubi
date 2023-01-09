// const express = require("express");
// const app = express();
// const cors = require("cors");
// app.use(cors());
// const mongoose=require("mongoose")
// const dotenv=require("dotenv");

// const User = require("./db/User");
// const Product = require("./db/Product");


// const jwt = require("jsonwebtoken");
// const jwtkey = "rubixe";
// dotenv.config()

// app.use(express.json());


// mongoose.connect(process.env.MONGO_URL)
// .then(()=>console.log("dbconnection seccessful!"))
// .catch((err)=>console.log(err));

// app.post("/register", async (req, res) => {
//   let user = new User(req.body);
//   let result = await user.save();
//   result = result.toObject();
//   delete result.password;

//   jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
//     if (err) {
//       res.send({ result: "something went wrong " });
//     }
//     res.send({ result, auth: token });
//   });
// });

// app.post("/login", async (req, res) => {
//   console.log(req.body);
//   if (req.body.password && req.body.email) {
//     let user = await User.findOne(req.body).select("-password");
//     if (user) {
//       jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
//         if (err) {
//           res.send({ result: "something went wrong " });
//         }
//         res.send({ user, auth: token });
//       });
//     } else {
//       res.send({ result: "no user found" });
//     }
//   } else {
//     res.send({ result: "no user found email and password" });
//   }
// });

// app.post("/addproduct", async (req, res) => {
//   let product = new Product(req.body);
//   let result = await product.save();
//   res.send(result);
// });
// app.get("/registrations", async (req, res) => {
//   let products = await Product.find();
//   if (products.length > 0) {
//     res.send(products);
//   } else {
//     res.send({ result: "no product found" });
//   }
// });

// app.delete("/product/:id", async (req, res) => {
//   let result = await Product.deleteOne({ _id: req.params.id });
//   res.send(result);
// });
// app.get("/product/:id", async (req, res) => {
//   let result = await Product.findOne({ _id: req.params.id });
//   if (result) {
//     res.send(result);
//   } else {
//     res.send({ result: "no record found" });
//   }
// });
// app.put("/product/:id", async (req, res) => {
//   let result = await Product.updateOne(
//     { _id: req.params.id },
//     {
//       $set: req.body,
//     }
//   );

//   res.send(result);
// });
// app.get("/search/:key", async (req, res) => {
//   let result = await Product.find({
//     $or: [
//       { name: { $regex: req.params.key } },
//       { email: { $regex: req.params.key } },
     
//     ],
//   });
//   res.send(result);
// });

// app.listen(5000, () => {
//   console.log("server started");
// });




const express = require("express");
const User = require("./db/User");
const Product = require("./db/Product");
require("./db/config");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwtkey = "e-comm";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;

  jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "something went wrong " });
    }
    res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "something went wrong " });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "no user found" });
    }
  } else {
    res.send({ result: "no user found email and password" });
  }
});

app.post("/addproduct", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});
app.get("/registrations", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "no product found" });
  }
});

app.delete("/product/:id", async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});
app.get("/product/:id", async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "no record found" });
  }
});
app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );

  res.send(result);
});

app.get("/search/:key", async (req, res) => {
  let result = await Product.find({
    $or: [
      { imgsrc: { $regex: req.params.key } },
      { title: { $regex: req.params.key } },
      { pagename: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

app.listen(5000, () => {
  console.log("server started");
});

