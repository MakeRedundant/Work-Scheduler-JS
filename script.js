//Global variables

var timeId; // For getting the time 
var descriptionId; // For getting the text description
var currentDate; //For getting the current Date 
var currentTime; //For getting the current Time + Timezone 



$(function () {  //shorthand for $(document).ready(function()
  //Adds a click event listener to all elements with the class "savBtn"
  $(".saveBtn").on("click", function () {
    console.log("save button clicked");
    var timeId = $(this).parent().attr('id'); //to grab the time that we want, uses parent() method to up to the parent element
    var descriptionId = $(this).siblings(".description").val(); // grab the description, uses the siblings element that have the class description
    //cannot use .children() because it is not a direct chold of the savBtn.children
    localStorage.setItem(timeId, descriptionId); //saves the time and description to local storage.
  });

  $("#clear").on("click",function () {
   console.log("Clear button clicked");
   localStorage.clear();
   location.reload();
  });

//Function that will apply past,present and future classes to each time block   
  function checkTime() {
    var getTime = dayjs().format ("H"); //use dayjs to get current time
    $(".time-block").each(function () { //uses .each() method to iterate over each class time-block variable
    var timeBlock = $(this).attr("id"); //retrieves the ID of the current time and assigns it to the timeBlock variable. 
    var timeGetHours = parseInt($(this).attr("id").split("-")[1]); // extracts the hour by splitting the the ID string and prasing it as an integer 
    var descriptionId = localStorage.getItem(timeBlock);

    console.log("Current Time: " + getTime);
    console.log("Description: " + descriptionId);

    if (descriptionId) {
      $(this).find(".description").val(descriptionId);
    }
    
    if (timeGetHours < getTime) { //checks if the current time (getTime) is greater than the time for time-blocks and if so apply past
      $(this).removeClass("present future").addClass("past");
      console.log("past applied");
    } else if (timeGetHours > getTime) { //if the current time is less than the time block it means the time block is in the future 
      $(this).removeClass("past present").addClass("future"); 
      console.log("future applied")
    } else {
      $(this).removeClass("past future").addClass("present"); //applies present class
      console.log("present applied") 
    }
});
    
  }
//Initlise 
  checkTime(); //putting the function inside the block ensures it is called one everything is ready
    
 
  var currentDate = dayjs().format("dddd, MMMM D, YYYY"); 
  $("#currentDay").text(currentDate);

  var currentTime =  dayjs().format("HH:mm:ss Z [AEST]"); //Added Australian time zone 
  $("#currentTime").text(currentTime);

});
