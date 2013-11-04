<%@page import="wu.ar.service.wuService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String paramYear = request.getParameter("paramYear");
	String paramFacuId = request.getParameter("paramFacuId");
	//String paramYear = "2555";
	//String paramFacuId = "ศิลปศาสตร์";
	
	wuService jndi = new wuService();	
	String query = "call newStudent_compareMajor("+paramYear+",\""+paramFacuId+"\")"; //call storeprocedure
	String field = "2,3,4"; //select field
		jndi.selectByIndex(query, field);
		out.print(jndi.getData());	
	
%>