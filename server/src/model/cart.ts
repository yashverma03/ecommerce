import { DataTypes } from 'sequelize';
import type { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database.ts';
import User from './user.ts';

interface CartModel extends Model<InferAttributes<CartModel>, InferCreationAttributes<CartModel>> {
  cartId: CreationOptional<number>;
  userId: number;
  isActive: boolean;
}

const Cart = sequelize.define<CartModel>('cart', {
  cartId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      isInt: true
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId'
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
});

export default Cart;
