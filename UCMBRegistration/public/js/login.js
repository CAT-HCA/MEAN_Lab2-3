$(document).ready(() => {
	$("#loginBtn").click(() => {
		let data = {
			username: $("#loginUsername")
				.val()
				.trim(),
			password: $("#loginPassword")
				.val()
				.trim(),
		};
		console.log(data);
		//calling function to validate form
		let validationResult = validateForm(data);
		//if form validates... move forward with creating member
		if (validationResult == true) {
			loginUser(data);
		}
	});
	$("#loginResetBtn").click(() => {
		clearFields();
	});

	$("#goToRegBtn").click(() => {
		window.location.href = "/users/register";
	});
});

function loginUser(data) {
	hideMsg();
	$.post("http://localhost:3000/users/login", data, function() {})
		.done(function(res) {
			emptyFields();
			window.location.href = "/leagues";
		})
		.fail(function(e) {
			if (e.status === 403) {
				emptyErrors();
				showError("#userNotFoundDiv");
			}
		});
}


//function to validate form fields
function validateForm(data) {
	emptyErrors();
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
	if (errorArray.length == 0) {
		return true;
	}
	if (errorArray.length > 0) {
		showError("#errorMessageDiv");
		for (let i = 0; i < errorArray.length; i++) {
			$("<li>" + errorArray[i] + "</li>").appendTo($("#errorMessages"));
		}
		return false;
	}
}

function clearFields() {
	emptyErrors()
	hideMsg()
	emptyFields()
}
function showError(errorDiv){
	$(errorDiv)
	.addClass("bg-success border border-success rounded w-100 p-1")
	.css("display", "inline-block");
}
function emptyErrors(){
	$("#errorMessages").empty();
	$("#errorMessageDiv").removeClass("bg-success border border-success rounded w-100");
}
function emptyFields(){
	$("#loginUsername").val("");
	$("#loginPassword").val("");
}
function hideMsg(){
	$("#userNotFoundDiv").css("display", "none");
}