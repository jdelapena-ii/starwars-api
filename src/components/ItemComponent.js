import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./itemcomponent.css";

const ItemComponent = () => {
  const items = useSelector((state) => state.allItems.items);

  return (
    <>
      <div className="container" style={{ margin: "50px 30px" }}>
        <div className="grid">
          {items &&
            items.map((item) => {
              const { created, name, url } = item;
              const ownURL = url.split("/").slice(-3).join("/");
              console.log(ownURL);
              return (
                <div className="card" key={created}>
                  <Link to={`item/${ownURL}`}>
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
      </div>
    </>
  );
};

export default ItemComponent;
