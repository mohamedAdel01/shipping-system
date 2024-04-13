const Joi = require("joi");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  async readServiceController(req, res) {
    try {
      const services = await prisma.service.findMany();

      return res.status(200).send({
        data: services,
        message: "",
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

};
