const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const role = [
  {
    id: 1,
    name: "admin",
  },
  {
    id: 2,
    name: "user",
  },
];

const address = [
  {
    id: 1,
    user_id: 1,
    name: "Yassin Mohamed",
    email: "yassin@gmail.com",
    country: "Egypt",
    city: "Obour",
    street: "El-shabab",
    mobile: "01116515441",
  },
  {
    id: 2,
    user_id: 1,
    name: "Yossef Mohamed",
    email: "yossef@gmail.com",
    country: "Saudi Arabia",
    city: "Makka",
    street: "El-yasmin",
    mobile: "01116515442",
  },
  {
    id: 3,
    user_id: 1,
    name: "Selem Mohamed",
    email: "Selem@gmail.com",
    country: "Emirates",
    city: "Abo-dabi",
    street: "El-galal",
    mobile: "01116515443",
  },
];

const service = [
  {
    id: 1,
    name: "Express Shipping",
    company: "DHL",
    price: 299.5,
    days: 9,
  },
  {
    id: 2,
    name: "Premium Shipping",
    company: "Fedex",
    price: 499.5,
    days: 6,
  },
  {
    id: 3,
    name: "Super Shipping",
    company: "UPS",
    price: 799.5,
    days: 3,
  },
  {
    id: 4,
    name: "platinum Shipping",
    company: "UPS",
    price: 999.5,
    days: 1,
  },
];

const db_models = { role, address, service };

const db_seed = () => {
  Object.keys(db_models).forEach((key) => {
    db_models[key].forEach(async (model) => {
      await prisma[key].upsert({
        where: { id: model.id },
        update: {},
        create: model,
      });
      console.log(`${key} has been added successfully`);
    });
  });
};

db_seed();
