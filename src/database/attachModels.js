const { DataTypes } = require("sequelize");

const attachModels = (sequelize) => {
  const models = {
    Agent: require("../models/agent")(sequelize, DataTypes),
    Issue: require("../models/issue")(sequelize, DataTypes),
  };

  Object.keys(models).forEach((modelName) => {
    if ("associate" in models[modelName]) {
      models[modelName].associate(models);
    }
  });

  return models;
};

module.exports = attachModels;
