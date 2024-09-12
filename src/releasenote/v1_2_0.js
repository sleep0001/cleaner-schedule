import React from 'react';
import './releasenote.css';

const V1_2_0 = () => {
  return (
    <div className='releasenote'>
      <h1>v1.2.0 リリースノート</h1>
      <hr></hr>
      <ul>
        <li><strong>リリース日：</strong>2024年9月22日</li>
        <li><strong>リリースバージョン：</strong>v1.2.0</li>
      </ul>
      <h1>概要</h1>
      <hr></hr>
      <p>v1.2.0では以下の機能を追加しています。</p>
      <ul>
        <li>7グループ対応</li>
        <li>交換ボタン押下時のアニメーション追加</li>
        <li>リリースノートページの追加（本ページ）</li>
      </ul>
      <p>また、以下の調整や変更を行っています。</p>
      <ul>
        <li>ログページのBeforeとAfterが逆になっていたバグを修正</li>
        <li>交換時のポップアップ画面で「OK」を高速で押下した際に複数のログが登録されてしまうバグを修正</li>
      </ul>

      <h1>お願い</h1>
      <hr></hr>
      <p>不具合や障害、機能要望などありましたらご教示ください。</p>
      <p>特に機能要望を餌に生活しておりますのでよろしくお願いいたします。</p>
    </div>
  );
};

export default V1_2_0;
