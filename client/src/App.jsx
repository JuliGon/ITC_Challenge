import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Admin from "./pages/admin/Admin";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [books, setBooks] = useState([]);

  const handleSearchResults = (searchResults) => {
    setBooks(searchResults);
  };

  return (
    <Router>
      <div>
        <Navbar onSearch={handleSearchResults} />
        <Routes>
          <Route path="/books/:id" element={<Detail />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/"
            element={<Home books={books} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

