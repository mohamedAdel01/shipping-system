const Joi = require("joi");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const secretKey = "abo-yassin";

module.exports = {
  async readAddressController(req, res) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      const { user } = jwt.verify(token, secretKey);

      const addresses = await prisma.address.findMany({
        where: { user_id: Number(user.id) },
        take: Number(req.query.limit),
        skip: Number((req.query.page - 1) * req.query.limit),
      });

      return res.status(200).send({
        data: addresses,
        pagination: req.query,
        message: "",
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async createAddressController(req, res) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      const { user } = jwt.verify(token, secretKey);

      const schema = Joi.object({
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        country: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        mobile: Joi.string().required().min(11),
      });

      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details);

      const address = await prisma.address.create({
        data: { ...req.body, user_id: user.id },
      });

      return res.status(200).send({
        data: address,
        message: "Address has been added successfully",
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async deleteAddressController(req, res) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      const { user } = jwt.verify(token, secretKey);

      await prisma.address.delete({
        where: {
          id: Number(req.params.id),
          user_id: Number(user.id),
        },
      });

      return res.status(200).send({
        message: "Address has been deleted successfully",
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
