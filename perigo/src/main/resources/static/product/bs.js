//Set the date we're counting down to
var countDownDate = null;
var currentMaxBid = 0;
var itemId = "";

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
	
	var image_path = user['image'];

	document.getElementById('profile-pic').setAttribute('src', image_path);
	
	
	console.log(user['_id']);
	console.log(sessionStorage.getItem('objectId'));
	if (user['_id'] === sessionStorage.getItem('objectId')) {
		console.log('in here');
		document.getElementById('bid-now').style.display = "None";
		
	}
}

function loadItem(item) {	
	sessionStorage.setItem('zipCode', item['zipCode']);
	document.getElementById('product-name').innerHTML = item['title'];
	document.getElementById('current-price-1').innerHTML = '$' + item['maxBid'] + '.00';
	document.getElementById('current-price-2').innerHTML = 'Current Price: $' + item['maxBid'] + '.00';
	
	currentMaxBid = item['maxBid'];
	
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
	itemId = parameters.get('itemId');

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
					generateSavedItems(onSuccess);
					checkCookie();
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
	var url = "http://localhost:9000/product/bs.html?itemId=" + elementID;
	window.location.href = url;
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

function submitBid() {
	var objectId = sessionStorage.getItem('objectId');
	
	var bid = document.getElementById('input-bid').value;
	
	if (bid === "") {
		swal("No Bid Entered", "Please enter a bid before submitting", "error");
		return false;
	}
	
	else if (bid <= currentMaxBid) {
		swal("Invalid Bid", "Your bid is less than the current price", "error");
		return false;
	}
	else {
		var bidJson = {
			'bid' : bid,
			'highestBidder' : sessionStorage.getItem('objectId')
		};
		console.log(bidJson);
		$.ajax({
			url: 'http://localhost:9000/item/submitbid/' + itemId,
			type: "PUT",
			contentType:'application/json',
			data: JSON.stringify(bidJson),
			success: function(result) {
				console.log('success')
				window.location.reload();
			},
			error: function(error) {
				console.log('error');
			}
		})
	}
}

function signInToBid() {
	swal("Sign In", "You must be signed in to bid on this item", "error");
}

function checkCookie() {
	var value = $.cookie("login_cookie");
	var accountDiv = document.getElementById("account");
	var aTag = document.createElement('a');
	if (value == null || value == 'null') {
		aTag.setAttribute('href', '/signup/signup.html');
		aTag.innerHTML = 'Sign Up';
		document.getElementById('bit-submit').setAttribute('onclick', 'signInToBid(); return false;');
	}
	else {
		aTag.setAttribute('href', '/account/account.html');
		aTag.innerHTML = 'Account';		
	}

	aTag.setAttribute('style', 'text-decoration: none; color: inherit;')
	accountDiv.appendChild(aTag);
}



function generateSavedItems(result) {
	var savedItems = result['savedItems'];
	var userObjectId = sessionStorage.getItem("objectId");

	for (var i = 0; i < savedItems.length; i++) {
		const Url = 'http://localhost:9000/item/' + savedItems[i]['itemId'];
		$.ajax({
			url: Url,
			type: "GET",
			dataType: 'JSON',
			success: function(result) {				

				var tr = document.createElement('tr');
				tr.setAttribute('id', result['_id']);

				var td1 = document.createElement('td');
				var table_item_text = document.createElement('div');
				table_item_text.setAttribute('class', 'table-item-text');
				table_item_text.setAttribute('data-itemID', result['_id']);
				table_item_text.setAttribute('onClick', 'getItem(this)');
				table_item_text.innerHTML = result['title'];
				td1.appendChild(table_item_text);
				tr.appendChild(td1);

				var td2 = document.createElement('td');
				var table_price_text = document.createElement('div');
				table_price_text.setAttribute('class', 'table-price-text');
				table_price_text.innerHTML = '$' + result['maxBid'];
				td2.appendChild(table_price_text);
				tr.appendChild(td2);

				var td3 = document.createElement('td');
				var i_class = document.createElement('i');				
				i_class.setAttribute('class', 'fas fa-times');
				i_class.setAttribute('style', 'color: #949494;');					
				i_class.setAttribute('data-itemID', result['_id']);
				i_class.setAttribute('onClick', 'unsaveItem(this)');
				td3.appendChild(i_class);
				tr.appendChild(td3);

				document.getElementById('saved-table').appendChild(tr);

			},
			error: function(error) {
				console.log('Error: ' + error);
			}
		})
	}
}

function unsaveItem(element){
	var elementID = element.getAttribute("data-itemID");
	removeSavedItem(elementID);
	removeRow(elementID);
};


function removeSavedItem(elementID) {
	const UserUrl = 'http://localhost:9000/user/removesaveditem/' + sessionStorage.getItem('objectId');
	$.ajax({
		url: UserUrl,
		type: "PUT",
		contentType:'application/json',
		data: JSON.stringify({'itemId' : elementID}),
		success: function(result) {
			
		},
		error: function(error) {
			console.log(error);
		}
	})

	const ItemUrl = 'http://localhost:9000/item/removewatchinguser/' + elementID;
	$.ajax({
		url: ItemUrl,
		type: "PUT",
		contentType:'application/json',
		data: JSON.stringify({'userWatchingId' : sessionStorage.getItem('objectId')}),

		success: function(result) {

		},
		error: function(error) {
			console.log(error);
		}
	})
}


function removeRow(elementID){
	document.getElementById(elementID).remove();
}