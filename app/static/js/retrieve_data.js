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

const formatDate = function(datestr) {
    components = datestr.split('-');
    var months = {
        '01':'January',
        '02':'February',
        '03':'March',
        '04':'April',
        '05':'May',
        '06':'June',
        '07':'July',
        '08':'August',
        '09':'September',
        '10':'October',
        '11':'November',
        '12':'December'
    };
    return `${months[components[1]]} ${components[2]}, ${components[0]}`
}

const slider = document.getElementById('dateSlider');

const getData = function(daysElapsed) {
    //daysElapsed should be from 2020-01-21
    var query = getQuery();
    var data;
    $.ajax({
        method: 'POST',
        url: '/data',
        async: false,
        data: {'q': query, 'date': daysElapsed},
        success: function(retrieved) {
            var date = document.getElementById('dateSelected');
            date.innerHTML = formatDate(retrieved['date']);
            data = retrieved['data'][0]
        }
    });
    return data;
};

const update = function() {
    getData(slider.value);
}

slider.addEventListener('input', update);

slider.value = 1;

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
