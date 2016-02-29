var row$=[];
var headerTr$ ='';
function addAllColumnHeaders(myList) {
      var columnSet = [];
      headerTr$ = $('<tr/>');
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
    var hit=' ';
    graph(data);

    var columns = addAllColumnHeaders(data);
    for (var i = 0; i < data.length; i++) {
         row$ = $('<tr/>');
            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
              var cellValue = data[i][columns[colIndex]];
              if (cellValue == null) { cellValue = ""; }
              row$.append($('<td/>').html(cellValue));
            }
            row$.append($('<button/>').html('delete'));
            $("#jsonTable").append(row$);
          }

          $('button').click(function() {
            hit=($(this).prev().html());
            $(this).closest('tr').remove().next('tr').remove('');
            calls();
          });

          function calls(){
            for(i=0;i<data.length;i++){
              $.each(data[i],function(k,v){
                if(v==hit){
                  data.splice(i,1);
                }
              })
            }
            graph(data);
          }
});

/////////////////////  ******** D3 ***********  ////////////////

  function graph(inputData1) {

    var margin = {
      top: 20,
      right: 0,
      bottom: 100,
      left: 580
    },
      width = 700,
      height = 500;

      var n = 2; // number of layers
      var headers = d3.keys(inputData1[0]).filter(function(key) {
      return key !== "areaName";
      });
      var layers = d3.layout.stack()(headers.map(function(genderLiteracy) {

        return inputData1.map(function(d) {

          return {
            x: d.areaName,
            y: d[genderLiteracy]
          };

        });
      }));

      var yGroupMax = d3.max(layers, function(layer) {
        return d3.max(layer, function(d) {
          return d.y;
        });
      });

      // var tip = d3.tip()
      //   .attr('class', 'd3-tip')
      //   .offset([-10, 0])
      //   .html(function(d) {
      //     return "<strong>Frequency:</strong> <span style='color:red'>"  + "</span>";
      //   })

      var svg = d3.select("svg").remove();      //replace the prev graph
      var svg = d3.select("body").select(".row").append("svg")
        .attr("width", "900")
        .attr("height", "800")
        .append("g")
        // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        .attr("transform", "translate(100,50)");
        //svg.call(tip);

      var xScale = d3.scale.ordinal()
        .domain(layers[0].map(function(d) { return d.x; }))
        .rangeRoundBands([25, width], .1);

      var y = d3.scale.linear()
        .domain([0, yGroupMax / 244, yGroupMax])
        .range([height, height / 2, 0]);

      var color = d3.scale.ordinal()
        .domain(headers)
        .range(["#98abcf", "#3385ff"]);

      var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickSize(10)
        .tickPadding(2)
        .orient("bottom");

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

      var layer = svg.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) {
          return color(i);
        });

    var rect = layer.selectAll("rect")
      .data(function(d) {
      return d;
    })
      .enter().append("rect")
      .attr("x", function(d, i, j) {
      return xScale(d.x) + xScale.rangeBand() / n * j;
    })
      .attr("y", function(d) {
      return y(d.y);
    })
      .attr("width", xScale.rangeBand() / n)
      .attr("height", function(d) {
      return height - y(d.y);
    });



    //********** AXES ************
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text").style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.15em")
      .attr("transform", function(d) {
      return "rotate(-80)"
    });

    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(20,0)")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr({
      "x": -50,
      "y": -70
    })
      .attr("dy", ".75em")
      .style("text-anchor", "end")
      .text("# population");

    var legend = svg.selectAll(".legend")
      .data(headers.slice().reverse())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {
      return "translate(-20," + i * 20 + ")";
      //.on('mouseover', tip.show)
      // .on('mouseout', tip.hide)
    });

    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

    var formatText = {
      "totalIlliterate": "Total Illiterate",
      "totalLiterate": "Total Literate"
    };
    legend.append("text")
      .attr("id", "legendText")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {
      return formatText[d];
    });
  }
