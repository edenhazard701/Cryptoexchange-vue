var PushManager = {};
PushManager.receiverCallback = {};

PushManager.receiveMessage = function(receiver, data)
{
// 	console.log('push', data);
	if(!!data && typeof data == 'String') {
		data = JSON.parse(data);
	};
// 	console.log('push', data);
	if(this.receiverCallback[receiver]) {
		this.receiverCallback[receiver](data);
	};
};

PushManager.setCallback = function(receiver, callback) {
	this.receiverCallback[receiver] = callback;
};

PushManager.getPushToken = function(callback) {
	cordova.exec( function(result)
	{ 
		callback(result);
	} , null, "FirebasePlugin" , "getPushToken", []);
};