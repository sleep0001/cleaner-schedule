import React, { Component } from 'react';
import './Loader.css';

const cat = "cat";
const firstLoad = "firstLoad";

const Loader = ({ loadType }) => {
  if (loadType===null) {
    console.log("loadType:null")
    return null;
  }

  const getImage = (type) => {
    
    switch (type) {
      case firstLoad:
        return `${process.env.PUBLIC_URL}/images/firstLoading.gif`;
      case cat:
        return `${process.env.PUBLIC_URL}/images/loadingcat.gif`;
    }
  }
  
  return (
    <div id="custom-page-loader">
      <img src={getImage(loadType)} alt="Loading" />
    </div>
  );
};

export default Loader;