import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ItemComponent from './ItemComponent';
import { setItems } from '../redux/actions/dataActions'
import axios from 'axios'
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const ItemListing = () => {
    const items = useSelector((state) => state.allItems.items)
    const dispatch = useDispatch();
    console.log(items);

    const fetchItems = async() => {
        const planetsapi = "https://swapi.py4e.com/api/planets/";
        const peopleapi = "https://swapi.py4e.com/api/people/"

        const planetsresponse = await axios.get(planetsapi)
            .catch((error) => {
                console.log("Error", error)
            });
        const peopleresponse = await axios.get(peopleapi)
            .catch((error2) => {
                console.log("Error 2", error2)
            })
        const planetsArray = planetsresponse.data.results
        const peopleArray = peopleresponse.data.results

        const combinedArrays = [...planetsArray, ...peopleArray]    
        
        dispatch(setItems(combinedArrays));
    }

    useEffect(() => {
        fetchItems();
    }, []);

    // const handleFilter = (category) => {
    //     if (category === 'All') {
    //       dispatch(setItems(items))
    //       return;
    //     }
    
    //     const planetresults = items.Object.keys === "rotation_period";
    
    //     setItems(planetresults);
    // };


    return(
        <div>
            {/* <div>
                <select
                    name="search"
                    label="Search"
                    
                >
                    <option>All Items</option>
                    <option>People</option>
                    <option>Planets</option>
                </select>    
            </div> */}
            <ItemComponent />
        </div>
    )
}

export default ItemListing