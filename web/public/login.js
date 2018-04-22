firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
			document.getElementById("login_div").style.display = "none";
			document.getElementById("user_div").style.display = "block";
			console.log("logged in");
		} else {
			console.log('not logged in');
			document.getElementById("login_div").style.display = "block";
			document.getElementById("user_div").style.display = "none";
		}
});

function login() {
	var userEmail = document.getElementById("email_field").value;
	var userPass = document.getElementById("password_field").value;

	if(!userPass || !userEmail){
		window.alert("email and password required");
		return console.log('email and password required');
	}

	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  console.log('LogIn error', error);
	  window.alert("Error: " + errorMessage);
	});
};

function signUp() {
	var userEmail = document.getElementById("email_field").value;
	var userPass = document.getElementById("password_field").value;
	if(!userPass || !userEmail){
		window.alert("email and password required");
		return console.log('email and password required');
	}


	firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;

		window.alert("Error: " = errorMessage);
	}); 

	console.log("signed up with email " + userEmail);

	//check email
}

function logout() {
	firebase.auth().signOut();
}


var provider = new firebase.auth.GoogleAuthProvider();

function googleLogin() {
	console.log("signing using Google");
	function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	  console.log('Name: ' + profile.getName());
	  console.log('Image URL: ' + profile.getImageUrl());
	  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	}


	firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  // ...
	  console.log(user.displayName);
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
});
}

function onSignIn(googleUser) {
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);
      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}