/*Control object on Web Page*/
$("#titleTopSelect").hide();		
$(".titleCompareFaculty").hide();
$(".titleCompareMajor").hide();

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
        	
        	/*start layout center and bottom*/
			$("#centerContent").show();
			$("#panelL-Page1").show();
			
			
//        	alert(e);
        	$("#titleTopSelect").show(); //Show title Chart02-04
        	$(".asOfYear").text(e.category); //Display asOfYear on Chart Title
        	
        	/* Display topTenHighSchoolByYearChart(Chart-02) by Change select option */
//        	$("#selectTop").change(function(){
//        		alert("change");
//	        	topTenHighSchoolByYearFn(e.category,$(this).val());
//        	});
        	
//        	$("#selectTop").change(function(){
//        		alert("change");
	        	topTenHighSchoolByYearFn(e.category,$("#selectTop").val());
//        	});
        	   	
        	/* Display newStudentByYearByFacultyChart(Chart-03) */
        	$(".titleCompareFaculty").show();
        	newStudentByYearByFacultyFn(e.category);
        	
        	$(".yearSelected").remove();
        	$("body").append("<input type=\"hidden\" id=\"categoryYear\" name=\"categoryYear\" class=\"yearSelected\" value="+e.category+">");
        	
        	/* Show Tabs 2-5 */
        	$("[href='#tabs-2']").show();
        	$("[href='#tabs-3']").show();
        	$("[href='#tabs-4']").show();
        	$("[href='#tabs-5']").show();
        	
        	/*Hide newStudentByYearByFacultyByMajorChart(Chart-04)*/
        	$(".titleCompareMajor").hide();
        	$("#newStudentByYearByFacultyByMajorChart").hide();
        }
    });
}

/* END: Generate newStudentByYearChart(Chart-01) by Kendo */
/* ################### END: Create code for generate newStudentByYearChart(Chart-01). #################### */



/* ################### START: Create code for generate topTenHighSchoolChart(Chart-02). #################### */
/* START Check event param top ten on pie chart*/

$("#selectTop").change(function(){
//	alert("change");
//	alert($("#paramYearPie").text());
	topTenHighSchoolByYearFn(parseInt($("#paramYearPie").text()),$(this).val());
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
var topTenHighSchoolByYearFn = function(paramYear,arSelectTop){
	$.ajax({
		url: "../Model/topTenHighSchoolByYear.jsp",
		type:"get",
		dataType:"json",
		data:{"paramYear":paramYear,"paramTop":arSelectTop},
		success:function(data){
//			console.log(data);
//			alert(data);
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
			//alert(dataCloumn);
			
			var objData= eval("("+dataCloumn+")");
			//console.log(objData);
			topTenHighSchoolChart(objData);							
		}
	});
};
/* END: Call ajax for create topTenHighSchoolByYearFn(Chart-02) */
/* ################### END: Create code for generate topTenHighSchoolByYearChart(Chart-02). #################### */



/* ################### START: Create code for generate newStudentByYearByFacultyFn(Chart-03). #################### */
/* START: Generate Bar newStudentByYearByFacultyFn(Chat-03) By Kendo */ 
function newStudentByYearByFacultyChart(objCateData,objSeriesLineData,objSeriesColumnData) {
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
//        	alert(e.category);
//        	show layout bottom
        	$("#buttomContent").show();
        	
        	var paramYear = $(".yearSelected").val();
        	$(".titleCompareMajor").show();
        	$("#newStudentByYearByFacultyByMajorChart").show();
        	newStudentByYearByFacultyByMajorFn(paramYear, e.category.substring(e.category.indexOf("/")+1));
        }
    });
}
/* END: Generate Bar newStudentByYearByFacultyFn(Chat-03) By Kendo */

/* START: Call Ajax for create newStudentByYearByFacultyFn(Chart-03) */
var newStudentByYearByFacultyFn = function(paramYear){
	$.ajax({
		url: "../Model/newStudentByYearByFaculty.jsp",
		type:"get",
		dataType:"json",
		data:{"paramYear":paramYear},
		success:function(data){
//			console.log(data);
//			alert(data);
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
			seriesColumnData+="]"; //alert(seriesColumnData);
			seriesLineData+="]"; //alert(seriesLineData);
			facuName+="]"; //alert(facuName);
			           				
			/*Convert text to object json by eval().*/
			var objSeriesColumnData = eval("("+seriesColumnData+")");
			var objSeriesLineData = eval("("+seriesLineData+")");
			var objCateData = eval("("+facuName+")");
//			alert(dataCloumn);
			newStudentByYearByFacultyChart(objCateData,objSeriesLineData,objSeriesColumnData);							
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
            template: "#= series.name #: #= value #"
        }
    });
}
/* END: Generate newStudentByYearByFacultyByMajorChart(Chart-04) By Kendo */ 

/* START: Call Ajax for create newStudentByYearByFacultyChart(chart-04) */
var newStudentByYearByFacultyByMajorFn = function(paramYear,paramFacuId){
	$.ajax({
		url: "../Model/newStudentByYearByFacultyByMajor.jsp",
		type: "get",
		dataType: "json",
		data:{"paramYear":paramYear, "paramFacuId":paramFacuId},
		success:function(data){
			//alert(data);
			var seriesColumnData="";
			var seriesLineData="";
			var categoriesData="";
			seriesColumnData+="[";
			seriesLineData+="[";
			categoriesData+="[";
			
			$.each(data,function(index,indexEntry){
				//alert(indexEntry[0]);					
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
			/*Convert text to object json by eval().*/
			var objSeriesColumnData = eval("("+seriesColumnData+")");
			var objSeriesLineData = eval("("+seriesLineData+")");
			var objcategoriesData = eval("("+categoriesData+")");
			console.log(objcategoriesData);
			newStudentByYearByFacultyByMajorChart(objSeriesColumnData, objSeriesLineData, objcategoriesData);
		}
	});
};
/* END: Call Ajax for create newStudentByYearByFacultyChart(chart-04) */
/* ################### START: Create code for generate newStudentByYearByFacultyByMajorChart(Chart-04). #################### */


	
///* START: Event chage dropdownlist selectTop */
//$("#selectTop").live("change",function(){
//	//alert($(this).val());
//	topTenHighSchoolByYearFn($(this).val());
//});
///* END: Event chage dropdownlist selectTop */