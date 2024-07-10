import StarRating from "./StarRating";
import {useState, useEffect} from "react";

const KEY = "5bf31670";

export default function MovieDetails({
                                         selectedId,
                                         onCloseMovie,
                                         setIsLoading,
                                         onAddWatched,
                                         handleCloseMovies,
                                         watched,
                                     }) {
    const [movie, setMovie] = useState({});

    console.log('movie in movie details ', movie)
    const [userRating, setUserRating] = useState("");

    console.log('user rating => ', userRating)
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

    console.log('watched ===> ', watched)

    const watchUserRating = watched.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating;
    console.log("watchUserRating", watchUserRating);

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
                console.log("data", data);
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
            // means: if don't have title , don't show the undefined
            if (!title) return;
            document.title = `movie: ${title}`;

            return function () {
                document.title = "usePopcorn";
            };
        },
        [title]
    );

    useEffect(
        function () {
            function callBack(e) {
                if (e.code === "Escape") {
                    onCloseMovie();
                }
            }

            document.addEventListener("keydown", callBack);

            return function () {
                document.removeEventListener("keydown", callBack);
            };
        },
        [onCloseMovie]
    );

    return (
        <div className="details">
            <>
                <header>
                    <button className="btn-back" onClick={onCloseMovie}>
                          &larr;
                    </button>
                    <img src={poster} alt={`Poster of ${title} movie`}/>
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
