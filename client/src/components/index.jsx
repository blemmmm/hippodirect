import React, { useEffect, useState } from 'react';

function Index () {
  const [products, set_products] = useState(null);
  const getProducts = async () => {
    const response = await fetch('/products', {
      method: 'GET',
    });

    const data = await response.json();
    set_products(data);
  };
  useEffect(() => {
    if (!products) {
      getProducts();
    }
  }, [products]);

  const renderProducts = () => {
    if (products instanceof Object) {
      products.map((item, index) => {
        <h1 key={index}>{item.name}</h1>;
      });
    }
  };





  return (
    <div>
      {renderProducts()}
    </div>
  );
}

export default Index;