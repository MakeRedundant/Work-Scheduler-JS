//Global variables

var timeId; // For getting the time
var descriptionId; // For getting the text description
var currentDate; //For getting the current Date
var currentTime; //For getting the current Time + Timezone

$(function () {
  //shorthand for $(document).ready(function()
  //Adds a click event listener to all elements with the class "savBtn"
  $(".saveBtn").on("click", function () {
    console.log("save button clicked");
    var timeId = $(this).parent().attr("id"); //to grab the time that we want, uses parent() method to up to the parent element
    var descriptionId = $(this).siblings(".description").val(); // grab the description, uses the siblings element that have the class description
    //cannot use .children() because it is not a direct chold of the savBtn.children
    localStorage.setItem(timeId, descriptionId); //saves the time and description to local storage.
  });

  //Adds a click event listener to the clear button
  $("#clear").on("click", function () {
    console.log("Clear button clicked");
    localStorage.clear(); //clears local storage
    location.reload(); // reloads the page to view changes
  });

  //Function that will apply past,present and future classes to each time block
  function checkTime() {
    var getTime = dayjs().format("H"); //use dayjs to get current time
    $(".time-block").each(function () { //uses .each() method to iterate over each class time-block variable
      var timeBlock = $(this).attr("id"); //retrieves the ID of the current time and assigns it to the timeBlock variable.
      var timeGetHours = parseInt($(this).attr("id").split("-")[1]); // extracts the hour by splitting the the ID string and prasing it as an integer
      var descriptionId = localStorage.getItem(timeBlock);

      console.log("Current Time: " + getTime);
      console.log("Description: " + descriptionId);

      if (descriptionId) {
        $(this).find(".description").val(descriptionId);
      }

      if (timeGetHours < getTime) {
        //checks if the current time (getTime) is less than the time for time-blocks and if so apply past
        $(this).removeClass("present future").addClass("past"); //past gray colour
        console.log("past applied");
      } else if (timeGetHours == getTime) {
        // If the current time is equal to the time for the time block, it means the time block is in the present. (red colour)
        $(this).removeClass("past future").addClass("present");
        console.log("present applied");
      } else {
        $(this).removeClass("past present").addClass("future"); // If neither of the above conditions is true, it means the current time is greater than the time for the time block,
        console.log("future applied");  // // In this case, the class "future" is added to the time block, removing any existing "past" or "present" classes. (green colour)
      }
    });
  }
  //Initlise
  checkTime(); //putting the function inside the block ensures it is called one everything is ready

  //Current Date and time for the header
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);

  var currentTime = dayjs().format("HH:mm:ss Z [AEST]"); //Added Australian time zone
  $("#currentTime").text(currentTime);
});
