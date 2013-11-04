/*Control object on Web Page*/
$("#titleTopSelect").hide();		
$(".titleCompareFaculty").hide();
$(".titleCompareMajor").hide();
$("hr#line-2").hide();
$("hr#line-3").hide();

/* START: Generate barChart(Chart-01) by Kendo */
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
            color: "#0066FF",
            data: objSeriesColumnData
        },{
            type: "line",
            data: objSeriesLineData,
            name: "แผน",
            color: "#CC0000",
        }],
        valueAxis: {
            //max: 2500,
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
            template: "#= category #, #= value # คน",
        },
        seriesClick:function(e){
        	/*start layout center and bottom*/
		
			$("#centerContent").show();
			$("#panelL-Page1").show();
			
			
        	//alert(e);
        	$("#titleTopSelect").show(); //Show title Chart02-04
        	$(".asOfYear").text(e.category); //Display asOfYear on Chart Title
        	
        	/* Display Chart-02 by Change select option */
        	/*
        	$("#selectTop").change(function(){
        		alert("change");
	        	topTenHighSchoolByYearFn(e.category,$(this).val());
        	});
        	
        	*/
        	//$("#selectTop").change(function(){
        		//alert("change");
	        	topTenHighSchoolByYearFn(e.category,$("#selectTop").val());
        	//});
        	
        	
        	/* Display Chart-03 */
        	$(".titleCompareFaculty").show();
        	newStudentByYearByFacultyFn(e.category);
        	$("hr#line-2").show();
        	
        	$(".categoryParam").remove();
        	$("body").append("<input type=\"hidden\" id=\"categoryYear\" name=\"categoryYear\" class=\"categoryParam\" value="+e.category+">");
        	
        	/* Show Tabs 2-5 */
        	$("[href='#tabs-2']").show();
        	$("[href='#tabs-3']").show();
        	$("[href='#tabs-4']").show();
        	$("[href='#tabs-5']").show();
        	
        	/*Hide Chart04(newStudentByYearByFacultyByMajorChart)*/
        	$(".titleCompareMajor").hide();
        	$("hr#line-3").hide();
        	$("#newStudentByYearByFacultyByMajorChart").hide();
        }
    });
}
/* END: function call model for newStudentByYearChart */
/* START Check event param top ten on pie chart*/
$("#selectTop").change(function(){
	//alert("change");
	//alert($("#paramYearPie").text());
topTenHighSchoolByYearFn(parseInt($("#paramYearPie").text()),$(this).val());
});
/* START: Generate Pie Chart(Chart-02) By Kendo */ 
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
                template: "#= value#"
               //template: "#= category #: #= value#%"
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
            visible: false,
            format: "{0}%"
        }
    });
}
/* END: Generate Pie Chart02 By Kendo */

/* START: Generate BarChat(Chart-03) By Kendo */ 
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
            color: "#0066FF"
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
                rotation: 60
              },
            majorGridLines: {
                visible: false
            }
        },
        tooltip: {
            visible: true,
            template: "#= series.name #: #= value #"
        },
        legend: {
        	position: "bottom",
            labels: {
              font: "13px Tahoma",
              color: "black"
            }
        },
        seriesClick:function(e){
        	//alert(e.category);
        	//show layout bottom
        	$("#buttomContent").show();
        	
        	var paramYear = $(".categoryParam").val();
        	$(".titleCompareMajor").show();
        	$("#newStudentByYearByFacultyByMajorChart").show();
        	newStudentByYearByFacultyByMajorFn(paramYear,e.category);
        	$("hr#line-3").show();
        }
    });
}
/* END: Generate Bar Chat03 By Kendo */

/* START: Generate BarChat(Chart-04) By Kendo */ 
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
            color: "#0066FF"
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
/* END: Generate BarChat(Chart-04) By Kendo */ 


/* START: call ajax for create chart(02) topTenHighSchoolChart */
var topTenHighSchoolByYearFn = function(paramYear,arSelectTop){
	$.ajax({
		url: "../Model/topTenHighSchoolByYear.jsp",
		type:"get",
		dataType:"json",
		data:{"paramYear":paramYear,"paramTop":arSelectTop},
		success:function(data){
			//console.log(data);
			//alert(data);
			var dataCloumn = "";
			dataCloumn = "[";
			$.each(data,function(index,indexEntry){
				if(index==0){
					dataCloumn+="{";
					dataCloumn+="category:"+"\""+indexEntry[0]+"\",";
					dataCloumn+="value:"+""+indexEntry[1];
					dataCloumn+="}";
				}else{
					dataCloumn+=",{";
					dataCloumn+="category:"+"\""+indexEntry[0]+"\",";
					dataCloumn+="value:"+""+indexEntry[1];	
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
/* END: call ajax for create chart(02) topTenHighSchoolChart */
	
///* START: Event chage dropdownlist selectTop */
//$("#selectTop").live("change",function(){
//	//alert($(this).val());
//	topTenHighSchoolByYearFn($(this).val());
//});
///* END: Event chage dropdownlist selectTop */


/* START: Call Ajax for create chart(03) newStudentByYearByFacultyChart */
var newStudentByYearByFacultyFn = function(paramYear){
	$.ajax({
		url: "../Model/newStudentByYearByFaculty.jsp",
		type:"get",
		dataType:"json",
		data:{"paramYear":paramYear},
		success:function(data){
			//console.log(data);
			//alert(data);
			var seriesColumnData="";
			var seriesLineData="";
			var facuName="";
			seriesColumnData+="[";
			seriesLineData+="[";
			facuName+="[";
			
			$.each(data,function(index,indexEntry){
				//alert(indexEntry[0]);
				
				if(index==0){
					seriesColumnData+=""+indexEntry[1]+"";
					seriesLineData+=""+indexEntry[2]+"";
					facuName+="\""+""+indexEntry[0]+""+"\"";
				}else{
					seriesColumnData+=","+indexEntry[1];
					seriesLineData+=","+indexEntry[2]+"";
					facuName+=","+"\""+indexEntry[0]+"\""+"";
				}
			});
			seriesColumnData+="]"; //alert(seriesColumnData);
			seriesLineData+="]"; //alert(seriesLineData);
			facuName+="]"; //alert(facuName);
			           				
			/*Convert text to object json by eval().*/
			var objSeriesColumnData = eval("("+seriesColumnData+")");
			var objSeriesLineData = eval("("+seriesLineData+")");
			var objCateData = eval("("+facuName+")");
			//alert(dataCloumn);
			newStudentByYearByFacultyChart(objCateData,objSeriesLineData,objSeriesColumnData);							
		}
	});
};
/* END: Call Ajax for create chart(03) newStudentByYearByFacultyChart */


/* START: Call Ajax for create chart(04) newStudentByYearByFacultyChart */
	var newStudentByYearByFacultyByMajorFn = function(paramYear,paramFacuName){
		$.ajax({
			url: "../Model/newStudentByYearByFacultyByMajor.jsp",
			type: "post",
			dataType: "json",
			data:{"paramYear":paramYear, "paramFacuName":paramFacuName},
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
/* END: Call Ajax for create chart(04) newStudentByYearByFacultyChart */