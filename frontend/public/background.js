var seconds = 0;
var interval = null;
var appUpdate = null;

function Start(updateMethod) {
  if (!interval) interval = setInterval(Update, 1000);
  appUpdate = updateMethod;
}

function Stop() {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }
}

function Reset() {
  Stop();
  seconds = 0;
}

function Update() {
  seconds += 1;
  // Ensure appUpdate is method and if so, call it
  if (appUpdate) appUpdate(seconds);
}
