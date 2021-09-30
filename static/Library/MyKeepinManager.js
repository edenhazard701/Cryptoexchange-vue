var MyKeepinManager = {};

MyKeepinManager.delegatorObj = {};

MyKeepinManager.receiverCallback = {};

MyKeepinManager.setDelegator = function(delegator)
{
    // alert("setDele:"+delegator.chartDivName);
    MyKeepinManager.delegatorObj[delegator.mykeepinDivName] = delegator;
};

MyKeepinManager.removeDelegator = function(delegator)
{
    delete MyKeepinManager.delegatorObj[delegator.mykeepinDivName];
};

MyKeepinManager.onMyKeepinRecvData = function(Id, state, type, code) //MyKeepinID
{
    var delegator = MyKeepinManager.delegatorObj[Id];
    
    if(delegator && delegator.onMyKeepinRecvData)
        delegator.onMyKeepinRecvData(state, type, code);
}

MyKeepinManager.receiveMessage = function(receiver, data)
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

MyKeepinManager.setCallback = function(receiver, callback) {
	this.receiverCallback[receiver] = callback;
};

MyKeepinManager.getPushToken = function(callback) {
	cordova.exec( function(result)
	{ 
		callback(result);
	} , null, "FirebasePlugin" , "getPushToken", []);
};