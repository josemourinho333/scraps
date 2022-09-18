import React from 'react';
import TableRow from './TableRow';
import TableColumns from './TableColumns';
import { Listings } from '../App';

type Props = {
  listings: Listings[];
};

const Table = ({listings}: Props) => {
  // map over listings and generate tablerow
  const rows = listings.map((listing) => {
    return (
      <TableRow 
        key={listing.id}
        id={listing.id}
        craigslistId={listing.craigslistId}
        images={listing.images}
        date={listing.date}
        price={listing.price}
        title={listing.title}
        desc={listing.desc}
        condition={listing.condition}
        location={listing.location}
        link={listing.link}
        priceAnalysis={listing.priceAnalysis}
      />
    )
  })

  return (
    <div className='table-container shadow-lg'>
      <div className="overflow-x-auto w-full">
        <table className="table m-auto">
          <thead className='bg-primary'>
            <TableColumns />
          </thead>
          <tbody>
            {rows}
          </tbody>
          {/* <tfoot>
            <TableColumns />
          </tfoot> */}
        </table>
      </div>
    </div>
  )
};

export default Table;