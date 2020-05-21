module.exports = (sequelize, DataTypes) => {
  const Urls = sequelize.define("urls", {
    longURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pageHits: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  });

  return Urls;
};
