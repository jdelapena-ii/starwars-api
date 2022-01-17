/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPeople } from "../redux/actions/dataActions";
import { Link } from "react-router-dom";
import "../components/itemcomponent.css";
import Pagination from "../components/Pagination";

const PeopleCategory = () => {
  const people = useSelector((state) => state.allPeople.people);
  const dispatch = useDispatch();
  console.log(people);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [peoplePerPage] = useState(3);

  const fetchPlanets = async () => {
    setLoading(true);
    const peopleResponse = await axios
      .get("https://swapi.py4e.com/api/people/")
      .catch((error) => {
        console.log(error);
      });
    dispatch(setPeople(peopleResponse.data.results));
  };

  useEffect(() => {
    fetchPlanets();
    setLoading(false);
  }, []);

  // Get current posts
  const indexOfLastPerson = currentPage * peoplePerPage;
  const indexOfFirstPerson = indexOfLastPerson - peoplePerPage;
  const currentPeople = people.slice(indexOfFirstPerson, indexOfLastPerson);

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
            All People Baby!
          </div>
          <div className="grid-1">
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
            postsPerPage={peoplePerPage}
            totalPosts={people.length}
            paginate={paginate}
          />
        </div>
      }
      
    </>
  );
};

export default PeopleCategory;
