import { getMedian } from '../helpers/helpers';

type Props = {
  listingsData: any,
  total: number,
}

const Stats = ({listingsData, total}: Props) => {

  const stats = Object.keys(listingsData).map((data, index) => {
    return (
      <div key={index} className="stat bg-primary text-primary-content border border-base-300">
        <div className="stat-title">{data}</div>
        <div className="stat-value">${getMedian(listingsData[data])}</div>
        <div className="stat-desc">Median Price</div>
      </div>
    )
  });

  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow-lg m-5">
      
      {stats}
      
      <div className="stat bg-primary text-primary-content border border-base-300">
        <div className="stat-title">Total Listings</div>
        <div className="stat-value">{total}</div>
      </div>
      
    </div>
  );
};

export default Stats;