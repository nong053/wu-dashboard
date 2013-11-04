<%@page import="wu.ar.service.wuService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String paramYear = request.getParameter("paramYear");
	//String paramYear = "2555";
	
	wuService jndi = new wuService();	
	String query = "call amountNewStudentByType("+paramYear+")"; //call storeprocedure
	String field = "1,2,3,4,5,6"; //select field
		jndi.selectByIndex(query, field);
		out.print(jndi.getData());	
	
%>