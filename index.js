jQuery = $ = require('jquery');
require('bootstrap');

$('#pdf').click(function(e){

    $('#container').css('background-color', 'white');
     
    var pdf = new jsPDF('p','pt','a4');
    pdf.addHTML($('#container').get(0),function() {
        pdf.save('JMV_cv.pdf');
    });
    
});


