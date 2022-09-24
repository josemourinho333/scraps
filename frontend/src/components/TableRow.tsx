import { LinkIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { formatLocation, formatDate, analyzePrice } from '../helpers/helpers';
import { Link } from 'react-router-dom';

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
  median: number | string,
  deleteListing: (id: number) => void,
};

const TableRow = ({id, craigslistId, images, date, price, title, desc, condition, location, link, median, deleteListing}: Props) => {

  const analysisResult = analyzePrice(price, median);

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
        <div className="w-[200px]">
          {title.substring(0, 30)}
          <br/>
          <span className="badge badge-ghost badge-sm condition">Condition: {condition}</span>
        </div>
      </td>
      <td className='desc'>
        {desc.substring(0, 75)}
      </td>
      <td className="location">
        <div className="w-[100px]">{formatLocation(location).substring(0, 10)}...</div>
      </td>
      <td className="price-analysis">
        {analysisResult === 'Bad'
          ? <div className="badge badge-error">Bad</div>
          : analysisResult === 'Average'
          ? <div className="badge badge-warning">Average</div>
          : analysisResult === 'Good'
          ? <div className="badge badge-success">Good</div>
          : analysisResult === 'Great'
          ? <div className="badge badge-success">Great</div>
          : analysisResult === 'Too low'
          ? <div className="badge badge-neutral">Too low</div>
          : 'N/A'
        }
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
            <li><Link to={`/listings/${id}`}>More Details</Link></li>
            <li>
              <button 
                className="btn-sm btn-ghost"
                onClick={() => deleteListing(id)}
                >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  )
}

export default TableRow;