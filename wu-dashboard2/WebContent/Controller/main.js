	/* Create function add commas() to use value in grid table */
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
	
$(document).ready(function(){
	
	var addClassAsOfTabs = function(childNo){
		$("div#tabs ul").each(function(){
			$("li",this).removeClass("TabsActive");
			$("li",this).eq(childNo).addClass("TabsActive");
		});
	};addClassAsOfTabs(0);
	
	/* Generate jquery Button style. */
	$("#btnSubmit").button();
		
	/* Contorl Tabs by jQuery */
	$( "#tabs" ).tabs();

	
/* ############################# START: Event Click Tabs-1  ############################# */
	$("[href='#tabs-1']").click(function(){
		addClassAsOfTabs(0);
		$.ajax({
			url:"amountNewStudentByYear.html",
			type:"get",
			dataType:"html",
			success:function(data){  //alert(data) for test HTML Data;
				$(".style").remove();
				$("#tabs-1").html(data);
				
				/* START: Create newStudentByYearChart*/
				$.ajax({
            		url:"../Model/amount_newstudent_year.jsp",
            		type:"get",
            		dataType:"json",
            		data:{"paramYear":$("#embParamYear").val(),"paramPrev":$("#embParamPrev").val()},
            		success:function(data){
            		if(data != ""){
            			/*START: Crate newStudentByYearChart */
              			var seriesColumnData="";
            			var seriesLineData="";
            			var cateData="";
            			seriesColumnData+="[";
            			seriesLineData+="[";
            			cateData+="[";
            				
            			$.each(data,function(index,indexEntry){
            				//alert(indexEntry[0]);
            					
            				if(index==0){
            					seriesColumnData+=""+indexEntry[1]+"";
            					seriesLineData+=""+indexEntry[2]+"";
            					cateData+=""+indexEntry[0]+"";
            				}else{
            					seriesColumnData+=","+indexEntry[1];
            					seriesLineData+=","+indexEntry[2]+"";
            					cateData+=","+indexEntry[0]+"";
            				}
            			});
            			seriesColumnData+="]";
            			seriesLineData+="]";
            			cateData+="]";
            				           				
            			/*Convert text to object json by eval().*/
            			var objSeriesColumnData = eval("("+seriesColumnData+")");
            			var objSeriesLineData = eval("("+seriesLineData+")");
            			var objCateData = eval("("+cateData+")");

            			newStudentByYearChart(objCateData,objSeriesColumnData,objSeriesLineData);
            			
            		}else{
            			$("#newStudentByYearChart").html("<font id=\"NDF01\" color=\"red\" size=\"4\"><center> NO DATA FOUND! <center></font>");
            		}
               			
            		}
            	});
					/* END: Create newStudentByYearChart*/	
				
				/* Display topTenHighSchool Chart */
				$("#panelL-Page1").show();
				$("label.asOfYear").text($("#embParamYear").val());
				topTenHighSchoolByYearFn($("#embParamYear").val(),$("#selectTop").val());
								
				/* Display newStudentByYearByFaculty Chart and newStudentByYearByFacultyByMajor Chart */
				if($("input#t1Chart03").hasClass("active")){false;}else{
					if($("input#t1Chart03").hasClass("cerated")){false;}else{
						$("body").append("<input type=\"hidden\" id=\"t1Chart03\" class=\"cerated\" value=\"noparam\">");}}		
				if($("input#t1Chart04").hasClass("active")){false;}else{
					if($("input#t1Chart04").hasClass("cerated")){false;}
					else{$("body").append("<input type=\"hidden\" id=\"t1Chart04\" class=\"cerated\" value=\"noparam\">");}}
				
				var t1Chart03 = $("input#t1Chart03").val();
				var t1Chart04 = $("input#t1Chart04").val();
				if(t1Chart03 != "noparam"){
		        	$("#centerContent").show();
		        	$(".titleCompareFaculty").show();
					newStudentByYearByFacultyFn($("#embParamYear").val());	
				}else{ false; }
				
				if(t1Chart04 != "noparam"){
					$("#buttomContent").show();
		        	$(".titleCompareMajor").show();
		        	$("label.asOfFaculty").text(t1Chart04.substring(0,t1Chart04.indexOf("/")));
		        	$("#newStudentByYearByFacultyByMajorChart").show();
		        	newStudentByYearByFacultyByMajorFn($("#embParamYear").val(),t1Chart04.substring(t1Chart04.indexOf("/")+1));
				}else{ false; }
				
			}		
		});
	});
/* ############################# END: Event Click Tabs-1 ############################# */
		
			
		
/* ############################# START: Event Click Tabs-2  ############################# */
	$("[href='#tabs-2']").click(function(){
		addClassAsOfTabs(1);
		$.ajax({
			url:"amountNewStudentByType.html",
			type:"get",
			dataType:"html",
			success:function(data){
				//alert(data);
				$(".style").remove();
				$("#tabs-2").html(data);
					
				amountNewStudentByTypeFn();	
				
				/* *** */
				if($("input#t2Param01").hasClass("active") && $("input#t2Param02").hasClass("active")){false;}else{
					if($("input#t2Param01").hasClass("cerated") && $("input#t2Param02").hasClass("cerated")){false;}else{
						$("body").append("<input type=\"hidden\" id=\"t2Param01\" class=\"cerated\" value=\"noparam\">");
						$("body").append("<input type=\"hidden\" id=\"t2Param02\" class=\"cerated\" value=\"noparam\">");
				}}
				
				var seriesName = $("input#t2Param01").val();
				var category = $("input#t2Param02").val();
				if(seriesName != "noparam" && category != "noparam"){
					$("div#buttomContent").show();
					$(".panel").show();
					$(".panelChartTitle").show();
					
					/* ChartTitle */
					$("label.asOfYear").text(paramYear);
					$("label.asOfType").text(seriesName);
					$("label.asOfMajor").text(category.substring(category.indexOf("-")+1));
					
					avgGpaByfacuByYearFn(seriesName, category.substring(0,2));
					amountNewStudentByMajorFn(seriesName, category.substring(0,2));
				}else{ false; }
			}
		});
	});
/* ############################# END: Event Click Tabs-2  ############################# */

		
		
/* ############################# START: Event Click Tabs-3  ############################# */
	$("[href='#tabs-3']").click(function(){
		addClassAsOfTabs(2);
		$.ajax({
			url:"percentNewStudentByYear.html",
			type:"get",
			dataType:"html",
			success:function(data){
				//alert(data);
				$(".style").remove();
				$("#tabs-3").html(data);
					
				percentCompareByFacultyFn();
				
				/* *** */
				if($("input#t3Param").hasClass("active")){false;}else{
					if($("input#t3Param").hasClass("cerated")){false;}
					else{$("body").append("<input type=\"hidden\" id=\"t3Param\" class=\"cerated\" value=\"t3Param\">");}}
				
				var fuculty = $("input#t3Param").val();
				if(fuculty != "t3Param"){
					$("#bottomContent").show();
					$(".bottomTitleChart").show();
					$(".legend-2").show();
					$(".asOfMajor").text(fuculty.substring(fuculty.indexOf("-")+1));

					percentCompareByMajorFn(fuculty.substring(0,fuculty.indexOf("-")));
				}else{ false; }
				
			}
		});
	});
/* ############################# END: Event Click Tabs-3  ############################# */
		
		
		
/* ############################# START: Event Click Tabs-4  ############################# */
	$("[href='#tabs-4']").click(function(){
		addClassAsOfTabs(3);
		$.ajax({
			url:"amountNewStudentByRegion.html",
			type:"get",
			dataType:"html",
			success:function(data){
				//alert(data);
				$(".style").remove();
				$("#tabs-4").html(data);
				
				/* *** */
				if($("input#t4Param").hasClass("active")){false;}else{
					if($("input#t4Param").hasClass("cerated")){false;}
					else{$("body").append("<input type=\"hidden\" id=\"t4Param\" class=\"cerated\" value=\"t4Param\">");}}
				
				var province = $("input#t4Param").val();
				if(province == "t4Param"){
					changeMapColor(parseInt($("#embParamYear").val()));
					dataGridProvinceFn(parseInt($("#embParamYear").val()),0);
					
					$("#provinceNameHi").remove();
					$("#provinceNameTitle").html("<b>ทุกจังหวัด</b>");
					
					$(".k-grid-header-wrap table thead tr").each(function(){
						$("tr:nth-child(2) th:nth-child(2)").text("จังหวัด");
						$("tr:nth-child(2) th:nth-child(2)").css({"text-align":"center", "font-weight":"bold"});
					});
				}else{ 
					changeMapColor(parseInt($("#embParamYear").val()));
					dataGridProvinceFn(parseInt($("#embParamYear").val()),province);
				}

			}
		});
	});
/* ############################# END: Event Click Tabs-4  ############################# */
		
		
		
/* ############################# START: Event Click Tabs-5  ############################# */
	$("[href='#tabs-5']").click(function(){
		addClassAsOfTabs(4);
		$.ajax({
			url:"amountNewStudentByFacultyByYear.html",
			type:"get",
			dataType:"html",
			success:function(data){
				//alert(data);
				$(".style").remove();
				$("#tabs-5").html(data);
//				newStudentComparebyMajoyByYear();
				chartComparingAtmNewStudentByFacultyFn();
//				createHtmlGridFn();
				dataGrideCompareByMajorFn();
					
			}
		});
	});
/* ############################# END: Event Click Tabs-5  ############################# */		//Event Click Tabs No.05 End
		
	/* START: Create parameter "paramYear" */
	function cerateParameter(){
		$.ajax({ //call Year 
			url:"../Model/parameter.jsp",
			type:"get",
			dataType:"json",
			async:false,
			success:function(data){
				var htmlParamYear="";
				//htmlParamYear
				htmlParamYear+="<select id=\"paramYear\">";
					//loop [json]data into <option>
				$.each(data,function(index,indexEntry){
//					alert(index+":"+indexEntry[0]);
					if(index==0){
						htmlParamYear+="<option selected=\"selected\">";
						htmlParamYear+=indexEntry[0];
						htmlParamYear+="</option>";
					}else{
						htmlParamYear+="<option>";
						htmlParamYear+=indexEntry;
						htmlParamYear+="</option>";	
					}					
				});
				htmlParamYear+="</select>";
				$("#paramYearList").html(htmlParamYear);
				$("#paramYear").kendoDropDownList();
				
				/* Default data in kendoDropDownList*/
				var dropdownlist = $("#paramYear").data("kendoDropDownList");
				dropdownlist.select(0);
			}
		});
	}
	cerateParameter();
	/* END: Create parameter "paramYear" */
		
	/* START: Create parameter "previousYear" */
	var htmlParamYear="";
		htmlParamYear+="<select id=\"paramPrev\">";
		htmlParamYear+="<option>3</option>";
		htmlParamYear+="<option selected=\"selected\">5</option>";
		htmlParamYear+="<option>10</option>";
		htmlParamYear+="</select>";	
	$("#paramPreList").html(htmlParamYear);
	$("#paramPrev").kendoDropDownList();
	/* START: Create parameter "previousYear" */
	
	/* START: function call model for newStudentByYearChart */	
		$("form#formAction").submit(function(){			
			$(".empParam").remove();
			$("body").append("<input type=\"hidden\" id=\"embParamPrev\" name=\"embParamPrev\" class=\"empParam\" value="+$("#paramPrev").val()+">");
			$("body").append("<input type=\"hidden\" id=\"embParamYear\" name=\"embParamYear\" class=\"empParam\" value="+$("#paramYear").val()+">");
			
			$("div#tabs ul").each(function(){
				if($("li",this).eq(0).hasClass("TabsActive")){
					$("[href='#tabs-1']").trigger("click");
				}else if($("li",this).eq(1).hasClass("TabsActive")){
					$("[href='#tabs-2']").trigger("click");
				}else if($("li",this).eq(2).hasClass("TabsActive")){
					$("[href='#tabs-3']").trigger("click");
				}else if($("li",this).eq(3).hasClass("TabsActive")){
					$("[href='#tabs-4']").trigger("click");
				}else if($("li",this).eq(4).hasClass("TabsActive")){
					$("[href='#tabs-5']").trigger("click");
				}else{
					false;
				}
			});
			
			
			
			return false;
		}); //.trigger("submit");
		
	setTimeout(function(){
		 $("#btnSubmit").trigger("submit");
	},1000);
	
});
//Generate Tabs by jQuery End
