

var fs = require('fs');
var areaName = [];main={};
var ratio = [], neRatio = [];var areaa=[];data={};
neStates = ["State - ARUNACHAL PRADESH","State - NAGALAND","State - MANIPUR","State - MIZORAM","State - ASSAM","State - TRIPURA","State - MEGHALAYA"];
var maleIlliterate = 0, femaleIlliterate = 0, maleliterate = 0, femaleliterate = 0;
var neIlliterateMales = 0, neIlliterateFemales = 0, neLiterateMales = 0, neLiterateFemales = 0;

  function updateDataFromFile(filePath){
    fs.readFileSync(filePath).toString().split('\n').forEach(function (lineContent) {
        var column = lineContent.split(",");

        if (column[4]==="Total" && column[5]=== "All ages")
     {
        data={};
        data["areaName"] = (column[3]);
        data["totalIlliterate"] =  parseInt(column[9]);
        data["totalLiterate"] = parseInt(column[12]);
        areaName.push(data);

        maleIlliterate = parseInt(maleIlliterate) + parseInt(column[10]);
        femaleIlliterate = parseInt(femaleIlliterate) + parseInt(column[11]);
        maleliterate = parseInt(maleliterate) + parseInt(column[13]);
        femaleliterate = parseInt(femaleliterate) + parseInt(column[14]);

        for(var i=0;i<neStates.length;i++){
                 if (column[3]==neStates[i]) {
                  neIlliterateMales = parseInt(neIlliterateMales) + parseInt(column[10]);
                  neIlliterateFemales = parseInt(neIlliterateFemales) + parseInt(column[11]);
                  neLiterateMales = parseInt(neLiterateMales) + parseInt(column[13]);
                  neLiterateFemales = parseInt(neLiterateFemales) + parseInt(column[14]);
             }
           }
         }

    });

  }
updateDataFromFile("includes/India2011.csv");


ratio.push({"category":"maleIlliterate","population":maleIlliterate});
ratio.push({"category":"femaleIlliterate","population":femaleIlliterate});
ratio.push({"category":"maleliterate","population":maleliterate});
ratio.push({"category":"femaleliterate","population":femaleliterate});

neRatio.push({"category":"maleIlliterate","population":neIlliterateMales});
neRatio.push({"category":"femaleIlliterate","population":neIlliterateFemales});
neRatio.push({"category":"maleliterate","population":neLiterateFemales});
neRatio.push({"category":"femaleliterate","population":neLiterateFemales});
var json=[areaName,ratio,neRatio];
fs.writeFileSync('includes/demo.json', JSON.stringify(json,null,2),'utf8');
console.log(json);

// fs.writeFileSync('includes/file1.json', JSON.stringify(areaName,null,2),'utf8');
// fs.writeFileSync('includes/file2.json', JSON.stringify(ratio,null,2),'utf8');
// fs.writeFileSync('includes/file3.json', JSON.stringify(neRatio,null,2),'utf8');
