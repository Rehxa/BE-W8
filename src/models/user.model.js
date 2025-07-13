import bcrypt from "bcrypt";
export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
  });
  User.beforeCreate(async (user) => {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  // ✅ Hash password before update (optional, only if modified)
  User.beforeUpdate(async (user) => {
    if (user.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });
  return User;
};
