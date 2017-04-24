const student = require('./student');
const teacher = require('./teacher');

exports.add = function(students,teachers){
	teachers.forEach(function(name){
		teacher.add(name);
	});

	students.forEach(function(name){
		student.add(name);
	});
}