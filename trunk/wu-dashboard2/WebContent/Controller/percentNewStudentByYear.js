/*Control object in page */
$(".bottomTitleChart").hide();
$("#bottomContent").hide();
$(".asOfYear").text($("#embParamYear").val());
$(".legend-2").hide();

/*Create Tooltip by JQuery By assign the title on Object*/
$(function() {
    $( document ).tooltip();
});

/*#################### STRAT: Create code for generate Gauge. #################### */
/*START: Create Chart */
function percentCompareByFacultyChart(fucultyId, fucultyName, values, amtStudent, amtPlan) {
//	alert();
	var htmlData = "<div class=\"contentPanel\">";
		htmlData += "<div id=\"gauge"+fucultyId+"\" class=\"gaugePanel\" " +
				"title=\"นศ.ใหม่:"+amtStudent+", จำนวนรับตามแผน:"+amtPlan+", "+values+"%\" " +
				"style=\"width:180px; height:155px; margin:auto; padding-left:10%;\"></div>";
		htmlData += "<div class=\"contentPanelTitle\">"+fucultyName;
//		htmlData +=	"<br/> นศ.ใหม่ "+amtStudent+",จำนวนรับตามแผน"+amtPlan+","+values+"%</div>";
		htmlData += "</div>";
			
	$("#contentGauges").append(htmlData);
		
	$("#gauge"+fucultyId).kendoRadialGauge({
		pointer: {
			value: values
			},
			scale: {
				minorUnit: 5,
				startAngle: -30,
				endAngle: 210,
				max: 100,
				labels: {template: "#= value #%"},
				ranges: [{
							from: 0,
							to: 33,
							color: "red"
						},{
							from: 33,
							to: 66,
							color: "yellow"
						}, {
							from: 66,
							to: 100,
							color: "green"
						}]
			}
	});
	
	/*Click function*/
	$("#gauge"+fucultyId).click(function(event){
		$("#bottomContent").show();
		$(".bottomTitleChart").show();
		$(".legend-2").show();
		$(".asOfMajor").text(fucultyName);

		percentCompareByMajorFn(fucultyId);	
	});
	
}
/*END: Create Chart */
/*#################### END: Create code for generate top Gauges. #################### */



/*#################### START: Create code for generate bottom Gauges. #################### */
/*START: Create bottom Chart (percentCompareByMajorChart) */
	function percentCompareByMajorChart(MajorId, MajorName,amtStudent, amtplan, values) {
		//alert();
		var htmlData = "<div class=\"contentPanel\" title=\"Test\">";
			htmlData += "<div id=\"gauge"+MajorId+"\" class=\"gaugePanel\" " +
					"title=\"นศ.ใหม่:"+amtStudent+", จำนวนรับตามแผน:"+amtplan+", "+values+"%\" " +
					"style=\"width:180px; height:155px; margin:auto; padding-left:10%;\"></div>";
			htmlData += "<div class=\"contentPanelTitle\">"+MajorName+"</div>";
			htmlData += "</div>";
			$("#bottomContent #contentGauges").append(htmlData);
		
                    $("#gauge"+MajorId).kendoRadialGauge({
                        pointer: {
                            value: values
                        },
                        scale: {
                            minorUnit: 5,
                            startAngle: -30,
                            endAngle: 210,
                            max: 100,
                            labels: {template: "#= value #%"},
                            ranges: [
                                 {
                                     from: 0,
                                     to: 33,
                                     color: "red"
                                 }, {
                                     from: 33,
                                     to: 66,
                                     color: "yellow"
                                 }, {
                                     from: 66,
                                     to: 100,
                                     color: "green"
                                 }
                             ]   
                        }
                    });
    }
/*END: Create bottom Chart (percentCompareByMajorChart) */
/*#################### END: Create code for generate bottom Gauges. #################### */
	
	
/*START: Call ajax get json data for create top gauge. */
var percentCompareByFacultyFn = function(){
	$.ajax({
		url: "../Model/percentNewStudentByFucultyComparedByPlan.jsp",
		type: "get",
		dataType: "json",
		data:{"paramYear":$("#embParamYear").val()},
		success:function(data){
//			alert(data);				
			$("#contentGauges").empty();
			$("#contentGaugeTitle").empty();
			$.each(data,function(index,indexEntry){
//				alert(indexEntry[4]);
				percentCompareByFacultyChart(indexEntry[0], indexEntry[1], indexEntry[4],indexEntry[2],indexEntry[3]);
			});
		}
	});
};
/*END: Call ajax get json data for create top gauge. */


/*START: Call ajax get json data for create bottom gauge. */
var percentCompareByMajorFn = function(fucultyId){
	$.ajax({
		url: "../Model/percentNewStudentByMajorComparedByPlan.jsp",
		type: "get",
		dataType: "json",
		data:{"paramYear":$("#embParamYear").val(), "majorId":fucultyId},
		success:function(data){
			$("#bottomContent #contentGauges").empty();
			$.each(data,function(index,indexEntry){
				percentCompareByMajorChart(indexEntry[0], indexEntry[1], indexEntry[2], indexEntry[3], indexEntry[4]);
				
			});
		}
	});
};
/*END: Call ajax get json data for create bottom gauge. */
