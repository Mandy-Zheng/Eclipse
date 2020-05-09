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
