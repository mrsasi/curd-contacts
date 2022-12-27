const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('contacts', {
    contactId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dob: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    occupation: DataTypes.STRING,
    company: DataTypes.STRING,
    createBy: DataTypes.STRING,
    updateBy: DataTypes.STRING,
  });
};
