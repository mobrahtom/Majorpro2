let id = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

let 
  firstname = id("firstname"),
  lastname = id("lastname"),
  email = id("email"),
  mobile = id("mobile"),
  // gender = id("gender"),
  dob = id("dob"),
  country = id("country"),
  password = id("password"),
  cpassword = id("cpwd"),
  form = id("form"),
  errorMsg = classes("error"),
  successIcon = classes("success-icon"),
  failureIcon = classes("failure-icon");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  engine(firstname, 0, "First name cannot be empty");
  engine(lastname,1, "Last name cannot be empty");
  engine(email, 2, "Email cannot be empty");
  engine(mobile,3, "Please enter your mobile number");
  // engine(gender,4, "Please select your gender");
  engine(dob,5, "Please set your date of birth");
  engine(country,6, "Please select a country for citizenship");
  engine(password, 7, "enter password");
  engine(cpassword, 8, "your password does not match");
});

let engine = (id, serial, message) => {
  if (id.value.trim() === "") {
    errorMsg[serial].innerHTML = message;
    id.style.border = "2px solid red";

    // icons
    failureIcon[serial].style.opacity = "1";
    successIcon[serial].style.opacity = "0";
  } else {
    errorMsg[serial].innerHTML = "";
    id.style.border = "2px solid green";

    // icons
    failureIcon[serial].style.opacity = "0";
    successIcon[serial].style.opacity = "1";
  }
};
{/* <label for="photo">Upload Photo:</label> 
  <input type="file" id="photo" name="photo" accept="image/jpeg,image/jpg,image/png,application/pdf">
  <span id="photolocation" style="color:red;"></span><br></br> */}

  <p id="forgotPassword" onclick="resetPassword()">Forgot Password?</p>