import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Form from "./pages/form/Form";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

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
          <Route path="/form" element={<Form />} />
          <Route
            path="/"
            element={<Home books={books} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

