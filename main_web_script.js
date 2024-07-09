    // Import the functions you need from the SDKs you need
    import { initializeApp } from &quot;https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js&quot;;
    import { getAnalytics } from &quot;https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js&quot;;
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
    } from &quot;https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js&quot;;
    import { getDatabase, ref, set, get, child, update } from &quot;https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js&quot;;
  
    // Your web app&#39;s Firebase configuration
    const firebaseConfig = {
      apiKey: &quot;AIzaSyCWJCI1MpcZ-BHcBao0EeWcbLB3nKKygcU&quot;,
      authDomain: &quot;islam-map-782f1.firebaseapp.com&quot;,
      projectId: &quot;islam-map-782f1&quot;,
      storageBucket: &quot;islam-map-782f1.appspot.com&quot;,
      messagingSenderId: &quot;706140588471&quot;,
      appId: &quot;1:706140588471:web:86c614fb0bb1f3c47b8032&quot;,
      measurementId: &quot;G-7H49Y83TP8&quot;
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);
    const database = getDatabase(app);
    const provider = new GoogleAuthProvider();
  try{
    document.getElementById(&#39;google-sign-in-btn&#39;).addEventListener(&#39;click&#39;, function() {
    console.log(&quot;1&quot;);

    signInWithPopup(auth, provider)
        .then((result) =&gt; {

            const database = getDatabase(app);

            console.log(&quot;2&quot;);

            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log(&quot;3&quot;);

            const token = credential.accessToken;
            console.log(&quot;4&quot;);

            const user_google = result.user;
            console.log(&quot;5&quot;);

            // Check if the user exists in the database before setting data
            const userRef = ref(database, &#39;users/&#39; + user_google.uid);
            get(userRef).then((snapshot) =&gt; {
                if (snapshot.exists()) {
                    console.log(&#39;User already exists in database&#39;);
                    // Optionally, you can update existing data here
                } else {
                    console.log(&#39;User does not exist in database&#39;);
                    // Save user data to the database
                    set(userRef, {
                        email: user_google.email,
                        createdAt: new Date().toISOString(),
                        displayName: user_google.displayName,
                        photoURL: user_google.photoURL
                    }).then(() =&gt; {
                        console.log(&#39;User data saved to database&#39;);
                    }).catch((error) =&gt; {
                        console.error(&#39;Error saving user data:&#39;, error);
                    });
                }

            }).catch((error) =&gt; {
                console.error(&#39;Error checking user data:&#39;, error);
            });

            setTimeout(() =&gt; {
            console.log(&quot;Waited 2 seconds&quot;);
            location.reload();
            }, 1500);
        })
        .catch((error) =&gt; {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(&#39;Error signing in with Google:&#39;, errorCode, errorMessage);
            alert(errorMessage);
            alert(errorCode);
        });
});

    // Sign-Up Function
    document.getElementById(&#39;sign-up-form&#39;).addEventListener(&#39;submit&#39;, function(event) {
      event.preventDefault();
      const email = document.getElementById(&#39;sign-up-email&#39;).value;
      const password = document.getElementById(&#39;sign-up-password&#39;).value;
      const userName = document.getElementById(&#39;sign-up-name&#39;).value;
      const photo = &quot;https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png&quot;;
  
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) =&gt; {
          const user = userCredential.user;
          console.log(&#39;Signed up:&#39;, user);
  
          // Save user data to the database
          set(ref(database, &#39;users/&#39; + user.uid), {
            displayName: userName,
            photoURL: photo,
            email: email,
            createdAt: new Date().toISOString(),
            phoneNumeber:&quot;&quot;,
            dateOfBirth:&quot;&quot;,
            gender: &quot;Male&quot;,
            language: &quot;English&quot;,
            country: &quot;&quot;
          });
  
          alert(&#39;User signed up successfully!&#39;);
          setTimeout(() =&gt; {
            console.log(&quot;Waited 2 seconds&quot;);
            location.reload();
            }, 1000);
        })
        .catch((error) =&gt; {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(&#39;Error signing up:&#39;, errorCode, errorMessage);
          alert(errorMessage);
        });
    });



    // Sign-In Function
    document.getElementById(&#39;sign-in-form&#39;).addEventListener(&#39;submit&#39;, function(event) {
      event.preventDefault();
      const email = document.getElementById(&#39;sign-in-email&#39;).value;
      const password = document.getElementById(&#39;sign-in-password&#39;).value;
  
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) =&gt; {
          const user = userCredential.user;
          console.log(&#39;Signed in:&#39;, user);
          onSignIn(user);
          setTimeout(() =&gt; {
            console.log(&quot;Waited 2 seconds&quot;);
            location.reload();
            }, 1500);
        })
        .catch((error) =&gt; {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(&#39;Error signing in:&#39;, errorCode, errorMessage);
          alert(errorMessage);
        });
    });
  
    // Sign-Out Function
    document.getElementById(&#39;sign-out-btn&#39;).addEventListener(&#39;click&#39;, function() {
      signOut(auth).then(() =&gt; {
        console.log(&#39;Signed out&#39;);
        SignInPageWhenSignedOut();
        document.getElementById(&#39;user-top-tag-sign-in&#39;).innerHTML = &#39;Guest&#39;; // Clear the div content on sign-out
      }).catch((error) =&gt; {
        console.error(&#39;Error signing out:&#39;, error);
      });
    });
  
}catch{
    console.log(&quot;Not in sign in page&quot;)
}
    // Function to handle Google authentication and retrieve user info
    function onSignIn(user_google) {
      showUserData(user_google.uid).then((userData) =&gt; {
        if (userData) {
          const profileName = userData.displayName;
          const profileImageURL = userData.photoURL;
          const profileEmail = userData.email;

          const profilePhoneNumber = userData.phoneNumeber;
          const profileDateOfBirth = userData.dateOfBirth;
          const profileGender = userData.gender;
          const profileLanguage = userData.language;
          const profileCountry = userData.country;
  
  
          const userImage = document.getElementById(&#39;user-top-image-sign-in&#39;);
          const userName = document.getElementById(&#39;user-top-tag-sign-in&#39;);
  
          userImage.src = profileImageURL;
  
          const maxLength = 15;
          if (profileName.length &gt; maxLength) {
            const truncatedName = profileName.substring(0, maxLength) + &#39;...&#39;;
            userName.textContent = truncatedName;
          } else {
            userName.textContent = profileName;
          }
  
          console.log(&#39;Profile image updated:&#39;, profileImageURL);
          console.log(&#39;Additional user data:&#39;, userData);

          try{

            const profileImage = document.getElementById(&quot;profile-image&quot;);
            const profileInputImageURL = document.getElementById(&quot;profile-input-image-url&quot;);
            const profileInputUsername = document.getElementById(&quot;profile-input-username&quot;);
            const profileTextEmail = document.getElementById(&quot;profile-bottom-email&quot;);

            const phoneNumber = document.getElementById(&#39;profile-input-phone-number&#39;);
            const dateOfBirth = document.getElementById(&#39;profile-input-date-of-birth&#39;);
            const gender = document.getElementById(&#39;profile-input-gender&#39;);
            const language = document.getElementById(&#39;profile-input-language&#39;);
            const country = document.getElementById(&#39;profile-input-country&#39;);

            profileImage.src = profileImageURL;
            profileInputImageURL.value = profileImageURL;
            profileInputUsername.value = profileName;
            profileTextEmail.innerHTML = &quot;Signed in as: &quot; + profileEmail;

            phoneNumber.value =   profilePhoneNumber;
            dateOfBirth.value =   profileDateOfBirth;
            gender.value =   profileGender;
            language.value =   profileLanguage;
            country.value =   profileCountry;




          }
          catch{
            console.log(&quot;Not in Account Page&quot;)
          }

        }
      }).catch((error) =&gt; {
        console.error(&#39;Error retrieving user data:&#39;, error);
      });


      try{
        const toggleSignContainer = document.getElementById(&quot;toggle-buttons&quot;);
        const signInFormContainer = document.getElementById(&quot;sign-in-forms-container&quot;);
        const signInWithGoogleBtn = document.getElementById(&quot;google-sign-in-btn&quot;);
        const accountProfile = document.getElementById(&quot;account-profile-page&quot;);

  
        toggleSignContainer.style.display = &#39;none&#39;;
        signInFormContainer.style.display = &#39;none&#39;;
        signInWithGoogleBtn.style.display = &#39;none&#39;;
        accountProfile.style.display = &#39;block&#39;;

      } catch {
        console.log(&quot;Not in Account Page&quot;);
      }


    }
  
    // Check authentication state
    onAuthStateChanged(auth, (user) =&gt; {
      if (user) {
        console.log(&#39;User is signed in:&#39;, user);
        onSignIn(user);

        try{
        document.getElementById(&quot;update-profile-btn&quot;).addEventListener(&#39;click&#39;, function() {

        const profileInputImageURL = document.getElementById(&quot;profile-input-image-url&quot;).value;
        const profileInputUsername = document.getElementById(&quot;profile-input-username&quot;).value;
        const phoneNumber = document.getElementById(&#39;profile-input-phone-number&#39;).value;
        const dateOfBirth = document.getElementById(&#39;profile-input-date-of-birth&#39;).value;
        const gender = document.getElementById(&#39;profile-input-gender&#39;).value;
        const language = document.getElementById(&#39;profile-input-language&#39;).value;
        const country = document.getElementById(&#39;profile-input-country&#39;).value;

        const updateProvideBtn = document.getElementById(&quot;update-profile-btn&quot;);



        // Save user data to the database
        update(ref(database, &#39;users/&#39; + user.uid), {
        displayName: profileInputUsername,
        photoURL: profileInputImageURL,
        phoneNumeber: phoneNumber,
        dateOfBirth: dateOfBirth,
        gender: gender,
        language:language,
        country: country

        });

        updateProvideBtn.innerHTML = &quot;Changes Saved!&quot;;

        setTimeout(() =&gt; {
  console.log(&quot;Waited 2 seconds&quot;);
  location.reload();
}, 1500);
        });
    }catch{
        console.log(&quot;Not in Account Page!&quot;);
    }

      } else {
        console.log(&#39;No user is signed in&#39;);
        document.getElementById(&#39;user-top-tag-sign-in&#39;).innerHTML = &#39;Guest&#39;;
        SignInPageWhenSignedOut();
      }
    });
  
    // Functions for handling sign-in and sign-out page updates
    function SignInPageWhenSignedIn(user) {
      try {
        const toggleSignContainer = document.getElementById(&quot;toggle-buttons&quot;);
        const signInFormContainer = document.getElementById(&quot;sign-in-forms-container&quot;);
        const signInWithGoogleBtn = document.getElementById(&quot;google-sign-in-btn&quot;);
        const accountProfile = document.getElementById(&quot;account-profile-page&quot;);
  
        toggleSignContainer.style.display = &#39;none&#39;;
        signInFormContainer.style.display = &#39;none&#39;;
        signInWithGoogleBtn.style.display = &#39;none&#39;;
        accountProfile.style.display = &#39;block&#39;;
        


 

      } catch {
        console.log(&quot;Not in sign in page&quot;);
      }
    }
  
    function SignInPageWhenSignedOut() {
      try {
        const toggleSignContainer = document.getElementById(&quot;toggle-buttons&quot;);
        const signInFormContainer = document.getElementById(&quot;sign-in-forms-container&quot;);
        const signInWithGoogleBtn = document.getElementById(&quot;google-sign-in-btn&quot;);
        const accountProfile = document.getElementById(&quot;account-profile-page&quot;);
  
        toggleSignContainer.style.display = &#39;block&#39;;
        signInWithGoogleBtn.style.display = &#39;block&#39;;
        signInFormContainer.style.display = &#39;block&#39;;
        accountProfile.style.display = &#39;none&#39;;
        resetEmailPassword()
      } catch {
        console.log(&quot;Not in sign in page&quot;);
      }
  
      document.getElementById(&#39;user-top-image-sign-in&#39;).src = &#39;https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png&#39;;
    }


  
    // Show user data
    function showUserData(uid) {
      return new Promise((resolve, reject) =&gt; {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${uid}`))
          .then((snapshot) =&gt; {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              resolve(snapshot.val());
            } else {
              console.log(&quot;No data available&quot;);
              resolve(null);
            }
          })
          .catch((error) =&gt; {
            console.error(error);
            reject(error);
          });
      });
    }


    function resetEmailPassword (){
        const reset = document.getElementById(&quot;forgot-password-sign-in&quot;);
        reset.addEventListener(&quot;click&quot;, function(event){
            event.preventDefault()
            const email = document.getElementById(&quot;sign-in-email&quot;).value;
            sendPasswordResetEmail(auth, email)
                .then(() =&gt; {
                    alert(&quot;Email Sent&quot;);
                    // Password reset email sent!
                    // ..
                })
                .catch((error) =&gt; {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage)
                    // ..
                });
        });
    }
