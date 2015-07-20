// INPUT:
// string = string of entire message to be processed on server
// OUTPUT:
// list of message partitioned so it can be sent over SMS
function partitionMessage(string) {
    var msgLength = string.length;
    var messageComponents = [];
    // if size fits into one sms
    if (msgLength <= 80) {
	messageComponents.push(string);
    } 
    // message has to be split amongst multiple SMS
    else {
	lastMessage = string.slice(-124); // message in header with hash
	var newLength = msgLength - 124;
	var endIndex = -124;               //first char in regular header/message
	var beginIndex = -125 - 156;
	while (newLength > 0) {
	    messageComponents.unshift(string.slice(beginIndex,endIndex));
	    newLength = newLength - 156;
	    endIndex = beginIndex;
	    beginIndex = endIndex - 156;
	}
	messageComponents.push(lastMessage);
    }
    console.log("Message components after partition");
    console.log(messageComponents);
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
    var header = {};
    var finalMessages = [];
    
    // models and actions stringfied
    var string = JSON.stringify(preString);
    console.log('STRING');
    console.log(string);
    var hash = CryptoJS.MD5(string);
    var hashString = hash.toString(CryptoJS.enc.Hex);
    // cutting up message
    var messageComponents = partitionMessage(string);
    var numMessages = messageComponents.length;
    // if only one message setup finalheader with hash and return
    if (numMessages == 1) {
	finalHeader['seq'] = 0;
	finalHeader['tseq'] = 1;
    	finalHeader['hash'] = hashString;
	headAndBody['header'] = finalHeader;
	headAndBody['body'] = string;
	finalMessages.push(headAndBody);
	return finalMessages;
    }
    for (i = 0; i < numMessages; i ++) {
	if (i == (numMessages - 1)) {
	    finalHeader['seq'] = numMessages - 1;
	    finalHeader['tseq'] = numMessages;
	    finalHeader['hash'] = hashString;
	    headAndBody['header'] = finalHeader;
	    headAndBody['body'] = messageComponents[i];
	    finalMessages.push(JSON.stringify(headAndBody));
	}
	else {
	    header['seq'] = i;
	    header['tseq'] = numMessages;
	    headAndBody['header'] = header;
	    headAndBody['body'] = messageComponents[i];
	    finalMessages.push(JSON.stringify(headAndBody));
	}
    }


    // 19 for header without hash assuming max seq umber is 99
    // 38 when 'header' and' body elements exist in final JSON... 40 if you include 2 parens '{}'
    // this is 128 free characters for body per message
    // length of everything except body is  80 without parens, 82 with
    // only 80 characters when hash included
    //
    // **** 97 for header with hash assuming max seq number is 99

    console.log("list of messages before returning out of SMSmodule");
    console.log(finalMessages);
    return finalMessages;
}
