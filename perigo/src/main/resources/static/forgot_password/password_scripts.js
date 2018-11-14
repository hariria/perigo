function submit(){
	
	var userId = document.getElementById('userid').value;
	var password = document.getElementById('password').value;
	var confirm = document.getElementById('confirmPassword').value;

	
	var invalid = false;
	
	if (userId === null || userId === "") {
		$('#userid').addClass('redPlaceholder');
		document.getElementById("useridcontainer").style.borderBottom = "2px solid #cc0000";
		invalid = true;		
	}
	
	
	if(password === null || password ===  ""){
		$('#password').addClass('redPlaceholder');
		document.getElementById("passwordContainer").style.borderBottom = "2px solid #cc0000";
		invalid = true;
	}

	if(confirm === null || confirm ===  ""){
		$('#confirmPassword').addClass('redPlaceholder');
		document.getElementById("confirmPasswordContainer").style.borderBottom = "2px solid #cc0000";
		invalid = true;
	}

	if(confirm != password){
		$('#password').addClass('redPlaceholder');
		document.getElementById("passwordContainer").style.borderBottom = "2px solid #cc0000";
		$('#confirmPassword').addClass('redPlaceholder');
		document.getElementById("confirmPasswordContainer").style.borderBottom = "2px solid #cc0000";

		passwordError("Passwords do not match");

		invalid = true;
	}

	if(invalid){
		return;
	}
	
	$('#userid').removeClass('redPlaceholder');
	$('#password').removeClass('redPlaceholder');
	$('#confirmPassword').removeClass('redPlaceholder');

	document.getElementById("passwordContainer").style.borderBottom = "2px solid #adadad";
	document.getElementById("confirmPasswordContainer").style.borderBottom = "2px solid #adadad";
	document.getElementById("useridcontainer").style.borderBottom = "2px solid #adadad";
	
	$.ajax({
		url: 'http://localhost:9000/user/resetpassword',
		contentType:'application/json',
		method : 'post',
		data: JSON.stringify({'id' : userId, 'password' : password}),
		success: function(response) {
			window.location.href = '/browse/browse.html';
		}
	})

}

//Hide errors when a user selects on the box to re-enter information
$(document).ready(function(){
	
	$("#userid").focus(function(){
		//hidePasswordError();
		$('#userid').removeClass('redPlaceholder');
		document.getElementById("useridcontainer").style.borderBottom = "2px solid #adadad";
	});

	$("#password").focus(function(){
		//hidePasswordError();
		$('#password').removeClass('redPlaceholder');
		document.getElementById("passwordContainer").style.borderBottom = "2px solid #adadad";
	});

	$("#confirmPassword").focus(function(){
		//hidePasswordError();
		document.getElementById("confirmPasswordContainer").style.borderBottom = "2px solid #adadad";
		$('#confirmPassword').removeClass('redPlaceholder');
	});
});

function passwordError(errorMsg){
	$('#confirmPasswordContainer').animate({margin: "0px"}, 0);
	$('#passwordError').animate({margin: "0px 0px 16px 0px"}, 0);
	$('#passwordError').fadeIn();
	$("#passwordError").html(errorMsg);	
}

function hidePasswordError(){
	$('#confirmPasswordContainer').animate({margin: "0px 0px 37px 0px"}, 0);
	$('#passwordError').animate({margin: "0px"}, 0);
	$('#passwordError').hide();
}