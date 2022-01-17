import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPlanets } from "../redux/actions/dataActions";
import { Link } from "react-router-dom";
import "../components/itemcomponent.css";
import Pagination from "../components/Pagination";
import './itemdetail.css'

const PlanetsCategory = () => {
  const planets = useSelector((state) => state.allPlanets.planets);
  const dispatch = useDispatch();
  console.log(planets);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [planetsPerPage] = useState(3); 

  const fetchPlanets = async () => {
    setLoading(true);
    const planetsResponse = await axios
      .get("https://swapi.py4e.com/api/planets/")
      .catch((error) => {
        console.log(error);
      });
    dispatch(setPlanets(planetsResponse.data.results));
  };

  useEffect(() => {
    fetchPlanets();
    setLoading(false);
  }, []);

  // Get current posts
  const indexOfLastPlanet = currentPage * planetsPerPage;
  const indexOfFirstPlanet = indexOfLastPlanet - planetsPerPage;
  const currentPlanets = planets.slice(indexOfFirstPlanet, indexOfLastPlanet);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <div className="grid-1">
          {currentPlanets &&
            currentPlanets.map((planet) => {
              const { created, name, url } = planet;
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
