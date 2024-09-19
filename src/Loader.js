import React from 'react';
import './Loader.css';

const Loader = ({ loadType }) => {
  if (loadType == null) {
    console.log("loadType:null")
    return null;
  }
  
  return (
    <div id="custom-page-loader">
      <img src={`${process.env.PUBLIC_URL}/images/${loadType}`} alt="Loading" />
    </div>
  );
};

export default Loader;