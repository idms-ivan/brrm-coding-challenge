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
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    connectionEstablished = true;
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }

  const _models = attachModels(sequelize);
  _.assign(models, _models);

  await sequelize.sync({
    alter: true,
  });
};

module.exports = {
  establishDatabaseConnection,
  models,
  sequelize,
};
