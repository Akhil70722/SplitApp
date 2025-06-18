const mongoose = require('mongoose');

const connectDB = async () => {
  const dbURI = process.env.MONGO_URI;

  if (!dbURI) {
    console.error("❌ MONGO_URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    console.log("🌍 Connecting to MongoDB...");
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true, // For dev purposes; disable in prod for performance
      serverSelectionTimeoutMS: 10000, // Timeout after 10s instead of default 30s
      socketTimeoutMS: 45000,          // Close sockets after 45 seconds of inactivity
    });

    const dbHost = mongoose.connection.host;
    console.log(`✅ MongoDB Connected to ${dbHost}`);
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
