import React, { Component } from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div id="custom-page-loader">
      <img src={`${process.env.PUBLIC_URL}/images/loadingcat.gif`} alt="Loading" />
    </div>
  );
};

export default Loader;