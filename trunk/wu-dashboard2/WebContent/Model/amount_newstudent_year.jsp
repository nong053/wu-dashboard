<%@page import="wu.ar.service.wuService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String paramYear = request.getParameter("paramYear");
	String paramPrev = request.getParameter("paramPrev");
	
	//out.print("paramYear="+paramYear);
	//out.print("paramPrev="+paramPrev);
	//paramYear="2555";
	//paramPrev="3";
	wuService jndi = new wuService();
	String query = "call amount_newstudent_year("+paramYear+","+paramPrev+")"; //call storeprocedure
	String field = "1,2,3"; //select field
		jndi.selectByIndex(query, field);
		out.print(jndi.getData());	
	
%>