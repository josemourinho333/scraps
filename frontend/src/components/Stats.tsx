import React from 'react';

type Props = {}

const Stats = (props: Props) => {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow-lg m-5">
      
      <div className="stat bg-primary text-primary-content border border-base-300">
        <div className="stat-title">Median Price</div>
        <div className="stat-value">31K</div>
        <div className="stat-desc">Jan 1st - Feb 1st</div>
      </div>
      
      <div className="stat bg-primary text-primary-content border border-base-300">
        <div className="stat-title">Total Listings</div>
        <div className="stat-value">4,200</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>
      
      <div className="stat bg-primary text-primary-content border border-base-300">
        <div className="stat-title">Decent Deals</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
      </div>
      
    </div>
  )
}

export default Stats;