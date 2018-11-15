
// You need to have all the following code for using sockets on other pages

var stompClient = null;

function setConnected(connected) {

}

document.addEventListener('DOMContentLoaded', function() {
    var socket = new SockJS('http://localhost:9000/perigoendpoint');
    var userid = sessionStorage.getItem('objectId');
	var parameters = new URLSearchParams(window.location.search);
	var itemId = parameters.get('itemId');
    stompClient = Stomp.over(socket);
    stompClient.connect({ 
    	name: userid,
    	item: itemId
    }, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        //HAPPENS ON ALL PAGES
        stompClient.subscribe('/user/queue/bidalerts', function (alert) {
        	// Here's where you display notifications in your div
        	showNotification(alert.body);
        });
        stompClient.subscribe('/user/queue/pricealerts', function (alert) {
        	// This is only necessary on the product page, it updates the price of the item
        	document.getElementById('current-price-1').innerHTML = '$' + alert.body + '.00';
        	document.getElementById('current-price-2').innerHTML = '$' + alert.body + '.00';
        	document.getElementById('current-price-3').innerHTML = '$' + alert.body + '.00';
        });  
        stompClient.subscribe('/queue/browsePriceAlerts', function (alert) {
        	// This is only necessary on the browse page
        	var priceUpdate = alert.body;
        	var res = priceUpdate.split("-");
        	if (document.querySelectorAll('[data-itemid="' + res[0] + '"]')[4] != null) {
                var element = document.querySelectorAll('[data-itemid="' + res[0] + '"]')[4];
                var inner = element.children[0];
                inner.innerText = "$" + res[1];
        	}        	
        });
    });
}, false);

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}


//timer
function showNotification(message) {

    swal({
        toast: true,
        position: 'top-end',
        timer: 5000,
        title: message,
        type: 'info' 
     });
}
