
function countdown() {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var countDownTime = new Date(year, month, 1, 0, 0, 0, 0).getTime();

  var now = today.getTime();
  var remTime = countDownTime - now;

    // Time calculations for days, hours, minutes and seconds
  var s = Math.floor(remTime / 1000);
  var m = Math.floor(s / 60);
  var h = Math.floor(m / 60);
  var d = Math.floor(h / 24);

  h %= 24;
  m %= 60;
  s %= 60;
  h = (h<10)? "0" + h : h;
  m = (m<10)? "0" + m : m;
  s = (s<10)? "0" + s : s;

// Update the count down every 1 second
    document.getElementById("days").textContent = d;
    document.getElementById("days").innerText = d;
    document.getElementById("hours").textContent = h;
    document.getElementById("hours").innerText = h;
    document.getElementById("minutes").textContent = m;
    document.getElementById("minutes").innerText = m;
    document.getElementById("seconds").textContent = s;
    document.getElementById("seconds").innerText = s;

    setTimeout(countdown, 1000);

    if(remTime <= 0){
        countdown();
        getUserId();
        setHTML();
    }
    

}
