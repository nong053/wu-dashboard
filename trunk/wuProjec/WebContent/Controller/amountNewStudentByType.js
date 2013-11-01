/* Control object in page. */
$(".panel").hide();
$(".panelChartTitle").hide();

/* #################### START: Create code for generate newStudentByType Chart. #################### */
/* START: Generate newStudentByType(chart-01) By Kendo */
function newStudentByType(objSeriesFirst, objSeriesSecond, objSeriesThird, objCategories, sumSeries) {
	$("#newStudentByType").kendoChart({
		background: "",
		legend: {
			visible: true,
			position: "bottom",
			label:{
				visible: true,
				template: kendo.template("NNNN#:series.substring(2)#")
			}
		},
		seriesDefaults: {
			type: "bar",
			stack: true
			},
			series: [{
				name: "1-โควตา",
				data: objSeriesFirst,
				color: "#5858FA"
			},{
				name: "2-รับตรง",
				data: objSeriesSecond,
				color: "#FA5858"
			},{
				name: "3-Admissions",
				data: objSeriesThird,
				color: "#ACFA58"
		}],
		valueAxis: {
			max: 100,
			labels: {
				format: "{0}%"
			},
			line: {
				visible: true
			},
			minorGridLines: {
				visible: false
			}
		},
		categoryAxis: {
			categories: objCategories,
			majorGridLines: {
				visible: false
			},
			labels: {
				template: kendo.template("#:value.substring(3)#")
			}
		},
		tooltip: {
			visible: true,
			template: "#=category.substring(3)#, #= series.name.substring(2) #, #= value #%"
		},
		seriesClick:function(e){
			$(".panel").show();
			$(".panelChartTitle").show();
			
			avgGpaByfacuByYearFn(e.series.name.substring(0,1), e.category.substring(0,2));
			amountNewStudentByMajorFn(e.series.name.substring(0,1),e.category.substring(0,2));
				
			/*ChartTitle*/
			$(".asOfYear").text($("#embParamYear").val());
			$(".asOfType").text(e.series.name.substring(2));
			$(".asOfMajor").text(e.category.substring(3));
		}
	});
}
/* END: Generate newStudentByType(chart-01) By Kendo */

/* START: Call Ajax for create newStudentByType(chart-01) */
var amountNewStudentByTypeFn = function(){
	$.ajax({
		url: "../Model/amountNewStudentByType.jsp",
		type: "get",
		dataType: "json",
		data:{"paramYear":$("#embParamYear").val()},
		success:function(data){
			if(data != ""){
				var seriesFirst="";
				var seriesSecond="";
	 			var seriesThird="";
	 			var categoriesData="";
	 			var sumSeries="";
	 			seriesFirst+="[";
	 			seriesSecond+="[";
	 			seriesThird+="[";
	 			categoriesData = "[";
	 			   
	 			$.each(data,function(index,indexEntry){
	 				sumSeries=parseFloat(indexEntry[2])+parseFloat(indexEntry[3])+parseFloat(indexEntry[4]);
	 				if(index==0){  
	 					seriesFirst+=""+parseFloat((parseFloat(indexEntry[2])/sumSeries)*100).toFixed(2)+"";
	 					seriesSecond+=""+parseFloat((parseFloat(indexEntry[3])/sumSeries)*100).toFixed(2)+"";
	 					seriesThird+=""+parseFloat((parseFloat(indexEntry[4])/sumSeries)*100).toFixed(2)+"";
	 					categoriesData+="\""+indexEntry[0]+"-"+indexEntry[1]+"\"";
	 				}else{
	 					seriesFirst+=","+parseFloat((parseFloat(indexEntry[2])/sumSeries)*100).toFixed(2);
	 					seriesSecond+=","+parseFloat((parseFloat(indexEntry[3])/sumSeries)*100).toFixed(2)+"";
	 					seriesThird+=","+parseFloat((parseFloat(indexEntry[4])/sumSeries)*100).toFixed(2)+"";
	 					categoriesData+=",\""+indexEntry[0]+"-"+indexEntry[1]+"\"";
	 					 }
	 				});
	 			seriesFirst+="]"; 
	 			seriesSecond+="]"; 
	 			seriesThird+="]";
	 			categoriesData+="]";
	
	 			/*Convert text to object json by eval().*/
	 			var objSeriesFirst = eval("("+seriesFirst+")");
	 			var objSeriesSecond = eval("("+seriesSecond+")");
	 			var objSeriesThird = eval("("+seriesThird+")");
	 			var objCategories = eval("("+categoriesData+")");
	 			   
	 			newStudentByType(objSeriesFirst, objSeriesSecond, objSeriesThird, objCategories, sumSeries);
			}else{
				alert("จำนวนนักศึกษาใหม่ตามประเภทการรับ \r\n NO Data Found!");
			}
		}
	});
};
/* END: Call Ajax for create newStudentByType(chart-01) */
/* #################### END: Create code for generate newStudentByType Chart. #################### */     



