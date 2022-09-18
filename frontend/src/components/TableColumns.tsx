import React from 'react';

type Props = {}

const TableColumns = (props: Props) => {
  return (
    <tr>
      <th className='bg-primary text-primary-content'></th>
      <th className='bg-primary text-primary-content'></th> 
      <th className='bg-primary text-primary-content'>Date</th>
      <th className='bg-primary text-primary-content'>Price</th>
      <th className='bg-primary text-primary-content'>Title</th>
      <th className='bg-primary text-primary-content'>Desc</th>
      <th className='bg-primary text-primary-content'>Location</th>
      <th className='bg-primary text-primary-content'>Analysis</th>
      <th className='bg-primary text-primary-content'></th>
      <th className='bg-primary text-primary-content'></th>
    </tr>
  )
}

export default TableColumns;