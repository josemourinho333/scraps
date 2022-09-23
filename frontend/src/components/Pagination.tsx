import React from 'react';
import usePagination, { DOTS } from '../hooks/usePagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

type Props = {
  onPageChange: (newPage: number) => void,
  currentPage: number,
  totalListings: number,
  pageSize: number,
};

const Pagination = ({onPageChange, currentPage, totalListings, pageSize}: Props) => { 

  const pageRange = usePagination(currentPage, totalListings, pageSize);

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const goToPage = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="btn-group my-2">
      <button className="btn" onClick={onPrevious}>
        <ChevronLeftIcon className='text-primary-content h-5 w-5'/>
      </button>

      {pageRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <button key={index} className="btn btn-disabled">{DOTS}</button>
          );
        }

        return (
          <button 
            key={index} 
            className={`btn ${currentPage === pageNumber ? "btn-active" : ''}`}
            onClick={() => {goToPage(Number(pageNumber))}}
          >
            {pageNumber}
          </button>
        )
      })}

      <button className="btn" onClick={onNext}>
        <ChevronRightIcon className='text-primary-content h-5 w-5'/>
      </button>
    </div>
  )
}

export default Pagination;