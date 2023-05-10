import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Art() {
    const { id } = useParams();
    const [art, setArt] = useState([]);
    const [imgSrc, setImgSrc] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://api.artic.edu/api/v1/artworks/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                setArt(data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        // FIX: only call when art is loaded
        fetch(`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`)
            .then((data) => {
                console.log(data);
                setImgSrc(data.url);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [art]);

    return (
        <>
            {isLoading ? <h1>Loading...</h1> : <><h1>{art.title} - {art.date_display}</h1>
                <><h2>{art.artist_title}</h2><p>{art.dimensions}</p></>
                {art.inscriptions !== "none" && <p>{art.inscriptions}</p>}
                <img src={imgSrc} alt={art.thumbnail?.alt} width={500} /></>}
        </>
    )

}

export default Art;