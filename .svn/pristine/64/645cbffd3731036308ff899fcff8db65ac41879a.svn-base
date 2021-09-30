var DataManager = {};

DataManager.delegatorObj = {};

DataManager.receiverCallback = {};

DataManager.setDelegator = function(delegator)
{
    // alert("setDele:"+delegator.chartDivName);
    DataManager.delegatorObj[delegator.dataDivName] = delegator;
};

DataManager.removeDelegator = function(delegator)
{
    delete DataManager.delegatorObj[delegator.dataDivName];
};

DataManager.onPostCodeRecvData = function(Id, arg1, arg2, arg3)
{
    var delegator = DataManager.delegatorObj[Id];
    
    if(delegator && delegator.onPostCodeRecvData)
        delegator.onPostCodeRecvData(arg1, arg2, arg3);
}

DataManager.receiveMessage = function(receiver, data)
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

DataManager.setCallback = function(receiver, callback) {
	this.receiverCallback[receiver] = callback;
};