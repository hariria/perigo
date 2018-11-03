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
         $('#saved-items').animate({width: "0px"}, 500);
         setTimeout(function(){
        	table.style.display = "none";
    	},450);
    } else {
    	table.style.display = "block";
        $('#saved-items').animate({width: "400px"}, 500);
    }
};

$(window).scroll(function() {
	var windowpos = $(window).scrollTop();
    $('#saved-items').css('top', windowpos + "px");
});

function displayItems(items) {
	for (var i = 0; i < items.length; i++) {
		var item = document.createElement('div');
		
		var heart = document.createElement('div');
		heart.setAttribute('class', 'heart');
		heart.setAttribute('data-itemID', items[i]['_id']);
		heart.setAttribute('onClick', 'clickedHeart(this)');
		var heart_i = document.createElement('i');
		heart_i.setAttribute('class', 'far fa-heart');
		heart.appendChild(heart_i);
		item.appendChild(heart);
		
		var item_image = document.createElement('div');
		item_image.setAttribute('class', 'item-image');
		item_image.setAttribute('data-itemID', items[i]['_id']);
		item_image.setAttribute('onClick', "getItem(this)");
		var image = document.createElement('img');
		image.setAttribute('class', "item-image-pic");
		image.setAttribute('src', items[i]['image']);
		item_image.appendChild(image);
		item.appendChild(item_image);
		
		var item_title = document.createElement('div');
		item_title.setAttribute('class', 'item-title');
		item_title.setAttribute('data-itemID', items[i]['_id']);
		item_title.setAttribute('onClick', "getItem(this)");		
		var item_title_text = document.createElement('div');
		item_title_text.setAttribute('class', 'item-title-text');
		item_title_text.innerHTML = items[i]['title'];
		item_title.appendChild(item_title_text);
		item.appendChild(item_title);
		
		var item_location = document.createElement('div');
		item_location.setAttribute('class', 'item-location');
		item_location.setAttribute('data-itemID', items[i]['_id']);
		item_location.setAttribute('onClick', "getItem(this)");		
		var item_location_text = document.createElement('div');
		item_location_text.setAttribute('class', 'item-title-text');
		item_location_text.innerHTML = items[i]['location'];
		item_location.appendChild(item_location_text);
		item.appendChild(item_location);
		
		var item_price = document.createElement('div');
		item_price.setAttribute('class', 'item-location');
		item_price.setAttribute('data-itemID', items[i]['_id']);
		item_price.setAttribute('onClick', "getItem(this)");		
		var item_price_text = document.createElement('div');
		item_price_text.setAttribute('class', 'item-price-text');
		item_price_text.innerHTML = '$' + items[i]['maxBid'];
		item_price.appendChild(item_price_text);
		item.appendChild(item_price);
		
		var item_frame = document.getElementsByClassName('item-frame')[0].appendChild(item);
	}
}

function getAllItems() {
	const Url = 'http://localhost:9000/item/';

	$.ajax({
		url: Url,
		type: "GET",
		dataType: 'JSON',
    	success: function(result) {
    		displayItems(result);
    	},
		error: function(error) {
			console.log('Error: ' + error);
		}
	})
}