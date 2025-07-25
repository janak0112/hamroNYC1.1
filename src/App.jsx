import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./components/Categories/Categories";
import Greetings from "./components/Greetings/Greetings";

import LogIn from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home"; // Correct import for your Home page
import PostListing from "./pages/PostListing/PostListing";
import {
  JobPostForm,
  MarketPostForm,
  RoomPostForm,
  EventPostForm,
} from "./components/Post";
import {
  JobDetailPage,
  MarketDetailPage,
  EventDetailPage,
  ListingDetailPage,
} from "./components/Listings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LogIn />} />
            <Route path="post-listing" element={<PostListing />} />
            <Route path="add-job" element={<JobPostForm />} />
            <Route path="add-market" element={<MarketPostForm />} />
            <Route path="add-room" element={<RoomPostForm />} />
            <Route path="add-event" element={<EventPostForm />} />
            <Route path="jobs/:id" element={<JobDetailPage />} />
            <Route path="markets/:id" element={<MarketDetailPage />} />
            <Route path="events/:id" element={<EventDetailPage />} />
            <Route path="rooms/:id" element={<ListingDetailPage />} />
          </Route>
        </Routes>
        r
      </BrowserRouter>
    </>
  );
}

export default App;
