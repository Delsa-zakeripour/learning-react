import StarRating from "./StarRating";
import { useState, useEffect } from "react";
import { useKey } from "./useKey";

const KEY = "5bf31670";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  handleCloseMovies,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);



  const watchUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;


  // const [isTop, setIsTop] = useState(true);
  // useEffect(() => {
  //   setIsTop(imdbRating > 8);
  //   console.log("jjjj", imdbRating > 8);
  // }, [imdbRating]);

  // const isTop = imdbRating > 8;
  // console.log(" is top", isTop);

  const [avgRating, setAvgRating] = useState(0);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      runtime: Number(runtime.split("").at(0)),
      imdbRating: Number(imdbRating),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();

    // setAvgRating(Number(imdbRating));
    // console.log("imdbRating ==> ", Number(imdbRating));
    // console.log("avgRating ==> ", Number(avgRating));

    // setAvgRating(Number(avgRating + userRating) / 2);
    // alert(avgRating);
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?&apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
        // setUserRating(true);
      }

      getMovieDetails();
    },
    [selectedId, setIsLoading]
  );

  // chenge browser title
  useEffect(
    function () {
      // it mean: if don't have title , don't show the undefined
      if (!title) return;
      document.title = `movie: ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useKey("Escape", onCloseMovie);

  // useEffect(
  //   function () {
  //     function callBack(e) {
  //       if (e.code === "Escape") {
  //         onCloseMovie();
  //       }
  //     }

  //     document.addEventListener("keydown", callBack);

  //     return function () {
  //       document.removeEventListener("keydown", callBack);
  //     };
  //   },
  //   [onCloseMovie]
  // );

  return (
    <div className="details">
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

        <p>{avgRating}</p>
        <section>
          <div className="rating">
            {!isWatched ? (
              <>
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />

                <button className="btn-add" onClick={handleAdd}>
                  + add to list
                </button>
              </>
            ) : (
              <p>You rate this film : {watchUserRating}</p>
            )}
          </div>
          <p>
            <em>{plot}</em>
          </p>
          <p>Starring {actors}</p>
          <p>Directed by {director}</p>
        </section>
      </>
    </div>
  );
}
