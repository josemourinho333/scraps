import React from 'react';
import { LinkIcon, TrashIcon } from '@heroicons/react/24/outline';

type Props = {
  id: number,
  craigslistId: number,
  images: string[],
  date: string,
  price: number, 
  title: string,
  desc: string, 
  condition: string,
  location: string, 
  link: string, 
  priceAnalysis?: string 
};

const TableRow = ({id, craigslistId, images, date, price, title, desc, condition, location, link, priceAnalysis}: Props) => {

  const formatDate = (date: string) => {
    const calendarDate = date.split(' ')[0];
    const time = date.split(' ')[1];
    return [calendarDate, time];
  };

  return (
    <tr id={`${craigslistId}`}>
      <td>
        <label className='label cursor-pointer'>
          <input type="checkbox" className="checkbox checkbox-primary" />
        </label>
      </td>
      <td className='img'>
        <div className="flex items-center space-x-3">
          <div className="images w-24">
            <img src={images[0]} alt="product-img" />
          </div>
        </div>
      </td>
      <td className="date">
        <div>
          <div className="font-bold">{formatDate(date)[0]}</div>
          <div className="text-sm opacity-50">{formatDate(date)[1]}</div>
        </div>
      </td>
      <td className='price'>${price}</td>
      <td className='title-condition'>
        {title.substring(0, 35)}
        <br/>
        <span className="badge badge-ghost badge-sm condition">Condition: {condition}</span>
      </td>
      <td className='desc'>
        {desc.substring(0, 40)}
      </td>
      <td className="location">
        {location}
      </td>
      <td className="price-analysis">
        {priceAnalysis ? priceAnalysis : 'N/A'}
      </td>
      <td className="link">
        <a href={link} target="_blank" rel="noopener noreferrer"><LinkIcon className='h-6 w-6 text-primary'/></a>
      </td>
      <td className="delete">
      <button className="btn btn-outline btn-primary btn-square group">
        <TrashIcon className='h-6 w-6 text-primary group-hover:text-primary-content' />
      </button>
      </td>
    </tr>
  )
}

export default TableRow;