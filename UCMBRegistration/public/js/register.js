$(document).ready(() => {
	$("#regBtn").click(() => {
		let data = {
            username: $("#registerUsername").val().trim(),
            password: $("#registerPassword").val().trim(),
            email: $("#registerEmail").val().trim(),
			confpassword: $("#regConfPassword").val().trim(),
        };
        console.log(data)
		//calling function to validate form
		let validationResult = validateForm(data);
		//if form validates... move forward with creating member
		if (validationResult == true) {
			postNewUser(data);
		}
	});

	$("#regResetBtn").click(() => {
		clearFields();
	});

	$("#goToLoginBtn").click(() => {
		window.location.href = "/users/login";
	});
});

function postNewUser(data) {
	$("#alreadyRegDiv").css("display", "none");
	$.post("http://localhost:3000/users/register", data, function() {})
		.done(function(res) {
			window.location.href = "/users/login";
		})
		.fail(function(res) {
			$("#alreadyRegDiv")
				.addClass("bg-success border border-success rounded")
				.css("display", "inline-block");
		});
}

function clearFields() {
	$("#errorMessageDiv").empty();
	$("#alreadyRegDiv").css("display", "none");
	$("#registerEmail").val("");
	$("#registerUsername").val("");
	$("#registerPassword").val("");
	$("#regConfPassword").val("");
}

//function to validate form fields
function validateForm(data) {
	let errorArray = [];
	//validating email
	let emailPattern = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
	let result = emailPattern.test(data.email);
	if (data.email == "" || result != true) {
		errorArray[errorArray.length] = "Please enter a valid email address.";
	}
	//validating username
	if (data.username == "") {
		errorArray[errorArray.length] = "Please enter a valid username.";
	}
	//validating passwords match
	if (data.password == "" || data.confpassword == "") {
		errorArray[errorArray.length] = "Please enter a password and password confirmation.";
	}
	if (data.password !== data.confpassword) {
		errorArray[errorArray.length] = "Your password and confirmation do not match.";
	}
	if (errorArray.length == 0) {
		return true;
	}
	if (errorArray.length > 0) {
		$("#errorMessages").empty();
		$("#errorMessages").addClass("bg-success border border-success rounded");
		for (let i = 0; i < errorArray.length; i++) {
			$("<li>" + errorArray[i] + "</li>").appendTo($("#errorMessages"));
		}
		return false;
	}
}
