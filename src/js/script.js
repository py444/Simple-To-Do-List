$(document).ready(function () {
  $('.task-time').text('07:00');
  $('.task-time').append($('<span></span>').prop('class', 'task-delete icon ion-android-delete'));

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

var now = new Date();
$('#task-add').on('click', function () {
  if ($('#task-input').val() == "") return;

  var appHeigth = parseInt($('.main-app').css("height")) + 40;
  $('.main-app').height(parseInt(appHeigth));

  var task = $('.not-checked').first().clone(true, true);
  var taskText = $('#task-input').val();
  task.text(capitalizeFirstLetter(taskText));

  var timeSpan = $('<span></span>').prop('class', 'task-time');
  var time = now.getHours() + ":" + now.getMinutes();
  timeSpan.text(time);
  timeSpan.append($('<span></span>').prop('class', 'task-delete icon ion-android-delete'));
  task.append(timeSpan);

  task.prop('class', 'not-checked');
  $('.tasks').append(task);

  updateTaskPending();
  $('#task-input').val('');
})

$('li').on('click', function(e) {
  if (!$(e.target).is($('.task-delete'))) {
    $(this).prop('class', 'checked');
    updateTaskPending();
    $(this).fadeTo( 'slow', 0.5, function() {
      $(this).css({ "text-decoration" : "line-through"});
    })
  }else {
  $(this).remove(); // delete current task
  updateTaskPending()
  var appHeigth = parseInt($('.main-app').css("height")) - 40;
  $('.main-app').height(parseInt(appHeigth));
  }
})

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
