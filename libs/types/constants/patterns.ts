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

export const USER_PATTERNS = {
    FindAll: 'Users.FindAll',
    FindOne: 'Users.FindOne',
    FindByEmail: 'Users.FindByEmail',
    Create: 'Users.Create',
    Update: 'Users.Update',
    Remove: 'Users.Remove',
};

export const KAFKA_PATTERNS = {
  name: 'KAFKA_PRODUCER',
  host: 'kafka',
  port: 9092,
}


export const ORDER_KAFKA_EVENTS = {
  ORDER_CREATED: 'Order.Created',
}
