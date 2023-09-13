const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Editorial = sequelize.define(
		"Editorial",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			logo: {
				allowNull: false,
				type: DataTypes.TEXT,
			},
		},
		{ timestamps: false }
	);

	return Editorial;
};