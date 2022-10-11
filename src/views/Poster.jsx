import React from 'react';
import { useNavigate } from 'react-router-dom';
import BrollopFotoLogo from '../assets/icon-pictures/brollop-foto-logo.png';

export default function Poster() {
  const navigation = useNavigate();

  return (
    <div
      onClick={() => {
        console.log('testing');
        navigation('/camera');
      }}
      className="container"
    >
      <div className="poster">
        <img src={BrollopFotoLogo} alt="" className="logo" />
        <h1 className=".app-title">Bröllopsfotografen</h1>
      </div>

    </div>
  );
}
