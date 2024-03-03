import { DataTypes } from 'sequelize';
import type { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database.ts';

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  userId: CreationOptional<number>;
  name: string;
  email: string;
  password: string;
}

const User = sequelize.define<UserModel>('user', {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      isInt: true
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

export default User;
