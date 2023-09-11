const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const User = sequelize.define("User", {
		username: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING
		},
	},
	{ timestamps: false }
	);

	return User;

};
