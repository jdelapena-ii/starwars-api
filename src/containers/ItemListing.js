/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ItemComponent from "../components/ItemComponent";
import { setItems } from "../redux/actions/dataActions";
import axios from "axios";

const ItemListing = () => {
  const [loading, setLoading] = useState(false);

  const items = useSelector((state) => state.allItems.items);
  const dispatch = useDispatch();
  console.log(items);

  const fetchItems = async () => {
    setLoading(true);
    const planetsapi = "https://swapi.py4e.com/api/planets/";
    const peopleapi = "https://swapi.py4e.com/api/people/";

    const planetsresponse = await axios.get(planetsapi).catch((error) => {
      console.log("Error", error);
    });
    const peopleresponse = await axios.get(peopleapi).catch((error2) => {
      console.log("Error 2", error2);
    });
    const planetsArray = planetsresponse.data.results;
    const peopleArray = peopleresponse.data.results;

    const combinedArrays = [...planetsArray, ...peopleArray];

    dispatch(setItems(combinedArrays));
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      { loading ?  
        <h1 style={{fontSize: '100px',}}>Loading...</h1>
       : 
       <ItemComponent />
      }
    </div>
  );
};

export default ItemListing;
