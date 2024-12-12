const express = require("express");
const { Pool } = require("pg");
var cors = require("cors");
const app = express();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
});

app.use(cors());
app.use(express.json());

app.get("/get-user", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM simple");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/add-user", async (req, res) => {
  try {
    const body = req.body;
    const query = "INSERT INTO simple (username, email) VALUES ($1, $2)";
    const values = [body.username, body.email];
    const result = await pool.query(query, values);

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
