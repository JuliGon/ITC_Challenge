const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Book = sequelize.define(
		"Book",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			author: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			description: {
				allowNull: false,
				type: DataTypes.TEXT,
			},
			genre: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			image: {
				allowNull: false,
				type: DataTypes.TEXT,
			},
			price: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			editorialId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: {
					model: "Editorials",
					key: "id",
				},
			},
		},
		{ timestamps: false }
	);

	return Book;
};
