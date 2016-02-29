var  row$;
function addAllColumnHeaders(myList) {        //datafile2
    var columnSet = [];
    var headerTr$ = $('<tr/>');
    //var delete=$('<button/>');
//         $('<button/>', {
//      text: i, //set text 1 to 10
//      id: 'btn_'+i,
//      click: function () { alert('hi'); }
//  });
    for (var i = 0; i < myList.length; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $("#jsonTable").append(headerTr$);

    return columnSet;
}

$.getJSON("./includes/demo.json", function (data) {
  data=data[1];
    var columns = addAllColumnHeaders(data);

    for (var i = 0; i < data.length; i++) {
         row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = data[i][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }



            row$.append($('<td/>').html(cellValue));

        }
        var delt=$('<button/>').html('delete');
          row$.append(delt);
        $("#jsonTable").append(row$);


    }

});
function dee() {
  $('button').click(function(){
    $(row$).remove('',function(){
      alert('hi');
    });
  });
};

// $('button').click(function(){alert("hi");
//   $(this).remove('row$',function(){alert("hi")});
// });


//end of datafile2




    //datafile

    function addAllColumnHeaders(myList) {
        var columnSet = [];
        var headerTr$ = $('<tr/>');

        for (var i = 0; i < myList.length; i++) {
            var rowHash = myList[i];
            for (var key in rowHash) {
                if ($.inArray(key, columnSet) == -1) {
                    columnSet.push(key);
                    headerTr$.append($('<th/>').html(key));
                }
            }
        }
        $("#jsonTable").append(headerTr$);

        return columnSet;
    }

    $.getJSON("./includes/demo.json", function (data) {
      data=data[0];
        var columns = addAllColumnHeaders(data);

        for (var i = 0; i < data.length; i++) {
            var row$ = $('<tr/>');
            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                var cellValue = data[i][columns[colIndex]];

                if (cellValue == null) { cellValue = ""; }

                row$.append($('<td/>').html(cellValue));
            }
            $("#jsonTable").append(row$);
        }
    });
    //end of datafile script>




   //datafile3
   function addAllColumnHeaders(myList) {
       var columnSet = [];
       var headerTr$ = $('<tr/>');

       for (var i = 0; i < myList.length; i++) {
           var rowHash = myList[i];
           for (var key in rowHash) {
               if ($.inArray(key, columnSet) == -1) {
                   columnSet.push(key);
                   headerTr$.append($('<th/>').html(key));
               }
           }
       }
       $("#jsonTable").append(headerTr$);

       return columnSet;
   }

   $.getJSON("./includes/demo.json", function (data) {
     data=data[2];
       var columns = addAllColumnHeaders(data);

       for (var i = 0; i < data.length; i++) {
           var row$ = $('<tr/>');
           for (var colIndex = 0; colIndex < columns.length; colIndex++) {
               var cellValue = data[i][columns[colIndex]];

               if (cellValue == null) { cellValue = ""; }

               row$.append($('<td/>').html(cellValue));
           }
           $("#jsonTable").append(row$);
       }
   });
   //datafile3 D3

   

   //end of datafile3 script>
