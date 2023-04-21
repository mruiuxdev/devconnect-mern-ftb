const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

const app = express();

dotenv.config({ path: "./config/.env" });

connectDB();

app
	.use(express.json({ extended: false }))
	.use("/api", require("./routes/users"))
	.use("/api", require("./routes/auth"))
	.use("/api", require("./routes/profile"))
	.use("/api", require("./routes/posts"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
