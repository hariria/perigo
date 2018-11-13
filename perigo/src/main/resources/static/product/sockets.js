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
        	showNotification(alert.body);
        });
        stompClient.subscribe('/user/queue/pricealerts', function (alert) {
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
