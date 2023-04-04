

var newByteArray;
var imageLink;
var entryName;

// FILE INPUT HANDLER REALTIME
const inputFile = document.getElementById("input-file");
inputFile.addEventListener("change", function() {
  const file = this.files[0];
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onloadend = function() {
    const arrayBuffer = reader.result;
    const byteArray = new Uint8Array(arrayBuffer);

    newByteArray = byteArray;

    console.log(byteArray);
  };
});


// FUNCTION HANDLErS CAPTCHA BEFORE OTP SUBMISSION, FUNCTION IS ATTACHED ON MAIN SUBMIT BUTTON
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('mainSubmit', {
    'size': 'invisible',
    'callback': (response) => {
      console.log("CAPTCHA Success");
      sendSMS();
    },
    'expired-callback': () => {
      // Response expired. Ask user to solve reCAPTCHA again.
      // ...
      console.log("Failed");
    }
  });

    recaptchaVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
    });


  // [END auth_phone_recaptcha_verifier_simple]


function sendSMS(){

      const phoneNumber = document.getElementById("mobile").value;
      const appVerifier = window.recaptchaVerifier;

      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            alert("OTP SENT To :" + phoneNumber);

            //verifyCode();
          }).catch((error) => {
            // Error; SMS not sent
            // ...
            alert("OTP NOT SENT " + error);
          });

}


function verifyCode() {

    /** @type {firebase.auth.ConfirmationResult} */
    // [START auth_phone_verify_code]
    const code = document.getElementById("otp").value;
    confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      alert("OTP Matched " + code);
      // ...
      //OnSubmit();
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      alert("OTP Mismatched");
      // ...
    });
  //
}


function OnSubmit(){

  console.log("Uploading Details");
  entryName = document.getElementById("lName").value +', '+ document.getElementById("fName").value;

  var storageRef = firebase.storage().ref('receipts/'+ entryName + '.png'); //Filename
  var metadata = {
    contentType: 'image/jpeg',
  };

  var uploadTask = storageRef.put(newByteArray, metadata)

  uploadTask.on('state_changed',function (snapshot) {
      //observe state change events such as progress , pause ,resume
      //get task progress by including the number of bytes uploaded and total
      //number of bytes
          var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
          console.log("upload is " + progress +" done");
      },function (error) {
          //handle error here
          console.log(error.message);
      },function () {
     //handle successful uploads on complete

      uploadTask.snapshot.ref.getDownloadURL().then(function (downlaodURL) {
          //get your upload image url here...
          imageLink = downlaodURL;
          console.log(imageLink);
          //alert('Thankyou!, uploaded Successfully!')
            addRegistrant();

      });
  });



}
function addRegistrant(){

  const db = firebase.firestore();
  const dropdownGender = document.getElementById("gender");
  const selectedOptionGender = dropdownGender.options[dropdownGender.selectedIndex];
  const optionValueGender = selectedOptionGender.value;

  const dropdownBarangay = document.getElementById("barangay");
  const selectedOptionBarangay = dropdownBarangay.options[dropdownBarangay.selectedIndex];
  const optionValueBarangay = selectedOptionBarangay.value;

  const fName = document.getElementById("fName").value;
  const lName = document.getElementById("lName").value;
  const mName = document.getElementById("mName").value;
  const birthDay = document.getElementById("birthDay").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const telephone = document.getElementById("telephone").value;
  const street = document.getElementById("street").value;
  const house = document.getElementById("house").value;


  // Add a new document in collection "cities"
  db.collection("registrants").doc(entryName).set({
      firstName: fName,
      lastName: lName,
      middleName: mName,
      gender: optionValueGender,
      birthDate: birthDay,
      emailAdress: email,
      mobileNumber: mobile,
      telephoneNumber: telephone,
      barangayName: optionValueBarangay,
      streetName: street,
      houseNumber: house,
      receiptLink: imageLink
  })

  .then(() => {
      console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}
