import React from 'react';

const Pagination = ({ totalPosts, postPerPage, setCurrentPage, currentPage, totalPages }) => {
  const maxDisplayedPages = 5; // Adjust this value as needed

  const getDisplayedPages = () => {
    const leftOffset = Math.floor(maxDisplayedPages / 2);
    const rightOffset = maxDisplayedPages - leftOffset - 1;

    // Handle case where totalPages is less than or equal to maxDisplayedPages
    if (totalPages <= maxDisplayedPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Calculate starting page number
    let startPage = currentPage - leftOffset;
    if (startPage < 1) {
      startPage = 1;
    }

    // Calculate ending page number
    let endPage = startPage + maxDisplayedPages - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
    }

    // Generate the array of displayed page numbers
    const displayedPages = [];
    if (startPage > 1) {
      displayedPages.push(1);
      if (startPage > 2) {
        displayedPages.push('...');
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      displayedPages.push(i);
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        displayedPages.push('...');
      }
      displayedPages.push(totalPages);
    }

    return displayedPages;
  };

  return (
    <div className='pagination-container flex justify-center gap-2 w-full bg-[#F2F2F2] font-[arial]'>
      {getDisplayedPages().map((page, index) => (
        <button
          key={index}
          className='text-white text-3xl px-2 font-bold rounded-full'
          style={
            page === currentPage
              ? { backgroundColor: '#FFA500', color: 'white' }
              : { backgroundColor: 'black' }
          }
          onClick={() => {
            if (typeof page === 'number') {
              setCurrentPage(page);
            }
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

