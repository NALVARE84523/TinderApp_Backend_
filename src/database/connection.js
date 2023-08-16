import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    "tinder",
    "postgres",
    "Master;",
    {
        host: '127.0.0.1',
        port: 5432,
        dialect: "postgres" 
    }
);
