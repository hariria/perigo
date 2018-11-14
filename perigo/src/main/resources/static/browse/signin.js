function signUp(){
	document.location.href = "../signup/signup.html";
};

function showSignIn(){

	/* Revert and changes forgot password made */
	$('#sign-in').animate({height: "650px"}, 0); 
	$("#headerText").show();

	$("#username").show();
	$("#email").hide();
		document.getElementById("usernameContainer").style.borderBottom = "2px solid #adadad";
	$('#email').removeClass('redPlaceholder');
	$("#passwordContainer").show();

	$("#linkContainer").show();
	$("#forgotText").hide();
	$("#signUpText").show();

	$('#buttons').animate({height: "75px"}, 0);
	$("#submit").show();
	$("#forgotPasswordButton").hide();
	
	/* Show the sign in */
	$('#modal').fadeIn(250);
	$('#sign-in').fadeIn(250);
	document.getElementById("sign-in").style.display = "flex";
}

function hideSignIn(){
	$('#modal').fadeOut(250);
	$('#sign-in').fadeOut(250);
};

//Hide errors when a user selects on the box to re-enter information
$(document).ready(function(){
	$("#username").focus(function(){
		hideUsernameError();
	});

	$("#password").focus(function(){
		hidePasswordError();
	});
});

function usernameError(errorMsg){
	$('#usernameContainer').animate({margin: "0px"}, 0);
	$('#usernameError').animate({margin: "0px 0px 16px 0px"}, 0);
	$('#usernameError').fadeIn();
	$("#usernameError").html(errorMsg);	
}

function hideUsernameError(){
	$('#usernameContainer').animate({margin: "0px 0px 37px 0px"}, 0);
	$('#usernameError').animate({margin: "0px"}, 0);
	$('#usernameError').hide();
}

function passwordError(errorMsg){
	$('#passwordContainer').animate({margin: "0px"}, 0);
	$('#passwordError').animate({margin: "0px 0px 16px 0px"}, 0);
	$('#passwordError').fadeIn();
	$("#passwordError").html(errorMsg);	
}

function hidePasswordError(){
	$('#passwordContainer').animate({margin: "0px 0px 37px 0px"}, 0);
	$('#passwordError').animate({margin: "0px"}, 0);
	$('#passwordError').hide();
}

function emailLink(){
	var email = document.getElementById('email').value;

	var invalid = false;
	if(email === null || email === ""){
		$('#email').addClass('redPlaceholder');
		document.getElementById("usernameContainer").style.borderBottom = "2px solid #cc0000";
		invalid = true;
	}

	if(invalid){
		return;
	}

	$('#email').removeClass('redPlaceholder');
	document.getElementById("usernameContainer").style.borderBottom = "2px solid #adadad";

	console.log(email);

	$.ajax({
		url: 'http://localhost:9000/forgotpassword',
		contentType:'application/json',
		method : 'post',
		data : email,
	})
	swal('Email Sent!', 
		 'Please check your email for further instructions. It may take up to a minute for you to receive it.', 
		  'success')
	location.reload(); 
		
}


function forgotPassword(){
	$('#sign-in').animate({height: "475px"}, 500); 
	$("#headerText").fadeOut();
	$("#forgotText").delay(400).fadeIn();
	$("#username").fadeOut();
	$("#email").delay(400).fadeIn();
	$("#passwordContainer").fadeOut();
	$("#linkContainer").fadeOut();
	$("#submit").fadeOut();
	$("#signUpText").fadeOut();

	setTimeout(function(){
		$('#buttons').animate({height: "0px"}, 0);
		$("#forgotPasswordButton").fadeIn();
	}, 550);
	
	
}

function verify() {
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var rememberMe = $('input[type=checkbox]').prop('checked');

	var invalid = false;
	if(username === null || username === ""){
		$('#username').addClass('redPlaceholder');
		document.getElementById("usernameContainer").style.borderBottom = "2px solid #cc0000";
		invalid = true;
	}

	if(password === null || password ===  ""){
		$('#password').addClass('redPlaceholder');
		document.getElementById("passwordContainer").style.borderBottom = "2px solid #cc0000";
		invalid = true;
	}

	if(invalid){
		return;
	}

	$('#username').removeClass('redPlaceholder');
	$('#password').removeClass('redPlaceholder');
	document.getElementById("usernameContainer").style.borderBottom = "2px solid #adadad";
	document.getElementById("passwordContainer").style.borderBottom = "2px solid #adadad";
	
	const Url = 'http://localhost:9000/user/login';
	var toTransfer = 
		{
			'username' : username,
			'password' : password
		}
	$.ajax({
		url: Url,
		type: 'POST',
		contentType:'application/json',

		data: JSON.stringify(toTransfer),
		success: function(result) {	
			
			if (rememberMe == true) {
				var date = new Date();
				date.setTime(date.getTime()+ 6*60*60*1000);
				
				document.cookie = 'login_cookie='+result+';expires='+date.toGMTString()+';path=/';
			}
			else {
				document.cookie = 'login_cookie='+result+';path=/';
			}

			// INSERT LOGIC TO RETURN TO BROWSE PAGE
			// temporary logic
			window.location.href = '/browse/browse.html';
		},
		error: function(error){
			var responseText = error['responseText'];

			if (responseText === 'USER DOES NOT EXIST') {
				usernameError("An account with this username does not exist");
			}
			
			else if (responseText === 'INCORRECT PASSWORD') {
				passwordError("The entered password is invalid");
			}
		}
	})
}