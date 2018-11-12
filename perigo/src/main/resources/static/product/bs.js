//Set the date we're counting down to
var countDownDate = null;

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
    
    // If the count down is over, write some text 
    if (distance < 0) {
    	clearInterval(x);
    	document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);

function loadUser(user) {
	var name = user['firstName'] + " " + user['lastName'];
	
	document.getElementById('seller-name').innerHTML = name;
	document.getElementById('location').innerHTML = user['location'];

}

function loadItem(item) {
	console.log(item);
	
	document.getElementById('product-name').innerHTML = item['title'];
	document.getElementById('current-price-1').innerHTML = '$' + item['maxBid'] + '.00';
	document.getElementById('current-price-2').innerHTML = 'Current Price: $' + item['maxBid'] + '.00';
	
	var endDate = item['endForSaleDate'];
	countDownDate = new Date(endDate);
	
	document.getElementById('end-date').innerHTML = 'End Date: ' + countDownDate.toString();
	
	var images = item['images'];
	var carousel = document.getElementsByClassName('carousel-inner')[0];
	
	for (var i = 0; i < images.length; i++) {
		
		
		var div = document.createElement('div');
		if (i == 0) div.setAttribute('class', 'item active');
		else div.setAttribute('class', 'item');
	
		var img = document.createElement('img');
		img.setAttribute('src', images[i]);
		
		div.appendChild(img);
		carousel.appendChild(div);
	}
	
	document.getElementById('product-description-text').innerHTML = item['description'];
	document.getElementById('location-text').innerHTML = item['location'];
	
	
	var keywords = item['keywords'];
	var category = document.getElementsByClassName('category')[0];
	for (var i = 0; i < keywords.length; i++) {
		var button = document.createElement('button');
		button.setAttribute('type', 'button');
		button.innerHTML = keywords[i];
		category.appendChild(button);
	}
}


function onPageLoad() {
	var parameters = new URLSearchParams(window.location.search);
	var itemId = parameters.get('itemId');

	// Gets item information
	$.ajax({
		"async": true,
		"crossDomain": true,
		"url": "http://localhost:9000/item/" + itemId,
		"method": "GET",
		"headers": {
			"Content-Type": "application/x-www-form-urlencoded",
			"cache-control": "no-cache",
		},
		success: function(result) {
			console.log(result);
			var userSelling = result['userSellingItem'];
			$.ajax({
				async : true,
				crossDomain : true,
				url : "http://localhost:9000/user/" + userSelling,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"cache-control": "no-cache",
				},
				success : function(onSuccess) {
					loadUser(onSuccess);
					loadItem(result);
				}


			})
			
		
		},
		error: function(error) {
			console.log(error);
		}
	})

}


function clickedHeart(element){
	var elementID = element.getAttribute("data-itemID");
	console.log(elementID);

	if(element.innerHTML === "<i class=\"fas fa-heart\"></i>"){
		element.innerHTML = "<i class='far fa-heart'></i>";
		element.style.color = "white";

	}else{
		element.innerHTML = "<i class='fas fa-heart'></i>";
		element.style.color = "#FF4755";
	}
};

function getItem(element){
	var elementID = element.getAttribute("data-itemID");
	console.log(elementID);
};

function unsaveItem(element){
	var elementID = element.getAttribute("data-itemID");
	console.log(elementID);
};

function showSavedItems(){
	
    var table = document.getElementById("saved-items");
    if (table.style.display === "block") {
         $('#saved-items').animate({width: "0px"}, 275);
         setTimeout(function(){
        	table.style.display = "none";
    	},300);
    } else {
    	table.style.display = "block";
        $('#saved-items').animate({width: "312.5px"}, 275);
    }
    
    
};

function show(){
    document.getElementById("seller").style.height = "700px";
    document.getElementById("top").style.height = "610px";
    document.getElementById("saved-items").style.marginTop = "30px"
    document.getElementById("button").style.display = "none";

    var table = document.getElementById("temp");
    if (table.style.display === "block") {
         $('#temp').animate({width: "0px"}, 300);
         setTimeout(function(){
        	table.style.display = "none";
    	},450);
    } else {
    	table.style.display = "block";
        $('#temp').animate({width: "300px"}, 500);
    }
    
};


