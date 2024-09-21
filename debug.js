// debug.js
function debug(msg, level) {
  var Global = this;
  if (!(Global.isDebug && Global.console && Global.console.log)) {
    return;
  }
  level = level || "info";
  Global.console.log(level + ": " + msg);
}
