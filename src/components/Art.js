import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Art.css'

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
    }, [id]);

    useEffect(() => {
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
        <div className="art-details-container">
            <h4>
                <Link to={`/`}> Back </Link>
            </h4>
            {isLoading ? <h2>Loading...</h2> : 
                <div className="art-details">
                    <div className="art-info">
                        <h1>{art.title}, {art.artist_title}</h1>
                        <h2>{art.date_display}</h2>
                        <p><b>Style:</b> {art.style_title === "none" || art.style_title === null ? "N/A" : art.style_title}</p>
                        <p><b>Dimensions:</b> {art.dimensions}</p>
                        <p><b>Medium Display:</b> {art.medium_display}</p>
                        <p><b>Inscriptions:</b> {art.inscriptions === "none" || art.inscriptions === null ? "N/A" : art.inscriptions}</p>
                        <p><b>Publication History:</b> {art.publication_history === "none" || art.publication_history === null ? "N/A" : art.publication_history}</p>
                        <p><b>Exhibition History:</b> {art.exhibition_history === "none" || art.exhibition_history === null ? "N/A" : art.exhibition_history}</p>
                    </div>
                    <br />
                    <img src={imgSrc} alt={art.thumbnail?.alt} width={500} />
                </div>
            }
        </div>
    )

}

export default Art;