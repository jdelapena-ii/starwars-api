/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPeople } from "../redux/actions/dataActions";
import { Link } from "react-router-dom";

import Pagination from "../components/Pagination";
import Input from "../components/Input";
import Select from "../components/Select";

import './itemdetail.css'
import "../components/itemcomponent.css";

const PeopleCategory = () => {
  const people = useSelector((state) => state.allPeople.people);
  const dispatch = useDispatch();
  console.log(people);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [peoplePerPage] = useState(3);
  const [search, setSearch] = useState("");

  const fetchPlanets = async () => {
    setLoading(true);
    const peopleResponse = await axios
      .get("https://swapi.py4e.com/api/people/")
      .catch((error) => {
        console.log(error);
      });
    dispatch(setPeople(peopleResponse.data.results));
    setLoading(false);
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

  // Set person eye color as filter criteria
  const eyecolor = ['all', ...new Set(people.map((planet) => planet.eye_color))];

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();

    console.log(search);
    if (!search) {
      dispatch(setPeople(people));
      return;
    }

    const results = people.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.created.toLowerCase().includes(search)
    );

    dispatch(setPeople(results));
  };

  // Filter handler
  const handleFilter = (eyecolor) => {
    if (eyecolor === 'all') {
      dispatch(setPeople(people));
      return;
    }

    const results = people.filter((planet) => planet.eye_color === eyecolor);

    dispatch(setPeople(results));
  };

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

           {/* Filter & search section */}
          <div>
            <form onSubmit={handleSearch} style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
              <Select
                label="Eye Colors:"
                options={eyecolor}
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
            {currentPeople &&
              currentPeople.map((person) => {
                const { created, name, url, eye_color } = person;
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
                      <p className="value">Eye Color: {eye_color} </p>
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
