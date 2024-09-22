import React from 'react';
import './releasenote.css';

const V1_2_0 = () => {
	return (
		<div className='releasenote'>
			<h1>v1.2.0 リリースノート</h1>
			<hr />
			<ul>
				<li><strong>リリース日：</strong>2024年9月22日</li>
				<li><strong>リリースバージョン：</strong>v1.2.0</li>
			</ul>
			<h2>概要</h2>
			<hr />
			<p>v1.2.0では以下の機能を追加しています。</p>
			<ul>
				<li>7グループ対応</li>
				<li>アクセス時、交換ボタン押下時のロード画面を追加</li>
				<li>リリースノートページの追加（本ページ）</li>
			</ul>
			<p>また、以下の調整や変更を行っています。</p>
			<ul>
				<li>カレンダーの月遷移UIを改善</li>
				<li>ログページのBeforeとAfterが逆になっていた不具合を修正</li>
				<li>交換時のポップアップ画面「OK」の連打による複数ログ生成の防止対応</li>
			</ul>
			<h2>お願い</h2>
			<hr />
			<p>不具合や障害、機能要望などありましたらご教示ください。</p>
			<p>特に機能要望を餌に生活しておりますのでよろしくお願いいたします。</p>
		</div>
	);
};

export default V1_2_0;
