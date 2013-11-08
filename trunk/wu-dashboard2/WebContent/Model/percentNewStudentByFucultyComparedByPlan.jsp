<%@page import="wu.ar.service.wuService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String paramYear = request.getParameter("paramYear");
	
	wuService jndi = new wuService();	
	String query = "call percentNewstudentByFacultyComparedByPlan("+paramYear+")"; //call storeprocedure
	//String query = "call percentNewstudentByFacultyComparedByPlan(\"2554\")";
	String field = "1,2,3,4,5"; //select field
		jndi.selectByIndex(query, field);
		out.print(jndi.getData());	
	
%>