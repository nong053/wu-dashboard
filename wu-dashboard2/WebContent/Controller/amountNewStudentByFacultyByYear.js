/* parameter control */
var PrvYear = $("#embParamPrev").val();
var paramYear = $("#embParamYear").val();

/* ######################### Start generate code for newStudentComparebyMajoyByYear chart. ############################ */
//Start: Generate newStudentComparebyMajoyByYear(Chart-01) By Kendo 	
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
        	position: "bottom",
        	visible: true
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
        		template: "ปี #=category#, #= series.name # #= value # คน"
        	},
//        	legendItemClick: onLegendItemClick,
//        	axisLabelClick: onLegendItemClick
        	legendItemClick: onLegendItemClick
        	
        	
        	
	});
//	var chart = $("#newStudentComparebyMajoyByYear").data("kendoChart");
//	chart.bind("axisLabelClick", onLegendItemClick);
}

//click legende
function onLegendItemClick(e) {
	$("table#dataGridDetail tbody tr").css({"background":"white"});
	if($("#idFaculty-"+e.series.id+"").hasClass("hide")){
		$("#idFaculty-"+e.series.id+"").removeClass("hide");
		$("#idFaculty-"+e.series.id+"").addClass("show");
		$("#idFaculty-"+e.series.id+"").parent().parent().show("1000");
		
	}else{
		$("#idFaculty-"+e.series.id+"").removeClass("show");
		$("#idFaculty-"+e.series.id+"").addClass("hide");
		$("#idFaculty-"+e.series.id+"").parent().parent().hide("1000");	
	}

	setTimeout(function(){
		$("table#dataGridDetail tbody tr:visible:even").css({"background":"#F5F5F5"});
		
		$("tr:last").css({"background-color":"#6699FF", "color":"white"});
		$("tr:last td:first").css({"text-align":"center"});		
		$("tr:last td:last").css({"border-top":"0px","border-bottom":"0px","background-color":"#6699FF"});
		
		$("table#dataGridDetail tbody tr:last td").text("");
		$("table#dataGridDetail tbody tr:last td:eq(0)").text("รวมทั้งหมด");	
		for(var i=1;i<=(PrvYear)+1;i++){
			var sumValue=0;	
			$("table#dataGridDetail tbody tr:visible").each(function(){	
					//alert($("td:eq("+i+")",this).text());
					if($("td:eq("+i+")",this).text()!=""){
					sumValue+=parseInt($("td:eq("+i+")",this).text().replace(',',''));
					//alert(sumValue);
					}
			});	
			$("table#dataGridDetail tbody tr:last td:eq("+i+")").text(""+addCommas(sumValue)+"");
		}
	},500);	
}
             
