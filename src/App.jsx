import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import { lazy, Suspense } from "react";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const MovieDetailPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailPage")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const Navigation = lazy(() => import("./components/Navigation/Navigation"));

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
