
$(function () {
var saveBtn=$(".saveBtn");
saveBtn.on("click", function(){
  console.log($(this).siblings(".description").val())
})


  // Function to update time block colors based on current time
  function updateTimeBlockColors() {
    var currentHour = new Date().getHours();
    console.log(currentHour);
    var timeBlocks = document.querySelectorAll('.time-block');
    timeBlocks.forEach(function(block) {
        var blockHour = parseInt(block.getAttribute('data-hour'));
        if (blockHour < currentHour) {
            block.classList.add('past');
        } else if (blockHour === currentHour) {
            block.classList.add('present');
        } else {
            block.classList.add('future');
        }
    });
    

}
  // Function to display the current date in the header
  function displayCurrentDate() {
    var currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var currentDateTime = currentDate.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + ', ' + hours + ':' + minutes + ' ' + ampm;
    $('#currentDay').text(currentDateTime);
  }

  // Call the functions
  updateTimeBlockColors();
  displayCurrentDate();

  var saveBtn = $('.saveBtn');
  saveBtn.on('click', function () {
    console.log($(this).siblings('.description').val())
  })

  // Function to save user descriptions to local storage
  function saveUserDescription(hour) {
    var description = $('#hour-' + hour).find('.description').val();
    localStorage.setItem('description-' + hour, description);
  }

  // Function to load user descriptions from local storage
  function loadUserDescriptions() {
    for (var i = 9; i <= 17; i++) {
      var description = localStorage.getItem('description-' + i);
      if (description !== null) {
        $('#hour-' + i).find('.description').val(description);
      }
    }
  }

  // Call the functions
  updateTimeBlockColors();
  displayCurrentDate();
  loadUserDescriptions();

  var saveBtn = $('.saveBtn');
  saveBtn.on('click', function () {
    var hour = $(this).closest('.time-block').data('hour');
    saveUserDescription(hour);
    console.log($(this).siblings('.description').val());
  });
  });

