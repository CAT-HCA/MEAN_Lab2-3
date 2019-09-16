$(document).ready(() => {
	$("#regBtn").click(() => {
		let data = {
			email: $("#registerEmail").val().trim,
			username: $("#registerUsername").val().trim,
			password: $("#registerPassword").val().trim,
			confpassword: $("#regConfPassword").val().trim,
		};
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
});

function postNewUser(data) {
	$.post("http://localhost:3000/users/register", data, function() {}).done(function(res) {
		window.location.href = "/users/login";
	});
}

function clearFields() {
	$("#registerEmail").val("");
	$("#registerUsername").val("");
	$("#registerPassword").val("");
	$("#regConfPassword").val("");
}

//function to validate form fields
function validateForm(data) {
    let errorArray = [];
    //validating email
    if (
		data.email
	) {
		errorArray[errorArray.length] = "Please enter an email address.";
    }
    let emailPattern = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
    let result = emailPattern.test(data.email);
	if (result != true) {
		errorArray[errorArray.length] = "Please enter a valid email address.";
    }
    //validating username
	if (
		data.username
	) {
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
		for (let i = 0; i < errorArray.length; i++) {
			$("<li>" + errorArray[i] + "</li>").appendTo($("#errorMessages"));
		}
		return false;
	}
}
