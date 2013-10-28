<%@page import="wu.ar.service.wuService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String paramYear = request.getParameter("paramYear");
	String facuName = request.getParameter("facuName");
	String TypeName = request.getParameter("TypeName");

	
	wuService jndi = new wuService();	
	String query = "call avgGpaByYear("+paramYear+",\""+facuName+"\",\""+TypeName+"\")"; //call storeprocedure
	//String query = "call avgGpaByYear(2555,\"การจัดการ\",\"รับตรง\")";
	String field = "1,2,3,4"; //select field
		jndi.selectByIndex(query, field);
		out.print(jndi.getData());	
	
%>