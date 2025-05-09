const express = require("express");
const usersRouter = require("./routes/users");

const app = express();

// Use the port Vercel provides or 3000 as fallback
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
