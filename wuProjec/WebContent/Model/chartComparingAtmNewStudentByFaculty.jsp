<%@page import="wu.ar.service.wuService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String paramYear = request.getParameter("paramYear");
	//String paramPrev = request.getParameter("paramPrev");
	//String firstIf = "3";
	
	wuService jndi = new wuService();	
	String query = "call chartComparingAtmNewStudentsByFaculty("+paramYear+")"; //call storeprocedure
	//String query = "call chartComparingAtmNewStudentsByFaculty(2550,5)";
	String field = "1,2,3,4,5,6,7,8,9,10,11,12"; //select field
	jndi.selectByIndex(query, field);
		out.print(jndi.getData());	
		
%>