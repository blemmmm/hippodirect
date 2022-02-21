import React, { useEffect, useState } from 'react';

let controller = null;

function Search (props) {
  const [query, set_query] = useState('');
  const [hits, set_hits] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (controller instanceof Object) {
          controller.abort();
          controller = null;
        }
        if (query === '') {
          set_hits([]);
          return;
        }
        controller = new AbortController();
        const start = Date.now();
        const query_data = {
          q: query,
          query_by: 'name,brand',
          per_page: '20',
          'x-typesense-api-key': 'test1234',
        };
        const query_string = new URLSearchParams(query_data).toString();
        const response = await fetch(`http://localhost:8108/collections/products/documents/search?${query_string}`, {
          signal: controller.signal,
        });
        controller = null;
        if (response.status === 200) {
          const json = await response.json();
          if (json instanceof Object) {
            if (json.hits instanceof Array) {
              set_hits(json.hits);
            }
          }
        }
      } catch (e) {
        if (e.name === 'AbortError') {
          return;
        }
        console.error(`${e.name}: ${e.message}`);
      }
    })();
  }, [query]);
  console.log(hits);
  return (
    <div>
      <div className="container mx-auto p-6 relative text-gray-700">
        <input className="w-full h-10 pl-8 pr-3 text-base placeholder-gray-600 border rounded focus:outline-none" type="text" placeholder="Search" value={query} onChange={(e) => set_query(e.target.value)}/>
        <div className="absolute inset-y-0 left-0 flex items-center px-8 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1664 1664"><path fill="#9ca3af" d="M1152 704q0-185-131.5-316.5T704 256T387.5 387.5T256 704t131.5 316.5T704 1152t316.5-131.5T1152 704zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124q-143 0-273.5-55.5t-225-150t-150-225T0 704t55.5-273.5t150-225t225-150T704 0t273.5 55.5t225 150t150 225T1408 704q0 220-124 399l343 343q37 37 37 90z"/></svg>
        </div>
      </div>
      { hits instanceof Array && hits.map((item, index) => (
        <div key={`products-${index}`}
          className="">
          <h1>{`${item.document.name}, --${item.document.brand}`}</h1>
        </div>
      )) }
    </div>

  );
}

export default Search;

