import './App.css';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ItemListing from './containers/ItemListing';
import ItemDetail from './containers/ItemDetail';
import PlanetsCategory from './containers/PlanetsCategory';
import PeopleCategory from './containers/PeopleCategory';

function App() {

  return (
    <div className="App">
      <Router>
        <Link to="/">
         <Header />
        </Link>
       <Routes>
        <Route path="/" element={<ItemListing />} />
        <Route path="/item/:category/:itemId" element={<ItemDetail />} />
        <Route path="/planets" element={<PlanetsCategory />} />
        <Route path="/people" element={<PeopleCategory />} />
        <Route>404 Not Found</Route>
       </Routes>
      </Router>
    </div>
  );
}

export default App;
