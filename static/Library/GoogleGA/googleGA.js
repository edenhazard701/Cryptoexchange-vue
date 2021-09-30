function googleGA_Call(a,b)
{
	var GAMsgT = "page_title";
	var GAMsgTD = b;
	var GAMsgP = "page_path";
	var GAMsgPD = "/"+a;
	
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
//	gtag('config', 'UA-112610511-1',{ 'page_title': + a ,'page_path':'/'+b });
	gtag('config', 'UA-112610511-1',{ 'page_title': GAMsgTD ,'page_path':GAMsgPD });
//	console.log(GAMsgT +":"+GAMsgTD+"=="+ GAMsgP +":"+GAMsgPD);
}
