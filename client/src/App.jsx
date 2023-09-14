import { useState } from "react";
import "./App.css";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Form from "./pages/form/Form";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [books, setBooks] = useState([]);

  const handleSearchResults = (searchResults) => {
    setBooks(searchResults);
  };

  return (
    <>
      <Navbar onSearch={handleSearchResults} />
      <Home books={books} />
      <Detail />
      <Form />
    </>
  );
}

export default App;

