jQuery = $ = require('jquery');
require('bootstrap');

$('#hiddata').hide();
$('#pdf').click(function(e){
    
    $('#hiddata').show();
    var pdf = new jsPDF('p','pt','a4');
    pdf.addHTML($('#page1').get(0), function() {
        $('#hiddata').hide();
        pdf.addPage();
        pdf.addHTML($('#page2').get(0), function() {
            pdf.save('JMV_cv.pdf');
        });
    });
    
});

$('#logo').mouseover(function(){
    $('#logo').attr('src', 'img/space_invader2.png');
});


$('#logo').mouseout(function(){
    setTimeout(function(){
        $('#logo').attr('src', 'img/space_invader.png');
    }, 800);
});

