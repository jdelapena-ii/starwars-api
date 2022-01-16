import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPlanets } from "../redux/actions/dataActions";
import { Link } from "react-router-dom";
import "./itemcomponent.css";
import Pagination from "./Pagination";

const PlanetsCategory = () => {
  const planets = useSelector((state) => state.allPlanets.planets);
  const dispatch = useDispatch();
  console.log(planets);

  const [currentPage, setCurrentPage] = useState(1);
  const [planetsPerPage] = useState(3);

  const fetchPlanets = async () => {
    const planetsResponse = await axios
      .get("https://swapi.py4e.com/api/planets/")
      .catch((error) => {
        console.log(error);
      });
    dispatch(setPlanets(planetsResponse.data.results));
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

  return (
    <>
      <div className="container" style={{ margin: "50px 30px" }}>
        <div style={{ margin: "30px 10px", fontSize: "50px" }}>
          All Planets!
        </div>
        <div className="grid">
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
                    <div>
                      <p>{name}</p>
                      <p>Created on: {created}</p>
                      <p>Item url: {url}</p>
                    </div>
                  </Link>
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
    </>
  );
};

export default PlanetsCategory;
