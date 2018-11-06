function onload() {
	retrieveUserInfo();
	showListings();
	showSavedItems();
}

function signOut() {
	$.cookie("login_cookie", null, { path: '/' });
	sessionStorage.setItem('objectID', null);
	window.location.href = '/browse/browse.html';
}

function retrieveUserInfo() {
	const Url = 'http://localhost:9000/user/' + sessionStorage.getItem('objectId');
	
	$.ajax({
		url: Url,
		type: "GET",
		dataType: 'JSON',
		success: function(result) {
			var email = result['email'];
			var firstName = result['firstName'];
			var lastName = result['lastName'];
			var location = result['location'];
			var zipCode = result['zipCode'];
			var rating = result['userRating'];
						
			document.getElementById('email-address').innerHTML = email;
			document.getElementById('firstName-field').innerHTML = firstName;
			document.getElementById('lastName-field').innerHTML = lastName;
			document.getElementById('location-field').innerHTML = location;
			document.getElementById('zip-field').innerHTML = zipCode;
			document.getElementById('rating-field').innerHTML = rating;

			sessionStorage.setItem('user', JSON.stringify(result));
		},
		error: function(error) {
			console.log('Error: ' + error);
		}
	})

}

function generateSavedItem(item) {
		var toAdd = document.createElement('div');
		toAdd.setAttribute('class', 'item saved-item');
		toAdd.setAttribute('data-itemID', item['_id']);

		var heart = document.createElement('div');
		heart.setAttribute('class', 'heart');
		heart.setAttribute('data-itemID', item['_id']);
		heart.setAttribute('onClick', 'clickedHeart(this)');
		heart.setAttribute('saved', 'false');
		var heart_i = document.createElement('i');
		heart_i.setAttribute('class', 'far fa-heart');
		heart_i.setAttribute('class', 'fas fa-heart');
		heart_i.setAttribute('style', 'color: #ff4755');
		heart.setAttribute('saved', 'true');

		heart.appendChild(heart_i);
		toAdd.appendChild(heart);

		var item_image = document.createElement('div');
		item_image.setAttribute('class', 'item-image');
		item_image.setAttribute('data-itemID', item['_id']);
		item_image.setAttribute('onClick', "getItem(this)");
		var image = document.createElement('img');
		image.setAttribute('class', "item-image-pic");
		image.setAttribute('src', item['image']);
		item_image.appendChild(image);
		toAdd.appendChild(item_image);

		var item_title = document.createElement('div');
		item_title.setAttribute('class', 'item-title');
		item_title.setAttribute('data-itemID', item['_id']);
		item_title.setAttribute('onClick', "getItem(this)");		
		var item_title_text = document.createElement('div');
		item_title_text.setAttribute('class', 'item-title-text');
		item_title_text.innerHTML = item['title'];
		item_title.appendChild(item_title_text);
		toAdd.appendChild(item_title);

		var item_location = document.createElement('div');
		item_location.setAttribute('class', 'item-location');
		item_location.setAttribute('data-itemID', item['_id']);
		item_location.setAttribute('onClick', "getItem(this)");		
		var item_location_text = document.createElement('div');
		item_location_text.setAttribute('class', 'item-title-text');
		item_location_text.innerHTML = item['location'];
		item_location.appendChild(item_location_text);
		toAdd.appendChild(item_location);

		var item_price = document.createElement('div');
		item_price.setAttribute('class', 'item-location');
		item_price.setAttribute('data-itemID', item['_id']);
		item_price.setAttribute('onClick', "getItem(this)");		
		var item_price_text = document.createElement('div');
		item_price_text.setAttribute('class', 'item-price-text');
		item_price_text.innerHTML = '$' + item['maxBid'];
		item_price.appendChild(item_price_text);
		toAdd.appendChild(item_price);

		var item_frame = document.getElementsByClassName('item-frame')[1].appendChild(toAdd);
}

function generateListing(item) {

	var toAdd = document.createElement('div');
	toAdd.setAttribute('class', 'item listing-item');

	var item_image = document.createElement('div');
	item_image.setAttribute('class', 'item-image');
	item_image.setAttribute('data-itemID', item['_id']);
	item_image.setAttribute('onClick', "getItem(this)");
	var image = document.createElement('img');
	image.setAttribute('class', "item-image-pic");
	image.setAttribute('src', item['image']);
	item_image.appendChild(image);
	toAdd.appendChild(item_image);

	var item_title = document.createElement('div');
	item_title.setAttribute('class', 'item-title');
	item_title.setAttribute('data-itemID', item['_id']);
	item_title.setAttribute('onClick', "getItem(this)");		
	var item_title_text = document.createElement('div');
	item_title_text.setAttribute('class', 'item-title-text');
	item_title_text.innerHTML = item['title'];
	item_title.appendChild(item_title_text);
	toAdd.appendChild(item_title);

	var item_location = document.createElement('div');
	item_location.setAttribute('class', 'item-location');
	item_location.setAttribute('data-itemID', item['_id']);
	item_location.setAttribute('onClick', "getItem(this)");		
	var item_location_text = document.createElement('div');
	item_location_text.setAttribute('class', 'item-title-text');
	item_location_text.innerHTML = item['location'];
	item_location.appendChild(item_location_text);
	toAdd.appendChild(item_location);

	var item_price = document.createElement('div');
	item_price.setAttribute('class', 'item-location');
	item_price.setAttribute('data-itemID', item['_id']);
	item_price.setAttribute('onClick', "getItem(this)");		
	var item_price_text = document.createElement('div');
	item_price_text.setAttribute('class', 'item-price-text');
	item_price_text.innerHTML = '$' + item['maxBid'];
	item_price.appendChild(item_price_text);
	toAdd.appendChild(item_price);

	
	var item_frame = document.getElementsByClassName('item-frame')[0].appendChild(toAdd);

}

