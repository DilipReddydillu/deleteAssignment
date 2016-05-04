
// function addAllColumnHeaders(myList) {
//     var columnSet = [];
//     var headerTr$ = $('<tr/>');
//     for (var i = 0; i < myList.length; i++) {
//         var rowHash = myList[i];
//         for (var key in rowHash) {
//             if ($.inArray(key, columnSet) == -1) {
//                 columnSet.push(key);
//                 headerTr$.append($('<th/>').html(key));
//             }
//         }
//     }
//     $("#jsonTable").append(headerTr$);
//
//     return columnSet;
// }

$.getJSON("./includes/demo.json", function (data) {
  data=data[1];
  var hit='',update = '';
  function doEdit() {

  }
    graph(data);
    function work() {
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

      var columns = addAllColumnHeaders(data);


      for (var i = 0; i < data.length; i++) {
        var   row$ = $('<tr/>');

        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = data[i][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }
            else {
             row$.append($('<td/>').html(cellValue));
           }

        }

         row$.append($('<input>').attr('type','button').attr('value','edit').attr('class','edit'))

        row$.append($('<button/>').addClass('deleteTr').html('delete'));
        $("#jsonTable").append(row$);
      }
    }work();




      // $('.edit').click(function(){
      //   hit=($(this).prev().html());alert(hit)
      //   $(".editopt").show('',$('#okbtn').click(function() {
      //       update = $("#edit").val();
      //       category = $("#category").val();
      //       $('.editopt').hide()
      //     }));
      //     editFn()
      // });

      $('.deleteTr').click(function() {
        hit=($('.edit').prev().html());
      $(this).closest('tr').remove().next('tr').remove('');
      deleteFn();
      function deleteFn(){
        for(i=0;i<data.length;i++){
          $.each(data[i],function(k,v){
            if(v==hit){
              data.splice(i,1)
            }
          })
        }
          graph(data);
      }
  });


     $(".editopt").hide()
     $('.edit').click(function(){
        hit=($(this).prev().html());
       $(".editopt").show();
        })
       $("#okbtn").click(function(){
         $(".editopt").hide('',editFn())
         function editFn() {
             for(i=0;i<data.length;i++){
             $.each(data[i],function(k,v){
                if(v==hit){
                 update = $("#edit").val();
                 category = $("#category").val();
                  alert(category+" "+update)
                   x={category:category,
                   population:update}
                   //alert(data[i].population)
                   //data[i].population=update;
                   //alert(data[i].population+data)
                  data.splice(i,1,x)
                }
             })
           }
         //  $("#jsonTable").remove()
           work();
           graph(data);
         }
          });





});
//////////////////////////////////////////////////  ********** D3 ********** //////////////////////////////


    function graph(inputdata) {
      var totalPopulation =0;
      inputdata.forEach(function(data , index){
          totalPopulation+= data.population;
      });
        //console.log(inputdata);

        var width = 800,
            height = 400,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal()
        .range(["#98abcf", "#3385ff", "#d0743e", "#cc7b00"]);

        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var labelArc = d3.svg.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) {
                return d.population;
            });
        var svg = d3.select("svg").remove();  // removes the prev graph

        var svg = d3.select("body").select("#chart").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var g = svg.selectAll(".arc")
            .data(pie(inputdata))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) {
                return color(d.data.category);
            });

        g.append("text")
            .attr("id", "categoryText")
            .attr("transform", function(d) {

                return "translate(" + labelArc.centroid(d) + ")";
            })
            .text(function(d) {
                var ratio = d3.format(".1%")((d.data.population/totalPopulation));
                return d.data.category + " :" + ratio;
            });


}
