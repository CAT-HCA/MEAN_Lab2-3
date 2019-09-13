$(document).ready(() => {
	$("#loginBtn").click(() => {
		let data = {
			username: $("#loginUsername").val(),
			password: $("#loginPassword").val(),
		};

		$.post("http://localhost:3000/users/login", data, function() {})
			.done(function(res) {
				$("#loginUsername").val("");
                $("#loginPassword").val("");
                window.location.href = "/leagues";
            })
	});



});