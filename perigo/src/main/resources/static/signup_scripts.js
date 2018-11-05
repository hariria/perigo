function next(){

	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;

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

	$('#main-container').animate({margin: "10vh 0vh"}, 250);
	setTimeout(function(){
		$('#main-container').animate({width: "500px"}, 500);
		
		setTimeout(function(){
			$('#main-container').animate({height: "900px"}, 500); 
			$('#sectionTwo').animate({height: "300px"}, 500); 

			setTimeout(function(){
				$("#firstNameContainer").delay(250).fadeIn();
				$("#lastNameContainer").delay(250).fadeIn();

				$("#emailContainer").delay(250).fadeIn();
				$("#locationContainer").delay(250).fadeIn();
				$("#zipContainer").delay(250).fadeIn();

				$("#next").fadeOut();

				setTimeout(function(){
					$("#next").hide();
				}, 250);

				setTimeout(function(){
					$("#submit").fadeIn();
				}, 275);
			}, 500);
		}, 500);
	}, 250);
};

function submit(){
	
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var firstName = document.getElementById('firstName').value;
	var lastName = document.getElementById('lastName').value;
	var email = document.getElementById('email').value;
	var location = document.getElementById('location').value;
	var zipCode = document.getElementById('zipCode').value;

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

	if(firstName === null || firstName ===  ""){
		$('#firstName').addClass('redPlaceholder');
		document.getElementById("firstNameContainer").style.borderBottom = "2px solid #cc0000";
		invalid = true;
	}

	if(lastName === null || lastName ===  ""){
		$('#lastName').addClass('redPlaceholder');
		document.getElementById("lastNameContainer").style.borderBottom = "2px solid #cc0000";
		invalid = true;
	}

	if(email === null || email === ""){
		$('#email').addClass('redPlaceholder');
		document.getElementById("emailContainer").style.borderBottom = "2px solid #cc0000";
		invalid = true;
	}

	if(location === null || location ===  ""){
		$('#location').addClass('redPlaceholder');
		document.getElementById("locationContainer").style.borderBottom = "2px solid #cc0000";
		invalid = true;
	}

	if(zipCode === null || zipCode === ""){
		$('#zipCode').addClass('redPlaceholder');
		document.getElementById("zipContainer").style.borderBottom = "2px solid #cc0000";
		invalid = true;
	}

	if(invalid){
		return;
	}

	$('#username').removeClass('redPlaceholder');
	$('#password').removeClass('redPlaceholder');
	$('#firstName').removeClass('redPlaceholder');
	$('#lastName').removeClass('redPlaceholder');
	$('#email').removeClass('redPlaceholder');
	$('#location').removeClass('redPlaceholder');
	$('#zipCode').removeClass('redPlaceholder');
	document.getElementById("usernameContainer").style.borderBottom = "2px solid #adadad";
	document.getElementById("passwordContainer").style.borderBottom = "2px solid #adadad";
	document.getElementById("firstNameContainer").style.borderBottom = "2px solid #adadad";
	document.getElementById("lastNameContainer").style.borderBottom = "2px solid #adadad";
	document.getElementById("emailContainer").style.borderBottom = "2px solid #adadad";
	document.getElementById("locationContainer").style.borderBottom = "2px solid #adadad";
	document.getElementById("zipContainer").style.borderBottom = "2px solid #adadad";


	var userToTransfer = {
		'firstName' : firstName,
		'lastName' : lastName,
		'username' : username,
		'password' : password,
		'email' : email,
		'location' : location,
		'zipCode' : zipCode
	};

	const Url = 'http://localhost:9000/user/';

	$.ajax({
		url: Url,
		type: 'POST',
		contentType:'application/json',

		data: JSON.stringify(userToTransfer),
		success: function(result) {	

			sessionStorage.setItem("objectId", result);
			sessionStorage.setItem("username", username);
			
			document.cookie = 'login_cookie=true; path=/';
			
			alert("Account created succesfully!!");
			// NEED TO STYLE THIS ALERT
			
			window.location.href = 'http://localhost:9000/browse.html';
		},
		error: function(error){
			var errorResponse = error['responseText'];
			if (errorResponse == 'USERNAME EXISTS ALREADY') {
				usernameError('Username already exists');
			}
			else if (errorResponse == 'EMAIL ALREADY REGISTERED') {
				emailError('Account with this email already registered');
			}
			else if (errorResponse == 'MUST USE USC EMAIL') {
				emailError('Email must be registered with USC')
			}
			else if (errorResponse == 'INVALID ZIP CODE') {
				zipCodeError('Invalid zipcode')
			}
			
		}
	})
}


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

function emailError(errorMsg){
	$('#emailContainer').animate({margin: "0px"}, 0);
	$('#emailError').animate({margin: "0px 0px 16px 0px"}, 0);
	$('#emailError').fadeIn();
	$("#emailError").html(errorMsg);	
}

function hideEmailError(){
	$('#emailContainer').animate({margin: "0px 0px 37px 0px"}, 0);
	$('#emailError').animate({margin: "0px"}, 0);
	$('#emailError').hide();
}

function zipCodeError(errorMsg){
	$('#zipContainer').animate({margin: "0px"}, 0);
	$('#zipCodeError').animate({margin: "0px 0px 16px 0px"}, 0);
	$('#zipCodeError').fadeIn();
	$("#zipCodeError").html(errorMsg);	
}

function hideZipCodeError(){
	$('#zipContainer').animate({margin: "0px 0px 37px 0px"}, 0);
	$('#zipCodeError').animate({margin: "0px"}, 0);
	$('#zipCodeError').hide();
}