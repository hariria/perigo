function savedItemCallback(item, itemArray) {
	itemArray.push(item);
}

function getSavedItems(savedItems) {
	var toReturn = [];
	for (var i = 0; i < savedItems.length; i++) {
		var Url = 'http://localhost:9000/item/' + savedItems[i]['itemId'];
		$.ajax({
			url: Url,
			type: "GET",
			dataType: 'JSON',
	    	success: function(result) {
	    		savedItemCallback(result, toReturn);
	    	},
			error: function(error) {
				console.log('Error: ' + error);
			}
		})
	}
	return toReturn;
}

function getUserData() {
	const Url = 'http://localhost:9000/user/googleuser/1234567/'

	$.ajax({
		url: Url,
		type: "GET",
		dataType: 'JSON',
    	success: function(result) {
    		var savedItems = getSavedItems(result['savedItems']);
    		var profile = result;
    	},
		error: function(error) {
			console.log('Error: ' + error);
		}
	})
}