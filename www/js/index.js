var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    prepareSms: function() {
	var number = document.getElementById('numberTxt').value;
	var create_hospital = new Hospital(
		{
		    name: "Matt Hospital",
		    population: 100,
		    address: '1234 Crisis Road'
		}
	)
	var delete_hospital = new Hospital(
		{
		    name: "Drew Hospital",
		    population: 100,
		    address: '1234 Apocolypse Avenue'
		}
	)
	var update_shelter = new Shelter(
		{
		    name: "Scott Shack",
		    population: 90,
		    address: '1234 Archery Street'
		}
	)
	var actions_to_take = []
	actions_to_take.push(1);
	actions_to_take.push(2);
	actions_to_take.push(3);
	var models_to_change = [
	    create_hospital,
	    delete_hospital,
	    update_shelter
	]
	var messagesToSend = prepareSms(models_to_change, actions_to_take);

	//CONFIGURATION
	var options = {
	    replaceLineBreaks: false, // true to replace \n by a new line, false by default
	    android: {
		//intent: 'INTENT'  // send SMS with the native android SMS messaging
		intent: '' // send SMS without open any other app
	    }
	};

	var success = function () { alert('Message sent successfully'); };
	var error = function (e) { alert('Message Failed:' + e); };

	// send messages
	for (i = 0; i < messagesToSend.length; i++){
	    sms.send(number, messagesToSend[i], options, success, error);
	}
    }
};

app.initialize();
