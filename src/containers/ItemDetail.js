import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectedItem } from "../redux/actions/dataActions";
import {Card} from 'react-bootstrap';
import './itemdetail.css'

const ItemDetail = () => {
  const [loading, setLoading] = useState(false);
  const { category, itemId } = useParams();
  const item = useSelector((state) => state.selectedItem);
  const dispatch = useDispatch();

  console.log(item);

  const fetchItemDetail = async () => {
    setLoading(true);
    const planetsurl = `https://swapi.py4e.com/api/${category}/${itemId}`;

    const planetsresponse = await axios.get(planetsurl).catch((error) => {
      console.log("Error here!", error);
    });

    dispatch(selectedItem(planetsresponse.data));
  };

  useEffect(() => {
    if (itemId && itemId !== "") fetchItemDetail();
    setLoading(false);
  }, []);

  return (
    <div className="flex">
    {
      loading ?
      <h1 style={{fontSize: '100px',}}>Loading...</h1>
      :
      <Card className="card">
        <Card.Body>
          <Card.Header as="h2">Item Detail</Card.Header>
          <Card.Title className="title">{item.name}</Card.Title>
          <p className="label">Created on</p>
          <Card.Text className="value">{item.created}</Card.Text>
          <p className="label">Item url</p>
          <Card.Text className="value">{item.url}</Card.Text>
        </Card.Body>
      </Card>
    }
    </div>
  );
};

export default ItemDetail;
