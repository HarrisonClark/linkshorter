module.exports = (sequelize, DataTypes) => {
  const Urls = sequelize.define("pageHits", {
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Urls;
};
