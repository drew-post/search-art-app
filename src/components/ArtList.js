import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ArtList.css'

function ArtList() {
    const [artList, setArtList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const searchItems = () => {
        setIsLoading(true);
        fetch(`https://api.artic.edu/api/v1/artworks/search?q=${searchInput}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                setArtList(data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        setIsLoading(true);
        fetch("https://api.artic.edu/api/v1/artworks?page=1&limit=100")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                setArtList(data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="art-list">
            <h1>Art Database</h1>
            {isLoading ? <h2 className="art-loading">Loading...</h2> : 
                <div>
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
                </div>
            }
        </div>
    )
}

export default ArtList;