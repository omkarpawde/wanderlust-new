require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
  console.log("Connection successful");
  await initDB();
  mongoose.connection.close();
}

main().catch((err) => {
  console.log(err);
});

const initDB = async () => {
  await Listing.deleteMany({});

  const userId = new mongoose.Types.ObjectId("6a3013a472b91298df8679d6");

  const listings = initData.data.map((obj) => ({
    ...obj,
    owner: userId,
  }));

  await Listing.insertMany(listings);

  console.log("Database initialized successfully!");
};
