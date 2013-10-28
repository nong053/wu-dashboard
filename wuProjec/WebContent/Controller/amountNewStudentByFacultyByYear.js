
/* ######################### Start generate code for newStudentComparebyMajoyByYear chart. ############################ */
/* START : Create function add commas() to use value in grid table */
	function addCommas(nStr){
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	};
/* START : Create function add commas() to use value in grid table */
	

//Generate Chart01 By Kendo Start	
function newStudentComparebyMajoyByYear(objSeriesData,objCategoryData) {
	$("#newStudentComparebyMajoyByYear").kendoChart({
		chartArea: {
			background: ""
        },
        seriesDefaults: {
        	type: "line"
        },
        series: objSeriesData
        ,
        legend: {
        	position: "right"
        },
        valueAxis: {
//	        max: 600,
	        labels: {
	        	format: "{0}"
	        },
	        line: {
	        	visible: true
	        	},
	        axisCrossingValue: -10
        },
        	categoryAxis: {
        		categories: objCategoryData,
        		majorGridLines: {
        			visible: false
        			}
        	},
        	tooltip: {
        		visible: true,
        		format: "{0}",
        		template: "#= series.name #: #= value # คน"
        	}
//        	,
//        	legendItemClick: onLegendItemClick,
//        	axisLabelClick: onLegendItemClick
	});
//	var chart = $("#newStudentComparebyMajoyByYear").data("kendoChart");
//	chart.bind("axisLabelClick", onLegendItemClick);
}

$("#newStudentComparebyMajoyByYear").click(function(){
	alert("Clicked");
});
              
/* START: Call Ajax for create chart newStudentComparebyMajoyByYear */
var chartComparingAtmNewStudentByFacultyFn = function(){
	$.ajax({
		url: "../Model/chartComparingAtmNewStudentByFaculty.jsp",
		type: "get",
		dataType: "json",
		data: {"paramYear":$("#paramYear").val()},
		success:function(data){

			var seriesData = "";
			var categoryData = "";
			var PrvYear = $("#paramPrev").val();
			var paramYear = $("#paramYear").val();
			
			seriesData += "[";
			categoryData += "[";
        			
        	$.each(data,function(index,indexEntry){
        		/* Create category by period dating back. */
        		/* PrvYear = 3 */
        		if(PrvYear == 3){
        			if(index == 0){
            			seriesData += "{"+
            							"name:\""+indexEntry[1]+"\","+
            							"data:["+indexEntry[2]+","+indexEntry[3]+","+indexEntry[4]+"]"+
            							"}";
            		}else{
            			seriesData += ",{"+
    									"name:\""+indexEntry[1]+"\","+
    									"data:["+indexEntry[2]+","+indexEntry[3]+","+indexEntry[4]+"]"+
    									"}";        			
            		} 
        		/* PrvYear = 5 */
        		}else if(PrvYear == 5){
        			if(index == 0){
            			seriesData += "{"+
            							"name:\""+indexEntry[1]+"\","+
            							"data:["+indexEntry[2]+","+indexEntry[3]+","+indexEntry[4]+","
            									+indexEntry[5]+","+indexEntry[6]+"]"+
            							"}";
            		}else{
            			seriesData += ",{"+
    									"name:\""+indexEntry[1]+"\","+
    									"data:["+indexEntry[2]+","+indexEntry[3]+","+indexEntry[4]+","
    											+indexEntry[5]+","+indexEntry[6]+"]"+
    									"}";        			
            		} 
        		/* PrvYear = 10 */
        		}else if(PrvYear == 10){
        			if(index == 0){
            			seriesData += "{"+
            							"name:\""+indexEntry[1]+"\","+
            							"data:["+indexEntry[2]+","+indexEntry[3]+","+indexEntry[4]+","
            									+indexEntry[5]+","+indexEntry[6]+","+indexEntry[7]+","
            									+indexEntry[8]+","+indexEntry[9]+","+indexEntry[10]+","
		    									+indexEntry[11]+"]"+
            							"}";
            		}else{
            			seriesData += ",{"+
    									"name:\""+indexEntry[1]+"\","+
    									"data:["+indexEntry[2]+","+indexEntry[3]+","+indexEntry[4]+","
		    									+indexEntry[5]+","+indexEntry[6]+","+indexEntry[7]+","
		    									+indexEntry[8]+","+indexEntry[9]+","+indexEntry[10]+","
		    									+indexEntry[11]+"]"+
    									"}";        			
            		} 
        		}     		
        	});
        	/* Create category by period dating back. */
        	/* PrvYear = 3 */
        	if(PrvYear == 3){
        		categoryData += paramYear+","+(paramYear-1)+","+(paramYear-2);
        	/* PrvYear = 5 */
        	}else if(PrvYear == 5){
        		categoryData += paramYear+","+(paramYear-1)+","+(paramYear-2)+","+(paramYear-3)+","+(paramYear-4);
        	/* PrvYear = 10 */
        	}else if(PrvYear == 10){
        		categoryData += paramYear+","+(paramYear-1)+","+(paramYear-2)+","+(paramYear-3)+","+(paramYear-4) +
        						","+(paramYear-5)+","+(paramYear-6)+","+(paramYear-7)+","+(paramYear-8)+","+(paramYear-9);
        	};
        	       	
        	seriesData += "]";
        	categoryData += "]";

        	var objSeriesData = eval("("+seriesData+")");
        	var objCategoryData = eval("("+categoryData+")");
//        	console.log(objCategoryData);   
//        	newStudentComparebyMajoyByYear(objSeriesData,objCategoryData);
        	$(document).ready(newStudentComparebyMajoyByYear(objSeriesData,objCategoryData));
            $(document).bind("kendo:skinChange", newStudentComparebyMajoyByYear(objSeriesData,objCategoryData));
        }
	});
};

//	$("#newStudentComparebyMajoyByYear").click(function(){
//		alert("clicked");
//	}); 

/* END: Call Ajax for create chart newStudentComparebyMajoyByYear */
/* ######################### End generate code for newStudentComparebyMajoyByYear chart. ############################ */


/* ########################### Start generate gridCompareAtmNewStudentByFaculty chart. ############################## */
/* START: Create Table Html fro dataGridCompareByMajor */
var createHtmlGridFn = function(){
	var yearField = $("#paramYear").val(); 
	var PrvYear = $("#paramPrev").val(); 
	var f = 2; 
	var th = 0; 
	var tb = 0;
	var htmlGrid = ""+
				"<table id=\"dataGridDetail\" width=\"100%\" border=\"1\">" +
					"<thead>" +
						"<tr>" +
							"<th data-field=\"Field1\" rowspan=\"2\"> <center> <b> สำนักวิชา </b></center> </th>" +
							"<th data-field=\"FieldTitle\" colspan="+PrvYear+"> <center> <b>จำนวนนักศึกษาตามปีการศึกษาที่เข้าศึกษา (คน) </b></center> </th>"+
							"<th data-field=\"FieldTotle\" rowspan=\"2\"> <center> <b>รวมทั้งหมด  <br>(คน) </b></center> </th>"+
        				"</tr>" +
        				"<tr>";
	        				while (th < PrvYear) {
	        					htmlGrid += "<th data-field=\"Field"+(f++)+"\"> <center> <b>"+(yearField--)+"</b></center> </th>";
	        					th++;
	        				}
        				htmlGrid += "</tr>" +								
					"</thead>" +
					"<tboby>" +
						"<tr>" +
							"<td> </td>";
	        				while (tb < PrvYear) {
	        					htmlGrid += "<td> </td>";
	        					tb++;
	        				}
	        						
	        				htmlGrid += "<td> </td>" +
	        			"</tr>" +
					"</tboby>" +
				"</table>";
//	       alert(htmlGrid);				
       $("#grid").html(htmlGrid);
};           
/* END: Create Table Html fro dataGridCompareByMajor */


/* START: Call Ajax generate data for  dataGridCompareByMajor*/
var dataGrideCompareByMajorFn = function(){
	$.ajax({
		url: "../Model/gridComparingAtmNewStudentByFaculty.jsp",
		type: "get",
		dataType: "json",
		data: {"paramYear":$("#paramYear").val()},
		success:function(data){
			var dataColumn = "";
			dataColumn +="[";
			$.each(data,function(index,indexEntry){				
				if(index == 0){
					dataColumn+="{"+
									"Field1:\""+indexEntry[1]+"\","+
									"Field2:\""+addCommas(parseInt(indexEntry[2]))+"\","+
									"Field3:\""+addCommas(parseInt(indexEntry[3]))+"\","+
									"Field4:\""+addCommas(parseInt(indexEntry[4]))+"\","+
									"Field5:\""+addCommas(parseInt(indexEntry[5]))+"\","+
									"Field6:\""+addCommas(parseInt(indexEntry[6]))+"\","+
									"Field7:\""+addCommas(parseInt(indexEntry[7]))+"\","+
									"Field8:\""+addCommas(parseInt(indexEntry[8]))+"\","+
									"Field9:\""+addCommas(parseInt(indexEntry[9]))+"\","+
									"Field10:\""+addCommas(parseInt(indexEntry[10]))+"\","+
									"Field11:\""+addCommas(parseInt(indexEntry[11]))+"\","+
									"FieldTotle:\""+addCommas(parseInt(indexEntry[12]))+"\","+
								"}";
				}else{
					dataColumn+=",{"+
									"Field1:\""+indexEntry[1]+"\","+
									"Field2:\""+addCommas(parseInt(indexEntry[2]))+"\","+
									"Field3:\""+addCommas(parseInt(indexEntry[3]))+"\","+
									"Field4:\""+addCommas(parseInt(indexEntry[4]))+"\","+
									"Field5:\""+addCommas(parseInt(indexEntry[5]))+"\","+
									"Field6:\""+addCommas(parseInt(indexEntry[6]))+"\","+
									"Field7:\""+addCommas(parseInt(indexEntry[7]))+"\","+
									"Field8:\""+addCommas(parseInt(indexEntry[8]))+"\","+
									"Field9:\""+addCommas(parseInt(indexEntry[9]))+"\","+
									"Field10:\""+addCommas(parseInt(indexEntry[10]))+"\","+
									"Field11:\""+addCommas(parseInt(indexEntry[11]))+"\","+
									"FieldTotle:\""+addCommas(parseInt(indexEntry[12]))+"\","+
								"}";
				}
				
			});
			dataColumn+="]";
//			alert(dataColumn);
			var objDataColumn = eval("("+dataColumn+")");
//			console.log(objDataColumn);
			createHtmlGridFn();
			setDataGrid("#dataGridDetail",objDataColumn);
		}
	});
};
/* END: Call Ajax generate data for dataGridCompareByMajor*/

/* START: Create function setdatagrid for set Kendo grid.  */
var setDataGrid = function(gridName,objDataColumn){
	/* Generate Multi Field. */
	var PrvYear = $("#paramPrev").val();
	var fieldRow = 0; 
	var field = 2;
	var title="";
	
	title+="[{field: \"Field1\",width: 220},";
	while (fieldRow < PrvYear){
		title+= "{field: \"Field"+(field++)+"\",width: 50},";
		fieldRow++;
	}
	title+="{field: \"FieldTotle\",width: 50}]";
	var objTitle = eval("("+title+")");	
	
	/* Set Kendo grid. */
	$(gridName).kendoGrid({
		columns: objTitle,
		dataSource: objDataColumn,
		height: 420,
		scrollable:false
	});
	
	/* Set font, style, Number pending of data grid (thead). */
	$(gridName+" thead tr").each(function(){
		$("tr:first th:last").css({"background-color":"#527ACC", "color":"white"});
	});
	
	/* Set font, style, Number pending of data grid (tbody). */
	$(gridName+" tbody tr").each(function(){
		var eq=1;
		var tdNo=0;
		while (tdNo < PrvYear){
			$("td",this).eq(eq++).css({"text-align":"right"}); 
			tdNo++;
		}
		
		/* Set field total and record totle. */	
		$("td",this).eq(tdNo+1).css({"border":"1px solid white", "text-align":"right", "background-color":"#527ACC", "color":"white"});	
		$("tr:last").css({"background-color":"#6699FF", "color":"white"});
		$("tr:last td:first").css({"text-align":"center"});		
		$("tr:last td:last").css({"border-top":"0px","border-bottom":"0px","background-color":"#6699FF"});	
	});
};
/* END: Create function setdatagrid for set Kendo grid.  */
/* ########################### Start generate gridCompareAtmNewStudentByFaculty chart. ############################## */
