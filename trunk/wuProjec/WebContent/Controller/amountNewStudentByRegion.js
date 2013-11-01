/* ########################## Start generate code for amountNewStudentByRegion Map. ########################## */
/* START: Generate Thailand map by jVectorMap */
var createThailandMap = function(objColorData){
	$("#thaiMap").vectorMap({
		map: "th_mill_en",
		backgroundColor: "transparent",
	    series: {
	        regions: [{
	            values:objColorData,
	            attribute: "fill"
	        }]
	    },
	    regionsSelectable: false,
		regionStyle: {
			initial: {fill: "#808080"},
			selected: {fill: "#F4A582"}
		},
//		onLabelShow: function(event, label, code){
//				event.preventDefault();  
//		},
		onRegionClick:function (event, code){
			/* Get province name from jvector append to tag hidden in body, For the grid title header. */
			var map = $("#thaiMap").vectorMap("get", "mapObject");
			$("#provinceNameHi").remove();
			$("body").append("<input type=\"hidden\" id=\"provinceNameHi\" value=\""+map.getRegionName(code)+"\">");
			
			var provinceid = code.substring(3);
			dataGridProvinceFn($("#embParamYear").val(), provinceid);
	    }
	});
};
/* END: Generate Thailand map by jVectorMap */

/* START: Call ajax change color Thailand map. */
var changeMapColor = function(paramYear){
	$.ajax({
		url: "../Model/mapAmtStudentGroupByProvince.jsp",
		type: "get",
		dataType: "json", 
		data:{"paramYear":"\""+paramYear+"\""},
		success:function(data){
			if(data != ""){
				var numAllStudent = "";
				var colorData = "";
					colorData += "{";
					$.each(data,function(index,indexEntry){
						if(index == 0){
							if(parseFloat(indexEntry[3]).toFixed(2) > 10.00){ 
								colorData += "\"TH-"+indexEntry[0]+"\": \"#8A0808\"";
								
							}else if(parseFloat(indexEntry[3]).toFixed(2) > 5.00 && parseFloat(indexEntry[3]).toFixed(2) <= 10.00){
								colorData += "\"TH-"+indexEntry[0]+"\": \"#FF0000\"";
								
							}else if(parseFloat(indexEntry[3]).toFixed(2) > 1.00 && parseFloat(indexEntry[3]).toFixed(2) <= 5.00){
								colorData += "\"TH-"+indexEntry[0]+"\": \"#FF4000\"";
								
							}else if(parseFloat(indexEntry[3]).toFixed(2) <= 1.00){
								colorData += "\"TH-"+indexEntry[0]+"\": \"#F79F81\"";					
							}
						}else{
							if(parseFloat(indexEntry[3]).toFixed(2) > 10.00){ 
								colorData += ",\"TH-"+indexEntry[0]+"\": \"#8A0808\"";
								
							}else if(parseFloat(indexEntry[3]).toFixed(2) > 5.00 && parseFloat(indexEntry[3]).toFixed(2) <= 10.00){
								colorData += ",\"TH-"+indexEntry[0]+"\": \"#FF0000\"";
								
							}else if(parseFloat(indexEntry[3]).toFixed(2) > 1.00 && parseFloat(indexEntry[3]).toFixed(2) <= 5.00){
								colorData += ",\"TH-"+indexEntry[0]+"\": \"#FF4000\"";
								
							}else if(parseFloat(indexEntry[3]).toFixed(2) <= 1.00){
								colorData += ",\"TH-"+indexEntry[0]+"\": \"#F79F81\"";
							}
						}
						numAllStudent = indexEntry[4];
					});
					colorData += "}";
					
//					alert(colorData);
					var objColorData = eval("("+colorData+")");
					var objnumAllStudent = eval("("+numAllStudent+")");
					
					/*get count totle by year append to tag body, For calculator totalTitle in data grid */ 
					$("#countNewStudent").remove();
					$("body").append("<input type=\"hidden\" id=\"countNewStudent\" class=\"countNewStudent\" value=\""+objnumAllStudent+"\">");
					
					/* set title page */
					$("label#amtNewStuTitle").text($("#countNewStudent").val());
					
					/*Generate Map*/
					createThailandMap(objColorData);
			}else{
				alert("Data Not Found");
			}
		}
	});
};
/* END: Call ajax change color Thailand map. */ 
/* ########################## Start generate code for amountNewStudentByRegion Map. ########################## */



/* ########################## Start generate code for amountNewStudentByRegion grid. ########################## */
var $title =[
             {
                 field: "Field1",
				 width: 45,
             },
             {
                 field: "Field2",
				 width: 170
			 },
             {
                 field: "Field3",
				 width: 50
			 },
             {
                 field: "Field4",
				 //type: "number" 
				 width: 50
			 },
			 {
                 field: "Field5",
				 //type: "number" 
				 width: 50
			 },
			 {
                 field: "Field6",
				 //type: "number" 
				 width: 50
			 }
			 ];


