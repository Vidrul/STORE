const express = require("express");
const config = require("config");
const chalk = require("chalk");
const mongoose = require("mongoose");
const initDatabase = require("./startUp/initDatabase");
const routes = require("./routes");
var cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

const PORT = 8080;

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")));
  const indexPath = path.join(__dirname, "client", "index.html");

  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
} else {
  console.log("Development");
}

async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDatabase();
    });

    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.green(`Mongo db connected.`));

    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}`));
    });
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}

start();
