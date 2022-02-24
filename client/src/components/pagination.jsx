import React from 'react';

let counter = 1;

function Pagination (props) {
  const { found, query, set_all_hits } = props;
  const quotient = Math.ceil(found / 12);

  const next_page = async () => {
    counter += 1;
    if (counter <= quotient) {
      console.log(counter, quotient);
    } else {
      counter = 1;
      console.log(counter, quotient);
    }

    const query_data = {
      q: query,
      query_by: 'name,brand',
      page: counter,
      per_page: '12',
      'x-typesense-api-key': 'test1234',
    };
    const query_string = new URLSearchParams(query_data).toString();
    const response = await fetch(`http://localhost:8108/collections/products/documents/search?${query_string}`);
    if (response.status === 200) {
      const json = await response.json();
      console.log(json);
      if (json instanceof Object) {
        if (json.hits instanceof Array) {
          set_all_hits(json.hits);
        }
      }
    }
  };

  const prev_page = async () => {
    counter -= 1;
    if (counter > 0 && counter <= quotient) {
      console.log(counter, quotient);
    } else if (counter === 0) {
      counter = quotient;
      console.log(counter, quotient);
    }

    const query_data = {
      q: query,
      query_by: 'name,brand',
      page: counter,
      per_page: '12',
      'x-typesense-api-key': 'test1234',
    };
    const query_string = new URLSearchParams(query_data).toString();
    const response = await fetch(`http://localhost:8108/collections/products/documents/search?${query_string}`);
    if (response.status === 200) {
      const json = await response.json();
      console.log(json);
      if (json instanceof Object) {
        if (json.hits instanceof Array) {
          set_all_hits(json.hits);
        }
      }
    }

  };

  return (
    <nav className="relative mx-auto px-6 py-2">
      <ul className="flex flex-row justify-end">
        <li><button onClick={prev_page} className="h-10 px-5 text-indigo-600 transition-colors duration-150 rounded-l-lg focus:shadow-outline hover:bg-indigo-100">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg></button>
        </li>
        <li><button onClick={next_page} className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-r-lg focus:shadow-outline hover:bg-indigo-100">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg></button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;

