import './App.css';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './containers/Header';
import ItemListing from './containers/ItemListing';
// import ItemComponent from './containers/ItemComponent';
import ItemDetail from './containers/ItemDetail';
import PlanetsCategory from './containers/PlanetsCategory';
import PeopleCategory from './containers/PeopleCategory';
import { useSelector } from 'react-redux';

function App() {
  const items = useSelector((state) => state.allItems.items)
  const url = items.map(item => item.url)
  console.log(url)
  return (
    <div className="App">
      <Router>
        <Link to="/">
         <Header />
        </Link>
       <Routes>
        <Route path="/" element={<ItemListing />} />
        <Route path="/item/:itemId" element={<ItemDetail url={url} />} />
        <Route path="/planets" element={<PlanetsCategory />} />
        <Route path="/people" element={<PeopleCategory />} />
        <Route>404 Not Found</Route>
       </Routes>
      </Router>
    </div>
  );
}

export default App;
