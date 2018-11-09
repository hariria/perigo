function checkCookie() {
	var value = $.cookie("login_cookie");
	var accountDiv = document.getElementById("account");
	var aTag = document.createElement('a');
	if (value == null || value == 'null') {
		aTag.setAttribute('href', '/signup/signup.html');
		aTag.innerHTML = 'Sign Up';
			}
	else {
		aTag.setAttribute('href', '/account/account.html');
		aTag.innerHTML = 'Account';
		
		sessionStorage.setItem("objectId", value);
		
		document.getElementById('sign_in').style.display = 'none';

	}
	
	aTag.setAttribute('style', 'text-decoration: none; color: inherit;')
	accountDiv.appendChild(aTag);
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


function removeRow(elementID){
	document.getElementById(elementID).remove();
}

function clickedHeart(element){
	var value = $.cookie("login_cookie");
	if (sessionStorage.getItem('objectId') == null || value == null || value == 'null' ) {
		swal({
		    title: "User not signed in",
		    text: "Please sign in to save items!",
		    icon: "error"
		})
		return;
	}

	var elementID = element.getAttribute("data-itemID");


	if(element.getAttribute('saved') === 'true'){
		element.innerHTML = "<i class='far fa-heart'></i>";
		element.style.color = "white";
		element.setAttribute('saved', 'false');

		removeSavedItem(elementID);

		removeRow(elementID);

	}
	else{ // If not saved
		element.innerHTML = "<i class='fas fa-heart'></i>";
		element.style.color = "#FF4755";
		element.setAttribute('saved', 'true');
		const UserUrl = 'http://localhost:9000/user/addsaveditem/' + sessionStorage.getItem('objectId');
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

		const ItemUrl = 'http://localhost:9000/item/addwatchinguser/' + elementID;
		
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

		const GetItemUrl = 'http://localhost:9000/item/' + elementID;
		$.ajax({
			url: GetItemUrl,
			type: 'GET',
			contentType: 'application/json',
			success: function(result) {

				var tr = document.createElement('tr');
				tr.setAttribute('id', elementID);

				var td1 = document.createElement('td');
				var table_item_text = document.createElement('div');
				table_item_text.setAttribute('class', 'table-item-text');
				table_item_text.setAttribute('data-itemID', elementID);
				table_item_text.setAttribute('onClick', 'getItem(this)');
				table_item_text.innerHTML = result['title'];
				td1.appendChild(table_item_text);
				tr.appendChild(td1);

				var td2 = document.createElement('td');
				var table_price_text = document.createElement('div');
				table_price_text.innerHTML = '$' + result['maxBid'];
				td2.appendChild(table_price_text);
				tr.appendChild(td2);

				var td3 = document.createElement('td');
				var i_class = document.createElement('i');
				i_class.setAttribute('class', 'fas fa-times');
				i_class.setAttribute('style', 'color: #949494;');
				i_class.setAttribute('data-itemID', elementID);
				i_class.setAttribute('onClick', 'unsaveItem(this)');
				td3.appendChild(i_class);
				tr.appendChild(td3);

				document.getElementById('saved-table').appendChild(tr);	
			}
		})

	}
};


function getItem(element){
	var elementID = element.getAttribute("data-itemID");
};

function unsaveItem(element){
	var elementID = element.getAttribute("data-itemID");
	removeSavedItem(elementID);
	removeRow(elementID);

	var heart = $('div').find(`[data-itemID='${elementID}']`)[0];
	heart.setAttribute('saved', 'false');
	heart.setAttribute('style', 'color: white');

	var i_temp = document.createElement('i');
	i_temp.setAttribute('class', 'far fa-heart');
	heart.innerHTML = "";
	heart.appendChild(i_temp);



};

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

function showSavedItems(){
	var objectId = sessionStorage.getItem("objectId");
	
	var value = $.cookie("login_cookie");
	if (sessionStorage.getItem('objectId') == null || value == null || value == 'null' ) {
		swal({
		    title: "User not signed in",
		    text: "Please sign in to view your saved items!",
		    icon: "error"
		})
		return;
	}


	var table = document.getElementById("saved-items");
	if (table.style.display === "block") {
		$('#saved-items').animate({width: "0px"}, 500);
		setTimeout(function(){
			table.style.display = "none";
		},450);
	} else {

		document.getElementById("saved-table").innerHTML = "";

		table.style.display = "block";

		const Url = 'http://localhost:9000/user/' + objectId;

		$.ajax({
			url: Url,
			type: "GET",
			dataType: 'JSON',
			success: function(result) {
				generateSavedItems(result);
			},
			error: function(error) {
				console.log('Error: ' + error);
			}
		})


		$('#saved-items').animate({width: "400px"}, 500);
	}
};

$(document).ready(resizeSaved);
$(window).resize(resizeSaved);

function resizeSaved(){
	var windowpos = $(window).scrollTop();
	$('#saved-items').css('top', windowpos + "px");
	var winheight = $( window ).height();
	$('#saved-items').css('max-height', winheight - 240 + "px");
}

/* 225px is the number of pixels the saved is below the top of the screen, so 240px is used as a buffer*/
$(window).scroll(function() {
	resizeSaved();
});

function displayItems(items) {
	var userObjectId = sessionStorage.getItem('objectId');
	for (var i = 0; i < items.length; i++) {
		var item = document.createElement('div');

		var isSavedState = false;
		var usersWatching = items[i]['usersWatching'];
		for (var j = 0; j < usersWatching.length; j++) {
			if (usersWatching[j]['userWatchingId'] == userObjectId) {
				isSavedState = true;
				break;
			}
		}

		var heart = document.createElement('div');
		heart.setAttribute('class', 'heart');
		heart.setAttribute('data-itemID', items[i]['_id']);
		heart.setAttribute('onClick', 'clickedHeart(this)');
		heart.setAttribute('saved', 'false');
		var heart_i = document.createElement('i');
		heart_i.setAttribute('class', 'far fa-heart');
		if (isSavedState) {
			heart_i.setAttribute('class', 'fas fa-heart');
			heart_i.setAttribute('style', 'color: #ff4755');
			heart.setAttribute('saved', 'true');
		}
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

function onLoadFunction() {
	checkCookie();
	getAllItems();
}