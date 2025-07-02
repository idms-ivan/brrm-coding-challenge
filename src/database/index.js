const { Sequelize, DataTypes } = require("sequelize");
const _ = require("lodash");

const config = require("../config/databaseConfig");
const attachModels = require("./attachModels");

const models = {};

const sequelize = new Sequelize(
  config.databaseName,
  config.databaseUserName,
  config.databasePassword,
  {
    host: config.databaseHost,
    dialect: "postgres",
    define: {
      freezeTableName: true,
      underscored: true,
    },
  }
);

let connectionEstablished = false;

const establishDatabaseConnection = async () => {
  if (connectionEstablished) {
    console.log("Database connection already established");
    return;
  }
  try {
    const checkDbConnection = new Sequelize(
      'postgres',
      config.databaseUserName,
      config.databasePassword,
      {
        host: config.databaseHost,
        dialect: "postgres",
      }
    );

    await checkDbConnection.authenticate();
    console.log("Connected to PostgreSQL successfully.");

    const [results, metadata] = await checkDbConnection.query(`
      SELECT 1 FROM pg_database WHERE datname = '${config.databaseName}'
    `);

    if (results.length === 0) {
      console.log(`Database "${config.databaseName}" does not exist. Creating now...`);
      await checkDbConnection.query(`CREATE DATABASE ${config.databaseName}`);
      console.log(`Database "${config.databaseName}" created successfully.`);
    } else {
      console.log(`Database "${config.databaseName}" already exists.`);
    }

    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    connectionEstablished = true;

    const _models = attachModels(sequelize);
    _.assign(models, _models);

    await sequelize.sync({ alter: true });
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = {
  establishDatabaseConnection,
  models,
  sequelize,
};
