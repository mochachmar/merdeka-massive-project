import { db } from "../config/Database.js";  
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;

const Guides = db.define(
  "Guides", 
  {
    guide_id: {  
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,  
      autoIncrement: true,  
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [3, 255], 
      },
      unique: true, 
    },
    thumbnail_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: true,  
      },
    },
    short_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    long_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tips_and_tricks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pdf_file: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: true, 
      },
    },
    status: {
      type: DataTypes.ENUM("DRAFT", "PUBLISHED"), 
      allowNull: false,
      defaultValue: "DRAFT",
    },
  },
  {
    tableName: 'guides',  
    freezeTableName: true, 
    timestamps: true, 
    indexes: [
      {
        unique: true,
        fields: ['title'], 
      },
      {
        fields: ['status'], 
      },
    ],
  }
);

export default Guides;
