import { DataTypes } from 'sequelize';
import type { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database.ts';
import Cart from './cart.ts';

interface CartItemModel
  extends Model<InferAttributes<CartItemModel>, InferCreationAttributes<CartItemModel>> {
  cartItemId: CreationOptional<number>;
  cartId: number;
  productId: number;
  quantity: number;
  price: number;
}

const CartItem = sequelize.define<CartItemModel>('cart_item', {
  cartItemId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cart,
      key: 'cartId'
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

export default CartItem;
