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
import { formatDesc, formatTitle } from './helpers/helpers';
import ListingPage from './components/ListingPage';

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

  // fetching listings
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

  // render page view 
  useEffect(() => {
    const end = pageSize * pageData.currentPage;
    const start = end - pageSize;
    const pageDataView = listings.slice(start, end);
    setCurrentPageData([...pageDataView]);
  }, [pageData.currentPage, listings]);

  // get listings data
  const listingsData = useMemo(() => {
    const data: any = {};
    for (const listing of listings) {
      const model = listing.title.toLowerCase().split(' ').join('');
      if (data[model]) {
        data[model].push(listing.price);
      } else {
        data[model] = [listing.price];
      }
    };

    return data;
  }, [listings]);

  // navigate between pages
  const updatePage = (newPage: number) => {
    setPageData({
      currentPage: newPage
    })
  };


  // blacklist a listing
  const deleteListing = (id: number) => {
    axios.patch(`/api/listings/${id}`)
      .then((res) => {
        const blackedListedId = res.data[0].id;
        const updatedListings = listings.filter((listing) => listing.id !== blackedListedId);
        setListings(updatedListings);
      })
      .catch((err) => console.log('err', err));
  };

  // quick fix title
  const editModel = (id: number, e: any) => {
    const target = e.target as HTMLButtonElement;
    const model = target.textContent;
    const listing = listings.filter((data) => data.id === Number(id))[0];
    listing.title = model as string;

    const allListings = [...listings.filter((data) => data.id !== Number(id)), listing];
    setListings(allListings);
    axios.patch(`/api/listings/edit/${id}`, {model})
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => console.log('err', err));
  };

  return (
    <BrowserRouter>
      <Nav />
      <div className="App bg-base-500 flex flex-col items-center">
        <Routes>

          <Route path="/" element={
            <>
              <Stats listingsData={listingsData} total={listings.length} />
              <Pagination 
                onPageChange={updatePage}
                currentPage={pageData.currentPage}
                totalListings={listings.length}
                pageSize={pageSize}
              />
              <Table listings={currentPageData} listingsData={listingsData} deleteListing={deleteListing}/>
            </>
          }/>

          <Route path="/listings/:id" element={
            <ListingPage 
              listings={listings}
              editModel={editModel}
            />
          } />

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
