import "./App.scss";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import MovieDetailPage from "./pages/MovieDetailPage/MovieDetailPage";
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<MovieDetailPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
