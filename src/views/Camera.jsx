import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import GalleryIcon from '../assets/icon-pictures/gallery-icon.png';
import BrollopFotoLogo from "../assets/icon-pictures/brollop-foto-logo.png";
import { useCallback } from 'react';

export default function Camera() {
  const [isCameraDisabled, setIsCameraDisabled] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [notificationPermission, setNotificationPermission] = useState('default');
  const navigation = useNavigate();
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const handelClick = () => {
    navigation('/gallery');
  };

  const showNotification = useCallback(() => {
    if(notificationPermission !== 'granted') return;

    const notification = new Notification('Bröllopsfotografen', {
      body: "Saved! click here to go to the gallery",
      icon: BrollopFotoLogo
    });

    notification.onclick = function() {
      navigation('/gallery');
    };
  }, [notificationPermission, navigation]);

  // Notification Permissions
  useEffect(() => {
    if (!("Notification" in window)) {
      console.log('This browser does not support desktop notification');
    } else {
      Notification.requestPermission((result) => {
        if (result === 'granted') {
          setNotificationPermission('granted');
          console.log('permission granted');
        } else if (result === 'denied') {
          setNotificationPermission('denied');
          console.log('permission denied');
        } else {
          setNotificationPermission('default');
          console.log('permission dismissed');
        }
      });
    }
  }, []);

  useEffect(() => {
    const getUserCamera = () => {
      navigator.mediaDevices.getUserMedia({
        video: true,
      })
        .then((stream) => {
          const video = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getUserCamera();
  }, [videoRef]);

  useEffect(()=>{
    navigator.permissions.query({ name: "camera" }).then(res => {
      if(res.state === "granted"){
        setIsCameraDisabled(false);
      } else {
        setIsCameraDisabled(true);
      }
    });
  }, []);
  
  useEffect(() => {
    if (photo) {
      let gallery = [];
      if (localStorage.getItem('gallery')) {
        gallery = JSON.parse(localStorage.getItem('gallery'));
      }
      gallery.push(photo);
      showNotification();
      localStorage.setItem('gallery', JSON.stringify(gallery));
    }
  }, [photo, showNotification]);

  const captureHandler = () => {
    let video = videoRef.current;
    let width = video.clientWidth;
    let height = video.clientHeight;
    let photoCanvas = photoRef.current;
    photoCanvas.width = width;
    photoCanvas.height= height;
    let context = photoCanvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height);
    const imageURL = photoCanvas.toDataURL("image/png");
    setPhoto(imageURL);
  };

  return (
    <div className="camera-container">
      <div className="icon-holder" onClick={handelClick}>
        <img src={GalleryIcon} alt="" className="icon-gallery" />
      </div>

      <div className="camera">
        {photo ? null : <video ref={videoRef} autoPlay className="camera-screen" />}
        <canvas ref={photoRef}></canvas>
      </div>

      {isCameraDisabled && 
        <div>
          enable camera 
        </div>
      }

      <div className="btn-div">
        {!photo ? <button className="camera-btn" onClick={captureHandler}>Föreviga ett ögonblick</button>:<NavLink to="/gallery" className="camera-btn">Fånga ett nytt ögonblick</NavLink>}
      </div>
    </div>
  );
}
