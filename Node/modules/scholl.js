const klass = require('./klass');
exports.add = function(klasses){
	klasses.forEach(function(value) {
		klass.add(value.teachers,value.students);
	})
}