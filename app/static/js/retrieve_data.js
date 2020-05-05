const getQuery = function() {
    var raw = window.location.search.substring(1);
    var URLVars = raw.split('&');
    var v;
    for (v in URLVars) {
        var param = v.split('=');
        if (param[0] == 'q') {
            return v[1];
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
        success: function(data) {
            return data;
        }
    });
};