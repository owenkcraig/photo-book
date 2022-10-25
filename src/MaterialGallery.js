import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function MaterialGallery() {
    // access params from browser bar
    const { materialName } = useParams();

    // build state to store API results
    const [art, setArt] = useState([]);

    // load gallery of images from Rijksmuseum API
    useEffect( () => {
        // API Key for Rijksmuseum
        const apiKey = `9kEp41uF`;

        const url = new URL('https://www.rijksmuseum.nl/api/en/collection');
        url.search = new URLSearchParams({
                key: apiKey,
                format: "json",
                imgonly: true,
                material: materialName,
                ps: 10
            });

        fetch(url)
            .then(function(response){
                return response.json();
            })
            .then(function(jsonResult){
                setArt(jsonResult.artObjects);
        })
        
    }, [])

    return (
        <>
            <h3>{ materialName }</h3>
                {art.map((artwork, index) => {
                    return (
                        <div key={index}>
                            <img key={artwork.id} src={artwork.webImage.url} alt={artwork.title} data={artwork.material} />
                            <h3>{artwork.material}</h3>
                        </div>
                    );
            })}
            <Link to="/">Home</Link>
        </>
    )
}

export default MaterialGallery;