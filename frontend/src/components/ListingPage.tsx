import React, { useState, useEffect } from 'react';
import { Listings } from '../App';
import { useParams } from 'react-router-dom';
import Carousel from './Carousel';
import Settings from './Settings';

type Props = {
  listings: Listings[];
};

const ListingPage = ({listings}: Props) => {
  const { id } = useParams() as any;
  const [listing, setListing] = useState<any>(null);

  useEffect(() => {
    const post = listings.filter((item) => {
      return item.id === Number(id)
    });
    setListing(post[0]);
  }, []);

  if (!listing) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex justify-center'>
    <div className="card w-1/3 bg-base-100 shadow-2xl my-5">
      <figure>
        <Carousel images={listing.images} />
      </figure>
      <div className="card-body">
        <div className="alert alert-primary shadow-lg my-1">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>{listing.date} | {listing.id} / {listing.craigslistid}</span>
            </div>
        </div>
        <div className="alert alert-primary shadow-lg my-1">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{listing.title}</span>
          </div>
        </div>
        <div className="alert alert-primary shadow-lg my-1">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>${listing.price}</span>
          </div>
        </div>
        <div className="alert alert-primary shadow-lg my-1">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{listing.condition ? listing.condition : 'No condition listed'}</span>
          </div>
        </div>
        <div className="alert alert-primary shadow-lg my-1">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{listing.desc}</span>
          </div>
        </div>
        <div className="alert alert-primary shadow-lg my-1">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{listing.location}</span>
          </div>
        </div>
        <div className="card-actions justify-end my-1">
          <button className="btn btn-primary">
            <a href={listing.link} target="_blank" rel="noopener noreferrer">
              Go to listing
            </a>
          </button>
        </div>
      </div>
    </div>
    <Settings />
    </div>
  )
}

export default ListingPage;