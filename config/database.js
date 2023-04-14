const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to MongoDB");
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
