import './App.css';
import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Table from './components/Table';
import axios from 'axios';
import Nav from './components/Nav';
import Stats from './components/Stats';
import Settings from './components/Settings';
import Pagination from './components/Pagination';

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

export type PageData = {
  currentPage: number
};

const App = () => {
  const [listings, setListings] = useState<Listings[]>([]);
  const [pageData, setPageData] = useState<PageData>({
    currentPage: 1,
  });

  const [currentPageData, setCurrentPageData] = useState<Listings[]>([]);
  const pageSize = 15;

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

  useEffect(() => {
    const end = pageSize * pageData.currentPage;
    const start = end - pageSize;
    const pageDataView = listings.slice(start, end);
    setCurrentPageData([...pageDataView]);
  }, [pageData.currentPage])

  const updatePage = (newPage: number) => {
    setPageData(prev => ({
      ...prev,
      currentPage: newPage,
    }))
  };

  return (
    <BrowserRouter>
      <Nav />
      <div className="App bg-base-500 flex flex-col items-center">
        <Routes>

          <Route path="/" element={
            <>
              <Stats listingsData={listingsData} />
              <Pagination 
                onPageChange={updatePage}
                currentPage={pageData.currentPage}
                totalListings={listings.length}
                pageSize={pageSize}
              />
              <Table listings={currentPageData} listingsData={listingsData}/>
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
