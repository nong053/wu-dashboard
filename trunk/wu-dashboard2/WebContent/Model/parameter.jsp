<%@page import="wu.ar.service.wuService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	wuService jndi = new wuService();

	String query = "call paramYear()";
	String field = "1";
		jndi.selectByIndex(query, field);
		out.print(jndi.getData());	
%>