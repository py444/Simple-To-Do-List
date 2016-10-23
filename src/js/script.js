var now = new Date();
$('#task-add').on('click', function () {
  if ($('#task-input').val() == "") return 0;

  var appHeigth = parseInt($('.main-app').css("height")) + 40;
  $('.main-app').height(parseInt(appHeigth));

  var task = $('.not-checked').first().clone(true, true);
  var taskText = $('#task-input').val();
  task.text(capitalizeFirstLetter(taskText));
  var time = now.getHours() + ":" + now.getMinutes();
  task.attr('time', time);

  task.prop('class', 'not-checked');
  $('.tasks').append(task);

  updateTaskPending();
  $('#task-input').val('');
})

$('li').on('click', function() {
  $(this).prop('class', 'checked');
  updateTaskPending();
  $(this).fadeTo( 'slow', 0.5, function () {
    $(this).css({ "text-decoration" : "line-through"});
  });
});

$(document).ready(function () {
  $('.not-checked').attr('time','7:00');
  updateTaskPending();

  var day = now.getWeekDay();
  $('#day').text(day + ", " + now.getDate() + "th");

  var month = now.getMonthName();
  $('#month').text(month);
})

function updateTaskPending() {
  var taskCount = $('.not-checked').length - 1;
  $('#task').text(taskCount + " tasks pending");
}

function capitalizeFirstLetter(text) {
  return text.substring(0,1).toUpperCase() + text.substring(1,text.length).toLowerCase();
}

Date.prototype.getWeekDay = function() {
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[this.getDay()];
}

Date.prototype.getMonthName = function() {
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return months[this.getMonth()];
}
