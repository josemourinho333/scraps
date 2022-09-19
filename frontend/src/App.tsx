import './App.css';
import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Table from './components/Table';
import axios from 'axios';
import Nav from './components/Nav';
import Stats from './components/Stats';

// helpers
import { getMedian } from './helpers/helpers';

export type Listings = {
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

export type Data = {
  median: number,
  total: number,
  // numOfGoodDeals: number
};

const App = () => {
  const [listings, setListings] = useState<Listings[]>([]);

  useEffect(() => {
    axios.get("/api/listings")
      .then((res) => {
        setListings([...res.data]);
      })
      .catch((err) => console.log('fetching listings err', err));
  }, []);

  const listingsData: Data = useMemo(() => {
    const prices = listings.map((listing) => {
      return listing.price;
    });
    const median = getMedian(prices);
    const total = listings.length;
    return { median, total };
  }, [listings.length]);

  // gettin the median value calculated
  // useEffect(() => {
  //   const totalListings = listings.length;
  //   if (totalListings) {
  //     totalListings % 2 === 0
  //       ? totalListings
  //   }
  // }, [listings.length])

  return (
    <BrowserRouter>
      <Nav />
      <div className="App bg-base-500 flex flex-col items-center">
        <Routes>

          <Route path="/" element={
            <>
              <Stats listingsData={listingsData} />
              <Table listings={listings}/>
            </>
          }/>

          <Route path="/new" element={
            <>"Adding page"</>
          } />

          <Route path="/logs" element={
            <>"Logs"</>
          } />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
