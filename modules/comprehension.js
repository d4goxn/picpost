/* Usage:

comprehension(3, function(i) {
	return i;
});

returns [0, 1, 2]

 */

exports.comprehension = function(length, generator) {
	var array = [];
	for(var i = 0; i < length; i++)
		array.push(generator(i));
	return array;
};
