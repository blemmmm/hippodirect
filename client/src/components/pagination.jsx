import React, { useEffect, useState } from 'react';

function Pagination (props) {
  const { item_per_page, total_items, paginate } = props;
  const page_numbers = [];

  // for (let i = 1; i <= Math.ceil(total_items / item_per_page); i++) {
  //   page_numbers.push(i);
  // }
  // // console.log(page_numbers);

  return (
    <nav className="relative mx-auto px-6 py-2">
      <ul className="flex flex-row justify-end">
        {/* <li><button className="h-10 px-5 text-indigo-600 transition-colors duration-150 rounded-l-lg focus:shadow-outline hover:bg-indigo-100">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg></button>
        </li> */}
        {/* { page_numbers.length > 0 && page_numbers.map((number) => (
          <li key={number}>
            <button onClick={() => paginate(number)} className="h-10 px-5 text-indigo-600 transition-colors duration-150 focus:shadow-outline hover:bg-indigo-100">
              {number}
            </button>
          </li>
        ))} */}
        {/* <li><button className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-r-lg focus:shadow-outline hover:bg-indigo-100">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg></button>
        </li> */}
      </ul>
    </nav>
  );
}

export default Pagination;

