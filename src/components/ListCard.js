import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListCard.css';
import PlaceholderImage from '../assets/placeholder-image.png';

function ListCard({ art }) {
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
        if(art.image_id) {
            fetch(`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`)
            .then((data) => {
                console.log(data);
                setImgSrc(data.url);
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
    }, [art]);

    return (
        <Link to={`/${art.id}`} className="card" key={art.id}>
            <h4>{art.title}</h4>
            <img src={art.image_id === null || art.image_id === undefined ? PlaceholderImage : imgSrc} alt={art.thumbnail?.alt} width={250} />
        </Link>
    )
}

export default ListCard;