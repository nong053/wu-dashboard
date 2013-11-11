/* parameter control */
var PrvYear = $("#embParamPrev").val();
var paramYear = $("#embParamYear").val();

/* Object Control */	
$(".titleCompareFaculty").hide();
$(".titleCompareMajor").hide();

var addClassAsOfChart = function(divIdOfChart){ alert("Class:"+divIdOfChart);
	$("div#"+divIdOfChart+"").removeClass("chartActive");
	$("div#"+divIdOfChart+"").addClass("chartActive");
};

/* ################### START: Create code for generate newStudentByYearChart(Chart-01). #################### */
/* START: Generate newStudentByYearChart(Chart-01) by Kendo */

function newStudentByYearChart(objCateData,objSeriesColumnData,objSeriesLineData) {
    $("#newStudentByYearChart").kendoChart({
    	chartArea: {
    		background: ""
    	},
    	legend: {
            position: "bottom",
            labels: {
              font: "13px Tahoma",
              color: "black"
            }
        },
        series: [{
        	type: "column",
            name: "จำนวนนักศึกษา",
            color: "#357EC7",
            data: objSeriesColumnData
        },{
            type: "line",
            data: objSeriesLineData,
            name: "แผน",
            color: "#CC0000",
        }],
        valueAxis: {
//            max: 2500,
            line: {
                visible: true
            },
            minorGridLines: {
                visible: false
            }
        },
        categoryAxis: {
            categories: objCateData,
            majorGridLines: {
                visible: false
            }        
        },
        tooltip: {
            visible: true,
            template: "ปี #= category #, #= value # คน",
        },
        seriesClick:function(e){
        	$("select#paramYear option").removeAttr("selected");
        	$("select#paramYear option[value="+e.category+"]").attr("selected","selected");
        	$("#paramYearList span.k-dropdown span.k-dropdown-wrap span.k-input").text(e.category);
        	
        	/* Change parameter value (paramYear) */
        	$("#embParamYear").val(e.category);
        	
			/* Year title label control */
        	$("label.asOfYear").text(e.category); //Display asOfYear on Chart Title
        	
        	/* Display topTenHighSchoolByYearChart(Chart-02) by Change select option */
        	$("#panelL-Page1").show();
        	topTenHighSchoolByYearFn(e.category,$("#selectTop").val());

        	/* Display newStudentByYearByFacultyChart(Chart-03) */
        	$("#centerContent").show();
        	$(".titleCompareFaculty").show();
        	newStudentByYearByFacultyFn(e.category);
        	
        	$("input#t1Chart03").val(e.category);
        	$("input#t1Chart03").addClass("active");
        	
        	/*Hide newStudentByYearByFacultyByMajorChart(Chart-04)*/
        	$(".titleCompareMajor").hide();
        	$("#newStudentByYearByFacultyByMajorChart").hide();
        }
    });
}

/* END: Generate newStudentByYearChart(Chart-01) by Kendo */
/* ################### END: Create code for generate newStudentByYearChart(Chart-01). #################### */



/* ################### START: Create code for generate topTenHighSchoolChart(Chart-02). #################### */

$("#selectTop").change(function(){
	topTenHighSchoolByYearFn(parseint($("label#asOfYear").val()),$(this).val());
});

/* START: Generate topTenHighSchoolChart(Chart-02) By Kendo */ 
function topTenHighSchoolChart(objData) {
    $("#topTenHighSchoolChart").kendoChart({
    	chartArea: {
    		background: ""
    	},
        legend: {
        	position: "bottom",
            labels: {
              font: "13px Tahoma",
              color: "black"
            }
        },
        chartArea: {
            background: "none"
        },
        seriesDefaults: {
            labels: {
                visible: true,
                background: "transparent",
                template: "#= value #"
            }
        },
        series: [{
            type: "pie",
            startAngle: 150,
            data:objData,
            explodeField: "explode"
        }],
        seriesColors: ["#0099FF", "#009900", "#CC66FF", "#CC6600", "#FFFF00", "#990066"],
        tooltip: {
            visible: true,
            template: "#= category #, #= value # คน"
        }
    });
}
/* END: Generate topTenHighSchoolChart(Chart-02) By Kendo */

