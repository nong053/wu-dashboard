/* parameter control */
var PrvYear = $("#embParamPrev").val();
var paramYear = $("#embParamYear").val();

/* Control object in page. */
$(".asOfYear").text(paramYear);
$("div#buttomContent").hide();
$(".panel").hide();
$(".panelChartTitle").hide();


/* #################### START: Create code for generate newStudentByType Chart (chart-01). #################### */
/* START: Generate newStudentByType(chart-01) By Kendo */
function newStudentByType(objSeriesFirst, objSeriesSecond, objSeriesThird, objCategories, sumSeries) {
	
	$("#newStudentByType").kendoChart({
    	chartArea: {
    		background: ""
    	},
		legend: {
			visible: true,
			position: "bottom",
		},
		seriesDefaults: {
			labels: {
				template: kendo.template("#:series#")
			},
			type: "bar",
			stack: true
			},
			series: [{
				name: "โควตา",
				name2: "1",
				data: objSeriesFirst,
				color: "#357EC7"
			},{
				name: "รับตรง",
				name2: "2",
				data: objSeriesSecond,
				color: "#FA5858"
			},{
				name: "Admissions",
				name2: "3",
				data: objSeriesThird,
				color: "#6AA121"
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
			template: "#=category.substring(3)#, #= series.name #, #= value #%"
		},
		
		seriesClick:function(e){
			
			$("div#buttomContent").show();
			$(".panel").show();
			$(".panelChartTitle").show();
			
			/* ChartTitle */
			$("label.asOfYear").text(paramYear);
			$("label.asOfType").text(e.series.name);
			$("label.asOfMajor").text(e.category.substring(e.category.indexOf("-")+1));
			
			avgGpaByfacuByYearFn(e.series.name2, e.category.substring(0,2));
			amountNewStudentByMajorFn(e.series.name2,e.category.substring(0,2));
			
			$("input#t2Param01").val(e.series.name2);
			$("input#t2Param02").val(e.category);
        	$("input#t2Param01").addClass("active");
        	$("input#t2Param02").addClass("active");
						
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
		data:{"paramYear":paramYear},
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
				$("#newStudentByType").html("<font id=\"NDF01\" color=\"red\" size=\"4\"><center> NO DATA FOUND! <center></font>");
			}
		}
	});
};
/* END: Call Ajax for create newStudentByType(chart-01) */
/* #################### END: Create code for generate newStudentByType Chart (chart-01). #################### */     



/* #################### START: Create code for generate averageGpaByYear Chart (Chart-02). #################### */  
/* START: Generate averageGpaByYear(Chart-02) By Kendo */
function averageGpaByYear(objseriesData, objcategoriesData) {
	$("#averageGpaByYear").kendoChart({
    	chartArea: {
    		background: ""
    	},
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
				color: "#357EC7"
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
				},
				labels: {
					template: kendo.template("#:value.substring(0,value.indexOf(\"/\"))#")
				}
			},
			tooltip: {
				visible: true,
				template: kendo.template("#= category.substring(0,category.indexOf(\"/\")) #, " +
						"#= value #, #= category.substring(category.indexOf(\"/\")+1) # ")
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
		 data:{"paramYear":paramYear, "facuId":facuId, "typeId":TypeId},
		 success:function(data){
			 if(data != ""){
	 				var seriesData="";
	 				var categoriesData="";
	 				seriesData+="[";
	 				categoriesData+="[";
	 				$.each(data,function(index,indexEntry){
	 					if(index==0){
	 						seriesData+=""+parseFloat(indexEntry[3]).toFixed(2)+"";
	 						categoriesData+="\""+indexEntry[1]+"/"+indexEntry[2]+" คน\"";
	 					}else{
	 						seriesData+=","+parseFloat(indexEntry[3]).toFixed(2)+"";
	 						categoriesData+=",\""+indexEntry[1]+"/"+indexEntry[2]+" คน\"";
	 					}				
	 				});
	 				seriesData+="]";
					categoriesData+="]";
					
					var objseriesData = eval("("+seriesData+")");
					var objcategoriesData = eval("("+categoriesData+")");

					averageGpaByYear(objseriesData, objcategoriesData);	
			 }else{
				 $("#averageGpaByYear").html("<font id=\"NDF01\" color=\"red\" size=\"4\"><center> NO DATA FOUND! <center></font>");
			 }
			 
		 }    	 		
	 });  
};
/* END: Call ajax for create avgGpaByfacuByYear(Chart-02) */     
/* #################### END: Create code for generate averageGpaByYear Chart (chart-02). #################### */  
 


/* #################### START: Create code for generate newStudentByMajor Chart (chart-03). #################### */  
/* START: Generate newStudentByMajor(Chart-03) By Kendo */
       function newStudentByMajor(objDataCloumn) {
           $("#newStudentByMajor").kendoChart({
           	chartArea: {
        		background: ""
        	},
        	legend: {
        	    labels: {
        	      template: kendo.template("#: text.substring(0,text.indexOf(\"/\")) #")
        	    },
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
                   template: kendo.template("#= category.replace(\"/\",\", \") #")
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
    		   data:{"paramYear":paramYear, "facuId":facuId, "typeId":typeId},
    		   success:function(data){
    			   if(data != ""){
    				   /* total new student by year, faculty and type. (select from newStudentByType) */
    				   var sumAtmStudent = 0;
    				   $.each(data,function(index,indexEntry){
    					   
    					   sumAtmStudent += (parseInt(indexEntry[2]));
    				   });

    				   var color = ["#357EC7","#C38EC7","#438D80","#437C17",
    				                "#FBB117","#990012","#E8ADAA","#C38EC7","#FFF380"];
    				   var dataCloumn = "";
        			   dataCloumn = "[";
        			   
        			   $.each(data,function(index,indexEntry){
        				   if(index==0){
        					   dataCloumn+="{";
        					   dataCloumn+="category:"+"\""+indexEntry[1]+"/"+(indexEntry[2])+" คน\",";
        					   dataCloumn+="value:"+""+((parseFloat(indexEntry[2])/sumAtmStudent)*100).toFixed(2)+",";
        					   dataCloumn+="color:"+"\""+color[index]+"\"";
        					   dataCloumn+="}";
        				   }else{
        					   dataCloumn+=",{";
        					   dataCloumn+="category:"+"\""+indexEntry[1]+"/"+(indexEntry[2])+" คน\",";
        					   dataCloumn+="value:"+""+((parseFloat(indexEntry[2])/sumAtmStudent)*100).toFixed(2)+",";
        					   dataCloumn+="color:"+"\""+color[index]+"\"";
        					   dataCloumn+="}";
        				   }
        			   });
        			   dataCloumn+="]";
        			   var objDataCloumn = eval("("+dataCloumn+")");       			   
        			   newStudentByMajor(objDataCloumn);
    			   }else{
    				   $("#newStudentByMajor").html("<font id=\"NDF01\" color=\"red\" size=\"4\"><center> NO DATA FOUND! <center></font>");
    			   }
    		   }
    	   });
       };
/* END: Call Ajax for create newStudentByMajor(Chart-03) */
/* #################### START: Create code for generate newStudentByMajor Chart (chart-03). #################### */  