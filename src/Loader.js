import React from 'react';
import './Loader.css';
import { NULL_IMAGE } from './Constants';

const Loader = ({ imageFile }) => {
  if (imageFile === NULL_IMAGE) {
    return null;
  }
  
  return (
    <div id="custom-page-loader">
      <img src={`${process.env.PUBLIC_URL}/images/${imageFile}`} alt="Loading" />
    </div>
  );
};

export default Loader;