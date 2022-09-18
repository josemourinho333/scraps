import './App.css';
import { useState, useEffect } from 'react';
import Table from './components/Table';
import axios from 'axios';

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
};

function App() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    axios.get("/api/listings")
      .then((res) => {
        setListings([...res.data]);
      })
      .catch((err) => console.log('fetching listings err', err));
  }, []);

  return (
    <div className="App">
      <Table />
    </div>
  );
}

export default App;
