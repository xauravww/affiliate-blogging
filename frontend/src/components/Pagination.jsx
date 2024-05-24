import React from 'react';

const Pagination = ({ totalPosts, postPerPage, setcurrentPage, currentPage }) => {
  let pages = [];
  const totalPages = Math.ceil(totalPosts / postPerPage);

  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const getDisplayedPages = () => {
    const maxDisplayedPages = 5; // Maximum number of page buttons to display
    const leftOffset = Math.floor(maxDisplayedPages / 2);
    const rightOffset = maxDisplayedPages - leftOffset - 1;

    if (totalPages <= maxDisplayedPages) {
      return range(1, totalPages);
    }

    if (currentPage <= leftOffset) {
      return [...range(1, maxDisplayedPages - 2), '...', totalPages];
    }

    if (currentPage >= totalPages - rightOffset) {
      return [1, '...', ...range(totalPages - maxDisplayedPages + 3, totalPages)];
    }

    return [
      1,
      '...',
      ...range(currentPage - leftOffset, currentPage + rightOffset),
      '...',
      totalPages,
    ];
  };

  return (
    <div className='pagination-container flex justify-center gap-2 w-full bg-[#F2F2F2] font-[arial] '>
      {getDisplayedPages().map((page, index) => {
        return (
          <button
            className='text-white text-3xl px-2 font-bold rounded-full'
            style={
              page === currentPage
                ? { backgroundColor: '#FFA500', color: 'white' }
                : { backgroundColor: 'black' }
            }
            key={index}
            onClick={() => {
              if (typeof page === 'number') {
                setcurrentPage(page);
              }
            }}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
