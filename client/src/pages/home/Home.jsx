/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import BookModel from "../../utils/bookModel";
import Card from "../../components/card/Card";
import "./Home.css";

export default function Home({ books: initialBooks }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState(initialBooks);

  const bookModel = new BookModel();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await bookModel.getBooks(signal);
        setBooks(response);
      } catch (error) {
        if (!signal.aborted) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();

    return () => {
      controller.abort();
    };
  }, []);

  // Actualiza los libros cuando initialBooks cambia
  useEffect(() => {
    setBooks(initialBooks);
  }, [initialBooks]);

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {books?.map((e, index) => (
          <div key={index} className="cards">
            <Card
              key={e.id}
              image={e.image}
              name={e.name}
              author={e.author}
              price={e.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
