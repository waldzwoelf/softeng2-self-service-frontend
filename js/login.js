// logic fuer login backend requests
// check if already logged in? (kommt aufs backend an ob das so geht)

function myFunction() {
    var x = document.getElementById("myPwd");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  } 