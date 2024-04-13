const Joi = require("joi");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const secretKey = "abo-yassin";

module.exports = {
  async readShipmentController(req, res) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      const { user } = jwt.verify(token, secretKey);

      const shipments = await prisma.shipment.findMany({
        where: user.role_id === 2 ? { user_id: Number(user.id) } : {},
        take: Number(req.query.limit),
        skip: Number((req.query.page - 1) * req.query.limit),
      });

      return res.status(200).send({
        data: shipments,
        pagination: req.query,
        message: "",
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async createShipmentController(req, res) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      const { user } = jwt.verify(token, secretKey);

      const addressSchema = Joi.object({
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        country: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        mobile: Joi.string().required().min(11),
      });

      const packageSchema = Joi.object({
        weight: Joi.number().greater(1).required(),
        width: Joi.number().greater(1).required(),
        length: Joi.number().greater(1).required(),
        height: Joi.number().greater(1).required(),
      });

      const schema = Joi.object({
        user_id: user.role_id === 1 ? Joi.number().required() : "",
        origin: addressSchema,
        destination: addressSchema,
        service: Joi.number().required(),
        packages: Joi.array().items(packageSchema),
      });

      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details);

      const user_id = user.role_id === 1 ? req.body.user_id : user.id;

      const shipment = await prisma.shipment.create({
        data: { ...req.body, user_id },
      });

      return res.status(200).send({
        data: shipment,
        message: "Shipment has been added successfully",
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async deleteShipmentController(req, res) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      const { user } = jwt.verify(token, secretKey);

      await prisma.shipment.delete({
        where: {
          id: Number(req.params.id),
        },
      });

      return res.status(200).send({
        message: "Shipment has been deleted successfully",
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
