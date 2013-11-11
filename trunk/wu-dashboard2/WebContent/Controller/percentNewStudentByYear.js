/* parameter control */
var PrvYear = $("#embParamPrev").val();
var paramYear = $("#embParamYear").val();

/*Control object in page */
$(".bottomTitleChart").hide();
$("#bottomContent").hide();
$(".asOfYear").text(paramYear);
$(".legend-2").hide();

/*Create Tooltip by JQuery By assign the title on Object*/
$(function() {
    $( document ).tooltip();
});

/*#################### STRAT: Create code for generate percentCompareByFacultyChart(Gauge-top). #################### */
/*START: Create Chart percentCompareByFacultyChart by Kendo */

function percentCompareByFacultyChart(fucultyId, fucultyName, values, amtStudent, amtPlan) {
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
		
		$("input#t3Param").val(fucultyId+"-"+fucultyName);
    	$("input#t3Param").addClass("active");
	});
	
}
/*END: Create Chart percentCompareByFacultyChart by Kendo */

/*START: Call ajax get json data for create percentCompareByFacultyChart (gauge-top). */
var percentCompareByFacultyFn = function(){
	$.ajax({
		url: "../Model/percentNewStudentByFucultyComparedByPlan.jsp",
		type: "get",
		dataType: "json",
		data:{"paramYear":paramYear},
		success:function(data){
		if(data != ""){
			$("#contentGauges").empty();
			$("#contentGaugeTitle").empty();
			$.each(data,function(index,indexEntry){
				percentCompareByFacultyChart(indexEntry[0], indexEntry[1], indexEntry[4],indexEntry[2],indexEntry[3]);
			});
		}else{
			$("#gauge"+indexEntry[0]).html("<font id=\"NDF01\" color=\"red\" size=\"4\"><center> NO DATA FOUND! <center></font>");
		}			
		}
	});
};
/*END: Call ajax get json data for create percentCompareByFacultyChart (gauge-top). */
/*#################### END: Create code for generate percentCompareByFacultyChart(Gauge-top). #################### */



/*#################### START: Create code for generate bottom Gauges. #################### */
/*START: Create bottom Chart (percentCompareByMajorChart) */
	function percentCompareByMajorChart(MajorId, MajorName,amtStudent, amtplan, values) {
		//alert();
		var htmlData = "<div class=\"contentPanel\">";
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
	
/*START: Call ajax get json data for create bottom gauge. */
var percentCompareByMajorFn = function(fucultyId){
	$.ajax({
		url: "../Model/percentNewStudentByMajorComparedByPlan.jsp",
		type: "get",
		dataType: "json",
		data:{"paramYear":paramYear, "majorId":fucultyId},
		success:function(data){
		if(data != ""){
			$("#bottomContent #contentGauges").empty();
			$.each(data,function(index,indexEntry){
				percentCompareByMajorChart(indexEntry[0], indexEntry[1], indexEntry[2], indexEntry[3], indexEntry[4]);
					
			});
		}else{
			$("#gauge"+indexEntry[0]).html("<font id=\"NDF01\" color=\"red\" size=\"4\"><center> NO DATA FOUND! <center></font>");
		}
			
		}
	});
};
/*END: Call ajax get json data for create bottom gauge. */
/*#################### END: Create code for generate bottom Gauges. #################### */
