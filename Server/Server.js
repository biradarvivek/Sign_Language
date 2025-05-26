require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/words", require("./routes/words"));

app.get("/", (req, res) => {
  res.json({ message: "Sign Language Dictionary API" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
