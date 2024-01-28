/* eslint-disable no-var */

function Course(title, instructor, image) {
  this.title = title;
  this.instructor = instructor;
  this.image = image;
}

function UI() {}

UI.prototype.addtoList = function(course) {
  var html = `
        <tr>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td>${course.image}</td>
            <td>
                <a href="/" class="btn btn-outline-danger">Delete</a>
            <td>
        </tr>   
    `;
  var list = document.getElementById("courseList");
  list.innerHTML += html;
};

document.getElementById("courseForm").addEventListener("submit", function(e) {
  var title = document.getElementById("title").value;
  var instructor = document.getElementById("instructor").value;
  var image = document.getElementById("image").value;
  const course = new Course(title, instructor, image);
  const ui = new UI();
  ui.addtoList(course);
  e.preventDefault();
});
