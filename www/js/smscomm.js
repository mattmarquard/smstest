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
    var string = JSON.stringify(preString);
    var hash = CryptoJS.MD5(string);
    console.log(hash);
    console.log(string.length);
    console.log(preString);
    return preString;
}
