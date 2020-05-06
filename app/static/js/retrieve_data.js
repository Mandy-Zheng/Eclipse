var data;
//var daysElapsed = document.getElementById("dateSlider").value;

const getQuery = function() {
    var raw = window.location.search.substring(1);
    var URLVars = raw.split('&');
    var v;
    for (v in URLVars) {
        var param = URLVars[v].split('=');
        if (param[0] == 'q') {
            return param[1];
        }
    }
};

const getData = function(daysElapsed) {
    //daysElapsed should be from 2020-01-21
    var query = getQuery();
    $.ajax({
        method: 'POST',
        url: '/data',
        data: {'q': query, 'date': daysElapsed},
        success: function(retrieved) {
            data = retrieved;
        }
    });
};

// var displayDate = function(daysElapsed) {
//   console.log(daysElapsed);
//
//   var month = '';
//   var day;
//   if (daysElapsed <= 10){
//     month = "January";
//     day = 21 + daysElapsed;
//   } else if (daysElapsed <= 39) {
//     month = "February";
//     day = daysElapsed - 10;
//   } else if (daysElapsed <= 70) {
//     month = "March";
//     day = daysElapsed - 39;
//   } else if (daysElapsed <= 100) {
//     month = "April";
//     day = daysElapsed - 70;
//   } else {
//     month = "May";
//     day = daysElapsed - 100;
//   }
//   document.getElementById("date").innerHTML = month + day.toString() + ", 2020";
// };
//
// var dateBtn = getElementById("dateBtn");
// dateBtn.addEventListener("click", displayDate)
