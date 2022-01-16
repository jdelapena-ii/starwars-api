import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPeople } from "../redux/actions/dataActions";
import { Link } from "react-router-dom";
import "./itemcomponent.css";
import Pagination from "./Pagination";

const PeopleCategory = () => {
  const people = useSelector((state) => state.allPeople.people);
  const dispatch = useDispatch();
  console.log(people);

  const [currentPage, setCurrentPage] = useState(1);
  const [peoplePerPage] = useState(3);

  const fetchPlanets = async () => {
    const peopleResponse = await axios
      .get("https://swapi.py4e.com/api/people/")
      .catch((error) => {
        console.log(error);
      });
    dispatch(setPeople(peopleResponse.data.results));
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  // Get current posts
  const indexOfLastPerson = currentPage * peoplePerPage;
  const indexOfFirstPerson = indexOfLastPerson - peoplePerPage;
  const currentPeople = people.slice(indexOfFirstPerson, indexOfLastPerson);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container" style={{ margin: "50px 30px" }}>
        <div style={{ margin: "30px 10px", fontSize: "50px" }}>
          All People Baby!
        </div>
        <div className="grid">
          {currentPeople &&
            currentPeople.map((person) => {
              const { created, name, url } = person;
              const category = url.split("/")[4];
              const itemId = url.split("/")[5];
              console.log(itemId);
              return (
                <div
                  className="card"
                  key={created}
                  style={{ borderColor: "green" }}
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
          postsPerPage={peoplePerPage}
          totalPosts={people.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default PeopleCategory;
