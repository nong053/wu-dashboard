$(document).ready(function(){
	
	/* Generate jquery Button style. */
	$("#btnSubmit").button();
		
	/* Contorl Tabs by jQuery */
	$( "#tabs" ).tabs();
	$("[href='#tabs-2']").hide();
	$("[href='#tabs-3']").hide();
	$("[href='#tabs-4']").hide();
	$("[href='#tabs-5']").hide();
	
	/* Contorl Tabs */
/* ############################# START: Event Click Tabs-1  ############################# */
	$("[href='#tabs-1']").click(function(){
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
            			//console.log(data);
            			//alert(data);
            			/*all function generate graph column type*/
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
            			}
            		});
					/* END: Create newStudentByYearChart*/												
				}
		});
	});
/* ############################# END: Event Click Tabs-1 ############################# */
		
			
		
/* ############################# START: Event Click Tabs-2  ############################# */
	$("[href='#tabs-2']").click(function(){
		$.ajax({
			url:"amountNewStudentByType.html",
			type:"get",
			dataType:"html",
			success:function(data){
				//alert(data);
				$(".style").remove();
				$("#tabs-2").html(data);
					
				amountNewStudentByTypeFn();				
			}
		});
	});
/* ############################# END: Event Click Tabs-2  ############################# */

		
		
/* ############################# START: Event Click Tabs-3  ############################# */
	$("[href='#tabs-3']").click(function(){
		$.ajax({
			url:"percentNewStudentByYear.html",
			type:"get",
			dataType:"html",
			success:function(data){
				//alert(data);
				$(".style").remove();
				$("#tabs-3").html(data);
					
				percentCompareByFacultyFn();
			}
		});
	});
/* ############################# END: Event Click Tabs-3  ############################# */
		
		
		
/* ############################# START: Event Click Tabs-4  ############################# */
	$("[href='#tabs-4']").click(function(){
		$.ajax({
			url:"amountNewStudentByRegion.html",
			type:"get",
			dataType:"html",
			success:function(data){
				//alert(data);
				$(".style").remove();
				$("#tabs-4").html(data);
				
				changeMapColor($("#paramYear").val());
				dataGridProvinceFn($("#paramYear").val(),0);
//				createThailandMap();	
//				createHtmlGridFn();
				
				
			}
		});
	});
/* ############################# END: Event Click Tabs-4  ############################# */
		
		
		
/* ############################# START: Event Click Tabs-5  ############################# */
	$("[href='#tabs-5']").click(function(){
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
	$(function(){
		$("form#formAction").submit(function(){
			$("[href='#tabs-2']").hide();
			$("[href='#tabs-3']").hide();
			$("[href='#tabs-4']").hide();
			$("[href='#tabs-5']").hide();
			
			$(".empParam").remove();
			$("body").append("<input type=\"hidden\" id=\"embParamPrev\" name=\"embParamPrev\" class=\"empParam\" value="+$("#paramPrev").val()+">");
			$("body").append("<input type=\"hidden\" id=\"embParamYear\" name=\"embParamYear\" class=\"empParam\" value="+$("#paramYear").val()+">");
			$("[href='#tabs-1']").trigger("click");
			return false;
		}); //.trigger("submit");
	});	
});
//Generate Tabs by jQuery End
