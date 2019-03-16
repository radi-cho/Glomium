var seconds = 0;
var interval = null;
var appUpdate = null;

function Start() {
  if (!interval) interval = setInterval(Update, 1000);
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
  appUpdate();
}

function Update() {
  seconds += 1;
  // Ensure appUpdate is method and if so, call it
  if (appUpdate) appUpdate(seconds);
}
