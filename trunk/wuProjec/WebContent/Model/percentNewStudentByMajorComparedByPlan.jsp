<%@page import="wu.ar.service.wuService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String paramYear = request.getParameter("paramYear");
	String majorId = request.getParameter("majorId");
	
	wuService jndi = new wuService();	
	String query = "call percentNewStudentbyMajorComparedByPlan("+paramYear+","+majorId+")"; //call storeprocedure
	//String query = "call percentNewStudentbyMajorComparedByPlan(2555)";
	String field = "1,2,3,4,5"; //select field
		jndi.selectByIndex(query, field);
		out.print(jndi.getData());	
	
%>