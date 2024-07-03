import React from "react";
import StarRating from "./StarRating";
import { useState, useEffect } from "react";

const KEY = "5bf31670";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  setIsLoading,
  onAddWatched,
}) {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState("");
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  console.log(year, title);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?&apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setIsLoading(false);
        setUserRating(true);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  return (
    <div className="details">
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <>
        <header>
          <button className="btn-back" onClick={onCloseMovie}>
            &larr;
          </button>
          <img src={poster} alt={`Poster of ${title} movie`} />
          <div className="details-overview">
            <h2>{title}</h2>
            <p>
              {released} &bull; {runtime}
            </p>
            <p>{genre}</p>
            <p>
              <span>⭐️</span>
              {imdbRating} IMDb rating
            </p>
          </div>
        </header>
        <section>
          <div className="rating">
            <StarRating maxRating={10} size={24} onSetRating={setUserRating} />

            {/* {userRating > 0 && ( */}
            <button className="btn-add" onClick={handleAdd}>
              + add to list
            </button>
            {/* )} */}
          </div>
          <p>
            <em>{plot}</em>
          </p>
          <p>Starring {actors}</p>
          <p>Directed by {director}</p>
        </section>
      </>
      {/* )} */}
    </div>
  );
}
