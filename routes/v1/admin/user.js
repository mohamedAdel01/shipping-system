const express = require("express"),
  router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();




module.exports = router;
