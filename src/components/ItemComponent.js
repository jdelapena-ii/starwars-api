import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./itemcomponent.css";
import { setItems } from "../redux/actions/dataActions";
import Input from '../components/Input';

const ItemComponent = () => {
  const items = useSelector((state) => state.allItems.items);
  const [search, setSearch] = useState('');
  console.log(items);

  // Search
  const handleSearch = (e) => {
    e.preventDefault();

    console.log(search);
    if (!search) {
      setItems(items);
      return;
    }

    const results = items.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.created.toLowerCase().includes(search)
    );
  
    setItems(results);
    console.log(results);
    console.log(items);
  };

  return (
    <>
      <div className="container" style={{ margin: "50px 30px" }}>
        <div className="category">
          <Link to="/planets">
            <p>All Planets Here</p>
          </Link>
          <Link to="/people">
            <p>All People Here</p>
          </Link>
        </div>
        <div>
          <form onSubmit={handleSearch}>
            <Input 
              handleChange={(e) => setSearch(e.target.value)}
              value={search}
              name="search"
            />
            <button type="submit">
              Enter
            </button>
          </form>
        </div>
        <div className="grid">
          {items &&
            items.map((item) => {
              console.log(item);
              const { created, name, url } = item;
              const ownURL = url.split("/").slice(-3).join("/");
              console.log(ownURL);
              return (
                <div className="card" key={created}>
                  <Link to={`item/${ownURL}`}>
                    <p className="name">{name}</p>
                  </Link>
                  <div style={{marginTop: '20px'}}>
                    <p className="label">Created on: </p>
                    <p className="value">{created}</p>
                    <p className="label">Item url:</p>
                    <p className="value">{url}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ItemComponent;

