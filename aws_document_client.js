const AWS = require('aws-sdk');

// AWSのリージョン設定（必要に応じて変更）
AWS.config.update({ region: 'ap-northeast-1' });

// DocumentClientのインスタンスを作成
const params = {
	TableName: 'Events',
	Item: {
		user_id: 1,
		event_date: '2024-07-05',
		event_detail: 'Meeting with team'
	}
};

docClient.put(params, (err, data) => {
	if (err) {
		console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
	} else {
		console.log("Added item:", JSON.stringify(data, null, 2));
	}
});

