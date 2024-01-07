import { DataTypes } from 'sequelize';
import sequelize from '../database/database.ts';

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('customer', 'seller'),
      allowNull: false
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['email', 'type'],
        name: 'unique-email-type'
      }
    ]
  }
);

export default User;
