import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectedItem } from "../redux/actions/dataActions";

const ItemDetail = ({ url }) => {
  const { category, itemId } = useParams();
  const item = useSelector((state) => state.selectedItem);
  const dispatch = useDispatch();

  console.log(item);

  const fetchItemDetail = async () => {
    const planetsurl = `https://swapi.py4e.com/api/${category}/${itemId}`;

    const planetsresponse = await axios.get(planetsurl).catch((error) => {
      console.log("Error here!", error);
    });

    dispatch(selectedItem(planetsresponse.data));
  };

  useEffect(() => {
    if (itemId && itemId !== "") fetchItemDetail();
  }, []);

  return (
    <div>
      <h1>Item Detail</h1>
      <h1>{item.name}</h1>
    </div>
  );
};

export default ItemDetail;
