const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("🌸 New Bloom Backend is Live!");
});

// TEST API
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working perfectly ✨" });
});

// PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
