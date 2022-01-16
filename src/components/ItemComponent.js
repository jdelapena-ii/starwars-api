import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { itemReducer } from '../redux/reducers/itemReducer';
// import { Container, Row, Col, Card } from 'react-bootstrap';
import './itemcomponent.css'

const ItemComponent = () => {
    const items = useSelector((state) => state.allItems.items)

    return(
        <>
            <div className='container' style={{margin: '50px 30px', }}>
                <div className='grid'>
                    {
                        items && items.map(item => {
                            const { created, name, url, id } = item;
                                return(
                                    <div className="card" key={created}>
                                        <Link to={`/item/${created}`}>
                                            <div>
                                                <p>{name}</p>
                                                <p>Created on: {created}</p>
                                                <p>Item url: {url}</p> 
                                            </div>
                                        </Link>
                                     </div>   
                                )
                        })
                    }   
                </div>
            </div>
        </>

    )
}

export default ItemComponent