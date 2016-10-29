$(document).ready(function () {
  $('.task-time').text('07:00');
  $('.task-time').append($('<span></span>').prop('class', 'task-edit icon ion-edit'));
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
  if (time.length === 4){
    time = "0" + time;
  }
  timeSpan.text(time);
  timeSpan.append($('<span></span>').prop('class', 'task-delete icon ion-android-delete'));
  task.append(timeSpan);

  task.prop('class', 'not-checked');
  $('.tasks').append(task);

  updateTaskPending();
  $('#task-input').val('');
})

var taskItem;
$('li').on('click', function(e) {
  var clickedTarget = $(e.target);
  if (!clickedTarget.is($('.task-delete')) && !clickedTarget.is($('.task-edit'))) {
    $(this).prop('class', 'checked');
    updateTaskPending();
    $(this).fadeTo( 'slow', 0.5, function() {
      $(this).css({ "text-decoration" : "line-through"});
    })
  }else if (clickedTarget.is($('.task-delete'))) {
    $(this).remove(); // delete current task
    updateTaskPending()
    var appHeigth = parseInt($('.main-app').css("height")) - 40;
    $('.main-app').height(parseInt(appHeigth));
  }else if (clickedTarget.is($('.task-edit'))) {
    $('.overlay').css({
      'visibility': 'visible',
      'opacity': '1'
    });
    $('.popup').css('opacity', '1');
    taskItem = $(this).closest("li");
    var value = taskItem.text();
    value = value.substring(0,value.length - 5);
    $('.popup #task-input').val(value);
  }
})

$('#task-edit').on('click', function () {
  var editedTask = $('.popup #task-input').val();
  if (editedTask === "") return;
  var value = taskItem.text();
  var time = value.substring(value.length - 5, value.length);
  taskItem.text(editedTask);
  var taskTime = $('<span></span>').prop('class', 'task-time');
  taskTime.text(time);
  taskTime.append($('<span></span>').prop('class', 'task-edit icon ion-edit'));
  taskTime.append($('<span></span>').prop('class', 'task-delete icon ion-android-delete'));
  taskItem.append(taskTime);
  $('.close').click();
})

$('.close').on('click', function () {
  $('.popup').animate({'opacity' : '0'}, 50, function () {
    $('.overlay').animate({'opacity' : '0'}, 50, function () {
      setTimeout(function () {
        $('.overlay').css({
          'visibility' : 'hidden',
          'opacity' : '0'
        });
      }, 1000);
    })
  });
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
