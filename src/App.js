import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <SearchBar />
    </div>
  );
}

function SearchBar() {
  return (
    <div className="searchbar-container">
      <input className="searchbar" placeholder="  Search for a city.."></input>
      <i className="bx bx-search searchbar-btn"></i>
    </div>
  );
}
