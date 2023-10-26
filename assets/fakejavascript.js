document.addEventListener('DOMContentLoaded', function() {
    // display todays date and time
    var currentDay=document.getElementById("currentDay")
    var TimeBlocks=document.getElementById("TimeBlocks")
    
    
    // Function to get the current date
    function getCurrentDate() {
        var today = new Date();
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return today.toLocaleDateString('en-US', options);
    }

    // Function to generate time blocks
    function generateTimeBlocks() {
        var timeBlock = document.getElementById("TimeBlocks");
        for (var i = 9; i <= 17; i++) {
                var timeBlock = document.createElement('div');
                timeBlock.classList.add('col-md-3', 'mb-3');
                timeBlock.setAttribute('data-hour', i);
                timeBlock.innerHTML = `

                    <div classs="card">
                        <div class="card-body>
                            <h5 class="hour">${i}:00</h5>
                            <textarea class="form-control description"></textarea>
                            <button class="saveBtn">Save</button>
                      </div>
                   </div 

            `;
            
        }
    }

    // Function to update time block colors based on current time
    function updateTimeBlockColors() {
        var currentHour = new Date().getHours();
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

    // Function to load saved events from local storage
    function loadSavedEvents() {
        var timeBlocks = document.querySelectorAll('.time-block');
        timeBlocks.forEach(function(block) {
            var blockHour = block.getAttribute('data-hour');
            var savedEvent = localStorage.getItem(`event-${blockHour}`);
            if (savedEvent) {
                block.querySelector('.description').value = savedEvent;
            }
        });
    }

    // Function to save event to local storage
    function saveEvent(hour, event) {
        localStorage.setItem(`event-${hour}`, event);
    }

    // Update current date
    document.getElementById('currentDay').textContent = getCurrentDate();

    // Generate time blocks
    generateTimeBlocks();

    // Update time block colors
    updateTimeBlockColors();

    // Load saved events
    loadSavedEvents();

    // event listener for save buttons
    var saveButtons = document.querySelectorAll('.saveBtn');
    saveButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var hour = this.parentElement.getAttribute('data-hour');
            var event = this.parentElement.querySelector('.description').value;
            saveEvent(hour, event);
        });
    });
});




