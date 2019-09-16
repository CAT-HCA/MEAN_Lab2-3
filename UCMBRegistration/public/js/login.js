$(document).ready(() => {
	$("#loginBtn").click(() => {
		let data = {
			username: $("#loginUsername").val().trim(),
			password: $("#loginPassword").val().trim(),
		};
		console.log(data)
		//calling function to validate form
		let validationResult = validateForm(data);
		//if form validates... move forward with creating member
		if (validationResult == true) {
			loginUser(data);
		}
	});
	$("#regResetBtn").click(() => {
		clearFields();
	});

	$("#goToLoginBtn").click(() => {
		window.location.href = "/users/register";
	});


});

function loginUser(data) {
	$.post("http://localhost:3000/users/login", data, function() {})
	.done(function(res) {
		$("#loginUsername").val("");
		$("#loginPassword").val("");
		window.location.href = "/leagues";
		})
		.fail(function(e) {
			if(e.status === 403){
			$("#userNotFoundDiv")
				.addClass("bg-success border border-success rounded")
				.css("display", "inline-block");
			} 
		});
}


function clearFields() {
	$("#loginUsername").val("");
	$("#loginPassword").val("");
}


//function to validate form fields
function validateForm(data) {
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
		$("#errorMessages").empty();
		$("#errorMessages").addClass("bg-success border border-success rounded");
		for (let i = 0; i < errorArray.length; i++) {
			$("<li>" + errorArray[i] + "</li>").appendTo($("#errorMessages"));
		}
		return false;
	}
}