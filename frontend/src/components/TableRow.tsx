import React from 'react';

type Props = {
};

type Listing = {
  id: number,
  images: string[],
  date: string,
  price: number,
  title: string,
  desc: string,
  condition: string,
  location: string,
  link: string,
  priceAnalysis?: string
}

// need the data passed down to here

const sample: Listing = {
  id: 123,
  images: [
    'https://images.craigslist.org/01616_3ptq9NgELdvz_0CI0pO_300x300.jpg',
    'https://images.craigslist.org/00A0A_fnmVgYtrF0gz_0CI0pO_300x300.jpg',
    'https://images.craigslist.org/00505_1YDjf9DocCyz_0CI0pO_300x300.jpg',
    'https://images.craigslist.org/01313_58Txin2RW6Tz_0CI0pO_300x300.jpg'
  ],
  date: '2022-09-17 13:36',
  price: 123,
  title: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur, minus.',
  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus animi soluta, reprehenderit nemo fugiat nihil autem ab pariatur eaque unde sed assumenda modi nisi, reiciendis earum illum. Incidunt sunt et tempore omnis. Quasi nemo dolorem officia ipsa laborum deleniti odio?',
  condition: 'Good',
  location: 'Vancouver',
  link: 'www.google.ca',
  priceAnalysis: 'Good Price'
}

const TableRow = (props: Props) => {

  const { id, images, date, price, title, desc, condition, location, link, priceAnalysis } = sample; 

  const formatDate = (date: string) => {
    const calendarDate = date.split(' ')[0];
    const time = date.split(' ')[1];
    return [calendarDate, time];
  };

  return (
    <tr>
      <td className='select'>
        <label>
          <input type="checkbox" className="checkbox" value={id}/>
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
        <a href={`http://${link}`} target="_blank" rel="noopener noreferrer">Link</a>
      </td>
      <td className="delete">
        <button>
          X
        </button>
      </td>
    </tr>
  )
}

export default TableRow;