/* START: Call Ajax for create chart newStudentComparebyMajoyByYear */
var chartComparingAtmNewStudentByFacultyFn = function(){
	$.ajax({
		url: "../Model/chartComparingAtmNewStudentByFaculty.jsp",
		type: "get",
		dataType: "json",
		data: {"paramYear":paramYear},
		success:function(data){
			
			var seriesData = "";
			var categoryData = "";
			var color = ["#006666","3CCFFCC","#99FF33","#33FFCC","#FFCC33",
			             "#FF9900","#FF9999","#CC9900","#339999","#993399",
			             "#990033","#330066","#D8F781","#7401DF","#04B486"];
			seriesData += "[";
			categoryData += "[";
        			
        	$.each(data,function(index,indexEntry){
        		/* Create category by period dating back. */
        		/* In Case PrvYear = 3 */
        		if(PrvYear == 3){
        			if(index == 0){
            			seriesData += "{"+
            							"name:\""+indexEntry[1]+"\","+
            							"id:\""+indexEntry[0]+"\","+
            							"data:["+indexEntry[2]+","+indexEntry[3]+","+indexEntry[4]+"],"+
            							"color:\""+color[index]+"\"" +
            							"}";
            		}else{
            			seriesData += ",{"+
    									"name:\""+indexEntry[1]+"\","+
    									"id:\""+indexEntry[0]+"\","+
    									"data:["+indexEntry[2]+","+indexEntry[3]+","+indexEntry[4]+"],"+
    									"color:\""+color[index]+"\"" +
    									"}";        			
            		} 
        		/* In Case PrvYear = 5 */
        		}else if(PrvYear == 5){
        			if(index == 0){
            			seriesData += "{"+
            							"name:\""+indexEntry[1]+"\","+
            							"id:\""+indexEntry[0]+"\","+
            							"data:["+indexEntry[2]+","+indexEntry[3]+","+indexEntry[4]+","
            									+indexEntry[5]+","+indexEntry[6]+"],"+
            							"color:\""+color[index]+"\"" +
            							"}";
            		}else{
            			seriesData += ",{"+
    									"name:\""+indexEntry[1]+"\","+
    									"id:\""+indexEntry[0]+"\","+
    									"data:["+indexEntry[2]+","+indexEntry[3]+","+indexEntry[4]+","
    											+indexEntry[5]+","+indexEntry[6]+"],"+
    									"color:\""+color[index]+"\"" +
    									"}";        			
            		} 
        		/* In Case PrvYear = 10 */
        		}else if(PrvYear == 10){
        			if(index == 0){
            			seriesData += "{"+
            							"name:\""+indexEntry[1]+"\","+
            							"id:\""+indexEntry[0]+"\","+
            							"data:["+indexEntry[2]+","+indexEntry[3]+","+indexEntry[4]+","
            									+indexEntry[5]+","+indexEntry[6]+","+indexEntry[7]+","
            									+indexEntry[8]+","+indexEntry[9]+","+indexEntry[10]+","
		    									+indexEntry[11]+"],"+
		    							"color:\""+color[index]+"\"" +
            							"}";
            		}else{
            			seriesData += ",{"+
    									"name:\""+indexEntry[1]+"\","+
    									"id:\""+indexEntry[0]+"\","+
    									"data:["+indexEntry[2]+","+indexEntry[3]+","+indexEntry[4]+","
		    									+indexEntry[5]+","+indexEntry[6]+","+indexEntry[7]+","
		    									+indexEntry[8]+","+indexEntry[9]+","+indexEntry[10]+","
		    									+indexEntry[11]+"],"+
		    							"color:\""+color[index]+"\"" +
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
        	console.log(objSeriesData);   
//        	newStudentComparebyMajoyByYear(objSeriesData,objCategoryData);
        	$(document).ready(newStudentComparebyMajoyByYear(objSeriesData,objCategoryData));
            $(document).bind("kendo:skinChange", newStudentComparebyMajoyByYear(objSeriesData,objCategoryData));
        }
	});
};

/* END: Call Ajax for create chart newStudentComparebyMajoyByYear */
/* ######################### End generate code for newStudentComparebyMajoyByYear chart. ############################ */



/* ########################### Start generate gridCompareAtmNewStudentByFaculty chart. ############################## */
/* START: Create Table Html fro dataGridCompareByMajor */
var createHtmlGridFn = function(){
	var yearField = paramYear; 
	var PrvField = PrvYear; 
	var f = 2; 
	var th = 0; 
	var tb = 0;
	var htmlGrid = ""+
				"<table id=\"dataGridDetail\" style=\"width:980px; margin:10px auto auto; border:1px solid #CCCCCC\">" +
					"<thead>" +
        				"<tr>";
							
	        				while (th < PrvField) {
	        					htmlGrid += "<th data-field=\"Field"+(f++)+"\"> <center> <b>"+(yearField--)+"</b></center> </th>";
	        					th++;
	        				}
	        				
	        			htmlGrid +=	"" +
	        			"<tr>" +
							"<th class=\"k-header\" data-field=\"Field1\" rowspan=\"2\"> <center> <b> สำนักวิชา </b></center> </th>" +
							"<th class=\"k-header\" data-field=\"FieldTitle\" colspan="+PrvField+"> <center> <b>จำนวนนักศึกษาตามปีการศึกษาที่เข้าศึกษา (คน) </b></center> </th>"+
							"<th class=\"k-header\" data-field=\"FieldTotle\" rowspan=\"2\"> <center> <b>รวมทั้งหมด  <br>(คน) </b></center> </th>"+
						"</tr>" +
        				"</tr>" +								
					"</thead>" +
					"<tboby>" +
						"<tr>" +
							"<td> </td>";
	        				while (tb < PrvField) {
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
		data: {"paramYear":paramYear},
		success:function(data){
//			alert(data);
			var dataColumn = "";
			dataColumn +="[";
			$.each(data,function(index,indexEntry){
				if(index == 0){
					dataColumn+="{"+
									"FieldId:\""+indexEntry[0]+"\","+
									"Field1:\"<div id='idFaculty-"+indexEntry[0]+"'>"+indexEntry[1]+"</div>\","+
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
//									"FieldTotle:\""+addCommas(parseInt(indexEntry[12]))+"\","+
								"}";
				}else{
					dataColumn+=",{"+
									"FieldId:\""+indexEntry[0]+"\","+
									"Field1:\"<div id='idFaculty-"+indexEntry[0]+"'>"+indexEntry[1]+"</div>\","+
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
//									"FieldTotle:\""+addCommas(parseInt(indexEntry[12]))+"\","+
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
	var PrvYear = $("#embParamPrev").val();
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
		scrollable:false
	});
	
	/* Set style of data grid (thead). */
	$(gridName+" thead tr").each(function(){
		$("tr:nth-child(2) th:nth-child(1)").css({"border-color":"#C5C5C5", "border-width":"0 0 1px 1px"});
	});
	
	/* Set font, style, Number pending of data grid (tbody). */
	$(gridName+" tbody tr").each(function(){
		var eq=1;
		var tdNo=0;
		while (tdNo < PrvYear){
			$("td",this).eq(eq++).css({"text-align":"right"}); 
			tdNo++;
		}
		
		/* Set style field total and record totle. */	
		$("td",this).eq(tdNo+1).css({"border-color":"#C5C5C5", "border-width":"0 0 1px 1px", "text-align":"right", "background-color":"#527ACC", "color":"white"});	
		$("tr:last").css({"background-color":"#6699FF", "color":"white"});
		$("tr:last td:first").css({"text-align":"center"});		
		$("tr:last td:last").css({"border-top":"0px","border-bottom":"0px","background-color":"#6699FF"});	
	});
	
	/* Set totle value for data grid */
	var countRecord = ($(gridName+" tbody tr").length)-1;
	$(gridName+" tbody").each(function(){
		var sumTotleRecord = 0;
		var ntr = 0;
		while(ntr < countRecord){
			var totleRecord = 0;
			$("tr",this).eq(ntr).each(function(){
				var ntd = 1;
				while(ntd <= PrvYear){
					totleRecord += (parseInt($("td",this).eq(ntd).text()));
					ntd++;
				}
			});
			$(gridName+" tbody tr:nth-child("+(ntr+1)+") td:last").text(addCommas(parseInt(totleRecord)));
			sumTotleRecord += totleRecord;
			ntr++;
		}
		$(gridName+" tbody tr:last td:last").text(addCommas(parseInt(sumTotleRecord)));
	});
};
/* END: Create function setdatagrid for set Kendo grid.  */
/* ########################### Start generate gridCompareAtmNewStudentByFaculty chart. ############################## */
