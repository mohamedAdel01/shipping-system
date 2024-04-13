# Shipping System

## Description

This is a simple backend Restful API app to demo a shipping system.

### Features

- Authentication APIs (register, login)
- CRUD functions for creating shipments

---

## Technology

- Node.js
- Express.js
- Prisma ORM

---

## Application Setup Steps

1. Install Node.js, preferably version 18 or above. You can download it from [here](https://nodejs.org/en).

2. Install a local web server like XAMPP. You can download XAMPP from [here](https://www.apachefriends.org/).

3. Start your local server. Refer to the XAMPP documentation for detailed instructions.

4. Install npm packages by running the following command in the project directory: `npm install`

Note: Node.js version 18 or above is required.

5. Add your database URL and port number in the environment file. You can obtain this information from phpMyAdmin.

6. Run the migration script using the following command: `npm run prisma --migration=${your_migration_name}`

7. Run the seeder to populate the database with primary data: `npx prisma db seed`

8. Test your endpoints using the provided Postman collection file.

---

## Usage

1. Start the server by running the following command: `npm run start`

2. Access the API endpoints using a tool like Postman.

