import React from 'react';

type Props = {}

const TableColumns = (props: Props) => {
  return (
    <tr>
      <th className='bg-primary text-primary-content'>
        <label className='label cursor-pointer w-[15px]'>
            <input type="checkbox" className="checkbox border-white" />
        </label>
      </th>
      <th className='bg-primary text-primary-content'>Pic</th> 
      <th className='bg-primary text-primary-content'>Price</th>
      <th className='bg-primary text-primary-content'>Title</th>
      <th className='bg-primary text-primary-content'>Desc</th>
      <th className='bg-primary text-primary-content'>Location</th>
      <th className='bg-primary text-primary-content'>Analysis</th>
      <th className='bg-primary text-primary-content'>Link</th>
      <th className='bg-primary text-primary-content'>Date</th>
      <th className='bg-primary text-primary-content'></th>
    </tr>
  )
}

export default TableColumns;