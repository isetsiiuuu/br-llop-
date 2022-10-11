import React, {useState, useEffect} from 'react';
import BrollopFotoLogo from "../assets/icon-pictures/brollop-foto-logo.png";
import CloseIcon from "../assets/icon-pictures/close-icon.png";
import { useNavigate } from "react-router-dom";
export default function Gallery() {
    const [galleryItems, setGalleryItems] = useState([]);
    let navigation = useNavigate();
    
    const handelClick = ()=>{
        navigation('/camera')
    }


    useEffect(() => {
        const gallery = JSON.parse(localStorage.getItem('gallery'));
        if (gallery) {
            setGalleryItems(gallery);
        }
    }, []);

    const handelDelete = (item) => () => {
        // const updatedGallery = galleryItems.filter(i => i !== item );
        const updatedGallery = galleryItems;
        for( var i = 0; i < updatedGallery.length; i++){ 
            if ( updatedGallery[i] === item) { 
                updatedGallery.splice(i, 1);
            }
        }
        setGalleryItems([...updatedGallery]);
        localStorage.setItem('gallery', JSON.stringify(updatedGallery));
    }

    return (
        <div className="gallery-page-container" >
            <div className="icon-holder"><img src={BrollopFotoLogo} alt="" onClick={handelClick} className="icon-camera"/></div>
            <div className="gallery-container" >
                {galleryItems.map((item, index) => <div key={`gallery-item-${index}`} className="gallery-item">
                    <img src={item} alt="" className="foto"/> 
                    <div onClick={handelDelete(item)}><img src={CloseIcon} alt="" className="close"/></div>
                </div>)}
            </div>

        </div>
    )
}