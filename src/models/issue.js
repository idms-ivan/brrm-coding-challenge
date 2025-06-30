const { issueStatus } = require("../constants/issueStatus");

module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define("issue", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: issueStatus.OPEN,
    },
  });

  Issue.associate = (models) => {
    Issue.belongsTo(models.Agent);
  };

  return Issue;
};
