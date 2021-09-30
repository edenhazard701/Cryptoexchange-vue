function NetworkIO(t) {
  this.listener = t, this.retryCount = 0, this.retryTime = 0, this.curCount = 0, this.selfClose = !1
}
NetworkIO.RETRY_CHECK_TIME = 3e3, NetworkIO.FULL_RETRY_TIME = 15e3, NetworkIO.prototype.isStart = function () {
  return !1
}, NetworkIO.prototype.setIoListener = function (t) {
  this.listener = t
}, NetworkIO.prototype.enableRetry = function (t) {
  this.retryCount = t
}, NetworkIO.prototype.startIO = function (t, e) {}, NetworkIO.prototype.stopIO = function (t) {}, NetworkIO.prototype.sendData = function (t, e) {};
NetworkIO.prototype.onReceived = function (t, e) {
  this.listener && this.listener.onReceived(t, e)
}, NetworkIO.prototype.onClosed = function () {
  this.listener && this.listener.onClosed()
}, NetworkIO.prototype.onConnected = function (t) {
  this.listener && this.listener.onConnected(t)
}, NetworkIO.prototype._onConnected = function (t) {
  if (t) this.curCount = 0, this.onConnected(!0);
  else if (0 == this.curCount && (this.retryTime = (new Date).getTime()), ++this.curCount >= this.retryCount) this.curCount = 0, this.onConnected(!1), this.stopIO(!0);
  else {
    if ((new Date).getTime() - this.retryTime > NetworkIO.FULL_RETRY_TIME) return this.curCount = 0, this.onConnected(!1), void this.stopIO(!0);
    var e = this;
    setTimeout(function () {
      e.stopIO(!0), e.startIO(e.address, e.port)
    }, NetworkIO.RETRY_CHECK_TIME)
  }
};