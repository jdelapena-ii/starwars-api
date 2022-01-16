import './App.css';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ItemListing from './components/ItemListing';
// import ItemComponent from './components/ItemComponent';
import ItemDetail from './components/ItemDetail';
import PlanetsCategory from './components/PlanetsCategory';
import PeopleCategory from './components/PeopleCategory';
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
