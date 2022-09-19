import './App.css';
import { useState, useEffect } from 'react';
import Table from './components/Table';
import axios from 'axios';
import Nav from './components/Nav';
import Stats from './components/Stats';

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

const App = () => {
  const [listings, setListings] = useState<Listings[]>([]);

  useEffect(() => {
    axios.get("/api/listings")
      .then((res) => {
        setListings([...res.data]);
      })
      .catch((err) => console.log('fetching listings err', err));
  }, []);

  // gettin the median value calculated
  // useEffect(() => {
  //   const totalListings = listings.length;
  //   if (totalListings) {
  //     totalListings % 2 === 0
  //       ? totalListings
  //   }
  // }, [listings.length])

  return (
    <div className="App bg-base-500 flex flex-col items-center">
      <Nav />
      <Stats />
      <Table listings={listings}/>
    </div>
  );
}

export default App;
