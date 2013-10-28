<%@page import="wu.ar.service.wuService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String paramYear = request.getParameter("paramYear");
	String paramFacuName = request.getParameter("paramFacuName");
	//String paramYear = "2555";
	//String paramFacuName = "ศิลปศาสตร์";
	
	wuService jndi = new wuService();	
	String query = "call newStudent_compareMajor("+paramYear+",\""+paramFacuName+"\")"; //call storeprocedure
	String field = "2,3,4"; //select field
		jndi.selectByIndex(query, field);
		out.print(jndi.getData());	
	
%>