/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPlanets } from "../redux/actions/dataActions";
import { Link } from "react-router-dom";


import Pagination from "../components/Pagination";
import Input from "../components/Input";
import Select from "../components/Select";

import "../components/itemcomponent.css";
import './itemdetail.css'

const PlanetsCategory = () => {
  const planets = useSelector((state) => state.allPlanets.planets);
  const dispatch = useDispatch();
  console.log(planets);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [planetsPerPage] = useState(3); 
  const [search, setSearch] = useState("");

  const fetchPlanets = async () => {
    setLoading(true);
    const planetsResponse = await axios
      .get("https://swapi.py4e.com/api/planets/")
      .catch((error) => {
        console.log(error);
      });
    dispatch(setPlanets(planetsResponse.data.results));
    setLoading(false);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  // Get current posts
  const indexOfLastPlanet = currentPage * planetsPerPage;
  const indexOfFirstPlanet = indexOfLastPlanet - planetsPerPage;
  const currentPlanets = planets.slice(indexOfFirstPlanet, indexOfLastPlanet);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  // Set planet climate as filter criteria
  const climates = ['all', ...new Set(planets.map((planet) => planet.climate))];

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();

    console.log(search);
    if (!search) {
      dispatch(setPlanets(planets));
      return;
    }

    const results = planets.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.created.toLowerCase().includes(search)
    );

    dispatch(setPlanets(results));
  };

  // Filter handler
  const handleFilter = (climate) => {
    if (climate === 'all') {
      dispatch(setPlanets(planets));
      return;
    }

    const results = planets.filter((planet) => planet.climate === climate);

    dispatch(setPlanets(results));
  };
  

  return (
    <>
      {
        loading ?  
        <h1 style={{fontSize: '100px',}}>Loading...</h1>
       : 
       <div className="container" style={{ margin: "50px 30px" }}>
        <div style={{ margin: "30px 20px", fontSize: "50px", lineHeight: '1em', }}>
          All Planets!
        </div>

        {/* Filter & search section */}
        <div>
          <form onSubmit={handleSearch} style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
            <Select
              label="Types of Climates:"
              options={climates}
              setIndex={() => {}}
              setItemsToShow={handleFilter}
              
            />
            
            <Input
              handleChange={(e) => setSearch(e.target.value)}
              value={search}
              name="search"
              placeholder="Search any keyword"
              style={{marginRight: '10px'}}
            />
            <button type="submit">Enter</button>
          </form>
        </div>

        <div className="grid-1">
          {currentPlanets &&
            currentPlanets.map((planet) => {
              const { created, name, url, climate } = planet;
              const category = url.split("/")[4];
              const itemId = url.split("/")[5];

              return (
                <div
                  className="card"
                  key={created}
                  style={{ borderColor: "red" }}
                >
                  <Link to={`/item/${category}/${itemId}`}>
                    <p className="title">{name}</p>
                  </Link>
                  <div style={{marginTop: '20px'}}> 
                    <p className="label">Created on</p>
                    <p className="value">{created}</p>
                    <p className="label">Item url</p>
                    <p className="value">{url}</p>
                    <p className="value">Climate: {climate}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <Pagination
          postsPerPage={planetsPerPage}
          totalPosts={planets.length}
          paginate={paginate}
        />
        </div>
      }
    </>
  );
};

export default PlanetsCategory;
