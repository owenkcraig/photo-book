import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function ArtIndex() {

    const [materials, setMaterials] = useState(['brass (alloy)', 'wood (plant material)', 'clay', 'marble (rock)']);
    const [menuItems, setMenuItems] = useState([]);

    useEffect( () => {
        const promises = [];
        // API Key for Rijksmuseum
        const apiKey = `9kEp41uF`;

        // loop through our materials
        materials.forEach( (material) => {
            // build an endpoint for each matrial
            const url = new URL('https://www.rijksmuseum.nl/api/en/collection');
            url.search = new URLSearchParams({
                key: apiKey,
                format: "json",
                imgonly: true,
                material: material,
                ps: 1
            });
            // create a promise for that endpoint
            const fetchPromise = fetch(url);
            // push that endpoint to an array
            promises.push(fetchPromise);
        });
        
        // wait until all fetch requests are finished
        Promise.all(promises)
        .then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(responses.map(function (response) {
                    return response.json();
            }));
        }).then(function (data) {
            // map the array of responses to return an array of the art objects
            const newIndex = data.map( (eachResponseObject) => {
                return eachResponseObject.artObjects[0];
            })
            materials.forEach( (material, index) => {
                newIndex[index].material = material;
            })

            // push the array of art objects to state
            setMenuItems(newIndex);
        }).catch(function (error) {
            // if there's an error, log it
            console.log(error);
        });
        
    }, []);

    return (
        <>
            <h2>Choose your art type</h2>
                {menuItems.map((artwork, index) => {
                    return (
                        <Link to={`/material/${artwork.material}`} key = {index}>
                            <div>
                                <img key={artwork.id} src={artwork.webImage.url} alt={artwork.title} data={artwork.material} />
                                <h3>{artwork.material}</h3>
                            </div>
                        </Link>
                    );
            })}
        </>

    )
}

export default ArtIndex;