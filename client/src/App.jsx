import React, { useState, useEffect } from 'react';
import Search from './components/search';
import Index from './components';
import useHistory from './useHistory';
import ScrollToTop from './components/scroll_to_top';
import Footer from './components/footer';

function App () {
  const history = useHistory();
  const [all_products, set_all_products] = useState([]);
  const [found, set_found] = useState(0);
  const [y_position, set_y_position] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
  }, []);

  const handleScroll = () => {
    const positionY = window.scrollY;
    set_y_position(positionY);
  };


  useEffect(() => {
    (async () => {
      try {
        if (all_products.length === 0) {
          const query_data = {
            q: '*',
            query_by: 'name,brand',
            per_page: '20',
            'sort_by': 'popularity:desc',
            'x-typesense-api-key': 'test1234',
          };
          const query_string = new URLSearchParams(query_data).toString();
          const response = await fetch(`https://hippodirect.blemmmm.xyz/collections/products/documents/search?${query_string}`);
          if (response.status === 200) {
            const json = await response.json();
            if (json instanceof Object) {
              set_found(json.found);
              if (json.hits instanceof Array) {
                set_all_products(json.hits);
              }
            }
          }
        }
      } catch (e) {
        console.error(`${e.name}: ${e.message}`);
      }
    })();
  }, [all_products]);

  switch (history.pathname) {
    case '/': {
      if (all_products.length > 0) {
        return (
          <div>
            <Search history={history} set_all_products={set_all_products}/>
            <Index history={history} all_products={all_products} found={found} set_all_products={set_all_products}/>
            {y_position > 0 ? <ScrollToTop /> : null}
            <Footer />
          </div>
        );
      } return null;

    }
    case '/search': {
      return (
        <div>
          <Search history={history} />
          {y_position > 0 ? <ScrollToTop /> : null}
          <Footer />
        </div>
      );
    }
  }

}

export default App;