/* START: Call ajax for create topTenHighSchoolByYearFn(Chart-02) */
var topTenHighSchoolByYearFn = function(fnParamYear,fnSelectTop){
	$.ajax({
		url: "../Model/topTenHighSchoolByYear.jsp",
		type:"get",
		dataType:"json",
		data:{"paramYear":fnParamYear,"paramTop":fnSelectTop},
		success:function(data){
		if(data != ""){
				
//			console.log(data);
			var color = ["#357EC7","#C38EC7","#438D80","#437C17","#FBB117","#990012","#E8ADAA","#C38EC7","#2B3856","#CCCCCC"];
			var indexColor = 1;
			var dataCloumn = "";
			dataCloumn = "[";
			$.each(data,function(index,indexEntry){
				if(index==0){
					dataCloumn+="{";
					dataCloumn+="category:"+"\""+indexEntry[0]+"\",";
					dataCloumn+="value:"+""+indexEntry[1]+",";
					dataCloumn+="color:"+"\""+color[0]+"\"";
					dataCloumn+="}";
				}else{
					dataCloumn+=",{";
					dataCloumn+="category:"+"\""+indexEntry[0]+"\",";
					dataCloumn+="value:"+""+indexEntry[1]+",";
					dataCloumn+="color:"+"\""+color[indexColor++]+"\"";
					dataCloumn+="}";
				}										
			});
			dataCloumn+="]";
			
			var objData= eval("("+dataCloumn+")");

			topTenHighSchoolChart(objData);	
			
		}else{
			$("#topTenHighSchoolChart").html("<font id=\"NDF02\" color=\"red\" size=\"4\"><center> NO DATA FOUND! <center></font>");
		}
		}
	});
};
/* END: Call ajax for create topTenHighSchoolByYearFn(Chart-02) */
/* ################### END: Create code for generate topTenHighSchoolByYearChart(Chart-02). #################### */



/* ################### START: Create code for generate newStudentByYearByFacultyFn(Chart-03). #################### */
/* START: Generate Bar newStudentByYearByFacultyFn(Chat-03) By Kendo */ 
function newStudentByYearByFacultyChart(objCateData,objSeriesLineData,objSeriesColumnData,fnParamYear) {
    $("#newStudentByYearByFacultyChart").kendoChart({
    	chartArea: {
    		background: ""
    	},
        legend: {
            visible: false
            
        },
        series: [{
        	type: "column",
            name: "จำนวนนักศึกษา",
            data: objSeriesColumnData,
            color: "#357EC7"
        },{
        	type:"line",
        	data: objSeriesLineData,
        	name:"แผน",
        	color:"#CC0000"
        }],
        valueAxis: {
            max: 600,
            line: {
                visible: true
            },
            minorGridLines: {
                visible: true
            }
        },
        categoryAxis: {
            categories: objCateData,
            labels: {
                rotation: 60,
                template: kendo.template("#:value.substring(0,value.indexOf(\"/\"))#")
              },
            majorGridLines: {
                visible: false
            }
        },
        tooltip: {
            visible: true,
            template: kendo.template("#= category.substring(0,category.indexOf(\"/\")) # #= value # คน")
        },
        legend: {
        	position: "bottom",
            labels: {
              font: "13px Tahoma",
              color: "black"
            }
        },
        seriesClick:function(e){

        	/* show <div> bottom content */
        	$("#buttomContent").show();
        	$(".titleCompareMajor").show();
        	$("label.asOfFaculty").text(e.category.substring(0,e.category.indexOf("/")));
        	$("#newStudentByYearByFacultyByMajorChart").show();
        	newStudentByYearByFacultyByMajorFn(fnParamYear, e.category.substring(e.category.indexOf("/")+1));
        	
        	$("input#t1Chart04").val(e.category);
        	$("input#t1Chart04").addClass("active");
        	
        }
    });
}
/* END: Generate Bar newStudentByYearByFacultyFn(Chat-03) By Kendo */

