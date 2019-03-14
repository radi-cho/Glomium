var seconds = 0;
var interval = null;

function Start() {
  console.log(interval);
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
  UpdateBadges();
}

function Update() {
  seconds += 1;
}
