
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
        stompClient.subscribe('/user/queue/bidalerts', function (alert) {
        	// Here's where you display notifications in your div
        	showNotification(alert.body);
        });
        stompClient.subscribe('/user/queue/pricealerts', function (alert) {
        	// This is only necessary on the product page, it updates the price of the item
        	document.getElementById('current-price-1').innerHTML = '$' + alert.body + '.00';
        	document.getElementById('current-price-2').innerHTML = 'Current Price: $' + alert.body + '.00';
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

function showNotification(message) {
    $("#notification").append("<tr><td>" + message + "</td></tr>");
}
