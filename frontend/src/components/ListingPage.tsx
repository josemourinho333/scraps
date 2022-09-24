import React, { useState, useEffect } from 'react';
import { Listings } from '../App';
import { useParams } from 'react-router-dom';
import Carousel from './Carousel';

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
    <div className="card w-5/12 bg-base-100 shadow-2xl my-5">
      <figure>
        <Carousel images={listing.images} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">
            <a href={listing.link} target="_blank" rel="noopener noreferrer">
              Go to listing
            </a>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListingPage;