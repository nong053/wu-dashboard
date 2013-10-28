$(".panelChartTitle").hide();
/* START: Generate Chart No.1 By Kendo */
function convertPercentoAmount(v,total){
	
	var amountPerson = (v*total/100);
	return amountPerson;
}
function newStudentByType(objSeriesFirst, objSeriesSecond, objSeriesThird, objCategories) {
           $("#newStudentByType").kendoChart({
               legend: {
                   visible: false
               },
               seriesDefaults: {
                   type: "bar",
                   stack: true
               },
               series: [{
                   name: "โควตา",
                   data: objSeriesFirst,
                   color: "#f3ac32"
               }, {
                   name: "รับตรง",
                   data: objSeriesSecond,
                   color: "#b8b8b8"
               }, {
                   name: "Admissions",
                   data: objSeriesThird,
                   color: "#bb6e36"
               }],
               valueAxis: {
                   max: 100,
                   labels: {
                       format: "{0}%"
                   },
                   line: {
                       visible: false
                   },
                   minorGridLines: {
                       visible: true
                   }
               },
               categoryAxis: {
            	   categories: objCategories,
                   majorGridLines: {
                       visible: false
                   }
               },
               tooltip: {
                   visible: true,
                   template: "#= series.name #: #= value #%"
                  // template: "#= convertPercentoAmount(value,100) #"
               },
               seriesClick:function(e){           	   
            	   $(".panelChartTitle").show();
            	   avgGpaByfacuByYearFn(e.series.name, e.category);
            	   amountNewStudentByMajorFn(e.series.name,e.category);
            	   
            	   /*ChartTitle*/
            	   $(".asOfYear").text($("#embParamYear").val());
            	   $(".asOfType").text(e.series.name);
            	   $(".asOfMajor").text(e.category);
               }
           });
       }
/* END: Generate Chart-01 By Kendo */
       
/* START: Generate Chart-02 By Kendo */
       function averageGpaByYear(objseriesData, objcategoriesData) {
           $("#averageGpaByYear").kendoChart({
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
                       visible: false
                   },
                   minorGridLines: {
                       visible: true
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
/* START: Generate Chart-02 By Kendo */
       
/* START: Generate Chart-03 By Kendo */
       function newStudentByMajor(objDataCloumn) {
           $("#newStudentByMajor").kendoChart({
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
/* START: Generate Chart-03 By Kendo */
       
       
/* START: Call Ajax for create graph(01) newStudentByType */
       var amountNewStudentByTypeFn = function(){
    	   $.ajax({
    		   url: "../Model/amountNewStudentByType.jsp",
    		   type: "get",
    		   dataType: "json",
    		   data:{"paramYear":$("#embParamYear").val()},
    		   success:function(data){
    			   //alert(data);
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
    				   //alert(indexEntry[0]);
    				   sumSeries=parseFloat(indexEntry[1])+parseFloat(indexEntry[2])+parseFloat(indexEntry[3]);
    				   if(index==0){  
    					   seriesFirst+=""+parseFloat((parseFloat(indexEntry[1])/sumSeries)*100).toFixed(2)+"";
    					   seriesSecond+=""+parseFloat((parseFloat(indexEntry[2])/sumSeries)*100).toFixed(2)+"";
    					   seriesThird+=""+parseFloat((parseFloat(indexEntry[3])/sumSeries)*100).toFixed(2)+"";
    					   categoriesData+="\""+indexEntry[0]+"\"";
    				   }else{
    					   seriesFirst+=","+parseFloat((parseFloat(indexEntry[1])/sumSeries)*100).toFixed(2);
    					   seriesSecond+=","+parseFloat((parseFloat(indexEntry[2])/sumSeries)*100).toFixed(2)+"";
    					   seriesThird+=","+parseFloat((parseFloat(indexEntry[3])/sumSeries)*100).toFixed(2)+"";
    					   categoriesData+=",\""+indexEntry[0]+"\"";
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
    			   
    			   newStudentByType(objSeriesFirst, objSeriesSecond, objSeriesThird, objCategories); 			
    		   }
    	   });
       };
/* END: Call Ajax for create graph(01) newStudentByType */
       
/* START: Call Ajax for create BarChart(02) newStudentByType */
       var avgGpaByfacuByYearFn = function(TypeName, facuName){
    	 $.ajax({
    		 url: "../Model/avgGpaByfacuByYear.jsp",
    		 type: "post",
    		 dataType: "json",
    		 data:{"paramYear":$("#embParamYear").val(), "facuName":facuName, "TypeName":TypeName},
    		 success:function(data){
    			 //alert(data);
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
    		 }    	 		
    	 });  
       };
/* END: Call Ajax for create BarChart(02) newStudentByType */
       
/* START: Call Ajax for create PieChart(03) newStudentByMajor*/
       var amountNewStudentByMajorFn = function(typeName, facuName){
    	   $.ajax({
    		   url: "../Model/amountNewStudentByMajorByTypeByYear.jsp",
    		   type: "post",
    		   dataType: "json",
    		   data:{"paramYear":$("#embParamYear").val(), "facuName":facuName, "TypeName":typeName},
    		   success:function(data){
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
    			   
    			   var objDataCloumn = eval("("+dataCloumn+")");
    			   newStudentByMajor(objDataCloumn);

    		   }
    	   });
       };
/* END: Call Ajax for create PieChart(03) newStudentByMajor*/