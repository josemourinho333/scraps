
type Props = {
  listingsData: any,
  total: number,
  updateMedian: () => void,
}

const Stats = ({listingsData, total, updateMedian}: Props) => {

  const stats = Object.keys(listingsData).map((data, index) => {
    return (
      <div key={index} className="stat bg-primary text-primary-content border border-base-300">
        <div className="stat-title">{data}</div>
        <div className="stat-value">${listingsData[data]}</div>
        <div className="stat-desc">Median Price</div>
      </div>
    )
  });

  return (
    <div className="flex flex-col">
      <div className="stats stats-vertical lg:stats-horizontal shadow-lg m-5">
        
        {stats}
        
        <div className="stat bg-primary text-primary-content border border-base-300">
          <div className="stat-title">Total Listings</div>
          <div className="stat-value">{total}</div>
        </div>
        
      </div>
      <button className="btn btn-sm btn-primary" onClick={updateMedian}>Update Median in DB</button>
    </div>

  );
};

export default Stats;