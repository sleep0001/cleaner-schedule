import React from 'react';
import './releasenote.css';

const V1_1_0 = () => {
	return (
		<div className='releasenote'>
			<h1>v1.1.0 リリースノート</h1>
			<hr />
			<ul>
				<li><strong>リリース日：</strong>2024年8月11日</li>
				<li><strong>リリースバージョン：</strong>v1.1.0</li>
			</ul>
			<h2>概要</h2>
			<hr />
			<p>v1.1.0では以下の機能を追加しています。</p>
			<ul>
				<li>当番交換機能</li>
				<li>交換に伴うログの取得機能</li>
				<li>ログの確認ページ</li>
				<li>リリースノートページの追加（本ページ）</li>
			</ul>
			<p>また、以下の調整や変更を行っています。</p>
			<ul>
				<li>日付セルの背景色を目に優しい色に変更</li>
				<li>データ取得元をフォルダ内からAWS上のデータベースに変更</li>
			</ul>
			<h2>交換機能</h2>
			<hr />
			<ul>
				<li>
					<h3>使い方</h3>
					<p>左上のトグルボタン（オンオフできるボタン）をオンにした状態で変更する日付を２つ選択します。</p>
					<p>その状態でCHANGEボタンを押下すると、2つの当番を交換できます。</p>
					<p>なお、日付の選択を誤った場合はその日付を再度選択することで選択解除できます。</p>
				</li>

				<li>
					<h3>注意点</h3>
					<p>今回追加された機能はあくまで交換する機能なので、当番を押し付ける場面は想定していません。</p>
					<p>そのような状況には手動リクエストで対応します。</p>
					<p>また、交換する際にはログを取得できるように設計しています。不要なリクエストはお控えください。</p>
					<p>挙動確認用としてテストレコードを6月4日と6月5日に残しておきますのでそちらは自由に使って貰って構いません。</p>
				</li>
			</ul>
			<h2>お願い</h2>
			<hr />
			<p>不具合や障害、機能要望などありましたらご教示ください。</p>
			<p>特に機能要望を餌に生活しておりますのでよろしくお願いいたします。</p>
		</div>
	);
};

export default V1_1_0;
