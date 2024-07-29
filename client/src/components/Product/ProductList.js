import React from 'react';
import Product from './Product';

const ProductList = ({ products }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <Product product={product} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">No products available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
