/*Control object on Web Page*/
$("#titleTopSelect").hide();
$("#centerContent").hide();	
$(".titleCompareFaculty").hide();
$("#buttomContent").hide();	
$(".titleCompareMajor").hide();

/* #################### START: Create code for generate Generate newStudentByYearChart(Chart-01). #################### */ 
/* START: Generate newStudentByYearChart(Chart-01) by Kendo */
function newStudentByYearChart(objCateData,objSeriesColumnData,objSeriesLineData) {
    $("#newStudentByYearChart").kendoChart({
    	chartArea: {
    		background: ""
    	},
    	legend: {
            position: "bottom",
            labels: {
              font: "10px Tahoma",
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
            template: "#= series.name #: #= value #",
        },
        seriesClick:function(e){
        	
        	$("#titleTopSelect").show(); //Show title Chart02-04
        	$(".asOfYear").text(e.category); //Display asOfYear on Chart Title
        	
        	/* Display Chart-02 by Change select option */
        	$("#selectTop").live("change",function(){
	        	topTenHighSchoolByYearFn(e.category,$(this).val());
        	}).trigger("change");
        	
        	/* Display Chart-03 */
        	$("#centerContent").show();	
        	$(".titleCompareFaculty").show();
        	newStudentByYearByFacultyFn(e.category);
        	
        	$(".categoryParam").remove();
        	$("body").append("<input type=\"hidden\" id=\"categoryYear\" name=\"categoryYear\" class=\"categoryParam\" value="+e.category+">");
        	
        	/* Show Tabs 2-5 */
        	$("[href='#tabs-2']").show();
        	$("[href='#tabs-3']").show();
        	$("[href='#tabs-4']").show();
        	$("[href='#tabs-5']").show();
        	
        	/*Hide Chart04(newStudentByYearByFacultyByMajorChart)*/
        	$("#buttomContent").hide();	
        	$(".titleCompareMajor").hide();
        	$("#newStudentByYearByFacultyByMajorChart").hide();
        }
    });
}
/* END: Generate newStudentByYearChart(Chart-01) by Kendo */
/* #################### END: Create code for generate Generate newStudentByYearChart(Chart-01). #################### */ 



/* #################### START: Create code for generate Generate topTenHighSchoolChart(Chart-02). #################### */ 
/* START: Generate topTenHighSchoolChart(Chart-02) By Kendo */ 
function topTenHighSchoolChart(objData) {
    $("#topTenHighSchoolChart").kendoChart({
    	chartArea: {
    		background: ""
    	},
        legend: {
        	position: "bottom",
            labels: {
              font: "10px Tahoma",
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
/* END: Generate topTenHighSchoolChart(Chart-02) By Kendo */

/* START: Call ajax for create topTenHighSchoolChart(Chart-02) */
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
/* END: Call ajax for create topTenHighSchoolChart(Chart-02) */

///* START: Event chage dropdownlist selectTop */
//$("#selectTop").live("change",function(){
//	//alert($(this).val());
//	topTenHighSchoolByYearFn($(this).val());
//});
///* END: Event chage dropdownlist selectTop */
/* #################### END: Create code for generate topTenHighSchoolChart(Chart-02). #################### */ 



/* #################### START: Create code for generate newStudentByYearByFacultyChart(Chart-03). #################### */ 
/* START: Generate newStudentByYearByFacultyChart(Chart-03) By Kendo */ 
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
              font: "10px Tahoma",
              color: "black"
            }
        },
        seriesClick:function(e){
        	//alert(e.category);
        	var paramYear = $(".categoryParam").val();
        	$("#buttomContent").show();	
        	$(".titleCompareMajor").show();
        	$("#newStudentByYearByFacultyByMajorChart").show();
        	newStudentByYearByFacultyByMajorFn(paramYear,e.category);
        	$("hr#line-3").show();
        }
    });
}
/* END: Generate newStudentByYearByFacultyChart(Chart-03) By Kendo*/

/* START: Call Ajax for newStudentByYearByFacultyChart(Chart-03) */
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
/* END: Call Ajax for newStudentByYearByFacultyChart(Chart-03) */
/* #################### END: Create code for generate newStudentByYearByFacultyChart(Chart-03). #################### */



/* #################### START: Create code for generate newStudentByYearByFacultyByMajorChart(Chart-04). #################### */
/* START: Generate newStudentByYearByFacultyByMajorChart(Chart-04) By Kendo */ 
function newStudentByYearByFacultyByMajorChart(objSeriesColumnData, objSeriesLineData, objcategoriesData) {
    $("#newStudentByYearByFacultyByMajorChart").kendoChart({
    	chartArea: {
    		background: ""
    	},
        legend: {
        	position: "bottom",
            labels: {
              font: "10px Tahoma",
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
/* END: Generate newStudentByYearByFacultyByMajorChart(Chart-04) By Kendo */

/* START: Call Ajax for newStudentByYearByFacultyByMajorChart(Chart-04) */
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
/* END: Call Ajax for create newStudentByYearByFacultyByMajorChart(Chart-04) */
/* #################### END: Create code for generate newStudentByYearByFacultyByMajorChart(Chart-04). #################### */