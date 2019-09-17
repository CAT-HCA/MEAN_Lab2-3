//document on load event listener
$(document).ready(() => {
	//login button click even
	$("#loginBtn").click(() => {
		//getting user data to submit
		let data = {
			username: $("#loginUsername")
				.val()
				.trim(),
			password: $("#loginPassword")
				.val()
				.trim(),
		};
		//calling function to validate form
		let validationResult = validateForm(data);
		//if form validates... move forward with loggin in user
		if (validationResult == true) {
			//calling helper function to make post
			loginUser(data);
		}
	});
	//login form reset button
	$("#loginResetBtn").click(() => {
		//calling function to clear all fields and errors
		clearFields();
	});
	//link to register button that appears if credentials are not correct
	$("#goToRegBtn").click(() => {
		//redirects to register page
		window.location.href = "/users/register";
	});
});

//function to make post call to http://localhost:3000/users/login to login user
function loginUser(data) {
	//function to hide username not found div w/ button
	hideMsg();
	$.post("http://localhost:3000/users/login", data, function() {})
		//if post success, access landing page
		.done(function(res) {
			//function to empty field values
			emptyFields();
			window.location.href = "/leagues";
		})
		//if post fails, username was not found, offer button to reg page
		.fail(function(e) {
			if (e.status === 403) {
				//function to empty field val errors
				emptyErrors();
				//function to show an applicable error message
				//pass in errorDiv (either register user div or field val errors)
				showError("#userNotFoundDiv");
			}
		});
}

//function to validate form fields
function validateForm(data) {
	//function to empty field val errors
	emptyErrors();
	//function to hide username not found div w/ button
	hideMsg();
	let errorArray = [];

	//validating username
	if (data.username == "") {
		errorArray[errorArray.length] = "Please enter your username.";
	}
	//validating password
	if (data.password == "") {
		errorArray[errorArray.length] = "Please enter your password.";
	}
	//error handling
	if (errorArray.length == 0) {
		return true;
	}
	if (errorArray.length > 0) {
		//function to show an applicable error message
		//pass in errorDiv (either register user div or field val errors)
		showError("#errorMessageDiv");
		for (let i = 0; i < errorArray.length; i++) {
			$("<li>" + errorArray[i] + "</li>").appendTo($("#errorMessages"));
		}
		return false;
	}
}

//function to clear all fields and errors
function clearFields() {
	//function to empty field val errors
	emptyErrors();
	//function to hide username not found div w/ button
	hideMsg();
	//function to empty field values
	emptyFields();
}

//function to show an applicable error message
//pass in errorDiv (either register user div or field val errors)
function showError(errorDiv) {
	$(errorDiv)
		.addClass("bg-success border border-success rounded w-100 p-1")
		.css("display", "inline-block");
}

//function to empty field val errors
function emptyErrors() {
	$("#errorMessages").empty();
	$("#errorMessageDiv").removeClass("bg-success border border-success rounded w-100");
}

//function to empty field values
function emptyFields() {
	$("#loginUsername").val("");
	$("#loginPassword").val("");
}

//function to hide username not found div w/ button
function hideMsg() {
	$("#userNotFoundDiv").css("display", "none");
}
