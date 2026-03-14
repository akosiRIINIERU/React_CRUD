import { useState } from "react";

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [formData, setFormData] = useState({
    Title: "",
    Director: "",
    Date: "",
    Duration: "",
    Showing: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (isEditing) {
      const updatedList = moviesList.map((movie, index) =>
        index === editIndex ? formData : movie
      );
      setMoviesList(updatedList);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setMoviesList([...moviesList, formData]);
    }
    clearFields();
  };

  const deleteMovie = (indexToDelete) => {
    const filteredList = moviesList.filter((_, index) => index !== indexToDelete);
    setMoviesList(filteredList);
  };

  const startEdit = (index) => {
    setFormData(moviesList[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const clearFields = () => {
    setFormData({ Title: "", Director: "", Date: "", Duration: "", Showing: "" });
    setIsEditing(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>{isEditing ? "Edit Movie" : "Add Movie"}</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input name="Title" placeholder="Title" value={formData.Title} onChange={handleChange} />
        <input name="Director" placeholder="Director" value={formData.Director} onChange={handleChange} />
        <input type="number" name="Date" placeholder="Year" value={formData.Date} onChange={handleChange} />
        <input name="Duration" placeholder="Duration" value={formData.Duration} onChange={handleChange} />
        <input name="Showing" placeholder="Showing" value={formData.Showing} onChange={handleChange} />
      </div>

      <button onClick={handleSubmit}>{isEditing ? "Update Movie" : "Add Movie"}</button>
      <button onClick={clearFields} style={{ marginLeft: "10px" }}>Clear</button>

      <hr />

      <h2>Movie List</h2>
      <ul>
        {moviesList.map((movie, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <strong>{movie.Title}</strong> | {movie.Director} ({movie.Date}) | Duration: {movie.Duration} |Showing: {movie.Showing}
            <button onClick={() => startEdit(index)} style={{ marginLeft: "15px", color: "blue" }}>Edit</button>
            <button onClick={() => deleteMovie(index)} style={{ marginLeft: "5px", color: "red" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;