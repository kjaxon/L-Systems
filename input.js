Input = function(targetId, callback) {
	var target = document.getElementById(targetId);
	if (!target)
		return;

	this.callback = callback;


}

Input.prototype.setValue = function(value) {


}
