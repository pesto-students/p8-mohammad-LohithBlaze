var Person = function () { };
Person.prototype.initialize = function (name, age) {
    this.name = name;
    this.age = age;
}
// TODO: create the class Teacher and a method teach

function Teacher(subject) {

}
Teacher.prototype = Person.prototype;
var him = new Teacher();

Teacher.prototype.teach = function (subject) {
    console.log(`${this.name} is now teaching ${subject}`)

}
him.initialize("Adam", 45);
him.teach("Inheritance");