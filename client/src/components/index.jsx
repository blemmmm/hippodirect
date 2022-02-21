import React, { useEffect, useState } from 'react';
import Pagination from './pagination';

function Index (props) {
  const { products } = props;
  const render_products = () => {
    if (products instanceof Array) {
      return products.map((item, index) => (
        <div key={`products-${index}`}
          className="flex flex-col border border-gray-300 w-[250px] h-[550px] box-content	p-4"
        >
          <img src={item.image} alt="product-image" className="h-52 w-52 object-scale-down mx-auto" />
          <h1 className="text-sm text-gray-600 my-4">{item.brand}</h1>
          <h1 className="font-bold">{item.name}</h1>
          <p className="text-xs text-gray-600 my-4">{item.description}</p>
          <h1 className="font-semibold">{`$${item.price}`}</h1>
        </div>
      ));
    }
    return null;
  };

  return (
    <div className="container mx-auto py-6">
      {products instanceof Array ? <Pagination /> : null}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
        {/* { render_products() } */}
      </div>

    </div>

  );
}

export default Index;