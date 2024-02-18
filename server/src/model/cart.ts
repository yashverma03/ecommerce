import { DataTypes } from 'sequelize';
import type { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database.ts';
import User from './user.ts';

interface CartModel
  extends Model<InferAttributes<CartModel>, InferCreationAttributes<CartModel>> {
  cartId: CreationOptional<number>;
  userId: number;
  productId: number;
  quantity: number;
  price: number;
}

const Cart = sequelize.define<CartModel>('cart', {
  cartId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  }
});

export default Cart;