function showListings() {
	var itemsForSale = JSON.parse(sessionStorage.getItem('user'))['sellingItems'];

	for (var i = 0; i < itemsForSale.length; i++) {
		const Url = 'http://localhost:9000/item/' + itemsForSale[i]['itemId'];
		
		$.ajax({
			url: Url,
			type: "GET",
			dataType: 'JSON',
			success: function(result) {
				generateListing(result);
				
			},
			error: function(error) {
				console.log('Error: ' + error);
			}
		});
	}
}

function showSavedItems() {
	const Url = 'http://localhost:9000/user/' + sessionStorage.getItem('objectId');
	
	$.ajax({
		url: Url,
		type: "GET",
		dataType: 'JSON',
		success: function(result) {
			var savedItems = result['savedItems'];
			for (var i = 0; i < savedItems.length; i++) {
				$.ajax({
					url: 'http://localhost:9000/item/' + savedItems[i]['itemId'],
					type: "GET",
					dataType: 'JSON',
					success: function(result) {
						generateSavedItem(result);
						
					},
					error: function(error) {
						console.log('Error: ' + error);
					}
				});
			}

		},
		error: function(error) {
			console.log('Error: ' + error);
		}
	})


}
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
function clickedHeart(element){
	var elementID = element.getAttribute("data-itemID");
	console.log(elementID);
	removeSavedItem(elementID);
	window.location.reload();

};

function getItem(element){
	var elementID = element.getAttribute("data-itemID");
	console.log(elementID);
};

function unsaveItem(element){
	var elementID = element.getAttribute("data-itemID");
	console.log(elementID);
};


$(window).scroll(function() {
	var windowpos = $(window).scrollTop();
    $('#saved-items').css('top', windowpos + "px");
});



function resetSavedItems(){
	swal({
		  title: "Are you sure?",
		  text: "Once deleted, you will not be able to recover your saved items",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
		        var savedItems = document.getElementsByClassName("saved-item");
		        Array.from(document.getElementsByClassName('saved-item')).forEach(v => {
		            v.style.display = "none";
		            removeSavedItem(v.getAttribute("data-itemID"))
		        });  
			}

		})
}


function addAListing(){
    window.location.href = './newListing.html';
}

function previewFile() {

    var preview = document.createElement("div");
    var image = document.createElement("img");
    var str = '<i class="fas fa-times" style="color: #949494;" data-itemID="1" onClick="unsaveItem(this)"></i>';
    var icon = document.createElement("i");

    icon.classList.add('fas');
    icon.style.zIndex = "10";
    icon.classList.add('fa-times');
    icon.style.color = "#949494";
    icon.setAttribute('data-itemID', "1");
    icon.onclick = unsaveItem(icon);

    preview.appendChild(image);
    preview.appendChild(icon);
    image.classList.add('uploaded-image');
    document.getElementById("picture-container").prepend(preview);
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        image.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}


function getCityState(){
    zip = document.getElementById('zipcode').value
    zip = zip.toString();
    console.log("Zip: " + zip);
    var geoInfo = $.getJSON("http://www.geonames.org/postalCodeLookupJSON?&country=DE&callback=?", {postalcode: zip }, function(response) {
		console.log(response);
	});
    // console.log(geoInfo);
}

var newLocation = null;
var newZip = null;

$(function() {
	
	$( "#location-field" ).blur(function() {
		newLocation = document.getElementById('location-field').innerHTML;
		console.log(newLocation);
	});
	$( "#zip-field" ).blur(function() {
		newZip = document.getElementById('zip-field').innerHTML;
		console.log(newZip);	
	});
});

$(window).bind('beforeunload', function(){
	if (newLocation != null || newZip != null) {
		var toTransfer = 
			{
				'location' : newLocation,
				'zipCode' : newZip
			}
		
		const Url = 'http://localhost:9000/user/contenteditable/' + sessionStorage.getItem('objectId');
		
		$.ajax({
			url: Url,
			type: "PUT",
			contentType:'application/json',
			data: JSON.stringify(toTransfer),
			success: function(result) {

			},
			error: function(error) {
				console.log('Error: ' + error);
			}
		})

	}
});