import React from 'react';
import Index_Pagination from './index_pagination';

function Index (props) {
  const { all_products, found, set_all_products } = props;



  return (
    <div className="container mx-auto mb-6">
      {all_products.length > 0 ? <Index_Pagination found={found} set_all_products={set_all_products}/> : null}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pl-8 pr-16 md:pl-4 md:pr-8 xl:pl-6 xl:pr-10 inline-flex items-center justify-center">
        {all_products.length > 0 && all_products.map((item, index) => (
          <div key={`products-${index}`}
            className="flex flex-col border border-gray-300 w-full md:w-11/12 h-[550px] box-content p-4">
            <img src={item.document.image} alt="product-image" className="h-52 w-52 object-scale-down mx-auto" />
            <h1 className="text-sm text-gray-600 my-4">{item.document.brand}</h1>
            <h1 className="font-bold">{item.document.name}</h1>
            <p className="text-xs text-gray-600 my-4">{item.document.description}</p>
            <h1 className="font-semibold">{`$${item.document.price}`}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Index;