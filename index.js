jQuery = $ = require('jquery');
require('bootstrap');

$('#pdf').click(function(e){
    
    var pdf = new jsPDF('p','pt','a4');
    pdf.addHTML($('#page1').get(0),function() {
        pdf.addPage();
        pdf.addHTML($('#page2').get(0),function() {
            pdf.save('JMV_cv.pdf');
        });
    });
    
});


