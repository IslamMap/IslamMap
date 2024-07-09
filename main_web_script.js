    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
    import {
      getAuth,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut,
      onAuthStateChanged,
      signInWithPopup,
      GoogleAuthProvider,
      signInWithRedirect,
      getRedirectResult,
      sendPasswordResetEmail
    } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
    import { getDatabase, ref, set, get, child, update } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCWJCI1MpcZ-BHcBao0EeWcbLB3nKKygcU",
      authDomain: "islam-map-782f1.firebaseapp.com",
      projectId: "islam-map-782f1",
      storageBucket: "islam-map-782f1.appspot.com",
      messagingSenderId: "706140588471",
      appId: "1:706140588471:web:86c614fb0bb1f3c47b8032",
      measurementId: "G-7H49Y83TP8"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);
    const database = getDatabase(app);
    const provider = new GoogleAuthProvider();
  try{
    document.getElementById('google-sign-in-btn').addEventListener('click', function() {
    console.log("1");

    signInWithPopup(auth, provider)
        .then((result) => {

            const database = getDatabase(app);

            console.log("2");

            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log("3");

            const token = credential.accessToken;
            console.log("4");

            const user_google = result.user;
            console.log("5");

            // Check if the user exists in the database before setting data
            const userRef = ref(database, 'users/' + user_google.uid);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log('User already exists in database');
                    // Optionally, you can update existing data here
                } else {
                    console.log('User does not exist in database');
                    // Save user data to the database
                    set(userRef, {
                        email: user_google.email,
                        createdAt: new Date().toISOString(),
                        displayName: user_google.displayName,
                        photoURL: user_google.photoURL
                    }).then(() => {
                        console.log('User data saved to database');
                    }).catch((error) => {
                        console.error('Error saving user data:', error);
                    });
                }

            }).catch((error) => {
                console.error('Error checking user data:', error);
            });

            setTimeout(() => {
            console.log("Waited 2 seconds");
            location.reload();
            }, 1500);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing in with Google:', errorCode, errorMessage);
            alert(errorMessage);
            alert(errorCode);
        });
});

    // Sign-Up Function
    document.getElementById('sign-up-form').addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('sign-up-email').value;
      const password = document.getElementById('sign-up-password').value;
      const userName = document.getElementById('sign-up-name').value;
      const photo = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Signed up:', user);
  
          // Save user data to the database
          set(ref(database, 'users/' + user.uid), {
            displayName: userName,
            photoURL: photo,
            email: email,
            createdAt: new Date().toISOString(),
            phoneNumeber:"",
            dateOfBirth:"",
            gender: "Male",
            language: "English",
            country: ""
          });
  
          alert('User signed up successfully!');
          setTimeout(() => {
            console.log("Waited 2 seconds");
            location.reload();
            }, 1000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Error signing up:', errorCode, errorMessage);
          alert(errorMessage);
        });
    });



    // Sign-In Function
    document.getElementById('sign-in-form').addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('sign-in-email').value;
      const password = document.getElementById('sign-in-password').value;
  
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Signed in:', user);
          onSignIn(user);
          setTimeout(() => {
            console.log("Waited 2 seconds");
            location.reload();
            }, 1500);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Error signing in:', errorCode, errorMessage);
          alert(errorMessage);
        });
    });
  
    // Sign-Out Function
    document.getElementById('sign-out-btn').addEventListener('click', function() {
      signOut(auth).then(() => {
        console.log('Signed out');
        SignInPageWhenSignedOut();
        document.getElementById('user-top-tag-sign-in').innerHTML = 'Guest'; // Clear the div content on sign-out
      }).catch((error) => {
        console.error('Error signing out:', error);
      });
    });
  
}catch{
    console.log("Not in sign in page")
}
    // Function to handle Google authentication and retrieve user info
    function onSignIn(user_google) {
      showUserData(user_google.uid).then((userData) => {
        if (userData) {
          const profileName = userData.displayName;
          const profileImageURL = userData.photoURL;
          const profileEmail = userData.email;

          const profilePhoneNumber = userData.phoneNumeber;
          const profileDateOfBirth = userData.dateOfBirth;
          const profileGender = userData.gender;
          const profileLanguage = userData.language;
          const profileCountry = userData.country;
  
  
          const userImage = document.getElementById('user-top-image-sign-in');
          const userName = document.getElementById('user-top-tag-sign-in');
  
          userImage.src = profileImageURL;
  
          const maxLength = 15;
          if (profileName.length > maxLength) {
            const truncatedName = profileName.substring(0, maxLength) + '...';
            userName.textContent = truncatedName;
          } else {
            userName.textContent = profileName;
          }
  
          console.log('Profile image updated:', profileImageURL);
          console.log('Additional user data:', userData);

          try{

            const profileImage = document.getElementById("profile-image");
            const profileInputImageURL = document.getElementById("profile-input-image-url");
            const profileInputUsername = document.getElementById("profile-input-username");
            const profileTextEmail = document.getElementById("profile-bottom-email");

            const phoneNumber = document.getElementById('profile-input-phone-number');
            const dateOfBirth = document.getElementById('profile-input-date-of-birth');
            const gender = document.getElementById('profile-input-gender');
            const language = document.getElementById('profile-input-language');
            const country = document.getElementById('profile-input-country');

            profileImage.src = profileImageURL;
            profileInputImageURL.value = profileImageURL;
            profileInputUsername.value = profileName;
            profileTextEmail.innerHTML = "Signed in as: " + profileEmail;

            phoneNumber.value =   profilePhoneNumber;
            dateOfBirth.value =   profileDateOfBirth;
            gender.value =   profileGender;
            language.value =   profileLanguage;
            country.value =   profileCountry;




          }
          catch{
            console.log("Not in Account Page")
          }

        }
      }).catch((error) => {
        console.error('Error retrieving user data:', error);
      });


      try{
        const toggleSignContainer = document.getElementById("toggle-buttons");
        const signInFormContainer = document.getElementById("sign-in-forms-container");
        const signInWithGoogleBtn = document.getElementById("google-sign-in-btn");
        const accountProfile = document.getElementById("account-profile-page");

  
        toggleSignContainer.style.display = 'none';
        signInFormContainer.style.display = 'none';
        signInWithGoogleBtn.style.display = 'none';
        accountProfile.style.display = 'block';

      } catch {
        console.log("Not in Account Page");
      }


    }
  
    // Check authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
        onSignIn(user);

        try{
        document.getElementById("update-profile-btn").addEventListener('click', function() {

        const profileInputImageURL = document.getElementById("profile-input-image-url").value;
        const profileInputUsername = document.getElementById("profile-input-username").value;
        const phoneNumber = document.getElementById('profile-input-phone-number').value;
        const dateOfBirth = document.getElementById('profile-input-date-of-birth').value;
        const gender = document.getElementById('profile-input-gender').value;
        const language = document.getElementById('profile-input-language').value;
        const country = document.getElementById('profile-input-country').value;

        const updateProvideBtn = document.getElementById("update-profile-btn");



        // Save user data to the database
        update(ref(database, 'users/' + user.uid), {
        displayName: profileInputUsername,
        photoURL: profileInputImageURL,
        phoneNumeber: phoneNumber,
        dateOfBirth: dateOfBirth,
        gender: gender,
        language:language,
        country: country

        });

        updateProvideBtn.innerHTML = "Changes Saved!";

        setTimeout(() => {
  console.log("Waited 2 seconds");
  location.reload();
}, 1500);
        });
    }catch{
        console.log("Not in Account Page!");
    }

      } else {
        console.log('No user is signed in');
        document.getElementById('user-top-tag-sign-in').innerHTML = 'Guest';
        SignInPageWhenSignedOut();
      }
    });
  
    // Functions for handling sign-in and sign-out page updates
    function SignInPageWhenSignedIn(user) {
      try {
        const toggleSignContainer = document.getElementById("toggle-buttons");
        const signInFormContainer = document.getElementById("sign-in-forms-container");
        const signInWithGoogleBtn = document.getElementById("google-sign-in-btn");
        const accountProfile = document.getElementById("account-profile-page");
  
        toggleSignContainer.style.display = 'none';
        signInFormContainer.style.display = 'none';
        signInWithGoogleBtn.style.display = 'none';
        accountProfile.style.display = 'block';
        


 

      } catch {
        console.log("Not in sign in page");
      }
    }
  
    function SignInPageWhenSignedOut() {
      try {
        const toggleSignContainer = document.getElementById("toggle-buttons");
        const signInFormContainer = document.getElementById("sign-in-forms-container");
        const signInWithGoogleBtn = document.getElementById("google-sign-in-btn");
        const accountProfile = document.getElementById("account-profile-page");
  
        toggleSignContainer.style.display = 'block';
        signInWithGoogleBtn.style.display = 'block';
        signInFormContainer.style.display = 'block';
        accountProfile.style.display = 'none';
        resetEmailPassword()
      } catch {
        console.log("Not in sign in page");
      }
  
      document.getElementById('user-top-image-sign-in').src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    }


  
    // Show user data
    function showUserData(uid) {
      return new Promise((resolve, reject) => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              resolve(snapshot.val());
            } else {
              console.log("No data available");
              resolve(null);
            }
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    }


    function resetEmailPassword (){
        const reset = document.getElementById("forgot-password-sign-in");
        reset.addEventListener("click", function(event){
            event.preventDefault()
            const email = document.getElementById("sign-in-email").value;
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Email Sent");
                    // Password reset email sent!
                    // ..
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage)
                    // ..
                });
        });
    }

  
