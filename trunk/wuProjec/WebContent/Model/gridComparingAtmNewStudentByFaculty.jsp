<%@page import="wu.ar.service.wuService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String paramYear = request.getParameter("paramYear");

	wuService jndi = new wuService();	
	String query = "call gridComparingAtmNewStudentsByFaculty("+paramYear+")"; //call storeprocedure
	//String query = "call gridComparingAtmNewStudentsByFaculty(2556)";
	String field = "1,2,3,4,5,6,7,8,9,10,11,12,13"; //select field
		jndi.selectByIndex(query, field);
		out.print(jndi.getData());	
	
%>