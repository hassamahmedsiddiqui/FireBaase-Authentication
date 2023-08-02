import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signOut }
  from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDuRKkLMTKOxdYJ9QIfDRHZsB36KbrsCqE",
  authDomain: "fir-assigment-e923c.firebaseapp.com",
  projectId: "fir-assigment-e923c",
  storageBucket: "fir-assigment-e923c.appspot.com",
  messagingSenderId: "97178963752",
  appId: "1:97178963752:web:83d5f2ec0d7312e139ca1d",
  measurementId: "G-TD856XT58T"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const signupBtn = document.getElementById('signup-btn');
signupBtn && signupBtn.addEventListener('click', () => {
  event.preventDefault();
  let signupUsername = document.getElementById('signup-username')
  let signupEmail = document.getElementById('signup-email')
  let signupPasswword = document.getElementById('signup-password')
  // console.log('USERNAME-->',signupUsername.value)
  // console.log('USER EMAIL-->',signupEmail.value)
  // console.log('PASSWORD-->',signupPasswword.value)

  createUserWithEmailAndPassword(auth, signupEmail.value, signupPasswword.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('user-->', user)
      swal.fire('user succesfully Sign Up')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      // console.log('error-->', errorMessage)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    });
  signupUsername.value = "";
  signupEmail.value = "";
  signupPasswword.value = "";
})

let signIn = document.getElementById('sign-in');
signIn && signIn.addEventListener('click', (event) => {
  event.preventDefault();
  let email = document.getElementById('email')
  let password = document.getElementById('password')
  console.log(email.value)
  console.log(password.value)

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('user succesfully login-->', user)
      // alert('')
      Swal.fire('user succesfully login')

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('give current information-->', errorMessage)
      // alert(errorMessage)
      // Swal.fire(errorMessage)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,

      })

    });

})
onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname != '/profile.html') {
    console.log('window.location.pathname-->', window.location.pathname)
    window.location.replace("./profile.html");


    // ...
  } else {
    let profileemail = document.getElementById('profile-email')
    profileemail.innerHTML = user.email
    console.log('user-->email ', user.emailVerified)
    let profileemailverified = document.getElementById('profile-email-verified')
    profileemailverified.innerHTML = user.emailVerified

  }
})


let verifiedBtn = document.getElementById("verifiedBtn");
verifiedBtn.addEventListener("click", () => {
  sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log("verified")
      console.log('user-->email ', user.emailVerified)

    });

})

let signout = document.getElementById('signout')
signout && signout.addEventListener('click', () => {
  console.log('signout-->', signout)
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('signout')
    window.location.replace("./index.html");

  })
    .catch((error) => {
      // An error happened.
      // console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        footer: '<a href="">Why do I have this issue?</a>'
      })

    });

})