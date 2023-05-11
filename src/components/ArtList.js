import React, { useState, useEffect } from 'react';
import ListCard from './ListCard';
import './ArtList.css';

function ArtList() {
    const [artList, setArtList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const filters = ["Americas", "Ancient", "Landscapes", "Impressionism", "Photography", "Mythology"];

    const searchItems = () => {
        setIsLoading(true);
        fetch(`https://api.artic.edu/api/v1/artworks/search?q=${searchInput}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data)
                setArtList(data.data);
                setIsLoading(false);
            })
            .catch ((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        setIsLoading(true);
        fetch("https://api.artic.edu/api/v1/artworks?page=1&limit=50")
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
            <p>Search and learn about art provided by the Art Institute of Chicago.</p>
            <div className="search-bar">
                <input
                    placeholder='Search...'
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button onClick={() => searchItems()}>Search</button>
            </div>
            <div className="filters">
                {
                    filters.map((filter) => (
                        <button onClick={() => { setSearchInput(filter); setArtList(artList.filter(art => art.style_titles.includes(filter.toLowerCase()) || art.subject_titles.includes(filter.toLowerCase())))}}>{filter}</button>
                    ))
                }
            </div>
            {isLoading ? <h2 className="art-loading">Loading...</h2> :
                <div className="art-cards">
                    {
                        artList.map((art) => (
                            <ListCard art={art} />
                        ))
                    }
                </div>
            }
        </div>
    );
}

export default ArtList;