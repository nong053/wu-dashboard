<%@page import="wu.ar.service.wuService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	//String paramYear = request.getParameter("paramYear");
	//Integer provinceId = request.getParameter("provinceId");
	String paramYear = "2555";
	Integer provinceId = 0;
	
	wuService jndi = new wuService();	
	String query = "call gridAmtStudentGroupByProvince("+paramYear+",\""+provinceId+"\")"; //call storeprocedure
	//String query = "call amtStudentGroupByProvince(2555,0)";
	String field = "1,2,3,4,5"; //select field
		jndi.selectByIndex(query, field);
		out.print(jndi.getData());	
	
%>