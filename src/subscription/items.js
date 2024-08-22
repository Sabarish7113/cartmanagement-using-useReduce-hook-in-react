import React, { useReducer } from 'react';
import './items.css';

const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex >= 0) {
        const updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
        return { ...state, cart: updatedCart };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };

    case 'UPDATE_QUANTITY':
      const updatedCart = state.cart.map(item =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      return { ...state, cart: updatedCart };

    case 'REMOVE_ITEM':
      const filteredCart = state.cart.filter(item => item.id !== action.payload.id);
      return { ...state, cart: filteredCart };

    default:
      return state;
  }
};
const ShoppingCart = () => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
  
    const sampleItems = [
      { id: 1, name: 'Apple', price: 1, image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { id: 2, name: 'Banana', price: 0.5, image: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { id: 3, name: 'Carrot', price: 0.75, image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { id: 4, name: 'Tomato', price: 1.2, image: 'https://images.pexels.com/photos/257794/pexels-photo-257794.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { id: 5, name: 'Broccoli', price: 1.5, image: 'https://images.pexels.com/photos/161514/brocoli-vegetables-salad-green-161514.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ];
  
    const addItemToCart = (item) => {
      dispatch({ type: 'ADD_ITEM', payload: item });
    };
  
    const updateItemQuantity = (id, quantity) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };
  
    const removeItemFromCart = (id) => {
      dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    };
  
    return (
      <div className="shopping-cart">
        <h2>Shopping Cart</h2>
        <ul>
          {state.cart.map(item => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} />
              {item.name} - ${item.price} x {item.quantity}
              <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
              <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
  
        <h3>Add Items</h3>
        <div className="add-items">
          {sampleItems.map(item => (
            <button key={item.id} onClick={() => addItemToCart(item)}>
              <img src={item.image} alt={item.name} />
              Add {item.name} (${item.price})
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  

export default ShoppingCart;
