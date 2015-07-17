// INPUT:
// string = string of entire message to be processed on server
// OUTPUT:
// list of message partitioned so it can be sent over SMS
function partitionMessage(string) {
    var msgLength = string.length
    var messageComponents = [];
    // if size fits into one sms
    if (msgLength <= 80) {
	messageComponents.push(string);
    } 
    // message has to be split amongst multiple SMS
    else {
	messageComponents.push(string.slice(-80);
	var newLength = msgLength - 80;
	while (newLength > 0) {

	var tempString = string;	
    }
    return messageComponents;
}

// INPUT:
// models = list of backbone models to be altered
// actions = actions to take for models provided to method
// OUTPUT: a list of messages to be sent via SMS
function prepareSms(models, actions) {

    var preString = {}
    for (i = 0; i < actions.length; i++) {
	if (preString.hasOwnProperty(actions[i])) {
	    preString[actions[i]].push(models[i].toJSON());
	}
	else {
	    preString[actions[i]] = []
	    preString[actions[i]].push(models[i].toJSON());
	}
    }
    var headAndBody = {
	'header': {},
	'body': {}
    }

    var finalHeader = {};
    var headers = {};
    var finalMessages;
    
    // models and actions stringfied
    var string = JSON.stringify(preString);
    var hash = CryptoJS.MD5(string);
    var hashString = hash.toString(CryptoJS.enc.Hex);
    // cutting up message
    var messageComponents = partitionMessage(string);
    var numMessages = messageComponents.length;
    // if only one message setup finalheader with hash and return
    if (numMessages == 1) {
	finalHeader['seq'] = 0;
	finalHeader['teq'] = 1;
    	finalHeader['hash'] = hashString;
	headAndBody['header'] = finalHeader;
	headAndBody['body'] = string;
	finalMessages.push(headAndBody);
	return finalMessages;
    }
    for (i = 0; i <= numMessages; i ++) {


    // HEADER STUFF =============================================================================
    var header = {}
    // 19 for header without hash assuming max seq umber is 99
    // 38 when 'header' and' body elements exist in final JSON... 40 if you include 2 parens '{}'
    // this is 128 free characters for body per message
    header['seq'] = 02;
    header['tseq'] = 23;
    headAndBody['header'] = header;
    var stringHeader = JSON.stringify(header);
    var stringHandB = JSON.stringify(headAndBody);
    console.log('header length');
    console.log(stringHeader.length);
    console.log(stringHeader);
    console.log('header and body JSON with header');
    console.log(stringHandB.length);
    console.log(stringHandB);
    // length of everything except body is  80 without parens, 82 with
    // only 80 characters when hash included
    header['hash'] = hashString;
    headAndBody['header'] = header;
    var stringHandB = JSON.stringify(headAndBody);
    var withHash = JSON.stringify(header);
    console.log('header length with hash');
    console.log(withHash.length);
    console.log(withHash);
    console.log('header and body JSON with header and hash');
    console.log(stringHandB.length);
    console.log(stringHandB);
    // 97 for header with hash assuming max seq number is 99

    return preString;
}
