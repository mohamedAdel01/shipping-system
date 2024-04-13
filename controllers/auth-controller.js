const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const secretKey = "abo-yassin";

module.exports = {
  async registerController(req, res) {
    try {
      const schema = Joi.object({
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        password: Joi.string()
          .required()
          .min(8)
          .max(30)
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/),
      });

      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details);

      const userCheck = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (userCheck)
        return res.status(400).send({ msg: "User is already exist" });

      req.body.password = await bcrypt.hash(req.body.password, 10);

      const user = await prisma.user.create({
        data: { ...req.body, role_id: 2 },
      });

      const token = await jwt.sign({ user }, secretKey, {
        expiresIn: "1y",
      });

      delete user.password;

      return res.status(200).send({
        data: {
          user,
          token,
        },
        message: "",
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async loginController(req, res) {
    try {
      const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string()
          .required()
          .min(8)
          .max(30)
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/),
      });

      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details);

      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (!user)
        return res.status(403).send({
          msg: "There is no user with this email",
        });

      const passwordCheck = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!passwordCheck)
        return res.status(403).send({
          msg: "Incorrect password",
        });

      const token = await jwt.sign({ user }, secretKey, {
        expiresIn: "1y",
      });

      delete user.password;

      return res.status(200).send({
        data: {
          user,
          token,
        },
        message: "",
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async isAutherized(req, res, next) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token)
        return res.status(401).send({ error: "The request is not autherized" });

      jwt.verify(token, secretKey, (error) => {
        if (error) return res.status(401).send({ error });
        else next();
      });
    } catch (error) {
      res.status(401).send({ error });
    }
  },

  async isAdmin(req, res, next) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      jwt.verify(token, secretKey, (error, decoded) => {
        if (decoded.user.role_id == 2)
          return res
            .status(401)
            .send({ error: "Your aren't allowed to do that" });
        else next();
      });
    } catch (error) {
      res.status(401).send({ error });
    }
  },
};
