
function countdown() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var eventDate = new Date(year, month, 1);
  var currentTime = now.getTime();
  var eventTime = eventDate.getTime();
  var remTime = eventTime - currentTime;

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
var x = setInterval(function() {
    
    // Find the distance between now an the count down date
    var distance = eventTime - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
   // document.getElementById("days").textContent = days;
    document.getElementById("days").innerText = days;
    //document.getElementById("hours").textContent = hours;
    document.getElementById("hours").innerText = hours;
    //document.getElementById("minutes").textContent = minutes;
    document.getElementById("minutes").innerText = minutes;
    //document.getElementById("seconds").textContent = seconds;
    document.getElementById("seconds").innerText = seconds;
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        countdown();
    }
}, 1000);

}