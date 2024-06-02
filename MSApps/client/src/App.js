import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "./slice/photoSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.data);
  const status = useSelector((state) => state.photos.status);
  const [page, setPage] = useState(1); // Start from page 1
  const [category, setCategory] = useState("nature");

  useEffect(() => {
    dispatch(fetchPhotos({ category, page }));
  }, [dispatch, category, page]);

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1); // Reset to first page when category changes
  };

  const displayPhotos = photos.slice(0, 9); // Display only the first 9 elements

  return (
    <div className="App">
      <header>
        <button className="button" onClick={handlePrev}>
          Prev
        </button>
        <button
          className="button"
          onClick={() => handleCategoryChange(prompt("Enter category:"))}
        >
          Change Category
        </button>
        <button className="button" onClick={handleNext}>
          Next
        </button>
      </header>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error fetching photos</p>}
      <div className="photo-grid">
        {displayPhotos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <img src={photo.webformatURL} alt={photo.tags} />
            <div className="photo-info">
              <p>Views: {photo.views}</p>
              <p>Downloads: {photo.downloads}</p>
              <p>Collections: {photo.collections}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
