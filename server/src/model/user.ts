import { DataTypes } from 'sequelize';
import type { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../database/database.ts';

interface UserInterface
  extends Model<InferAttributes<UserInterface>, InferCreationAttributes<UserInterface>> {
  id: CreationOptional<number>;
  name: string;
  email: string;
  password: string;
}

const User = sequelize.define<UserInterface>('User', {
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
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default User;