/* START: Call Ajax for create newStudentByYearByFacultyFn(Chart-03) */
var newStudentByYearByFacultyFn = function(fnParamYear){
	$.ajax({
		url: "../Model/newStudentByYearByFaculty.jsp",
		type:"get",
		dataType:"json",
		data:{"paramYear":fnParamYear},
		success:function(data){
		if(data != ""){

			var seriesColumnData="";
			var seriesLineData="";
			var facuName="";
			seriesColumnData+="[";
			seriesLineData+="[";
			facuName+="[";
			
			$.each(data,function(index,indexEntry){
//				alert(indexEntry[0]);
				
				if(index==0){
					seriesColumnData+=""+indexEntry[2]+"";
					seriesLineData+=""+indexEntry[3]+"";
					facuName+="\""+""+indexEntry[1]+"/"+indexEntry[0]+"\""+"";
				}else{
					seriesColumnData+=","+indexEntry[2];
					seriesLineData+=","+indexEntry[3]+"";
					facuName+=","+"\""+indexEntry[1]+"/"+indexEntry[0]+"\""+"";
				}
			});
			seriesColumnData+="]"; 
			seriesLineData+="]"; 
			facuName+="]"; 
			           				
			/* Convert text to object by eval()*/
			var objSeriesColumnData = eval("("+seriesColumnData+")");
			var objSeriesLineData = eval("("+seriesLineData+")");
			var objCateData = eval("("+facuName+")");

			newStudentByYearByFacultyChart(objCateData,objSeriesLineData,objSeriesColumnData,fnParamYear);
		}else{
			$("#newStudentByYearByFacultyChart").html("<font color=\"red\" size=\"4\"><center> NO DATA FOUND! <center></font>");
		}							
		}
	});
};
/* END: Call Ajax for create newStudentByYearByFacultyFn(Chart-03) */
/* ################### END: Create code for generate newStudentByYearByFacultyFn(Chart-03). #################### */



/* ################### START: Create code for generate newStudentByYearByFacultyByMajorChart(Chart-04). #################### */
/* START: Generate newStudentByYearByFacultyByMajorChart(Chart-04) By Kendo */ 
function newStudentByYearByFacultyByMajorChart(objSeriesColumnData, objSeriesLineData, objcategoriesData) {
    $("#newStudentByYearByFacultyByMajorChart").kendoChart({
    	chartArea: {
    		background: ""
    	},
        legend: {
        	position: "bottom",
            labels: {
              font: "13px Tahoma",
              color: "black"
            }
        },
        series: [{
            name: "จำนวนนักศึกษา",
            data: objSeriesColumnData,
            color: "#357EC7"
        },{
        	name:"แผน",
        	type:"line",
        	data:objSeriesLineData,
        	color:"#CC0000"
        }],
        valueAxis: {
            max: 200,
            line: {
                visible: true
            },
            minorGridLines: {
                visible: true
            }
        },
        categoryAxis: {
            categories: objcategoriesData,
            labels: {
                rotation: 60
            },
            majorGridLines: {
                visible: false
            }
        },
        tooltip: {
            visible: true,
            template: "#= category #, #= value #"
        }
    });
}
/* END: Generate newStudentByYearByFacultyByMajorChart(Chart-04) By Kendo */ 

/* START: Call Ajax for create newStudentByYearByFacultyChart(chart-04) */
var newStudentByYearByFacultyByMajorFn = function(fnParamYear,fnParamFacuId){
	$.ajax({
		url: "../Model/newStudentByYearByFacultyByMajor.jsp",
		type: "get",
		dataType: "json",
		data:{"paramYear":fnParamYear, "paramFacuId":fnParamFacuId},
		success:function(data){
		if(data != ""){

			var seriesColumnData="";
			var seriesLineData="";
			var categoriesData="";
			seriesColumnData+="[";
			seriesLineData+="[";
			categoriesData+="[";
			
			$.each(data,function(index,indexEntry){
				
				if(index==0){
					seriesColumnData+=""+indexEntry[1]+"";
					seriesLineData+=""+indexEntry[2]+"";
					categoriesData+="\""+""+indexEntry[0]+""+"\"";
				}else{
					seriesColumnData+=","+indexEntry[1];
					seriesLineData+=","+indexEntry[2]+"";
					categoriesData+=","+"\""+indexEntry[0]+"\""+"";
				}
			});
			seriesColumnData+="]"; 
			seriesLineData+="]"; 
			categoriesData+="]"; 
			/*Convert text to object by eval() */
			var objSeriesColumnData = eval("("+seriesColumnData+")");
			var objSeriesLineData = eval("("+seriesLineData+")");
			var objcategoriesData = eval("("+categoriesData+")");

			newStudentByYearByFacultyByMajorChart(objSeriesColumnData, objSeriesLineData, objcategoriesData);
			
		}else{
			$("#newStudentByYearByFacultyByMajorChart").html("<font color=\"red\" size=\"4\"><center> NO DATA FOUND! <center></font>");
		}
		
		}
	});
};
/* END: Call Ajax for create newStudentByYearByFacultyChart(chart-04) */
/* ################### START: Create code for generate newStudentByYearByFacultyByMajorChart(Chart-04). #################### */