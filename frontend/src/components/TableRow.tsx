import { LinkIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { formatLocation, formatDate } from '../helpers/helpers';

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

  return (
    <tr id={`${craigslistId}`}>
      <td>
        <label className='label cursor-pointer w-[15px]'>
          <input type="checkbox" className="checkbox checkbox-primary" />
        </label>
      </td>
      <td className='img'>
        <div className="flex space-x-3 w-[50px]">
          <div className="images">
            <img src={images[0]} alt="product-img" className='w-full'/>
          </div>
        </div>
      </td>

      <td className='price'>${price}</td>
      <td className='title-condition'>
        <div className="w-[300px]">
          {title.substring(0, 30)}
          <br/>
          <span className="badge badge-ghost badge-sm condition">Condition: {condition}</span>
        </div>
      </td>
      <td className='desc'>
        {desc.substring(0, 40)}
      </td>
      <td className="location">
        <div className="max-w-max">{formatLocation(location)}</div>
      </td>
      <td className="price-analysis">
        {priceAnalysis ? priceAnalysis : 'N/A'}
      </td>
      <td className="link">
        <a href={link} target="_blank" rel="noopener noreferrer"><LinkIcon className='h-4 w-4 text-primary'/></a>
      </td>
      <td className="date">
        <div className='w-[100px]'>
          <div className="font-regular">{formatDate(date)[0]}</div>
          <div className="text-sm opacity-50">{formatDate(date)[1]}</div>
        </div>
      </td>
      <td className="delete">
        <div className="dropdown dropdown-left dropdown-end">
          <label tabIndex={0} className="btn bg-white border-none hover:bg-white">
            <EllipsisVerticalIcon className='h-4 w-4 text-primary'/>
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </td>
    </tr>
  )
}

export default TableRow;