/* START: Create Table Html for gridAmountByRegion */
var createHtmlGridFn = function(provinceName){
	gridRatio = ""+
				"<table id=\"dataGridDetail\" width=\"100%\" border=\"1\">" +
	       			"<thead>" +
	       				"<tr>" +
	       					"<th colspan=\"2\"> <label id=\"provinceNameTitle\"> ทุกจังหวัด  </label> </th>" +
	       					"<th colspan=\"4\" style=\"text-align:right;\"> <label id=\"totlaTitle\"> 100% </lable> </th>" +
	       				"</tr>" +
	       				"<tr>" +
	       					"<th data-field=\"Field1\" rowspan=\"2\"> <center><b> ลำดับ </b></center> </th>" +
	       					"<th data-field=\"Field2\" rowspan=\"2\"> <center><b> โรงเรียน </b></center> </th>" +
	       					"<th data-field=\"Field0\" colspan=\"4\"> <center><b> ตามประเภทการรับเข้า(คน) </b></center> </th>"+
	       				"</tr>"+
	       				"<tr>"+
							"<th data-field=\"Field3\"> <center><b> โควตา </b></center> </th>" +
							"<th data-field=\"Field4\"> <center><b> รับตรง </b></center> </th>" +
							"<th data-field=\"Field5\"> <center><b> Admis </b></center> </th>" +
							"<th data-field=\"Field6\"> <center><b> รวม </b></center> </th>" +
						"</tr>" +
					"</thead>" +
					"<tbody>" +
						"<tr>" +
							"<td></td>" +
							"<td></td>" +
							"<td></td>" +
							"<td></td>" +
							"<td></td>" +
							"<td></td>" +
						"</tr>" +
					"</tbody>" +					
				"</table>";
	$("#gridAmountByRegion").html(gridRatio);
};
/* END: Create gridAmountByRegion */

/* START: Call Ajax generate data for GridAmountByReguon */
var dataGridProvinceFn = function(paramYear, provineId){
	$.ajax({
		url: "../Model/gridAmtStudentGroupByProvince.jsp",
		type: "get",
		dataType: "json",
		data:{"paramYear":paramYear,"provinceId":provineId},
		success:function(data){
		if(data != ""){
//			console.log(data);
			var dataGrid1="";
			var RecordTotal = [];
			var sumF3=0; sumF4=0; sumF5=0; sumF6=0;
			dataGrid1+="[";
			$.each(data,function(index,indexEntry){		
				if(index==0){
					dataGrid1+="{";	
				}else{
					dataGrid1+=",{";
				}
					dataGrid1+="Field1:"+(index+1)+",";
					dataGrid1+="Field2:\""+indexEntry[0].replace(/\"/g,"\\"+"\"")+"\",";
					dataGrid1+="Field3:"+indexEntry[1]+",";
					dataGrid1+="Field4:"+indexEntry[2]+",";
					dataGrid1+="Field5:"+indexEntry[3]+",";
					dataGrid1+="Field6:"+indexEntry[4];

				dataGrid1+="}";
				/* sum value record Total */
				RecordTotal[1] = parseInt((index+1)+1);
				RecordTotal[3] = (sumF3+=parseInt(indexEntry[1]));
				RecordTotal[4] = (sumF4+=parseInt(indexEntry[2]));
				RecordTotal[5] = (sumF5+=parseInt(indexEntry[3]));
				RecordTotal[6] = (sumF6+=parseInt(indexEntry[4]));
			});
				dataGrid1+=",{" +
							"Field1:"+RecordTotal[1]+","+
							"Field2:\"รวม\"," +
							"Field3:"+RecordTotal[3]+","+
							"Field4:"+RecordTotal[4]+","+
							"Field5:"+RecordTotal[5]+","+
							"Field6:"+RecordTotal[6] +
							"}";
			dataGrid1+="]";		
//			alert(RecordTotal[1]);
			var objdataGrid1= eval("("+dataGrid1+")");
			//console.log(objdataGrid1);
			createHtmlGridFn();
			setDataGrid("#dataGridDetail",objdataGrid1,RecordTotal);	
		}else{
			alert("Data not found");
		}
	}
	});
};
/* END: Call Ajax generate data for GridAmountByReguon */

/* START: Set Kendo Grid*/
var setDataGrid = function(gridName,objDataGrid1,RecordTotal){	
	$(gridName).kendoGrid({
		  columns: $title,
		  dataSource: objDataGrid1,
		  height: 550,
	      scrollable:true
		});
	
	/* set Header Table */
	var per = ((parseInt(RecordTotal[6]) / parseInt($(".countNewStudent").val()))*100);
	$("#totlaTitle").text($("#countNewStudent").val()+" คน  คิดเป็น "+per.toFixed(2)+"%");
	$("#provinceNameTitle").text($("#provinceNameHi").val());
	$("#provinceNameTitle").css({"font-weight":"bold","font-size":"14px"});
	
	/* set Font for Number pending */
	$(gridName+" tbody tr").each(function(){
		$("td",this).eq(0).css({"text-align":"right"}); 
		$("td",this).eq(2).css({"text-align":"right"}); 
		$("td",this).eq(3).css({"text-align":"right"}); 
		$("td",this).eq(4).css({"text-align":"right"}); 
		$("td",this).eq(5).css({"text-align":"right","font-weight":"bold"}); 
	});
	
	/* set Font for Number pending record totle*/
	$(gridName+" tbody tr:last").each(function(){
		$(this).css({"font-weight":"bold"});
		$("td",this).eq(1).css({"text-align":"center"});
	});
};
/* END: Set Kendo Grid*/
/* ########################## Start generate code for amountNewStudentByRegion grid. ########################## */