/* #################### START: Create code for generate averageGpaByYear Chart. #################### */  
/* START: Generate averageGpaByYear(Chart-02) By Kendo */
function averageGpaByYear(objseriesData, objcategoriesData) {
	$("#averageGpaByYear").kendoChart({
		background: "",
		legend: {
			visible: false
			},
			seriesDefaults: {
				type: "bar",
				stack: true
			},
			series: [{
				name: "GPA",
				data: objseriesData,
				color: "#8A2BE2"
			}],
			valueAxis: {
				max: 4,
				labels: {
					format: "{0}"
				},
				line: {
					visible: true
				},
				minorGridLines: {
					visible: false
				}
			},
			categoryAxis: {
				categories: objcategoriesData,
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
/* START: Generate averageGpaByYear(Chart-02) By Kendo */

/* START: Call ajax for create avgGpaByfacuByYear(Chart-02) */
var avgGpaByfacuByYearFn = function(TypeId, facuId){
	 $.ajax({
		 url: "../Model/avgGpaByfacuByYear.jsp",
		 type: "get", 
		 dataType: "json",
		 data:{"paramYear":$("#embParamYear").val(), "facuId":facuId, "typeId":TypeId},
		 success:function(data){
			 if(data != ""){
	 				var seriesData="";
	 				var categoriesData="";
	 				seriesData+="[";
	 				categoriesData+="[";
	 				$.each(data,function(index,indexEntry){
	 					if(index==0){
	 						seriesData+=""+parseFloat(indexEntry[3]).toFixed(2)+"";
	 						categoriesData+="\""+indexEntry[1]+"\"";
	 					}else{
	 						seriesData+=","+parseFloat(indexEntry[3]).toFixed(2)+"";
	 						categoriesData+=",\""+indexEntry[1]+"\"";
	 					}				
	 				});
	 				seriesData+="]";
					categoriesData+="]";

					var objseriesData = eval("("+seriesData+")");
					var objcategoriesData = eval("("+categoriesData+")");

					averageGpaByYear(objseriesData, objcategoriesData);	
			 }else{
				 alert("GPA ระดับ ม.ปลายเฉลี่ยของนักศึกษาใหม่ \r\n No Data Found!");
			 }
			 
		 }    	 		
	 });  
};
/* END: Call ajax for create avgGpaByfacuByYear(Chart-02) */     
/* #################### END: Create code for generate averageGpaByYear Chart. #################### */  
 


/* #################### START: Create code for generate newStudentByMajor Chart. #################### */  
/* START: Generate newStudentByMajor(Chart-03) By Kendo */
       function newStudentByMajor(objDataCloumn) {
           $("#newStudentByMajor").kendoChart({
        	   background: "",
               legend: {
                  position: "bottom",
                  font:"10xp Tahoma"
               },
               seriesDefaults: {
                   labels: {
                       template: "#= kendo.format('{0:P}', percentage)#",
                       position: "outsideEnd",
                       visible: true,
                       background: "transparent"
                   }
               },
               series: [{
                   type: "pie",
                   data: objDataCloumn
               }],
               tooltip: {
                   visible: true,
                   template: "#= kendo.format('{0:P}', percentage) #"
               }
           });
       }
/* START: Generate newStudentByMajor(Chart-03) By Kendo */
       
/* START: Call Ajax for create newStudentByMajor(Chart-03) */
       var amountNewStudentByMajorFn = function(typeId, facuId){
    	   $.ajax({
    		   url: "../Model/amountNewStudentByMajorByTypeByYear.jsp",
    		   type: "post",
    		   dataType: "json",
    		   data:{"paramYear":$("#embParamYear").val(), "facuId":facuId, "typeId":typeId},
    		   success:function(data){
    			   if(data != ""){
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
        			   
        			   var objDataCloumn = eval("("+dataCloumn+")");
        			   
        			   newStudentByMajor(objDataCloumn);
    			   }else{
    				   alert("จำนวนนักศึกษาใหม่ตามหลักสูตร \r\n No Data Found!");
    			   }
    			   

    		   }
    	   });
       };
/* END: Call Ajax for create newStudentByMajor(Chart-03) */
/* #################### START: Create code for generate newStudentByMajor Chart. #################### */  