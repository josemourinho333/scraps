import './App.css';
import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Table from './components/Table';
import axios from 'axios';
import Nav from './components/Nav';
import Stats from './components/Stats';
import Settings from './components/Settings';

// helpers
import { formatDesc, formatTitle, getMedian } from './helpers/helpers';

export type Listings = {
  id: number,
  craigslistid: number,
  images: string[],
  date: string,
  price: number,
  title: string,
  desc: string,
  condition: string,
  location: string,
  link: string,
};

export type Data = {
  median: number | string,
  total: number,
};

const App = () => {
  const [listings, setListings] = useState<Listings[]>([]);

  useEffect(() => {
    axios.get("/api/listings")
      .then((res) => {
        const data = [];
        for (const item of res.data) {
          const newDesc = formatDesc(item.desc);
          const newTitle = formatTitle(item.title);
          const updatedItem = {
            ...item,
            title: newTitle,
            desc: newDesc,
          };

          data.push(updatedItem);
        };
        setListings([...data]);
      })
      .catch((err) => console.log('fetching listings err', err));
  }, []);

  const listingsData: Data = useMemo(() => {
    const prices = listings.map((listing) => {
      return listing.price;
    });
    const medianValue = getMedian(prices);
    const finalMedian = Number(medianValue).toFixed(2);
    const total = listings.length;
    return { median: finalMedian, total };
  }, [listings.length]);

  return (
    <BrowserRouter>
      <Nav />
      <div className="App bg-base-500 flex flex-col items-center">
        <Routes>

          <Route path="/" element={
            <>
              <Stats listingsData={listingsData} />
              <Table listings={listings} listingsData={listingsData}/>
            </>
          }/>

          {/* <Route path="/new" element={
            <>"Adding page"</>
          } /> */}

          <Route path="/logs" element={
            <>"Logs"</>
          } />

          <Route path="/settings" element={
            <Settings />
          } />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
