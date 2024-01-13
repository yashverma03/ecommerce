import { DataTypes } from 'sequelize';
import type { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../database/database.ts';

export interface UserAttributes
  extends Model<InferAttributes<UserAttributes>, InferCreationAttributes<UserAttributes>> {
  id: CreationOptional<number>;
  name: string;
  email: string;
  password: string;
}

const User = sequelize.define<UserAttributes>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default User;
