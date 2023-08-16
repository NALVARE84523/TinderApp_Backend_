import express from "express";
import helmet from "helmet";
import userRoutes from "./src/routes/user.routes.js";
import companyRoutes from "./src/routes/company.routes.js";
import servicesRoutes from "./src/routes/services.routes.js";
import { sequelize } from "./src/database/connection.js";

async function main() {
  try {
    await sequelize.sync({ force: false });
    await sequelize.authenticate();
    console.log("Conexión exitosa");
  } catch (error) {
    console.log("Conexión fallida, error -> " + error);
  }
  const app = express();
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.disable("x-powered-by");
  app.use(userRoutes);
  app.use(companyRoutes);
  app.use(servicesRoutes);

  app.listen(3002, () => {
    console.log(`
            Server running on port 3002
            `);
  });
}

main();
