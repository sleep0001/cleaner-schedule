import React from 'react';
import './releasenote.css';

const V1_0_0 = () => {
  return (
    <div className='releasenote'>
      <h1>v1.0.0 リリースノート</h1>
      <hr></hr>
      <ul>
        <li>リリース日</li>
        <p>2024年7月2日</p>
        <li>リリースバージョン</li>
        <p>v1.0.0</p>
      </ul>
      <h1>概要</h1>
      <hr></hr>
      <p>v1.0.0では以下の機能を追加しています。</p>
      <ul>
        <li>当番表新規作成</li>
      </ul>
    </div>
  );
};

export default V1_0_0;
