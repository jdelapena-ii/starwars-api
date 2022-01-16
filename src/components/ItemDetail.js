import React, {useEffect} from 'react';
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectedItem } from '../redux/actions/dataActions';

const ItemDetail = ({url}) => {
    // const { itemId } = useParams();
    const item = useSelector((state) => state.selectedItem);
    const dispatch = useDispatch();
    // console.log(itemId);
    console.log(item);

    const fetchItemDetail = async () => {
        const response = await axios.get(`${url}`)
            .catch(error => {
                console.log(error);
            })
        dispatch(selectedItem(response))    
    }

    useEffect(() => {
        fetchItemDetail();
    }, [])





    // const fetchItemDetail = async () => {
    //     const planetsurl = `https://swapi.py4e.com/api/planets/${itemId}`;
    //     const peopleurl = `https://swapi.py4e.com/api/people/${itemId}`;

    //     const planetsresponse = await axios.get(planetsurl)
    //         .catch((error) => {
    //             console.log("Error here!", error)
    //         });

    //     const peopleresponse = await axios.get(peopleurl)
    //         .catch((error2) => {
    //             console.log("Error 2", error2)
    //         })

    //     const planetsUrl = planetsresponse
    //     const peopleUrl = peopleresponse

    //     const combinedUrl = [...planetsUrl, ...peopleUrl] 

    //      dispatch(selectedItem(combinedUrl))   
    // }

    // useEffect(() => {
    //     if(itemId && itemId !== "")
    //     fetchItemDetail();
    // }, [])


    
    return(
        <div>
            <h1>Item Detail</h1>
        </div>
    )
}

export default ItemDetail