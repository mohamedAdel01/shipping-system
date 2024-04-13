const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/v1/", require("./routes/v1"));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Application running at PORT ${process.env.PORT}`);
});
