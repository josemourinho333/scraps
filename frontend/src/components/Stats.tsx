import { Data } from '../App'

type Props = {
  listingsData: Data
}

const Stats = ({listingsData}: Props) => {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow-lg m-5">
      
      <div className="stat bg-primary text-primary-content border border-base-300">
        <div className="stat-title">Median Price</div>
        <div className="stat-value">${listingsData.median}</div>
      </div>
      
      <div className="stat bg-primary text-primary-content border border-base-300">
        <div className="stat-title">Total Listings</div>
        <div className="stat-value">{listingsData.total}</div>
      </div>
      
    </div>
  )
}

export default Stats;