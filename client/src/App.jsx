import React, { useState, useEffect } from 'react';
import Index from './components';
import Pagination from './components/pagination';
import Search from './components/search';

function App () {

  const [products, set_products] = useState(null);
  const get_products = async () => {
    const response = await fetch('/products', {
      method: 'GET',
    });

    const data = await response.json();
    set_products(data);
  };

  useEffect(() => {
    if (!products) {
      get_products();
    }
  }, [products]);

  const [current_page, set_current_page] = useState(1);
  const [item_per_page] = useState(20);

  // const last_item_index = current_page * item_per_page;
  // const first_item_index = last_item_index - item_per_page;
  // const current_items = products.slice(first_item_index, last_item_index);

  const paginate = page_number => set_current_page(page_number);

  return (
    <div>
      <Search />
      <Index products={products} />
      {/* {products instanceof Array ? <Pagination
        item_per_page={item_per_page}
        total_items={products.length}
        paginate={paginate}/> : null} */}
    </div>
  );

}

export default App;