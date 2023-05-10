import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ArtList() {
    const [artList, setArtList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const searchItems = () => {
        fetch(`https://api.artic.edu/api/v1/artworks/search?q=${searchInput}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                setArtList(data.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        fetch("https://api.artic.edu/api/v1/artworks?page=1&limit=100")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                setArtList(data.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <>
            <input
                placeholder='Search...'
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={() => searchItems()}>Search</button>
            {
                artList.map((art) => (
                    <div key={art.id}>
                        <h4>
                            <Link to={`/${art.id}`}>
                                {art.title}
                            </Link>
                        </h4>
                    </div>
                ))
            }
        </>
    )
}

export default ArtList;