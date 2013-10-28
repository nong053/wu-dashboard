<%@page import="wu.ar.service.wuService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String paramYear = request.getParameter("paramYear");
	String paramTop = request.getParameter("paramTop");
	wuService jndi = new wuService();
	
	String query = "call topTen_HighSchool_byYear("+paramYear+","+paramTop+")"; //call storeprocedure
	String field = "2,3"; //select field
		jndi.selectByIndex(query, field);
		out.print(jndi.getData());	
	
%>