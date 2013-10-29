<%@page import="wu.ar.service.wuService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String paramYear = request.getParameter("paramYear");
	String facuId = request.getParameter("facuId");
	String TypeId = request.getParameter("TypeId");

	
	wuService jndi = new wuService();	
	String query = "call avgGpaByYear("+paramYear+","+facuId+","+TypeId+")"; //call storeprocedure
	//String query = "call avgGpaByYear(2555,\"การจัดการ\",\"รับตรง\")";
	String field = "1,2,3,4"; //select field
		jndi.selectByIndex(query, field);
		out.print(jndi.getData());	
	
%>