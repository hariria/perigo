var imagesToSend = [];

function formSubmission() {
	var title = document.getElementsByName('title')[0].value;
	var description = document.getElementsByName('description')[0].value;
	var buyType = sessionStorage.getItem('buyType');
	var keywords = document.getElementsByName('keywords')[0].value.split(',');
	var zipCode = document.getElementsByName('zipcode')[0].value;
	var price = document.getElementsByName('price')[0].value;
	var location = sessionStorage.getItem('location');
	
	var formData = new FormData();
	var images = [];
	for (var i = 0; i < imagesToSend.length; i++) {
		formData.append('files', imagesToSend[i]);
		images.push('http://localhost:9000/item_images/' + imagesToSend[i].name);
	}
	
	$.ajax({
		url: 'http://localhost:9000/uploadMultipleFiles',
	    type: 'post',
	    data: formData,
	    contentType: false,
	    processData: false,
	    success: function(data) {
	    	console.log('Images uploaded succesfully!');
	    },
		error: function(error) {
			console.log('Error in uploading images');
		}
	})
	
	
	var currentDateTime = new Date().getTime();
	    	
	var toSendJson = 
		{
			'title' : title,
			'description' : description,
			'buyType' : buyType,
			'keywords' : keywords,
			'zipCode' : zipCode,
			'images' : images,
			'startForSaleDate' : currentDateTime,
			'endForSaleDate' : currentDateTime + 604800000,
			'userSellingItem' : sessionStorage.getItem('objectId'),
			'maxBid' : price,
			'location' : location
		}
	    	    	    	
	$.ajax({
		url: 'http://localhost:9000/item/',
		type: 'POST',
		contentType:'application/json',
		data : JSON.stringify(toSendJson),
		success : function(result) {

			// Routine to add to user listing
			$.ajax({
				url: 'http://localhost:9000/user/addnewlisting/' + sessionStorage.getItem('objectId'),
				type: 'PUT',
				data: JSON.stringify({'itemId' : result['_id']}),
			    contentType: "application/json",
				error: function(onError) {
					console.log(onError);
				}
			})
		
		},
		error: function(error) {
			console.log(error);
		}
		
	})

	
	
	window.location.href = "/account/account.html";
	
}

function handleClick(option) {
	var clicked = option.value;
	if (clicked === 'buy it now') {
		swal({
		    title: "Buy It Now",
		    text: "This option will keep your item listed indefinitely at a fixed price",
		    icon: "warning"
		})	
		sessionStorage.setItem('buyType', 'buyItNow');
	}
	else {
		swal({
		    title: "Auction",
		    text: "This option will keep your item listed as an auction for exactly a week",
		    icon: "warning"
		})	
		sessionStorage.setItem('buyType', 'auction');
	}
	
}

function searchResults(event) {
    if(event.keyCode === 13){
        event.preventDefault(); 

    	var query = document.getElementById("search").value;
    	const GetItemUrl = 'http://localhost:9000/search/' + query;
    	$.ajax({
    		url: GetItemUrl,
    		type: 'GET',
    		success: function(result) {    			
    			sessionStorage.setItem('search_results', JSON.stringify(result));
    			window.location.href = '/search_results/search.html';
    		}
    	}) 
    }
}


function onload() {
	retrieveUserInfo()
	showSavedItems();
}

function signOut() {
	$.cookie("login_cookie", null, { path: '/' });
	sessionStorage.setItem('objectId', null);
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
			showListings();

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
		image.setAttribute('src', item['images'][0]);
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
	image.setAttribute('src', item['images'][0]);
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

function pushFileToGlobal(old_file) {
	
	var oldName = old_file.name.toLowerCase();
	console.log(oldName);
	var typeCheck = oldName.indexOf('.jpg');

	var objectId = sessionStorage.getItem('objectId');

	var newFileName = objectId + '_' + btoa(oldName);
	if (typeCheck == '-1') {
		newFileName += '.png';
	}
	
	else {
		newFileName += '.jpg';
	}
	
	myNewFile = new File([old_file], newFileName, {type: old_file.type});

	imagesToSend.push(myNewFile);
	
	console.log(imagesToSend);
	
	return myNewFile;
}

function deleteFromGlobal(filename) {
	
	for( var i = 0; i < imagesToSend.length; i++){ 
		if ( imagesToSend[i].name === filename) {
			imagesToSend.splice(i, 1); 
		}
	} 
	
}

function previewFile() {

    var preview = document.createElement("div");
    var image = document.createElement("img");
    // var str = '<i class="fas fa-times" style="color: #CD5C5C;" data-itemID="1" onClick="unsaveItem(this)"></i>';
    var icon = document.createElement("i");


    icon.classList.add('fas');
    icon.style.zIndex = "10";
    icon.classList.add('fa-times');
    icon.style.color = "#CD5C5C";
    icon.setAttribute('data-itemID', "1");
    icon.style.position = "absolute";
    icon.style.right = "10px";
    icon.style.top = "30px";
    icon.style.cursor = "pointer";
    icon.onclick = function (){
        var parent = this.parentNode;
        var fileNameAttribute = parent.getAttribute('newFileName');
        
        deleteFromGlobal(fileNameAttribute);
        parent.outerHTML = "";
    }

    preview.appendChild(image);
    preview.classList.add('picture-item');
    preview.style.position = "relative";
    preview.appendChild(icon);
    image.classList.add('uploaded-image');
    document.getElementById("picture-container").prepend(preview);
    var file = document.querySelector('input[type=file]').files[0];
    

    var newFile = pushFileToGlobal(file);

    var reader = new FileReader();
    reader.addEventListener("load", function () {
        image.src = reader.result;
        icon.parentNode.setAttribute('newFileName', newFile.name);
        image.setAttribute('newFileName', newFile.name);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}


function getCityState(){
    zip = document.getElementById('zipcode').value
    zip = zip.toString();
    console.log("Zip: " + zip);
    
    const Url = "http://api.geonames.org/postalCodeLookupJSON?country=US&username=perigo&postalcode=" + zip;
    console.log(Url);
	$.ajax({
		url: Url,
		type: "GET",
		  dataType: 'jsonp',
		success: function(result) {
			var city = result['postalcodes'][0]['placeName'] + ", " + result['postalcodes'][0]['adminCode1'];
			sessionStorage.setItem('location', city);
		},
		error: function(error) {
			console.log('Error: ' + error);
		}
	})
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
