import React from 'react';
import TableRow from './TableRow';
import TableColumns from './TableColumns';

type Props = {};

const Table = (props: Props) => {
  return (
    <div className='table-container'>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <TableColumns />
          </thead>
          <tbody>
            <TableRow />
          </tbody>
          <tfoot>
            <TableColumns />
          </tfoot>
        </table>
      </div>
    </div>
  )
};

export default Table;