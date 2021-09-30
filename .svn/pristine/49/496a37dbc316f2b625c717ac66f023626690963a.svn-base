<%@ page contentType="text/javascript; charset=utf-8" pageEncoding="utf-8"
%><%!
public String cleanXSS(String value, boolean isFull) {
	if((value == null || "".equals(value))) {
		return value;
	}
	// You'll need to remove the spaces from the html entities below
	value = value.replaceAll("<", "& lt;").replaceAll(">", "& gt;");
	if(isFull) {
		value = value.replaceAll("\\(", "& #40;").replaceAll("\\)", "& #41;");
		value = value.replaceAll("'", "& #39;");
	}
	value = value.replaceAll("eval\\((.*)\\)", "");
	value = value.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
	value = value.replaceAll("script", "");
	return value;
}
%><%
request.setCharacterEncoding("utf-8");
response.setCharacterEncoding("utf-8");
response.setContentType("text/javascript; charset=utf-8");

String ua = request.getHeader("User-Agent");
ua = (ua == null || "".equals(ua)) ? "navigator.userAgent" : "\"" + ua.replaceAll("\"", "") + "\"";
%>/*
 ***************************************************************************
 * nProtect Online Security, 1.0.0
 *
 * For more information on this product, please see
 * http://www.inca.co.kr / http://www.nprotect.com
 *
 * Copyright (c) INCA Internet Co.,Ltd  All Rights Reserved.
 *
 * 본 코드에 대한 모든 권한은 (주)잉카인터넷에게 있으며 동의없이 사용/배포/가공할 수 없습니다.
 *
 ***************************************************************************
 */
var nua = <%= cleanXSS(ua, true) %>;
<%
String include = request.getParameter("i");
if(include != null && !"".equals(include)) {
	include = cleanXSS(include, true);		// XSS 보안이슈 추가 by YGKIM 2016.05.10
	%>document.write("<script type=\"text/javascript\" src=\"<%= include %>\" charset=\"utf-8\"></script>");<%
}
%>