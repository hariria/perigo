function submit(){
	
	var password = document.getElementById('password').value;
	var confirm = document.getElementById('confirmPassword').value;

	var invalid = false;
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

	$('#password').removeClass('redPlaceholder');
	$('#confirmPassword').removeClass('redPlaceholder');

	document.getElementById("passwordContainer").style.borderBottom = "2px solid #adadad";
	document.getElementById("confirmPasswordContainer").style.borderBottom = "2px solid #adadad";

	//TODO: SUBMIT PASSWORD TO BACKEND FOR UPDATING
}

//Hide errors when a user selects on the box to re-enter information
$(document).ready(function(){
	$("#password").focus(function(){
		hidePasswordError();
	});

	$("#confirmPassword").focus(function(){
		hidePasswordError();
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