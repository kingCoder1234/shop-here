import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import CartContext from '../contexts/CartContext';

const Navigation = () => {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        {user && user.role === 'admin' && (
          <li><Link to="/admin">Admin</Link></li>
        )}
        <li><Link to="/cart">Cart ({cart.length})</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
