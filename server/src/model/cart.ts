import { DataTypes } from 'sequelize';
import type { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../database/database.ts';
import User from './user.ts';

interface CartInterface
  extends Model<InferAttributes<CartInterface>, InferCreationAttributes<CartInterface>> {
  cartId: CreationOptional<number>;
  userId: number;
  productId: number;
  quantity: number;
}

const Cart = sequelize.define<CartInterface>('cart', {
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
  }
});

export default Cart;
