export const AUTH_PATTERNS = {
  Login: 'Auth.Login',
  Verify: 'Auth.Verify',
};

export const CART_PATTERNS = {
  GetCart: 'cart.getCart',
  AddToCart: 'cart.addToCart',
  UpdateCart: 'cart.updateCart',
  RemoveItem: 'cart.removeItem',
  ClearCart: 'cart.clearCart',
};

export const ORDER_PATTERNS = {
  FindAll: 'Orders.FindAll',
  FindOne: 'Orders.FindOne',
  FindByEmail: 'Orders.FindByEmail',
  Create: 'Orders.Create',
  Update: 'Orders.Update',
  Remove: 'Orders.Remove',
};

export const PRODUCT_PATTERNS = {
  FindAll: 'Products.FindAll',
  FindBySeller: 'Products.FindBySeller',
  FindOne: 'Products.FindOne',
  Create: 'Products.Create',
  DecreaseStock: 'Products.DecreaseStock',
  Update: 'Products.Update',
  Remove: 'Products.Remove',
};

export const SHIPPING_PATTERNS = {
  ORDER_SHIPPING_CREATED: 'Order.Shipping.Created'
};

export const STOCK_PATTERNS = {
  ORDER_STOCK_CREATED: 'Order.Stock.Created',
  STOCK_WARNING: 'Stock.Warning',
  STOCK_ERROR: 'Stock.Error'
};

export const USER_PATTERNS = {
  FindAll: 'Users.FindAll',
  FindOne: 'Users.FindOne',
  FindByEmail: 'Users.FindByEmail',
  Create: 'Users.Create',
  Update: 'Users.Update',
  Remove: 'Users.Remove',
};

export const ORDER_KAFKA_EVENTS = {
  ORDER_CREATED: 'Order.Created',
}
