/*
 ***************************************************************************
 * nProtect Online Security, 1.9.0
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
(function() {
	if(window.nppfsLoaded) return;
	
	var w = window;
	w.nua = (typeof(nua) == "undefined" || nua == null || nua == "") ? navigator.userAgent : nua;
	w.ad = {
		hE: 1,
		cG: 2,
		bb: 3,
		fJ: 1,
		jt: 2,
		Ix: "__E2E_RESULT__",
		wG: "__E2E_UNIQUE__",
		jd: "__E2E_KEYPAD__",
		k5: "1.9.0",
		Qd: "20180306094539063"
	};
	w.uV = {
		dV: {
			// Fz: "Library/pluginfree/nppfs.install.html",
			Fz: "/#/safetyprogram",
			Gf: "/pluginfree/jsp/nppfs.key.jsp",
			zf: "/pluginfree/jsp/nppfs.remove.jsp",
			eP: "/pluginfree/jsp/nppfs.ready.jsp",
			zo: "/pluginfree/jsp/nppfs.keypad.jsp",
			cM: "https://supdate.nprotect.net/nprotect/nos_service/nos.service",
			dZ: "https",
			l5: 14440,
			Cc: 10,
			iI: "",
			dk: ad.fJ,
			kK: 300,
			Ux: 100,
			Qa: 15
		},
		ki: {
			FW: true,
			SK: true,
			FD: false,
			KV: false
		}
	};
	w.N = {
		m01: "보안프로그램이 업데이트되었습니다. 최신모듈로 업데이트가 필요합니다. 설치페이지로 이동하시겠습니까?",
		m02: "[nProtect Online Security] 모듈을 찾을 수 없습니다. 접속경로를 확인하시거나 관리자에게 문의하십시오.",
		m03: 'Microsoft IE7 이하 브라이저에서는 입력 form 양식에 div[class="%p%"] 항목이 필요합니다.',
		m04: "서버에서 키값을 받을 수 없습니다. 키발급 경로를 확인하거나 지속적으로 문제 발생시 서버관리자에게 문의하십시오.",
		m05: "개인방화벽을 실행할 수 있는 환경이 아닙니다.",
		m06: "키보드보안을 실행할 수 있는 환경이 아닙니다.",
		m07: "단말정보수집을 실행할 수 있는 환경이 아닙니다.",
		m08: "마우스입력기를 실행할 수 있는 환경이 아닙니다.",
		m09: "보안프로그램에서 개발자도구나 디버그도구를 탐지하였습니다.\n보안을 위하여 현재 페이지를 다시 호출합니다.",
		m10: "보안프로그램과의 연결이 원활하지 않습니다. 지속적으로 발생시 관리자에게 문의하십시오.",
		m11: "접속 가능한 포트(%p%)를 찾았습니다.",
		m12: "기본 포트(%p%)가 열려 있는지 검사합니다.",
		m13: "쿠키에 저장된 호스트(%h%)와 포트(%p%)가 있습니다. 이 호스트와 포트를 검사합니다.",
		m14: "사용 가능한 호스트(%h%)와 포트(%p%)를 찾았습니다. 이 호스트와 포트를 사용합니다.",
		m15: "업데이트 모듈이 실행중인 상태입니다.",
		m16: "정상적인 설치가 되었는지 확인합니다. 설치 후 초기화 완료시까지 수 초(대략 5~10초)가 소요됩니다. 설치가 완료되면 자동으로 첫 페이지로 이동합니다.",
		m17: "설치가 완료되었습니다.",
		m18: "Flash SDK를 정상적으로 시작되었습니다.",
		m19: "인증서 초기화에 너무 많은 재호출이 발생하여 초기화 작업을 중지합니다. 페이지를 다시 접속하시거나 지속적인문제 발생시 관리자에게 문의하십시오",
		m20: "장시간동안 사용자의 페이지 사용이 없어 현재 페이지의 접속을 종료합니다.",
		m21: "[%p%] 이름으로 여러 개의 form이 존재합니다. 해당 이름의  첫번째 form에 단말정보가 수집됩니다.",
		m22: "키보드보안프로그램에서 보호되지 않는 키가 입력되었습니다. 보안을 위해 페이지를 다시 호출합니다.",
		m23: "보안프로그램과의 연결이 중지되었습니다.\n보안을 위하여 현재 페이지를 다시 호출합니다.",
		m24: "초기 활성화된 객체(%p%)를 다시 활성화시킵니다.",
		m25: "초기 활성화된 객체(%p%)를 찾았습니다. 키보드보안 초기화 후에 다시 활성화시킵니다.",
		m26: "키보드보안이 초기화되지 않았습니다. 잠시 후 다시 시도해주십시오.",
		m27: "단말정보수집을 위한 [form] 필드가 존재하지 않습니다. 초기화값을 다시 확인하여 주십시오.",
		m28: "단말정보수집 모듈 초기화에 성공하였습니다.",
		m29: "단말정보수집 모듈을 초기화할 수 없습니다.",
		m30: "서버에서 키값을 얻어올 수 없습니다. 서버의 상태 또는 접속경로를 확인하여 주십시오.",
		m31: 'Microsoft IE7 이하 브라이저에서는 입력 form(%p1%) 양식에 div[class="%p2%"] 항목이 필요합니다.',
		m32: "입력 Form(%p%)이 존재하지 않거나 2개 이상입니다.",
		m33: "모듈이 설치되어 있지 않습니다.",
		m34: "모듈이 업데이트되었습니다.",
		m35: "설치페이지로 이동하시겠습니까?",
		m36: "설치페이로 이동하여 다시 설치하시겠습니까?",
		m37: "jQuery 객체를 찾을 수 없습니다. Microsoft IE Browser 9.0 이하 버전에서는 jQuery를 사용해야 합니다.",
		m38: "개발자도구의 단축키는 사용할 수 없습니다.",
		m39: "오른쪽 마우스는 사용할 수 없습니다.",
		m40: "현재의 브라우저는 Ajax를 지원하지 않습니다.",
		m41: "보안프로그램과의 연결시도 중 응답시간을 초과하였습니다.",
		m42: "응답값이 정상적인 규격이 아닙니다.",
		m43: "추가하려는 항목의 상위객체를 찾을 수 없습니다.",
		m44: "생성하려는 입력양식과 값의 개수가 일치하지 않습니다.",
		m45: "문자형키패드는 텍스트입력양식에서 사용할 수 없습니다. 텍스트입력양식에서는 숫자/한글형키패드만 지원합니다.",
		m46: "한글키패드는 암호입력양식에서 사용할 수 없습니다. 암호입력양식에서는 숫자/문자형키패드만 지원합니다.",
		m47: "동적 확장은 10개까지 가능합니다. 동적 필드 로직을 10개 이하로 구성하십시오.",
		m48: "가상운영체제 또는 원격으로 접속하셨습니다. 키보드보안을 지원하지 않는 환경입니다.",
		m49: "가상운영체제 또는 원격접속이 아닙니다. 키보드보안이 실행가능한 환경입니다.",
		m50: "[nProtect Online Security, %p1%] 모듈에 접근할 수 없어 종료합니다.",
		m51: "로컬 서버(%p1%:%p2%)에서 업데이트 확인을 요청하였습니다.",
		m52: "NOS의 세션을 유지합니다.",
		m53: "데이터를 받아서 처리할 Callback함수를 지정해야 합니다.",
		m54: "NOS와 통신할 수 없습니다. npPfsStartup()으로 먼저 페이지를 초기화하십시오.",
		m55: "개인방화벽의 세션을 유지합니다.",
		m56: "개인방화벽을 시작합니다.",
		m57: "개인방화벽이 정상적으로 시작되었습니다.",
		m58: "개인방화벽을 정상적으로 종료하였습니다.",
		m59: "E2E 초기화를 위한 설정변수가 지정되지 않았습니다. npPfsE2E 변수값을 설정하십시오.",
		m60: "랜덤값생성페이지(%p1%)에서 값을 정상적으로 얻어올 수 없습니다.",
		m61: "키보드보안에 입력양식(%p1%)을 등록합니다.",
		m62: "키보드보안에 입력양식(%p1%)이 정상적으로 등록되었습니다.",
		m63: "입력양식(%p1%)에 포커스가 들어왔습니다.",
		m64: "입력양식(%p1%)의 포커스가 사라졌습니다.",
		m65: "입력양식(%p1%)의 키보드보안 값(%p2%)이 입력되었습니다.",
		m66: "키 값이 입력되었습니다.",
		m67: "입력양식(%p1%)의 값이 삭제되었습니다. 현재값(%p2%).",
		m68: "단말정보수집을 정상적으로 종료하였습니다.",
		m69: "단말정보수집을 시작합니다.",
		m70: "단말정보수집이 정상적으로 시작되었습니다.",
		m71: "단말정보수집이 완료되었습니다.",
		m72: "마우스입력기를 시작합니다.",
		m73: "마우스입력기를 정상적으로 종료하였습니다.",
		m74: "마우스입력기 공개키정보(%p1%)",
		m75: "마우스입력기에 입력양식(%p1%)을 등록합니다.",
		m76: "마우스입력기가 정상적으로 시작되었습니다.",
		m77: "입력양식(%p1%)에 [(%p2%)] 속성으로 활성화양식명을 지정하여 주십시오.",
		m78: "입력양식(%p1%)의 마우스입력기가 정상적으로 초기화되었습니다.",
		m79: "마우스입력기(%p1%)가 활성화되었습니다.",
		m80: "마우스입력기(%p1%)가 비활성화되었습니다.",
		m81: "웹페이지에 등록된 Flash 객체가 없습니다.",
		m82: "Flash SDK를 시작합니다.",
		m83: "Flash SDK를 정상적으로 종료하였습니다.",
		m84: "키보드보안에 Flash 입력양식(%p1%)을 등록합니다.",
		m85: "최대길이값이 플래시에서 넘어오지 않았습니다. 최대길이 체크를 무시합니다.",
		m86: "키보드보안에 Flash 입력양식(%p1%)이 정상적으로 등록되었습니다.",
		m87: "폼 이름이 없어 동적필드 생성을 중단합니다.",
		m88: "키보드보안 프로그램이 지원되지 않는 환경에서는\n안전한 거래를 위해 가상키패드(마우스입력기)를\n반드시 사용하셔야 합니다.",
		m89: "공백버튼의 개수가 너무 큽니다. 줄 단위 당 버튼의 개수를 1/3 이하로 설정하십시오. 보통 줄 당 1~2개가 적당합니다.",
		m90: "입력양식(%p1%)의 마우스입력기를 보이게 하려고 합니다.",
		m91: "입력양식(%p1%)의 마우스입력기를 보이게 하였습니다.",
		m92: "입력양식(%p1%)의 마우스입력기를 안보이게 하였습니다.",
		m93: "입력양식(%p1%)의 마우스입력기가 닫혔습니다.",
		m94: "입력양식(%p1%)의 마우스입력기를 입력확인 처리하였습니다.",
		m95: "보안프로그램을 설치하셔야 이용이 가능한 서비스입니다. [확인]을 선택하시면 설치페이지로 연결됩니다.",
		m96: "보안프로그램을 업데이트하셔야 이용이 가능한 서비스입니다. [확인]을 선택하시면 재설치페이지로 연결됩니다.",
		m97: "보안프로그램이 설치되어 있지 않습니다.",
		m98: "입력양식(%p1%)의 마우스입력기를 삭제하였습니다.",
		m99: "키보드보안을 정상적으로 종료하였습니다."
	};
	var npOutCount = 0;
	w.Mc = {
		dB: new Date(),
		timelineStart: new Date(),
		timeline: [],
		info: function(a) {
			this.print(a, "blue")
		},
		log: function(a) {
			this.print(a, "black")
		},
		error: function(a) {
			this.print(a, "red")
		},
		split: function() {
			var a = [];
			for (var b = 0; b < 80; b++) {
				a.push("-")
			}
			this.print(a.join(""), "#ddd")
		},
		reset: function() {
			this.dB = new Date();
			this.timelineStart = new Date();
			this.timeline = []
		},
		check: function(a) {
			this.timeline.push({
				name: a,
				start: this.timelineStart,
				end: new Date()
			});
			this.timelineStart = new Date()
		},
		dateText: function(a) {
			if (L.au(a)) {
				a = new Date()
			}
			return L.ep(a, "HH:mm:ss ms")
		},
		print: function(b, a) {
			if (L.bn(b)) {
				return
			}
			if (L.bn(a)) {
				a = "black"
			}
			if (uV.dV.dk == ad.jt) {
				if (window.console) {
					window.console.log(this.dateText() + " : " + b)
				} else {
					L.xw(document, "byid", "nppfs-console-log");
					if (npOutCount < 1000) {
						nq("#nppfs-console-log").append('<div style="color:' + a + ';">' + this.dateText() + " : " + npOutCount + ". " + b + "</div>");
						npOutCount++
					} else {
						zp.hideLoading()
					}
				}
			}
		},
		interval: function(b) {
			if (uV.dV.dk == ad.jt) {
				var c = this.dB;
				var a = new Date();
				Mc.log("Task(" + b + ") Duration: " + ((a.getTime() - c.getTime()) / 1000) + "s, Start:" + L.ep(c, "HH:mm:ss ms") + ", End:" + L.ep(a, "HH:mm:ss ms"))
			}
		},
		printTimeline: function() {
			var d = [];
			d.push("");
			d.push("Transaction Start : " + L.ep(this.dB, "HH:mm:ss ms"));
			var e = this.timeline;
			for (var c = 0; c < e.length; c++) {
				var b = e[c].name;
				var i = e[c].end.getTime() - this.dB.getTime();
				var g = e[c].end.getTime() - e[c].start.getTime();
				var f = L.ep(e[c].start, "HH:mm:ss ms");
				var a = L.ep(e[c].end, "HH:mm:ss ms");
				d.push("Task(" + b + "), (" + L.comma(i) + " ms / " + L.comma(g) + " ms), " + a)
			}
			Mc.log(d.join("\n"));
			this.reset()
		}
	};
	w.D = new function() {
		var d = navigator.appName;
		var b = navigator.platform.toLowerCase();
	
		function e(f) {
			return nua.indexOf(f)
		}
	
		function a(f) {
			return nua.indexOf(f) >= 0
		}
	
		function c(f) {
			return nua.toLowerCase().indexOf(f) >= 0
		}
		this.ie = (d == "Microsoft Internet Explorer" || (d == "Netscape" && (a("MSIE") || a("Trident")))) && !a("QQBrowser");
		this.ie64 = this.ie && a("Win64; x64");
		this.edge = e("Mozilla") === 0 && a("Edge");
		this.ff = a("Firefox") && e("Mozilla") === 0 && d == "Netscape" && !a("Navigator");
		this.ns = a("Gecko") && a("Navigator");
		this.b360 = a("360Browser") && a("Chrome") && a("Safari");
		this.qq = a("QQBrowser") && a("Trident");
		this.sf = a("Safari") && !a("Chrome");
		this.op = a("Opera") || a("OPR/");
		this.cr = a("Chrome") && a("Safari") && !a("OPR/") && !a("360Browser") && !a("Edge");
		this.win = (b.indexOf("win") != -1) && !a("Windows Phone");
		this.win9x = a("Windows 98") || a("Win98") || a("Windows ME") || a("Windows NT 4.0") || a("Windows NT 5.0") || a("Windows 2000");
		this.winxp = a("Windows NT 5.1");
		this.mac = a("Mac");
		this.lnx64 = a("Linux") && a("x86_64");
		this.lnx32 = a("Linux") && (a("i386") || a("i686"));
		this.lnx = a("Linux");
		this.and = a("Android");
		this.iph = a("iPhone");
		this.ipo = a("iPod");
		this.ipa = a("iPad");
		this.fdr = c("fedora");
		this.ubt = c("ubuntu");
		this.winphone = c("windows phone");
		this.winmob = (b == "windows mobile");
		this.cR = null;
		this.bd = null;
		this.virtualMachine = false;
		this.isMobileDevice = function() {
			if (this.winmob || this.winphone || this.ipa || this.ipo || this.iph || this.and) {
				return true
			}
			return false
		};
		this.gC = function() {
			var f = null;
			var k = nua;
			if (D.win) {
				var j = [{
					v: "5.0",
					p: /(Windows NT 5.1|Windows XP)/
				}, {
					v: "5.2",
					p: /Windows NT 5.2/
				}, {
					v: "6.0",
					p: /Windows NT 6.0/
				}, {
					v: "7.0",
					p: /(Windows 7|Windows NT 6.1)/
				}, {
					v: "8.1",
					p: /(Windows 8.1|Windows NT 6.3)/
				}, {
					v: "8.0",
					p: /(Windows 8|Windows NT 6.2)/
				}, {
					v: "10.0",
					p: /(Windows 10|Windows NT 10.0)/
				}, {
					v: "3.0",
					p: /Windows CE/
				}, {
					v: "3.1",
					p: /Win16/
				}, {
					v: "3.2",
					p: /(Windows 95|Win95|Windows_95)/
				}, {
					v: "3.5",
					p: /(Win 9x 4.90|Windows ME)/
				}, {
					v: "3.6",
					p: /(Windows 98|Win98)/
				}, {
					v: "3.7",
					p: /Windows ME/
				}, {
					v: "4.0",
					p: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
				}, {
					v: "4.0",
					p: /(Windows NT 5.0|Windows 2000)/
				}];
				for (var g = 0; g < j.length; g++) {
					var m = j[g];
					try {
						if (m.p.test(k)) {
							f = m.v;
							break
						}
					} catch (l) {}
				}
			} else {
				if (D.mac) {
					if (match = /Mac OS X ([0-9.]*)[._]([0-9.]*)/.exec(k)) {
						f = match[1] + "." + match[2]
					}
				} else {
					if (D.lnx) {}
				}
			}
			return f
		};
		this.iT = function() {
			var f;
			var j;
			var i = nua;
			if (D.ff) {
				f = i.substring(i.toLowerCase().lastIndexOf("firefox"));
				if (f.indexOf(" ") > -1) {
					f = f.substring(0, f.indexOf(" "))
				}
				j = f.split("/");
				return j[1]
			} else {
				if (D.op) {
					if (i.indexOf("OPR/") > -1) {
						f = i.split("OPR/")[1]
					} else {
						if (i.indexOf("Opera") > -1) {
							f = i.split("Opera/")[1]
						}
					}
					if (f.indexOf(" ") > -1) {
						j = f.split(" ");
						return j[0]
					} else {
						return f
					}
				} else {
					if (D.cr || D.b360) {
						f = i.substring(i.toLowerCase().lastIndexOf("chrome"));
						if (f.indexOf(" ") != -1) {
							f = f.substring(0, f.indexOf(" "));
							j = f.split("/");
							return j[1]
						}
					} else {
						if (D.sf) {
							var g = new RegExp(/Version[\/\s](\d+\.\d+)/.test(nua));
							var k = RegExp["$1"];
							return k
						} else {
							if (D.ie || D.qq) {
								if (i.indexOf("MSIE") > -1) {
									fw = i.substring(i.indexOf("MSIE") + 4, i.length);
									fw = fw.replace(/(^\s*)|(\s*$)/gi, "");
									j = fw.split(";");
									j = j[0].split(" ");
									return j[0]
								} else {
									return i.substring(i.indexOf("rv:") + 3, i.indexOf("rv:") + 7)
								}
							} else {
								if (D.edge) {
									f = i.substring(i.toLowerCase().lastIndexOf("edge"));
									if (f.indexOf(" ") != -1) {
										f = f.substring(0, f.indexOf(" "));
										j = f.split("/");
										return j[1]
									} else {
										j = f.split("/");
										return j[1]
									}
								}
							}
						}
					}
				}
			}
		};
		this.makeBrowserVersionCode = function() {
			function k(r, q, p) {
				var n = r;
				if (n.length < q) {
					for (var o = 0; o < (q - r.length); o++) {
						n = p + n
					}
				} else {
					if (r.length > q) {
						n = r.substring(0, q)
					}
				}
				return n
			}
			var f = "99-000-000";
			try {
				var l = "";
				var i = "";
				var g = D.bd;
				if (g.indexOf(".") != -1) {
					var j = g.split(".");
					l = k(j[0], 3, "0");
					i = k(j[1], 3, "0")
				} else {
					l = k(g, 3, "0");
					i = k("000", 3, "0")
				}
				var f = l + "-" + i;
				if (D.ie) {
					f = "10-" + f
				} else {
					if (D.ff) {
						f = "20-" + f
					} else {
						if (D.cr) {
							f = "30-" + f
						} else {
							if (D.sf) {
								f = "40-" + f
							} else {
								if (D.op) {
									f = "50-" + f
								} else {
									if (D.edge) {
										f = "60-" + l + "-000"
									} else {
										if (D.b360) {
											f = "91-" + f
										} else {
											if (D.qq) {
												f = "92-" + f
											} else {
												f = "99-000-000"
											}
										}
									}
								}
							}
						}
					}
				}
			} catch (m) {
				f = "99-000-000"
			}
			return f
		};
		this.isSupported = function(f) {
			return this.iG(f) && this.jj(f)
		};
		this.iG = function(f) {
			if (L.bn(this.cR)) {
				this.cR = D.gC()
			}
			var g = this.cR;
			if (D.win && f.aF.aX) {
				if (D.win9x) {
					return false
				}
				return L.ak(g, f.aF.di.qs, f.aF.di.Oc)
			} else {
				if (D.mac && f.jV.aX) {
					return L.ak(g, f.jV.di.qs, f.jV.di.Oc)
				} else {
					if (D.lnx && f.bx.aX) {
						return true
					}
				}
			}
			return false
		};
		this.jj = function(g) {
			if (!this.iG(g)) {
				return false
			}
			var f = null;
			if (D.win) {
				f = g.aF.al
			} else {
				if (D.mac) {
					f = g.jV.al
				} else {
					if (D.lnx) {
						f = g.bx.al
					}
				}
			}
			if (!L.au(f)) {
				if (L.bn(this.bd)) {
					this.bd = D.iT()
				}
				var i = D.bd;
				if (D.ie && f.IE.aX) {
					return L.ak(i, f.IE.qs, f.IE.Oc)
				} else {
					if (D.ff && f.FF.aX) {
						return L.ak(i, f.FF.qs, f.FF.Oc)
					} else {
						if (D.cr && f.CR.aX) {
							return L.ak(i, f.CR.qs, f.CR.Oc)
						} else {
							if (D.sf && f.SF.aX) {
								return L.ak(i, f.SF.qs, f.SF.Oc)
							} else {
								if (D.edge && f.EG.aX) {
									return L.ak(i, f.EG.qs, f.EG.Oc)
								} else {
									if (D.op && f.OP.aX) {
										return L.ak(i, f.OP.qs, f.OP.Oc)
									} else {
										if (D.b360 && f.B360.aX) {
											return L.ak(i, f.B360.qs, f.B360.Oc)
										} else {
											if (D.qq && f.QQ.aX) {
												return L.ak(i, f.QQ.qs, f.QQ.Oc)
											}
										}
									}
								}
							}
						}
					}
				}
			}
			return false
		};
		this.isMetroUi = function() {
			if (!this.ie) {
				return false
			}
			if (!this.bd) {
				return false
			}
			if (!L.db(this.bd, "10.0")) {
				return false
			}
			var f = null;
			try {
				f = !!new ActiveXObject("htmlfile")
			} catch (g) {
				f = false
			}
			if (f) {
				return false
			}
			if (window.screen.availWidth !== window.outerWidth) {
				return false
			}
			return (window.screen.availWidth == window.outerWidth)
		};
		this.CB = function() {
			return this.ie && (L.db("7.0", this.bd) || document.documentMode <= 7)
		};
		this.cO = function() {
			return (!this.ie && !this.qq) ? true : false
		}
	};
	w.D.cR = D.gC();
	w.D.bd = D.iT();
	w.npPfsDefine = D;
	w.hI = new function() {
		this.plugins = [];
		this.define = function(c) {
			if (L.bn(c.id)) {
				alert("제품 식별 고유코드가 필요합니다.");
				return
			}
			if (L.bn(c.controller)) {
				alert("제품 제어 스크립트 객체가 필요합니다.");
				return
			}
			this.plugins.push(c)
		};
		this.iK = function() {
			var c = false;
			nq(this.plugins).each(function() {
				if (!this.controller.isRunnable() || !this.controller.isSupported()) {
					return true
				}
				var d = true;
				if (typeof(this.isExecutable) == "function") {
					d = this.isExecutable(zp.aG)
				}
				if (d == true && !L.au(this.handshake) && this.handshake == true) {
					c = true;
					return false
				}
			});
			return c
		};
		this.io = function() {
			var c = false;
			nq(this.plugins).each(function() {
				if (!this.controller.isRunnable() || !this.controller.isSupported()) {
					return true
				}
				var d = true;
				if (typeof(this.isExecutable) == "function") {
					d = this.isExecutable(zp.aG)
				}
				if (d == true && !L.au(this.endtoend) && this.endtoend == true) {
					c = true;
					return false
				}
			});
			return c
		};
		this.c7 = function() {
			var c = false;
			nq(this.plugins).each(function() {
				if (!this.controller.isSupported()) {
					return true
				}
				var d = true;
				if (typeof(this.isExecutable) == "function") {
					d = this.isExecutable(zp.aG)
				}
				if (d == true && !L.au(this.runvirtualos) && this.runvirtualos == false) {
					c = true;
					return false
				}
			});
			return c
		};
		this.iS = function() {
			return this.plugins
		};
		var a = [];
		var b = false;
		this.init = function(d) {
			if (b == true) {
				return
			}
			nq(document).bind("nppfs-module-startup", function(f) {
				var e = f.target;
				a.splice(L.indexOf(a, e), 1);
				if (a.length == 0) {
					nq(document).trigger({
						type: "nppfs-nos-startup",
						time: new Date()
					});
					b = false
				}
			});
			var c = 0;
			nq(this.plugins).each(function() {
				if (!this.controller.isRunnable()) {
					return true
				}
				c++;
				this.controller.init(d)
			});
			if (c == 0) {
				b = false
			}
		};
		this.startup = function(d) {
			var c = 0;
			if (b == true) {
				return
			}
			b = true;
			nq(this.plugins).each(function() {
				if (!this.controller.isRunnable()) {
					return true
				}
				a.push(this.id);
				c++;
				this.controller.startup(d)
			});
			if (c == 0) {
				nq(document).trigger({
					type: "nppfs-nos-startup",
					time: new Date()
				});
				b = false
			}
		};
		this.bA = function() {
			var c = true;
			nq(this.plugins).each(function() {
				if (!this.controller.isRunnable()) {
					return true
				}
				a.push(this.id);
				runcnt++;
				c = c && this.controller.bA();
				return c
			});
			return c
		};
		this.isSupported = function() {
			var c = true;
			nq(this.plugins).each(function() {
				c = c && this.controller.isSupported();
				return c
			});
			return c
		};
		this.bm = function(c) {
			nq(this.plugins).each(function() {
				this.controller.bm(c)
			})
		}
	};
	w.npPfsPlugins = hI;
	w.Ye = {
		d3: "6bf29dc484694cf1f212c37260e1d8d820be02454f94f7331be6deb4f2244951",
		p8: "13f130cdbcd02056965e3ba8f9486bad7af2c773aedb2b96dcb974183efca026",
		x2: "51bfb73b0c9a342d970774fa5747169ef35d16e48634050fe46bda1246d6cddc",
		x5: "7579056fe783ac032132f7b44aae04a52281ea7699b8f88b2e359e41d5703fb6",
		j3: "1",
		x6: "0",
		a4: "59615036FA2C1A9EFC35D43EC6C77269",
		h5: "B303AA8350126650FCE9111D899E21F0",
		d4: "FA48FAE45FDF6C6F29DD4766E50F5931",
		p0: "201A9DFAC7ED61A876CA0B1D7AF18161",
		ag: "14F1CF1F85E360D567D4A9C43B99C33B",
		aj: "A0131152837EFEA26E0598577DE5E429",
		kk: "94B53D15A6C345F18DB55F5C879B661E",
		e2: "47494638396101000100820031FFFFFF",
		h6: "61b2cbee45e4a3b02752857c49c81569c0f26db234f471fe02bcab8c59781769",
		j0: "dac91176be5a99ff37ac050a9c659ba0e358186981f28d1fc6a420f23e28c40a",
		d8: "7aa5df0d58e9605274a0e8644ab345d9339efc1ed50177f5637626a186cfef4b",
		am: "2de43955ff2196bdde793eaf1d3c9e297e17c4084c9f976ed38b74b0d168b172",
		dG: "392ef24666affe1b203b27fa6c5806d7c55cbbc6720d5d2960d5abc550f4ee17"
	};
	w.nq = (typeof(nosQuery) != "undefined") ? nosQuery : jQuery;
	w.L = new function() {
		function c(f, g) {
			if (f === undefined) {
				f = 1
			} else {
				if (g === undefined) {
					g = "0"
				}
			}
			var i = "";
			while (i.length < f) {
				i += g
			}
			this.bY = function(j) {
				var k = j.toString();
				return i.substring(0, i.length - k.length) + k
			}
		}
		this.au = function(f) {
			if (typeof(f) == "undefined" || f == null) {
				return true
			}
			return false
		};
		this.bn = function(f) {
			if (typeof(f) == "undefined" || f == null || f == "") {
				return true
			}
			return false
		};
		this.n2b = function(g, f) {
			if (this.au(f)) {
				f = ""
			}
			if (this.au(g)) {
				return f
			}
			return g
		};
		this.gv = function() {
			var f = new c(15);
			var g = Math.floor(Math.random() * 99) + 1;
			return f.bY((new Date().getTime()).toString() + g)
		};
		this.cC = function(i) {
			if (this.au(i)) {
				i = ""
			}
			var g = i.length;
			var f = new c(4);
			return f.bY((g).toString(16))
		};
		this.sz = function(f) {
			return encodeURIComponent(f)
		}, this.bj = function(i) {
			var g = [];
			for (var f in i) {
				if (typeof nexacro == "object" && nexacro._bInitPlatform) {
					if (f == "getSetter" || f == "getNumSetter") {
						continue
					}
				}
				g.push(f)
			}
			return g
		};
		this.jC = function(f) {
			this.bj(f).length
		};
		this.hH = function(g) {
			var f = "";
			if (!g) {
				return
			}
			for (var j = 0; j < g.length; j++) {
				f += ((g[j] < 16) ? "0" : "") + g[j].toString(16)
			}
			return f
		};
		this.ha = function(j, l) {
			if (L.bn(j)) {
				return ""
			}
			var g = "";
			if (j.indexOf("0x") == 0 || j.indexOf("0X") == 0) {
				j = j.substr(2)
			}
			if (j.length % 2) {
				j += "0"
			}
			var k = [];
			for (var f = 0; f < j.length; f += 2) {
				k.push(parseInt(j.slice(f, f + 2), 16))
			}
			if (l == "UTF8") {
				return d(k)
			} else {
				for (f = 0; f < k.length; f++) {
					g += String.fromCharCode(k[f])
				}
			}
			return g
		};
	
		function d(n) {
			var k, j;
			var f = "";
			var l = n.length;
			var g = 0;
			while (g < l) {
				var m = n[g++];
				switch (m >> 4) {
					case 0:
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
					case 6:
					case 7:
						f += String.fromCharCode(m);
						break;
					case 12:
					case 13:
						k = n[g++];
						f += String.fromCharCode(((m & 31) << 6) | (k & 63));
						break;
					case 14:
						k = n[g++];
						j = n[g++];
						f += String.fromCharCode(((m & 15) << 12) | ((k & 63) << 6) | ((j & 63) << 0));
						break
				}
			}
			return f
		}
		this.comma = function(f) {
			f = String(f);
			return f.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")
		};
		this.uncomma = function(f) {
			f = String(f);
			return f.replace(/[^\d]+/g, "")
		};
		this.arrayIn = function(j, g) {
			for (var f = 0; f < j.length; f++) {
				if (j[f] === g) {
					return true
				}
			}
			return false
		};
		this.indexOf = function(j, g) {
			for (var f = 0; f < j.length; f++) {
				if (j[f] === g) {
					return f
				}
			}
			return -1
		};
		this.arrayNotIn = function(j, g) {
			for (var f = 0; f < j.length; f++) {
				if (j[f] === g) {
					return false
				}
			}
			return true
		};
		this.mL = function(j) {
			var g;
			var f = new Array();
			for (g = 0; g < j; g++) {
				f[g] = Math.round(Math.random() * 255)
			}
			return f
		};
		this.wm = function(j, k) {
			var f = AES.eU / 8;
			var g;
			if (typeof j == "string" || j.indexOf) {
				j = j.split("");
				for (g = 0; g < j.length; g++) {
					j[g] = j[g].charCodeAt(0) & 255
				}
			}
			for (g = f - (j.length % f); g > 0 && g < f; g--) {
				j[j.length] = 0
			}
			return j
		};
		this.getBytes = function(l) {
			var k;
			var f = [];
			if (typeof l == "string" || l.indexOf) {
				var g = [];
				var m = l;
				for (var k = 0; k < m.length; k++) {
					var j = m.charCodeAt(k);
					if (j < 128) {
						g.push(j)
					} else {
						if (j < 2048) {
							g.push(192 | (j >> 6), 128 | (j & 63))
						} else {
							if (j < 55296 || j >= 57344) {
								g.push(224 | (j >> 12), 128 | ((j >> 6) & 63), 128 | (j & 63))
							} else {
								k++;
								j = 65536 + (((j & 1023) << 10) | (m.charCodeAt(k) & 1023));
								g.push(240 | (j >> 18), 128 | ((j >> 12) & 63), 128 | ((j >> 6) & 63), 128 | (j & 63))
							}
						}
					}
				}
				return g
			}
			return f
		};
		this.encrypt = function(f, q, n, m) {
			AES.eU = L.au(m) ? 128 : m;
			AES.gl = L.au(q) ? 256 : q.length * 8;
			var k = AES.eU / 8;
			var l, p;
			var o;
			if (!f || !q) {
				return
			}
			if (q.length * 8 != AES.gl) {
				return
			}
			if (n == "CBC") {
				o = this.mL(k)
			} else {
				n = "ECB";
				o = new Array()
			}
			f = this.wm(f);
			var g = new AES.F(q);
			for (var j = 0; j < f.length / k; j++) {
				p = f.slice(j * k, (j + 1) * k);
				if (n == "CBC") {
					for (var l = 0; l < k; l++) {
						p[l] ^= o[j * k + l]
					}
				}
				o = o.concat(AES.J(p, g))
			}
			return L.hH(o)
		};
		this.gu = function(r, p, n, m, g) {
			AES.eU = L.au(m) ? 128 : m;
			AES.gl = L.au(p) ? 256 : p.length * 8;
			var k = AES.eU / 8;
			var s = new Array();
			var o;
			var j;
			if (!r || !p) {
				return
			}
			if (typeof(r) == "string") {
				r = r.split("");
				for (l = 0; l < r.length; l++) {
					r[l] = r[l].charCodeAt(0) & 255
				}
			}
			if (p.length * 8 != AES.gl) {
				return
			}
			if (!n) {
				n = "ECB"
			}
			var f = new AES.gU(p);
			for (j = (r.length / k) - 1; j > 0; j--) {
				o = AES.er(r.slice(j * k, (j + 1) * k), f);
				if (n == "CBC") {
					for (var l = 0; l < k; l++) {
						s[(j - 1) * k + l] = o[l] ^ r[(j - 1) * k + l]
					}
				} else {
					s = o.concat(s)
				}
			}
			if (n == "ECB") {
				s = AES.er(r.slice(0, k), f).concat(s)
			}
			var q = s[s.length - 1];
			while (typeof(q) == "undefined" || q == null || q == 0) {
				s.pop();
				q = s[s.length - 1]
			}
			return L.ha(L.hH(s), g)
		};
		this.send = function(i, g, k) {
			var f = "";
			if (this.au(k)) {
				k = {}
			}
			if (this.au(k.async)) {
				k.async = false
			}
			if (this.au(k.timeout) || k.timeout <= 0) {
				k.timeout = 3000
			}
			if (this.au(k.ax)) {
				k.ax = function(m) {
					var l = "";
					if (m.readyState == 4) {
						if (m.status == 200) {
							l = m.responseText
						} else {}
					} else {}
					return l
				}
			}
			Mc.log("REQ : " + g);
			try {
				nq.ajax({
					url: i,
					cache: false,
					async: k.async,
					type: "post",
					global: false,
					data: g,
					error: function(n, m, l) {
						return k.ax(n)
					},
					success: function(m, l, n) {
						f = m;
						return k.ax(n)
					}
				})
			} catch (j) {
				k.ax({
					readyState: 4,
					status: 999,
					responseText: ""
				});
				Mc.error("ERR : " + j)
			}
			return f
		};
		this.jI = {};
		this.fs = function(i, g, f) {
			if (L.au(g)) {
				g = {}
			}
			if (L.au(g.async)) {
				g.async = true
			}
			if (L.au(g.host)) {
				g.host = zp.c6
			}
			if (L.au(g.port)) {
				g.port = zp.cB
			}
			if (L.au(g.direct)) {
				g.direct = false
			}
			if (L.au(g.ax)) {
				g.ax = function(j) {}
			}
			var f = !L.au(f) ? f : function(l) {
				var j = "";
				if (l.readyState == 4) {
					if (l.status == 200 || l.status == 999) {
						try {
							j = l.responseText;
							Mc.log("RES : " + l.responseText);
							g.ax(l.responseText)
						} catch (k) {}
					} else {}
				} else {}
				return j
			};
			if (g.direct == true) {
				if (D.cO()) {
					return this.gb(i, f, g)
				} else {
					return this.sendDirectCommand(i, f, g)
				}
			} else {
				if (g.byiframe == true && (D.ie || D.qq)) {
					return this.sendIFrameCommand(i, f, g)
				} else {
					if (D.cO()) {
						return this.gb(i, f, g)
					} else {
						return this.gj(i, f, g)
					}
				}
			}
		};
		this.gb = function(n, k, m) {
			if (L.au(m.timeout)) {
				m.timeout = 3000
			}
			var g = false;
	
			function i(o) {
				if (g == false) {
					k(o);
					g = true
				}
			}
			var f = zp.cZ(m.port, m.host);
			var j = null;
			if (m.timeout > 0) {
				j = setTimeout(function() {
					i({
						readyState: 4,
						status: 999,
						responseText: ""
					})
				}, m.timeout)
			}
			try {
				Mc.log("REQ : " + n);
				nq.ajax({
					url: f,
					cache: false,
					async: m.async,
					type: "post",
					global: false,
					data: n,
					error: function(q, p, o) {
						i({
							readyState: 4,
							status: 999,
							responseText: p + ":" + o
						})
					},
					success: function(p, o, q) {
						i(q)
					},
					complete: function(p, o) {
						if (j != null) {
							clearTimeout(j)
						}
					}
				})
			} catch (l) {
				i({
					readyState: 4,
					status: 999,
					responseText: ""
				});
				Mc.error("ERR : " + l)
			}
		};
		this.lock = false;
		this.commandQueue = [];
		this.executeQueue = function() {
			var f = L.commandQueue.shift();
			if (typeof(f) == "function") {
				f()
			}
		};
		this.gj = function(l, i, k) {
			if (L.au(k.timeout)) {
				k.timeout = 3000
			} else {
				if (k.timeout <= 0) {
					k.timeout = 60 * 1000
				}
			}
			if (L.lock == true) {
				if (L.commandQueue.length > 0) {
					L.executeQueue()
				}
				L.commandQueue.push(function() {
					L.gj(l, i, k)
				})
			} else {
				L.lock = true;
				var f = zp.cZ(k.port, k.host);
				var g = setTimeout(function() {
					i({
						readyState: 4,
						status: 999,
						responseText: ""
					});
					try {
						L.lock = false;
						L.executeQueue()
					} catch (m) {}
				}, k.timeout);
				Mc.log("REQ : " + l);
				try {
					nq.ajax({
						url: f,
						cache: false,
						crossDomain: true,
						async: false,
						type: "GET",
						global: false,
						dataType: "jsonp",
						jsonp: "jsonp_callback",
						contentType: "application/javascript",
						timeout: k.timeout,
						data: {
							Code: l
						},
						error: function(o, n, m) {
							if (n == "abort" || n == "timeout" || n == "parsererror" || n == "error") {
								i({
									readyState: 4,
									status: 999,
									responseText: n + ":" + m
								})
							}
						},
						success: function(n, m, o) {
							if (n != null && n.RESULT != null) {
								i({
									readyState: 4,
									status: 200,
									responseText: n.RESULT
								})
							}
						},
						complete: function(o, m) {
							clearTimeout(g);
							try {
								L.lock = false;
								L.executeQueue()
							} catch (n) {}
						}
					})
				} catch (j) {
					i({
						readyState: 4,
						status: 999,
						responseText: ""
					});
					Mc.error("ERR : " + j);
					L.lock = false;
					L.executeQueue()
				}
			}
		};
		this.sendDirectCommand = function(l, i, k) {
			var f = zp.cZ(k.port, k.host);
			if (L.au(k.timeout)) {
				k.timeout = 3000
			} else {
				if (k.timeout <= 0) {
					k.timeout = 60 * 1000
				}
			}
			var g = setTimeout(function() {
				i({
					readyState: 4,
					status: 999,
					responseText: ""
				})
			}, k.timeout);
			Mc.log("REQ : " + l);
			try {
				nq.ajax({
					url: f,
					cache: false,
					crossDomain: true,
					async: false,
					type: "GET",
					global: false,
					dataType: "jsonp",
					jsonp: "jsonp_callback",
					contentType: "application/javascript",
					timeout: k.timeout,
					data: {
						Code: l
					},
					error: function(o, n, m) {
						if (n == "abort" || n == "timeout" || n == "parsererror" || n == "error") {
							i({
								readyState: 4,
								status: 999,
								responseText: n + ":" + m
							})
						}
					},
					success: function(n, m, o) {
						if (n != null && n.RESULT != null) {
							i({
								readyState: 4,
								status: 200,
								responseText: n.RESULT
							})
						}
					},
					complete: function(n, m) {
						clearTimeout(g)
					}
				})
			} catch (j) {
				clearTimeout(g);
				i({
					readyState: 4,
					status: 999,
					responseText: ""
				});
				Mc.error("ERR : " + j)
			}
		};
		var a = false;
		this.sendIFrameCommand = function(m, i, l) {
			var g = zp.cZ(l.port, l.host);
			g += "?ifrm=" + m;
			var f = zp.cZ(l.port, l.host);
			var k = document.getElementById("keep-alive-iframe");
			var j = nq("#keep-alive-iframe");
			if (j.length == 0) {
				k = document.createElement("iframe");
				k.id = "keep-alive-iframe";
				k.style.display = "none";
				nq("body").append(k);
				j = nq("#keep-alive-iframe");
				if (a == false) {
					a = true;
					if (!D.CB()) {
						nq(window).on("message", function(n) {
							try {
								var o = n.origin || n.originalEvent.origin;
								var q = n.data || n.originalEvent.data;
								if (o === f) {
									var p = nq.parseJSON(q);
									if (p.caller == "nppfs-nos-response") {
										i({
											readyState: 4,
											status: 200,
											responseText: p.response
										})
									}
								}
							} catch (r) {}
						})
					}
				}
				j.on("load", function(n) {
					if (!D.CB()) {
						k.contentWindow.postMessage("", f)
					}
					try {
						i({
							readyState: 4,
							status: 200,
							responseText: Ye.a4
						})
					} catch (o) {}
				});
				j.on("error", function(n) {
					i({
						readyState: 4,
						status: 999,
						responseText: ""
					})
				})
			}
			Mc.log("REQ : " + m);
			j.attr("src", g)
		};
		dW = {};
		this.iV = function(f, i) {
			var g = f;
			if (!L.bn(i)) {
				if (typeof(i) == "string") {
					g = f + "_" + i
				} else {
					if (typeof(i) == "object") {}
				}
			}
			if (dW[g]) {
				dW[g] = null
			}
		};
		this.bZ = function(f, k) {
			var j = null;
			var i = f;
			var l = null;
			if (!L.bn(k)) {
				if (typeof(k) == "string") {
					j = nq("form[name='" + k + "']").get(0)
				}
				if (typeof(k) == "object") {
					j = k
				}
				if (!L.au(j)) {
					j = this.findParentForm(j);
					k = nq(j).attr("name");
					i = f + "_" + nq(j).attr("name")
				}
			}
			if (typeof(f) === "string") {
				if (nq("#" + f).get(0)) {
					l = nq("#" + f).get(0)
				} else {
					var g = (j != null && j.length > 0) ? nq("[name='" + f + "']", j) : nq("[name='" + f + "']");
					l = (g != null && g.length > 0) ? g.get(0) : nq("#" + f).get(0)
				}
			}
			if (typeof(f) === "object") {
				l = f
			}
			return l
		};
		this.n5 = function(f) {
			return document.createElement(f)
		};
		this.c1 = function(f, j, t) {
			if (this.au(f)) {
				return
			}
			var g = j;
			var l = t;
			if (!L.au(l)) {
				if (g.length != l.length) {
					alert(N.m44)
				}
			}
			var q = L.bZ(f);
			var s = L.xw(q, "byclass", "nppfs-elements");
			if (!D.CB()) {
				nq(s).hide()
			}
			var o = [];
			var m = false;
			for (var n = 0; n < g.length; n++) {
				var k = this.bZ(g[n], f);
				if (L.au(k)) {
					if (m == false) {
						m = true
					}
					var r = g[n];
					var p = "";
					if (!L.au(l)) {
						p = l[n]
					}
					if (uV.dV.dk == ad.fJ) {
						o.push('<input type="hidden" name="' + r + '" value="' + p + '">')
					} else {
						o.push(r + '<input type="text" name="' + r + '" value="' + p + '"><br />')
					}
				} else {
					if (!L.au(l)) {
						nq(k).val(l[n])
					}
				}
			}
			if (m == true) {
				nq(s).append(o.join("\n"));
				if (uV.dV.dk == ad.jt && (!D.cr || D.bd < 49)) {
					nq(s).show()
				}
			}
		};
		this.copyDivision = function(f, i) {
			var g = L.xw(f, "byclass", "nppfs-elements");
			var j = L.xw(i, "byclass", "nppfs-elements");
			if (!L.au(g) && !L.au(j)) {
				nq("input", nq(g)).each(function(l, k) {
					var m = k.name;
					var n = k.value;
					if (!L.au(i.elements[m])) {
						i.elements[m].value = n
					} else {
						if (uV.dV.dk == ad.fJ) {
							nq(j).append('<input type="hidden" name="' + m + '" value="' + n + '" />')
						} else {
							nq(j).append(m + ' : <input type="text" name="' + m + '" value="' + n + '" />')
						}
					}
				})
			}
		};
		this.tY = false;
		this.wT = function(i, g, f) {
			var j = L.n5("div");
			if (g == "byclass") {
				j.setAttribute("class", f)
			} else {
				i = document.body;
				j.setAttribute("id", f)
			}
			j.setAttribute("style", "display:none;");
			nq(i).prepend(j);
			return j
		};
		this.findParentForm = function(j) {
			var g = j;
			var f = nq(j).parents("form");
			if (f.length > 0) {
				var i = f.last();
				g = i.get(0)
			}
			return g
		};
		this.xw = function(i, g, f) {
			if (L.bn(f)) {
				return null
			}
			i = i || document;
			if (i.tagName && i.tagName.toLowerCase() === "form") {
				i = this.findParentForm(i)
			}
			var j = (g == "byid") ? nq("#" + f).get(0) : nq("div." + f, nq(i)).get(0);
			return j || this.wT(i, g, f)
		};
		this.so = function(f) {
			f.preventDefault ? f.preventDefault() : f.returnValue = false
		};
		this.eD = function(i) {
			var f = -1;
			try {
				var j = new Date();
				f = j - i;
				if (f > 100000) {
					f = 99999
				}
			} catch (g) {}
			return f + ""
		};
		this.gn = function(j) {
			var k = j.split(/ |,|\.|\_|\//g);
			var i = new Array();
			var g = 0;
			for (var f = 0; f < k.length; f++) {
				if (!L.bn(k[f])) {
					i[g] = k[f];
					g++
				}
			}
			if (i.length > 0) {
				return i
			}
			return null
		};
		this.db = function(l, f, n) {
			if (this.bn(l)) {
				return false
			}
			if (this.bn(f)) {
				return false
			}
			var k = this.gn("" + l);
			var j = k.length;
			var m = this.gn("" + f);
			var g = 0;
			for (g = 0; g < j; g++) {
				if (L.au(m[g])) {
					m[g] = 0
				}
				k[g] = parseInt(k[g], 10);
				m[g] = parseInt(m[g], 10);
				if (k[g] > m[g]) {
					return true
				} else {
					if (k[g] < m[g]) {
						return false
					}
				}
			}
			if (g == j) {
				return true
			}
			if (k.toString() == m.toString()) {
				return true
			}
			return false
		};
		this.ak = function(j, i, g) {
			var f = true;
			if (!L.bn(i)) {
				f = f && L.db(j, i)
			}
			if (!L.bn(g)) {
				f = f && L.db(g, j)
			}
			return f
		};
		this.hf = function(g, k, f, m, j) {
			try {
				var i = g + "=" + escape(k) + ";";
				if (f) {
					if (f instanceof Date) {
						if (isNaN(f.getTime())) {
							f = new Date()
						}
					} else {
						f = new Date(new Date().getTime() + parseInt(f, 10) * 1000 * 60 * 60 * 24)
					}
					i += "expires=" + f.toGMTString() + ";"
				}
				if (!!m) {
					i += "path=" + m + ";"
				}
				if (!!j) {
					i += "domain=" + j + ";"
				}
				document.cookie = i
			} catch (l) {}
		};
		this.jv = function(g) {
			g = g + "=";
			var j = document.cookie;
			var k = j.indexOf(g);
			var i = "";
			if (k != -1) {
				k += g.length;
				var f = j.indexOf(";", k);
				if (f == -1) {
					f = j.length
				}
				i = j.substring(k, f)
			}
			return unescape(i)
		};
		this.show = function(g) {
			if (this.bn(g)) {
				return
			}
			if (typeof(g) !== "object") {
				g = L.bZ(g)
			}
			try {
				nq(g).show()
			} catch (f) {}
		};
		this.hide = function(g) {
			if (this.bn(g)) {
				return
			}
			if (typeof(g) !== "object") {
				g = L.bZ(g)
			}
			try {
				nq(g).hide()
			} catch (f) {}
		};
		this.val = function(f, g) {
			if (!L.au(f) && typeof(f) == "object") {
				if (typeof(g) == "undefined") {
					return nq(f).val() || ""
				} else {
					nq(f).val(g)
				}
			}
		};
		this.readOnly = function(f, g) {
			if (!L.au(f) && typeof(f) == "object") {
				if (typeof(g) == "undefined") {
					return nq(f).prop("readonly")
				} else {
					nq(f).prop("readonly", g)
				}
			}
		};
		this.ja = function(f, j, i, g) {
			nq(j).bind(f, function(k) {
				i(g)
			})
		};
		this.removeEvent = function(f, j, i, g) {
			nq(j).unbind(f, function(k) {
				i(g)
			})
		};
		this.addLoadEvent = function(i, g) {
			var f = function() {
				if (!L.au(g)) {
					i(g)
				} else {
					i()
				}
			};
			if (L.au(nq)) {
				setTimeout(f, 500)
			} else {
				nq(document).ready(function() {
					f()
				})
			}
		};
		this.u8d = function(f) {
			var g = "";
			var j = 0;
			var k = c1 = c2 = 0;
			while (j < f.length) {
				k = f.charCodeAt(j);
				if (k < 128) {
					g += String.fromCharCode(k);
					j++
				} else {
					if ((k > 191) && (k < 224)) {
						c2 = f.charCodeAt(j + 1);
						g += String.fromCharCode(((k & 31) << 6) | (c2 & 63));
						j += 2
					} else {
						c2 = f.charCodeAt(j + 1);
						b = f.charCodeAt(j + 2);
						g += String.fromCharCode(((k & 15) << 12) | ((c2 & 63) << 6) | (b & 63));
						j += 3
					}
				}
			}
			return g
		};
		this.h2b = function(o) {
			var k = "0123456789abcdef";
			var f = new Array();
			var n = 0;
			for (var m = 0; m < o.length; m += 2) {
				var l = k.indexOf(o.charAt(m));
				var j = k.indexOf(o.charAt(m + 1));
				var g = (l << 4) | j;
				f[n++] = String.fromCharCode(g)
			}
			return f.join("")
		};
		this.dispatch = function(g, f) {
			g = (typeof(g) == "function") ? g : window[g];
			return g.apply(this, f || [])
		};
		this.getBounds = function(g, f) {
			var g = (typeof(g) == "object") ? g : L.bZ(g, f);
			if (!L.au(g)) {
				var i = nq(g);
				return {
					left: i.offset().left,
					top: i.offset().top,
					width: i.outerWidth(),
					height: i.outerHeight()
				}
			}
		};
		this.ep = function(g, i) {
			function k(o, n) {
				if (typeof(o) == "string") {
					var m = "";
					var l = 0;
					while (l++ < n - o.length) {
						m += "0"
					}
					return m + o
				} else {
					if (typeof(o) == "number") {
						return k(o.toString(), n)
					}
				}
				return o
			}
			if (!g.valueOf()) {
				return " "
			}
			var f = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			var j = g;
			return i.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|ms|a\/p)/gi, function(l) {
				switch (l) {
					case "yyyy":
						return j.getFullYear();
					case "yy":
						return k((j.getFullYear() % 1000), 2);
					case "MM":
						return k((j.getMonth() + 1), 2);
					case "dd":
						return k(j.getDate(), 2);
					case "E":
						return f[j.getDay()];
					case "HH":
						return k(j.getHours(), 2);
					case "hh":
						return k(((h = j.getHours() % 12) ? h : 12), 2);
					case "mm":
						return k(j.getMinutes(), 2);
					case "ss":
						return k(j.getSeconds(), 2);
					case "ms":
						return k(j.getMilliseconds(), 3);
					case "a/p":
						return j.getHours() < 12 ? "AM" : "PM";
					default:
						return l
				}
			})
		};
		this.trim = function(g) {
			if (g == null) {
				return g
			}
			try {
				return g.replace(/(^\s*)|(\s*$)/gi, "")
			} catch (f) {
				try {
					return g.replace(/^\s+|\s+$/g, "")
				} catch (f) {}
			}
			return g
		};
		this.x7 = false;
		var b = 0;
		this.r9 = function(f, k, j) {
			function g(l) {
				try {
					Mc.log(new Error("Stack Trace").stack)
				} catch (m) {}
				if (!L.au(l)) {
					l.print()
				}
				Mc.log("ERROR COUNT : " + b + "");
				if (b >= uV.dV.Qa) {
					if (this.x7 == false) {
						alert(N.m10);
						Mc.log(N.m10);
						this.x7 = true
					}
					if (!L.au(l)) {
						l.aO(ad.bb)
					}
					bk.JF = true;
					zp.hideLoading();
					try {
						location.reload()
					} catch (m) {}
					return true
				}
				b++;
				return false
			}
			if (L.bn(f) || f == Ye.h5) {
				var i = (j) ? g(j) : g();
				if (i) {
					return true
				}
				if (k) {
					setTimeout(function() {
						k()
					}, uV.dV.kK)
				}
				return true
			} else {
				if (f == Ye.p0) {
					zp.mW();
					return true
				}
			}
			b = 0;
			return false
		};
		var e = 0;
		this.parseKeepAliveResult = function(f, j) {
			function g() {
				try {
					Mc.log(new Error("Stack Trace").stack)
				} catch (k) {}
				Mc.log("ERROR COUNT : " + e + "");
				if (e >= uV.dV.Qa) {
					if (this.x7 == false) {
						Mc.log(N.m23);
						this.x7 = true
					}
					bk.JF = true;
					zp.hideLoading();
					return true
				}
				e++;
				return false
			}
			if (L.bn(f) || f == Ye.h5) {
				var i = g();
				if (i) {
					return true
				}
				if (j) {
					setTimeout(function() {
						j()
					}, uV.dV.kK)
				}
				return true
			} else {
				if (f == Ye.p0) {
					zp.mW();
					return true
				}
			}
			e = 0;
			return false
		};
		this.randomTable = [];
		this.randomIndex = 0;
		this.random = function() {
			var g = L.randomTable.length;
			var f = L.randomIndex;
			var i = L.randomTable[f];
			if (g == f + 1) {
				L.randomIndex = 0
			} else {
				L.randomIndex++
			}
			return i
		}
	};
	w.zp = new function() {
		this.uuid = null;
		this.cB = -1;
		this.cz = false;
		this.dn = null;
		this.JF = false;
		var n = false;
		var v = false;
		var r = false;
		this.aG = {
			FW: true,
			SK: true,
			FD: true,
			KV: true
		};
	
		function b(x) {
			var y = {
				Firewall: true,
				SecureKey: true,
				Fds: true,
				Keypad: true,
				AutoStartup: true,
				Debug: false,
				Form: null,
				AutoScanAttrName: "npkencrypt",
				AutoScanAttrValue: "on",
				MoveToInstall: function(z, A) {
					location.replace(z)
				},
				Loading: {
					Default: true,
					Before: function() {
						zp.Wb()
					},
					After: function() {
						zp.v3()
					}
				}
			};
			nq.extend(y, x);
			zp.aG = {
				FW: y.Firewall && uV.ki.FW,
				SK: y.SecureKey && uV.ki.SK,
				FD: y.Fds && uV.ki.FD,
				KV: y.Keypad && uV.ki.KV,
				AS: y.AutoStartup,
				FM: y.Form,
				LD: {
					DF: y.Loading.Default,
					BF: y.Loading.Before,
					AF: y.Loading.After
				},
				AN: y.AutoScanAttrName,
				AV: (L.au(y.AutoScanAttrValue) ? "" : y.AutoScanAttrValue.toLowerCase()),
				MI: y.MoveToInstall
			};
			if (y.Debug == true) {
				uV.dV.dk = ad.jt
			} else {
				uV.dV.dk = ad.fJ
			}
		}
		this.v4 = null;
		this.eventBinded = false;
		this.isStarting = false;
		this.functionQueue = [];
		this.functionExecute = function() {
			var x = zp.functionQueue.shift();
			if (typeof(x) == "function") {
				x()
			}
		};
		this.init = function(C) {
			npPfsCtrl.isStarting = true;
			b(C);
			if (uV.dV.dk == ad.jt) {
				var A = nq.event.trigger;
				nq.event.trigger = function(G, H, F, E) {
					if (!L.au(G) && !L.bn(G.type) && G.type.indexOf("nppfs") == 0) {
						Mc.log(G.message)
					}
					A(G, H, F, E)
				}
			}
			Mc.reset();
			if (npPfsCtrl.functionQueue.length == 0) {
				nq(document).trigger({
					type: "nppfs-before-init",
					message: "Start the initialization of the NOS.",
					time: new Date()
				})
			}
			Mc.check("NOS 초기화 작업 시작");
			zp.showLoading();
			if (L.bn(zp.uuid)) {
				zp.uuid = L.gv();
				Mc.log("UID : " + zp.uuid)
			}
			var z = null;
			try {
				z = document.activeElement;
				if (z.tagName.toLowerCase() === "input" && !L.au(z.form) && !L.au(nq(z).attr("name"))) {
					this.v4 = z;
					Mc.log(N.m25.replace("%p%", nq(z).attr("name")));
					z.blur()
				}
			} catch (B) {}
			Mc.check("NOS 포커스된 입력양식 찾기 완료");
			if (zp.eventBinded == false) {
				nq(document).unbind("keydown mousedown unload beforeunload");
				nq(document).bind("keydown", function(I) {
					var K = (I || window.event);
					if (L.au(K)) {
						return
					}
					var G = K.keyCode;
					var F = K.altKey;
					var M = K.ctrlKey;
					var H = K.shiftKey;
					var E = K.metaKey;
					var J = false;
					if (D.win || D.lnx) {
						J = (G == 123) || (M && H && G == 73);
						if (D.ff) {
							J = J || (M && H && (G == 75 || G == 81 || G == 83));
							J = J || (H && (G == 113 || G == 116 || G == 118))
						}
					} else {
						if (D.mac) {
							J = (F && E && (G == 73));
							if (D.ff) {
								J = J || (F && E && (G == 75 || G == 81 || G == 83));
								J = J || (H && (G == 113 || G == 116 || G == 118))
							}
						}
					}
					if (J == true) {
						Mc.log(N.m38);
						L.so(K);
						return false
					}
					bh.jw(K)
				});
				Mc.check("NOS 단축키 차단");
				nq(document).bind("mousedown", function(E) {
					var F = (E || window.event);
					if ((F.button == 2) || (F.button == 3)) {
						Mc.log(N.m39);
						L.so(F);
						return false
					}
				});
				Mc.check("NOS 종료 이벤트 추가");
				nq(window).bind("unload beforeunload", function(F) {
					zp.doFocusOut();
					try {
						if (typeof(npPfsExtension) != "undefined" && typeof(npPfsExtension.beforeFinalize) == "function") {
							var E = npPfsExtension.beforeFinalize(F);
							if (!L.au(E)) {
								return E
							}
						}
						hI.bm();
						if (hI.iK() == true) {
							g()
						}
					} catch (G) {
						Mc.log(G)
					}
				});
				zp.eventBinded = true
			}
			nq(document).unbind("nppfs-nos-jlk nppfs-nos-jhs nppfs-nos-jvc nppfs-nos-init nppfs-nos-startup");
			nq(document).bind("nppfs-nos-jlk nppfs-nos-jhs nppfs-nos-jvc nppfs-nos-init nppfs-nos-startup", p);
			if (hI.io() == true && L.bn(zp.dn)) {
				var x = uV.dV.Gf;
				Mc.log(x);
				var y = L.send(x, "id=" + zp.uuid, {
					async: false,
					ax: function(F) {
						if (F.readyState == 4) {
							if (F.status == 200) {
								var E = F.responseText;
								if (L.bn(E)) {
									Mc.log(N.m04)
								}
								zp.dn = L.trim(E)
							} else {
								Mc.log(N.m04)
							}
							nq(document).trigger({
								type: "nppfs-nos-jlk",
								time: new Date()
							})
						}
					}
				});
				Mc.check("NOS E2E 초기화 완료")
			} else {
				nq(document).trigger({
					type: "nppfs-nos-jlk",
					time: new Date()
				})
			}
			
			if ((hI.iK() || hI.c7()) && (L.bn(this.cB) || this.cB <= 0)) {
				zp.eC(function() {
					if (r == true || zp.cz == false) {
						if (zp.JF == true) {
							return
						}
						zp.JF = true;
						Mc.log(r ? N.m01 : N.m02);
						if (typeof(zp.aG.MI) == "function") {
							zp.aG.MI(uV.dV.Fz, r, false)
						}
						zp.hideLoading();
						return
					}
				})
			} else {
				nq(document).trigger({
					type: "nppfs-nos-jhs",
					time: new Date()
				})
			}
		};
	
		function p(x) {
			nq(document).unbind(x);
			switch (x.type) {
				case "nppfs-nos-jlk":
					Mc.check("NOS 키교환 완료");
					hI.init({
						form: zp.aG.FM
					});
					break;
				case "nppfs-nos-jhs":
					Mc.check("NOS 핸드쉐이크 완료");
					if (hI.iK() == true) {
						a()
					}
					zp.isVirtualMachine(function(y) {
						nq(document).trigger({
							type: "nppfs-nos-jvc",
							time: new Date()
						});
						Mc.check("NOS 가상머신확인 완료")
					});
					break;
				case "nppfs-nos-jvc":
					if (zp.aG.AS == true) {
						zp.startup()
					} else {
						zp.hideLoading()
					}
					nq(document).trigger({
						type: "nppfs-nos-init",
						time: new Date()
					});
					break;
				case "nppfs-nos-init":
					if (npPfsCtrl.functionQueue.length == 0) {
						nq(document).trigger({
							type: "nppfs-after-init",
							message: "Initialization of NOS has been successfully carried out.",
							time: new Date()
						})
					}
					Mc.check("NOS 초기화 작업 종료");
					break;
				case "nppfs-nos-startup":
					if (npPfsCtrl.functionQueue.length == 0) {
						zp.hideLoading();
						nq(document).trigger({
							type: "nppfs-after-startup",
							message: "NOS was driving successfully.",
							time: new Date()
						})
					}
					if (typeof(npPfsExtension) != "undefined" && typeof(npPfsExtension.startupCallback) == "function") {
						npPfsExtension.startupCallback()
					}
					Mc.check("NOS 모듈구동 작업 종료");
					Mc.printTimeline();
					npPfsCtrl.isStarting = false;
					break
			}
		}
		this.isStartup = false;
		this.startup = function(x) {
			Mc.check("NOS 모듈구동 작업 시작");
			if (npPfsCtrl.functionQueue.length == 0) {
				nq(document).trigger({
					type: "nppfs-before-startup",
					message: "Start driving the NOS.",
					time: new Date()
				})
			}
			this.jl();
			Mc.check("NOS 폼이름 점검 종료");
			zp.isStartup = true;
			hI.startup()
		};
		var t = false;
		this.resetVirtualMachine = function() {
			t = false
		};
		this.isVirtualMachine = function(x) {
			x = x || function() {};
			if (t == true) {
				x(D.virtualMachine);
				return
			}
			if (D.isMobileDevice() || D.isMetroUi()) {
				D.virtualMachine = false;
				Mc.log("Can not be checked a virtual machine at Metro UI or Mobile.");
				x(false);
				return
			}
			if (!hI.iK()) {
				t = true;
				D.virtualMachine = false;
				if (!L.au(x) && typeof(x) == "function") {
					x(D.virtualMachine)
				}
				return
			}
			if (zp.cz == false) {
				x(false);
				return
			}
			var y = zp.cQ(Ye.d3, Ye.j3, Ye.j0, null);
			L.fs(y, {
				ax: function(z) {
					if (L.bn(z)) {
						setTimeout(function() {
							zp.isVirtualMachine(x)
						}, uV.dV.kK);
						return
					} else {
						if (z == Ye.a4) {
							zp.aG.SK = false;
							Mc.log(N.m48);
							D.virtualMachine = true
						} else {
							if (z == Ye.h5) {
								Mc.log(N.m49);
								D.virtualMachine = false
							} else {
								if (z == Ye.p0) {
									zp.mW()
								} else {
									D.virtualMachine = false
								}
							}
						}
					}
					t = true;
					if (!L.au(x) && typeof(x) == "function") {
						x(D.virtualMachine)
					}
				}
			})
		};
		this.waitSubmit = function(x) {
			x()
		};
		this.mW = function() {
			if (D.sf == true) {
				alert("보안프로그램에서 개발자도구나 디버그도구를 탐지하였습니다.\n보안을 위하여 개발자도구를 종료합니다.");
				return
			} else {
				alert(N.m09);
				location.reload()
			}
		};
		this.copy = function(x, y) {
			L.copyDivision(x, y)
		};
		this.Wb = function() {
			var x = L.xw(document, "byid", "nppfs-loading-modal");
			if (L.au(x)) {
				return
			}
			try {
				nq(x).css({
					display: "block",
					position: "fixed",
					"z-index": "10000",
					top: "0",
					left: "0",
					height: "100%",
					width: "100%",
					background: "rgba( 255, 255, 255, .7) url(data:image/gif;base64,R0lGODlhIAAgAPMAAP///wAAAMbGxoSEhLa2tpqamjY2NlZWVtjY2OTk5Ly8vB4eHgQEBAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1ZBApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHRLYKhKP1oZmADdEAAAh+QQJCgAAACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDUolIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY/CZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB+A4k8gTwJhFuiW4dokXiloUepBAp5qaKpp6+Ho7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx61WiSR92E4lbFoq+B6QDtuetcaBPnW6+O7wDHpIiK9SaVK5GgV543tzjgGcghAgAh+QQJCgAAACwAAAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZKYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCEWBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKUMIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK++G+w48edZPK+M6hLJpQg484enXIdQFSS1u6UhksENEQAAIfkECQoAAAAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg1aBSh2GUVEIQ2aQOE+G+cD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFhlQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWMPaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm+FNRPIhjBJxKZteWuIBMN4zRMIVIhffcgojwCF117i4nlLnY5ztRLsnOk+aV+oJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkECQoAAAAsAAAAACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQkWyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0/VNB0AlcvcAYHRyZPdEQFYV8ccwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIGwAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhkPJMgTwKCdFjyPHEnKxFCDhEAACH5BAkKAAAALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBShpkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuHjYB1kYc1mwruwXKC9gmsJXliGxc+XiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOUqjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQCdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiRMDjI0Fd30/iI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQULXAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3xEgfLpBtzE/jiuL04RGEBgwWhShRgQExHBAAh+QQJCgAAACwAAAAAIAAgAAAE7xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR+ipslWIRLAgMDOR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIAACH5BAkKAAAALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwIDaH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLrROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOUjY+Yip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgGBqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd+MFCN6HAAIKgNggY0KtEBAAh+QQJCgAAACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCXaiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgevr0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1+vsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfLzOlD4WvzAHaoG9nxPi5d+jYUqfAhhykOFwJWiAAAIfkECQoAAAAsAAAAACAAIAAABPAQyElpUqnqzaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLKF0tYGKYSg+ygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0+bm4g5VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h+Kr0SJ8MFihpNbx+4Erq7BYBuzsdiH1jCAzoSfl0rVirNbRXlBBlLX+BP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA==) 50% 50% no-repeat",
					opacity: "0.7",
					backgroundColor: "#ffffff",
					filter: "alpha(opacity=70)"
				})
			} catch (y) {}
			k = 0
		};
		this.v3 = function() {
			var x = L.xw(document, "byid", "nppfs-loading-modal");
			if (L.au(x)) {
				return
			}
			nq(x).css({
				display: "none",
				width: "0px",
				height: "0px"
			});
			q = 0
		};
		var k = 0;
		this.showLoading = function() {
			if (L.au(zp.aG) || L.au(zp.aG.LD) || L.au(zp.aG.LD.DF) || zp.aG.LD.DF == true) {
				this.Wb()
			} else {
				if (!L.au(zp.aG.LD.BF) && typeof(zp.aG.LD.BF) == "function") {
					if (k > 0) {
						this.Wb()
					} else {
						k++;
						zp.aG.LD.BF()
					}
				} else {
					this.Wb()
				}
			}
		};
		var q = 0;
		this.hideLoading = function() {
			if (L.au(zp.aG) || L.au(zp.aG.LD) || L.au(zp.aG.LD.DF) || zp.aG.LD.DF == true) {
				this.v3()
			} else {
				if (!L.au(zp.aG.LD.AF) && typeof(zp.aG.LD.AF) == "function") {
					if (q > 0) {
						this.v3()
					} else {
						q++;
						this.v3()
						zp.aG.LD.AF()
					}
				} else {
					this.v3()
				}
			}
		};
		this.cZ = function(x, z) {
			var y = [];
			y.push(uV.dV.dZ);
			y.push("://");
			y.push(z);
			y.push(((uV.dV.dZ == "http" && x == 80) || (uV.dV.dZ == "https" && x == 443)) ? "" : ":" + x);
			y.push(uV.dV.iI);
			return y.join("")
		};
		this.qh = function(x, B, E) {
			if (L.au(E) || typeof(E) != "array") {
				var A = L.mL(16);
				E = new Array(4);
				E[0] = "";
				E[1] = Ye.x5;
				E[2] = L.hH(A) + L.encrypt(document.domain, L.ha(L.hH(A)), "ECB", 128);
				E[3] = "1000"
			}
			var z = E.length;
			var C = [];
			C.push(x);
			if (L.bn(B)) {
				C.push("1")
			} else {
				C.push(B)
			}
			C.push(z);
			for (var y = 0; y < z; y++) {
				C.push(L.cC(E[y]));
				C.push(E[y])
			}
			return C
		};
		this.cQ = function(x, y, z, B) {
			var A = zp.qh(x, y);
			if (!L.bn(z)) {
				A.push(z)
			}
			if (!L.bn(B)) {
				A.push(L.cC(B));
				A.push(B)
			}
			return A.join("")
		};
		var s = false;
		var j = false;
		var c = false;
		var o = [];
		var e = false;
		var f = [];
		var i = function() {
			for (var x = 0; x < f.length; x++) {
				if (typeof(f[x]) == "function") {
					L.dispatch(f[x])
				}
			}
			f = []
		};
		this.eC = function(A) {
			o = [];
			if (e == true) {
				if (typeof(A) == "function") {
					f.push(A)
				}
				return
			}
			e = true;
			if (typeof(A) == "function") {
				f.push(A)
			}
			zp.cz = false;
			if (j == false) {
				var y = L.jv("npPfsHost");
				var x = L.jv("npPfsPort");
				if (!L.bn(y) && !L.bn(x) && x > 0 && s == false) {
					Mc.log(N.m13.replace("%h%", y).replace("%p%", x));
					B(y, x, i);
					s = true
				} else {
					B("127.0.0.1", uV.dV.l5, i);
					s = true;
					j = true
				}
			} else {
				for (var z = 0; z < uV.dV.Cc; z++) {
					B("127.0.0.1", uV.dV.l5 + z, i)
				}
				c = true
			}
	
			function B(F, E, G) {
				if (zp.JF == true) {
					return
				}
				var C = "task_" + F.split(".").join("_") + "_" + E;
				if (L.indexOf(o, C) < 0) {
					o.push(C)
				}
	
				function H(P) {
					var M = "1";
					var J = L.mL(16);
					var K = L.hH(J) + L.encrypt(nua, L.ha(L.hH(J)), "ECB", 128);
					var I = M + L.cC(K) + K;
					var O = zp.cQ(Ye.d3, Ye.j3, Ye.h6, I);
					L.fs(O, P, function(R) {
						if (R.readyState == 4) {
							var Q = "";
							if (R.status == 200) {
								Q = R.responseText
							}
							P.ax(Q, P.host, P.port)
						}
					})
				}(function(K) {
					try {
						nq.extend(K, {
							host: F,
							port: E,
							timeout: D.sf ? 20 * 1000 : 10 * 10000
						});
						var J = zp.cZ(E, F);
						if (D.sf == true) {
							H(K);
							return
						}
						var I = J + "/?code=" + Ye.e2 + "&dummy=" + L.gv();
						var O = L.n5("img");
						nq(O).bind("load", function(P) {
							delete O;
							Mc.check("NOS 이미지 체크 완료, " + E);
							H(K)
						}).bind("error", function(P) {
							delete O;
							Mc.check("NOS 핸드쉐이크 - 이미지 체크 에러");
							K.ax("", F, E)
						});
						O.src = I
					} catch (M) {
						K.ax("", F, E);
						Mc.log(M)
					}
				})({
					ax: function(J, M, K) {
						var I = "task_" + M.split(".").join("_") + "_" + K;
						o.splice(L.indexOf(o, I), 1);
						var O = false;
						switch (J) {
							case Ye.a4:
								var O = true;
								break;
							case Ye.p0:
								O = true;
								zp.mW();
								break;
							case Ye.ag:
								O = true;
								r = true;
								break;
							case Ye.aj:
								O = true;
								Mc.log(N.m51.replace("%p1%", M).replace("%p2%", K));
								v = true;
								break;
							case Ye.d4:
								O = false;
								n = true;
								Mc.log(N.m15);
								break;
							default:
								O = false
						}
						if (zp.cz == false && O == true) {
							n = false;
							zp.cz = true;
							zp.c6 = M;
							zp.cB = K;
							Mc.log(N.m14.replace("%h%", M).replace("%p%", K));
							L.hf("npPfsHost", zp.c6, 7, "/");
							L.hf("npPfsPort", zp.cB, 7, "/");
							j = true;
							c = true;
							if (v == true) {
								zp.ak()
							} else {
								nq(document).trigger({
									type: "nppfs-nos-jhs",
									time: new Date()
								})
							}
							G()
						}
						if (o.length == 0) {
							e = false;
							handshakeCallback = null;
							if (n == true) {
								c = false;
								setTimeout(function() {
									zp.eC()
								}, uV.dV.kK)
							} else {
								if (c == false) {
									zp.eC()
								} else {
									if (zp.cz == false) {
										L.hf("npPfsHost", "", -1, "/");
										L.hf("npPfsPort", "", -1, "/");
										G();
										nq(document).trigger({
											type: "nppfs-nos-jhs",
											time: new Date()
										})
									}
								}
							}
						}
					}
				})
			}
		};
		this.ak = function() {
			var x = "";
			var y = uV.dV.cM;
			Mc.log("업데이트버전 경로 : " + y + "");
			var z = setTimeout(function() {
				Mc.log("업데이트버전 다운로드 실패(Timeout 10초).");
				nq(document).trigger({
					type: "nppfs-nos-jhs",
					time: new Date()
				})
			}, 10 * 1000);
			zp.cz = true;
			r = false;
			v = false;
			nq.ajax({
				url: y,
				cache: false,
				crossDomain: true,
				async: false,
				type: "GET",
				global: false,
				dataType: "jsonp",
				jsonp: "jsonp_callback",
				jsonpCallback: "VersionInfo",
				contentType: "application/json",
				error: function(C, B, A) {
					clearTimeout(z);
					nq(document).trigger({
						type: "nppfs-nos-jhs",
						time: new Date()
					})
				},
				success: function(C, B, G) {
					clearTimeout(z);
					if (L.bn(C)) {
						nq(document).trigger({
							type: "nppfs-nos-jhs",
							time: new Date()
						});
						return
					}
					var A = C;
					Mc.log("업데이트버전 정보 : " + A);
					var E = "1";
					var F = zp.cQ(Ye.d3, Ye.j3, Ye.am, (E + L.cC(A) + A));
					L.fs(F, {
						ax: function(H) {
							switch (H) {
								case Ye.h5:
									r = false;
									break;
								case Ye.a4:
									r = true;
								default:
									break
							}
							v = false;
							nq(document).trigger({
								type: "nppfs-nos-jhs",
								time: new Date()
							});
							Mc.check("NOS 핸드쉐이크 - 버전비교 종료")
						}
					})
				},
				complete: function(B, A) {
					clearTimeout(z);
					Mc.check("NOS 핸드쉐이크 - 버전얻기 종료")
				}
			})
		};
		this.isInstall = function(x) {
			if (L.au(x)) {
				x = {}
			}
			if (L.au(x.success)) {
				x.success = function() {}
			}
			if (L.au(x.fail)) {
				x.fail = function() {}
			}
			if (L.bn(this.cB) || this.cB <= 0 || r == true) {
				zp.eC(function() {
					if (zp.cz == false || r == true) {
						x.fail()
					} else {
						x.success()
					}
				})
			} else {
				x.success()
			}
		};
		var m = false;
		this.checkInstall = function(x) {
			if (L.au(x)) {
				x = {}
			}
			if (L.au(x.before)) {
				x.before = function() {}
			}
			if (L.au(x.after)) {
				x.after = function() {}
			}
			if (m == false) {
				x.before();
				m = true
			}
			zp.eC(function() {
				if (zp.cz == false || r == true || v == true) {
					if (r == true || L.bn(this.cB) || this.cB <= 0) {
						r = false
					}
					setTimeout(function() {
						j = false;
						c = false;
						Mc.log("zp.checkInstall(callbacks);");
						zp.checkInstall(x)
					}, 2 * 1000);
					return
				} else {
					x.after()
				}
			})
		};
		var d = null;
	
		function u() {
			if (zp.cz == false || zp.JF == true) {
				return
			}
	
			function y(H) {
				try {
					if (L.parseKeepAliveResult(H, function() {
							if (d != null) {
								clearInterval(d);
								d == null
							}
							setTimeout(function() {
								u()
							}, 3000)
						})) {
						return
					}
					if (d == null) {
						d = setInterval(u, 3000)
					}
				} catch (I) {}
			}
			nq(document).trigger({
				type: "nppfs-keep-alive",
				message: N.m52,
				time: new Date()
			});
	
			function x(I, H) {
				I = I + "";
				return I.length >= H ? I : new Array(H - I.length + 1).join("0") + I
			}
			var E = 0;
			if (zp.aG.FW && npNCtrl.isRunning()) {
				E += 1
			}
			if (zp.aG.SK && bh.isRunning()) {
				E += 2
			}
			if (zp.aG.FD && Xv.isRunning()) {
				E += 4
			}
			if (zp.aG.KV && npVCtrl.isRunning()) {
				E += 8
			}
			E = x(E, 4);
			var z = L.mL(16);
			var A = [];
			A.push(L.hH(z) + L.encrypt(E, L.ha(L.hH(z)), "ECB", 128));
			var F = A.length.toString(16);
			for (var C = 0; C < A.length; C++) {
				var G = A[C];
				F += L.cC(G) + G
			}
			var B = zp.cQ(Ye.d3, Ye.j3, Ye.d8, F);
			if (D.win) {
				L.fs(B, {
					ax: y
				})
			} else {
				L.fs(B, {
					ax: y
				})
			}
		}
	
		function a() {
			if (zp.JF == true) {
				return
			}
			if (d != null) {
				clearInterval(d)
			}
			d = setInterval(u, 3000)
		}
	
		function g() {
			if (d != null) {}
		}
		this.isSupport = function() {
			var x = hI.iS();
			var y = false;
			nq(x).each(function() {
				if (!L.au(this.controller) && !L.au(this.controller.isSupported) && typeof(this.controller.isSupported) == "function") {
					y = this.controller.isSupported();
					return !y
				}
			});
			return y
		};
		this.GetReplaceField = function(x, y) {
			if (bh.isRunning() == true) {
				return bh.iu(x, y)
			}
		};
		this.GetResultField = function(x, y) {
			if (bh.isRunning() == true) {
				return bh.im(x, y)
			}
		};
		this.RegistDynamicField = function(y, A) {
			try {
				var x = document.activeElement;
				if (!L.au(x) && x.tagName && x.tagName.toLowerCase() == "input" && (x.type == "password" || x.type == "text" || x.type == "tel")) {
					zp.v4 = x
				}
			} catch (z) {}
			if (bh.isRunning() == true) {
				bh.eX(y, A)
			}
		};
		this.ResetField = function(y, x) {
			if (bh.isRunning() == true) {
				bh.iM(y, x)
			}
		};
		this.RescanField = function() {
			try {
				var x = document.activeElement;
				if (!L.au(x) && x.tagName && x.tagName.toLowerCase() == "input" && (x.type == "password" || x.type == "text" || x.type == "tel")) {
					zp.v4 = x
				}
			} catch (y) {}
			this.jl();
			if (bh.isRunning() == true) {
				bh.cU()
			}
		};
		this.cI = null;
		this.SetGlobalKeyValidation = function(x) {
			this.cI = null;
			if (L.au(x)) {
				return
			}
			if (typeof(x) !== "function") {
				return
			}
			this.cI = x
		};
		this.jl = function() {
			nq(nq("form")).each(function(y, z) {
				var x = nq(this);
				L.xw(this, "byclass", "nppfs-elements");
				var A = "d" + L.hH(L.mL(8));
				if (L.bn(x.attr("name"))) {
					x.attr({
						name: A
					})
				}
				if (L.bn(x.attr("data-nppfs-form-id"))) {
					x.attr({
						"data-nppfs-form-id": A
					})
				}
			});
			nq("input").each(function() {
				var x = nq(this).attr("type");
				if (L.bn(x)) {
					nq(this).attr("type", "text");
					x = "text"
				}
				if (!L.bn(x) && x != "text" && x != "password" && x != "tel") {
					return true
				}
			})
		};
		this.encryptValue = function(y, x) {
			if (typeof(x) != "function") {
				alert(N.m53);
				return
			}
			if (L.bn(y)) {
				x("");
				return
			}
			if (zp.cz == false || zp.JF == true) {
				alert("NOS와 통신할 수 없습니다. npPfsStartup()으로 먼저 페이지를 초기화하십시오.");
				x("");
				return
			}
			var B = L.hH(L.getBytes(y));
			var z = "1";
			var C = z + L.cC(B) + B;
			var A = zp.cQ(Ye.d3, Ye.j3, Ye.dG, C);
			L.fs(A, {
				ax: function(E) {
					if (!L.bn(E)) {
						x(E);
						return
					}
					x("")
				}
			})
		};
		this.dynamicField = {};
		this.putDynamicField = function(y, A, C) {
			var z = nq("form[name='" + y + "']").attr("name") + "_";
			var x = z + nq("input[name='" + A + "']").attr("name");
			var B = this.dynamicField[x];
			if (L.au(B)) {
				this.dynamicField[x] = [C]
			} else {
				this.dynamicField[x].push(C)
			}
		};
		this.getDynamicField = function(y, A) {
			var z = nq(y).attr("name") + "_";
			var x = z + nq("input[name='" + A + "']").attr("name");
			var B = this.dynamicField[x];
			if (L.au(B)) {
				return []
			}
			return this.dynamicField[x]
		};
	
		function l(y) {
			var z = [ad.wG, ad.Ix, ad.jd, "i_borun", "i_e2e_id", "i_e2e_key", "i_tot_hash", "i_log_total", "i_elapsed_tm", "i_log_yn", "i_version", "i_tot_log", "f_uuid", "f_key", "f_uuid"];
			for (var x = 0; x < z.length; x++) {
				if (z[x] == y) {
					return x
				}
			}
			return -1
		}
		this.serializeArray = function(y, z) {
			var x = (typeof(y) == "object" && y != null) ? y : L.bZ(y);
			z = typeof(z) == "undefined" ? true : z;
			if (z == false) {
				return nq(x).serializeArray()
			}
			var A = [];
			nq.each(nq(x).serializeArray(), function() {
				if (this.name.indexOf("__E2E__") > 0 || this.name.indexOf("__KI_") == 0 || this.name.indexOf("__KH_") == 0 || this.name.indexOf("__KU_") == 0 || l(this.name) >= 0) {
					A.push(this)
				}
			});
			return A
		};
		this.toJson = function(y) {
			var z = {};
			var x = (typeof(y) == "object" && y != null) ? y : L.bZ(y);
			nq.each(nq(x).serializeArray(), function() {
				if (z[this.name] !== undefined) {
					if (!z[this.name].push) {
						z[this.name] = [z[this.name]]
					}
					z[this.name].push(this.value || "")
				} else {
					z[this.name] = this.value || ""
				}
			});
			return z
		};
		this.setColor = function(x) {
			bh.setColor(x)
		};
		this.doFocusOut = function(y, x) {
			bh.doFocusOut(y, x)
		};
		this.IsVirtualMachine = this.isVirtualMachine;
		this.IsMetroUi = this.isMetroUi;
		this.IsInstall = this.isInstall;
		this.IsSupport = this.isSupport;
		this.CheckInstall = this.checkInstall
	};
	w.npPfsCtrl = zp;
	w.npNCtrl = new function() {
		this.id = "nppfs.npn.module";
		var k = {
			gP: Ye.p8,
			support: {
				aF: {
					aX: true,
					di: {
						qs: "5.0",
						Oc: "10.0"
					},
					al: {
						IE: {
							aX: true,
							qs: "7.0",
							Oc: "11.0"
						},
						FF: {
							aX: true,
							qs: "21.0",
							Oc: "57.0.4"
						},
						CR: {
							aX: true,
							qs: "30.0"
						},
						OP: {
							aX: true,
							qs: "9.0",
							Oc: "50.0"
						},
						SF: {
							aX: true,
							qs: "5.0"
						},
						EG: {
							aX: true,
							qs: "12.0"
						},
						fv: {
							aX: false
						},
						B360: {
							aX: true,
							qs: "7.5"
						},
						QQ: {
							aX: true,
							qs: "38.0"
						}
					}
				},
				jV: {
					aX: true,
					di: {
						qs: "10.8",
						Oc: "10.12"
					},
					al: {
						IE: {
							aX: false
						},
						FF: {
							aX: true,
							qs: "21.0"
						},
						CR: {
							aX: true,
							qs: "30.0"
						},
						SF: {
							aX: true,
							qs: "6.0"
						},
						OP: {
							aX: true,
							qs: "18.0"
						}
					}
				},
				bx: {
					aX: false
				}
			}
		};
		var f = false;
		this.isRunning = function() {
			return f
		};
		this.isRunnable = function() {
			return zp.aG.FW && this.isSupported()
		};
		this.isSupported = function() {
			if (D.isMobileDevice() || D.isMetroUi()) {
				return false
			}
			return D.isSupported(k.support)
		};
		var b = "6ce87e35c918b49a26c8cd76c650e7900ceed03122d73c264bb97b1ca27be009";
		var o = "9444f65bf9085ec8d2f7f55543d97f49c4cadb09032813d1bc1c78257c7003c8";
		var d = "a8ad8a0104204dfd007bdd84d2e5f833462ce6fcd9b2805c2efdbe00ee6ac570";
		var q = "b1e28879de88442ce6196e0c03ce7e4dc8bf0c80c93c5b1a6dd42997017106dc";
		var l = "01206b96443d2995da2db2e6e7e8127da4b5ca9650e66a6b65bf7ce3a09b00e0edba071754a009f8bc1f25985b48bfca017ff2bae556d2d237d2cfeef1236cc1c0b085b9fc504b20a0275ea43607484d263b486ca13cec1e4f99f9523a4402c0f0c6d1be5184759e7bd1d675931792ff8c8a05196b985c330b6d68c9fb241424c976530d7622073834f731c56ba221864a18";
		var a = "59dec2d958b19375e9b703c08177c23811ced188a4b630721f269a3c94cdaf84";
		var p = "a1cd40c176c39aa555d09b98b1d1b2fc650951e010b1d90c3b738fb7754fcdd5";
		var g = "e9cd73a7d464582e0111b79bd7c26a5ab34dc100650cbab42114b2bed702a435bd03f52f7ef3eb87ad502d0415dbcf6058caa3693b5615ac3a2f6ad2a072d6af332a733fee0445e6795e5f2f9de96b658a60e6fd1289c169202343e351d837c9545734261a08ddbda36b0a1bef0e849e";
		var c = "36186376b33612a64d5bd5ada250efe564229ba2e395315e22e5b96b177e0f4d";
		var n = "2b48c8475e5953fbef5cdf0cacfc1947043a9501d00f42ab589dc657cb8fb507";
		var m = "3d401a0419842613f69daffb8c0e9d4b6c1aafd8679edf0a52d59d110d1b83a465bc421dbbcc1ebb90b23909088dee3f907959789b1b66fc0ceca2e77b5ff96fba0e02e5d1781a7cebf596c018191dcc955862c88794e1d87b7120722bcfb3ebda57c18020b48f5f83dc04971b9bda12";
		var i = null;
	
		function j(t, y, x) {
			try {
				var v = zp.qh(k.gP, Ye.j3);
				if (!L.bn(t)) {
					v.push(t)
				}
				if (!L.bn(y)) {
					v.push(L.cC(y));
					v.push(y)
				}
				L.fs(v.join(""), x)
			} catch (u) {}
		}
	
		function e() {
			if (i != null) {
				i = null
			}
		}
	
		function r(t) {
			if (zp.JF == true) {
				return
			}
	
			function u(v) {
				if (L.parseKeepAliveResult(v, function() {
						e();
						setTimeout(function() {
							r()
						}, uV.dV.kK)
					})) {
					return
				}
				if (i == null) {
					i = setInterval(r, 3000)
				}
			}
			if (D.win) {} else {
				if (D.mac) {
					nq(document).trigger({
						type: "nppfs-npn-keep-alive",
						message: N.m55,
						time: new Date()
					});
					j(null, g, {
						ax: u
					})
				} else {
					if (D.lnx) {
						nq(document).trigger({
							type: "nppfs-npn-keep-alive",
							message: N.m55,
							time: new Date()
						});
						j(null, m, {
							ax: u
						})
					}
				}
			}
		}
		this.init = function() {};
		this.startup = function() {
			if (zp.cz == false || zp.JF == true || s == true) {
				nq(document).trigger({
					type: "nppfs-module-startup",
					target: npNCtrl.id,
					time: new Date()
				});
				return
			}
			nq(document).trigger({
				type: "nppfs-npn-before-startup",
				message: N.m56,
				time: new Date()
			});
			e();
	
			function t(u) {
				if (L.r9(u, function() {
						npNCtrl.startup()
					})) {
					return
				}
				s = true;
				nq(document).trigger({
					type: "nppfs-module-startup",
					target: npNCtrl.id,
					time: new Date()
				});
				nq(document).trigger({
					type: "nppfs-npn-after-startup",
					message: N.m57,
					time: new Date()
				})
			}
			if (D.win) {
				j(b + l, null, {
					ax: t
				})
			} else {
				if (D.mac) {
					j(null, a, {
						ax: t
					})
				} else {
					if (D.lnx) {
						j(null, c, {
							ax: t
						})
					}
				}
			}
			i = setInterval(r, 3000);
			f = true
		};
		var s = false;
		this.bA = function() {
			if (!this.isSupported() || !this.isRunnable()) {
				return true
			}
			return s
		};
		this.bm = function() {
			e();
			nq(document).trigger({
				type: "nppfs-npn-finalized",
				message: N.m58,
				time: new Date()
			})
		}
	};
	hI.define({
		id: npNCtrl.id,
		name: "nProtect Online Security V1.0, Network Protection",
		handshake: true,
		endtoend: false,
		runvirtualos: true,
		controller: npNCtrl,
		isExecutable: function(a) {
			return (typeof(a.FW) != "undefined") ? a.FW : true
		}
	});
	w.bh = new function() {
		this.id = "nppfs.npk.module";
		var b = {
			gP: Ye.x2,
			support: {
				aF: {
					aX: true,
					di: {
						qs: "5.0",
						Oc: "10.0"
					},
					al: {
						IE: {
							aX: true,
							qs: "7.0",
							Oc: "11.0"
						},
						FF: {
							aX: true,
							qs: "21.0",
							Oc: "57.0.4"
						},
						CR: {
							aX: true,
							qs: "30.0"
						},
						OP: {
							aX: true,
							qs: "18.0",
							Oc: "50.0"
						},
						SF: {
							aX: true,
							qs: "5.0"
						},
						EG: {
							aX: true,
							qs: "12.0"
						},
						fv: {
							aX: false
						},
						B360: {
							aX: true,
							qs: "7.5"
						},
						QQ: {
							aX: true,
							qs: "38.0"
						}
					}
				},
				jV: {
					aX: true,
					di: {
						qs: "10.8",
						Oc: "10.11"
					},
					al: {
						IE: {
							aX: false
						},
						FF: {
							aX: true,
							qs: "18.0"
						},
						CR: {
							aX: true,
							qs: "21.0"
						},
						SF: {
							aX: true,
							qs: "6.0"
						},
						OP: {
							aX: true,
							qs: "30.0"
						}
					}
				},
				bx: {
					aX: false
				}
			},
			eK: {
				hZ: "#FF0000",
				gx: "#A9D0F5",
				Kq: "#FF0000",
				Xe: "#AFD7AF"
			}
		};
		var m = false;
		this.isRunning = function() {
			return m
		};
		this.isRunnable = function() {
			var U = zp.aG.SK && this.isSupported();
			return U
		};
		this.isSupported = function() {
			if (D.isMobileDevice() || D.isMetroUi()) {
				return false
			}
			if (D.virtualMachine == true) {
				return false
			}
			return D.isSupported(b.support)
		};
		var Q = "9e83cf96783aba2c09c12612d2f7d40d5ec96dbb0e02bd2ca0d53bb780801e82";
		var g = "18d908b69c71ec784dff3c1e8db17c163d59121eda2514a456a5a7675af603e0";
		var s = "4e4e84c396bd0d34f2672133425f1c9ef04e41f576b38c48eca1cb661d88844d";
		var K = "567c0d18e63fab365edbf75ed21c7a296bd5b1721d6b11f7cdb5353a74a7a500";
		var a = "9fd09c2ada47189c2510aec7b265062c9642ac5c62d817060b1652555095cd90";
		var d = "05991c862e92c7d26f4bccb1b15bccff1a9964d5ce0a510c5fd04d21ea75babb";
		var O = "2e84222adb96cd31c06e5430eb0eedd2afcff345041b4d005abb9524a6450936";
		var j = "e869ed24abb4988a9691a467b7d3cbc9345a35326279bb8773d6ee7de32e17a6";
		var M = "eb61d30e96b6d5a204e2d035c3dfae49782b3d6b2b09eb6a3734cda16b49179b";
		var J = "e52539d3b948fc288912f40f6741f6b68b36064ab9ef64a2f2110bcda7ca6a97";
		var H = "f6880a728c56d2bf9584ca4bbd268b826d6d9ded904c4085ff93fbf0df95a96c";
		var R = "38aef05a6d2b38bebaa9dd06c332e74fe62343af454f44e5b83fa40b12947ec2";
		var u = "e0a699e4a930ea29e0f5f2a08cef84e71181bf624d3d2a99df00c0893ec068d7";
		var T = "e37cfd81c3ea2db07175e841444bcfe92872d2db6dbea5bbfa1a388c5d26c0cb";
		this.ID = "";
		this.av = null;
		this.uuid = null;
		this.dn = null;
		this.hb = null;
		this.Qb = "";
		this.useInitechHex = "off";
	
		function B(U, Y, X) {
			try {
				var W = zp.qh(b.gP, Ye.j3);
				W.push(U);
				W.push(Y);
				return L.fs(W.join(""), X)
			} catch (V) {}
		}
		this.send = function(U, W, V) {
			B(U, W, V)
		};
		var p = function(V, W) {
			var U = nq(V).attr(W);
			return (L.au(U)) ? "" : U.toLowerCase()
		};
		this.init = function() {
			this.uuid = zp.uuid;
			this.dn = zp.dn
		};
		var P = false;
		this.bA = function() {
			if (!this.isSupported() || !this.isRunnable()) {
				return true
			}
			return P
		};
		this.startup = function() {
			if (zp.cz == false || zp.JF == true) {
				return
			}
			F()
		};
		this.bm = function() {
			if (zp.cz == false) {
				return
			}
			bh.doFocusOut();
			var U = O + "=" + bh.ID;
			B(Q, U, {
				async: false,
				direct: true
			});
			nq(document).trigger({
				type: "nppfs-npk-finalized",
				message: N.m99,
				time: new Date()
			})
		};
	
		function F() {
			Mc.check("NPK 초기화 시작");
			if (!bh.isSupported()) {
				nq(document).trigger({
					type: "nppfs-npk-jksc",
					time: new Date()
				});
				P = true;
				return
			}
			nq(document).trigger({
				type: "nppfs-npk-before-startup",
				message: "키보드보안을 시작합니다.",
				time: new Date()
			});
			nq(document).bind("nppfs-npk-jks nppfs-npk-jkc nppfs-npk-jki nppfs-npk-jkrf nppfs-npk-jksc", function(U) {
				nq(document).unbind(U);
				switch (U.type) {
					case "nppfs-npk-jks":
						nq(document).trigger({
							type: "nppfs-npk-jkc",
							time: new Date()
						});
						break;
					case "nppfs-npk-jkc":
						t();
						break;
					case "nppfs-npk-jki":
						Mc.check("NPK 초기화 완료");
						r();
						break;
					case "nppfs-npk-jkrf":
						k();
						Mc.check("NPK 필드등록 완료");
						nq(document).trigger({
							type: "nppfs-npk-jksc",
							time: new Date()
						});
						break;
					case "nppfs-npk-jksc":
						P = true;
						nq(document).trigger({
							type: "nppfs-npk-after-startup",
							message: "키보드보안이 정상적으로 시작되었습니다.",
							time: new Date()
						});
						Mc.check("NPK 시작 완료");
						nq(document).trigger({
							type: "nppfs-module-startup",
							target: bh.id,
							time: new Date()
						});
						break
				}
			});
			if (P == true) {
				bh.cU();
				return
			}
			m = true;
			B(Q, d, {
				ax: function(U) {
					if (L.r9(U, function() {
							F()
						})) {
						return
					}
					var V = U.split("&&");
					if (V[0] == "ID") {
						if (L.bn(V[1])) {
							bh.startup();
							return
						}
						bh.ID = V[1]
					}
					nq(document).trigger({
						type: "nppfs-npk-jks",
						time: new Date()
					})
				}
			})
		}
	
		function k() {
			try {
				if (document.hasFocus()) {
					var U = zp.v4;
					if (!L.au(U) && U.tagName && U.tagName.toLowerCase() == "input" && (U.type == "password" || U.type == "text" || U.type == "tel")) {
						U.blur();
						U.focus();
						zp.v4 = null;
						if (!L.bn(U.name)) {
							Mc.log(N.m24.replace("%p%", U.name))
						}
					}
				}
			} catch (V) {}
		}
	
		function i() {
			if (zp.JF == true) {
				return
			}
			var V = [];
			V.push("Cert=");
			V.push("PKI=5");
			V.push("CertEnc=" + bh.dn);
			V.push("ID=" + bh.ID);
			B(g, V.join("&"), {
				ax: function(X) {
					if (L.r9(X, function() {
							i()
						})) {
						return
					}
					nq(document).trigger({
						type: "nppfs-npk-jkci",
						time: new Date()
					})
				}
			});
	
			function W(X) {
				setTimeout(function() {
					nq(document).trigger({
						type: X,
						time: new Date()
					})
				}, uV.dV.kK)
			}
			var U = 0;
			nq(document).bind("nppfs-npk-jkci", function(X) {
				if (U >= uV.dV.Qa) {
					alert(N.m19);
					U = 0;
					nq(document).trigger({
						type: "nppfs-npk-jkc",
						time: new Date()
					});
					return
				}
				var Y = R + "=" + bh.ID;
				B(Q, Y, {
					ax: function(Z) {
						if (L.r9(Z, function() {
								U++;
								W("nppfs-npk-jkci")
							})) {
							return
						}
						var ab = Z.split("&&");
						if (L.au(ab) || ab.length != 2) {
							U++;
							W("nppfs-npk-jkci");
							return
						}
						if (ab[0] == "CLIENTADDRESS") {
							var aa = ab[1].split("&^&");
							if (L.au(aa) || aa.length != 2 || L.bn(aa[1])) {
								U++;
								W("nppfs-npk-jkci");
								return
							}
							bh.hb = aa[1]
						}
						nq(document).trigger({
							type: "nppfs-npk-jkc",
							time: new Date()
						});
						U = 0
					}
				})
			})
		}
	
		function t() {
			if (zp.JF == true) {
				return
			}
			var U = u + "=" + bh.ID;
			B(Q, U, {
				ax: function(V) {
					if (L.r9(V, function() {
							t()
						})) {
						return
					}
					var X = V.split("&&");
					if (L.au(X) || X.length != 2) {
						t();
						return
					}
					if (X[0] == "ENCREPLACETABLE") {
						var W = X[1].split("&^&");
						if (L.au(W) || W.length != 2 || L.bn(W[1])) {
							t();
							return
						}
						if (L.bn(bh.Qb)) {
							bh.Qb = W[1]
						}
					}
					nq(document).trigger({
						type: "nppfs-npk-jki",
						time: new Date()
					})
				}
			})
		}
		this.cU = function() {
			r();
			nq(document).bind("nppfs-npk-jkrf", function(U) {
				nq(document).unbind(U);
				k()
			})
		};
	
		function r() {
			var U = 0;
			nq("input").each(function() {
				var W = nq(this).attr("type");
				if (L.bn(W)) {
					nq(this).attr("type", "text");
					W = "text"
				}
				if (!L.bn(W) && W != "text" && W != "password" && W != "tel") {
					return true
				}
				var V = nq(this).attr("name");
				if (L.bn(V)) {
					nq(this).attr("name", nq(this).attr("id"))
				}
			});
			nq("input[type=text], input[type=password], input[type=tel]").each(function() {
				var V = this;
				var X = this.form;
				var W = nq(V).attr("name");
				if (L.bn(W) || W == ad.Ix || W == ad.wG || W == ad.jd) {
					return true
				}
				if (W.indexOf("__E2E__") > 0 || W.indexOf("__KI_") == 0 || W.indexOf("__KH_") == 0) {
					return true
				}
				if (nq(V).hasClass("nppfs-npk")) {
					return true
				}
				if (typeof(npPfsExtension) != "undefined" && typeof(npPfsExtension.secureKeyUiModifier) == "function") {
					npPfsExtension.secureKeyUiModifier(V)
				}
				var Y = p(V, zp.aG.AN);
				if (Y === "off" || L.arrayNotIn(["re", "sub", "des", "key"], Y)) {
					return true
				}
				V.blur();
				nq(document).trigger({
					type: "nppfs-npk-before-regist-field",
					message: N.m61.replace("%p1%", V.name),
					target: V,
					form: (!L.au(X)) ? nq(X).attr("name") : null,
					name: V.name,
					time: new Date()
				});
				bh.f7(X, V);
				U++
			});
			if (U == 0) {
				nq(document).trigger({
					type: "nppfs-npk-jkrf",
					time: new Date()
				});
				return
			}
		}
	
		function I(U) {
			var W = p(U, zp.aG.AN);
			var V = "OFF";
			if (L.bn(W)) {
				V = "OFF"
			} else {
				if (W === "key") {
					V = "OFF"
				} else {
					if (W === "re") {
						V = "RE"
					} else {
						if (W === "sub") {
							V = "SUB"
						} else {
							if (W === "des") {
								V = "DES"
							} else {
								V = "OFF"
							}
						}
					}
				}
			}
			return V
		}
	
		function y(U) {
			var Y = "ON";
			try {
				var Z = p(U, "style");
				var ab = Z.split(";");
				for (var X = 0; X < ab.length; X++) {
					var V = L.trim(ab[X]);
					if (V.indexOf("ime-mode:") == 0 || V.indexOf("-ms-ime-mode:") == 0) {
						var W = ab[X].split(":");
						if (L.trim(W[1]) == "disabled") {
							Y = "OFF";
							break
						}
					}
				}
			} catch (aa) {}
			return Y
		}
	
		function e(U) {
			var W = nq(U).attr("name");
			var V = "";
			var X = p(U, zp.aG.AN);
			if (L.arrayIn([zp.aG.AV, "db", "re", "sub", "des"], X)) {
				V = W + "__E2E__"
			}
			return V
		}
	
		function c(V) {
			var W = "";
			var U = nq(V);
			var X = p(V, zp.aG.AN);
			if (L.arrayIn(["re", "sub", "des"], X)) {
				U.css({
					color: b.eK.Kq,
					"background-color": b.eK.Xe
				})
			} else {
				if (L.arrayIn([zp.aG.AV, "db"], X) && false) {
					U.css({
						color: b.eK.hZ,
						"background-color": b.eK.gx
					})
				}
			}
		}
		var f = [];
		this.f7 = function(Z, W) {
			if (typeof(W) == "string") {
				W = L.bZ(W, Z)
			}
			if (typeof(W) == "undefined") {
				return bs
			}
			var V = nq(W);
			var X = nq(Z);
			if (V.hasClass("nppfs-npk")) {
				return true
			}
			var ab = p(W, zp.aG.AN);
			var Y = L.au(Z) ? "blank" : X.attr("name");
			var U = "task_" + V.attr("name") + "_" + Y;
			if (L.indexOf(f, U) < 0) {
				f.push(U)
			}
			V.addClass("nppfs-npk");
			if (D.ie) {
				V.bind("contextmenu dragstart click focusin focusout keypress selectstart keydown", function(ac) {
					return l(ac)
				})
			} else {
				V.bind("contextmenu dragstart click focus blur keypress selectstart keydown", function(ac) {
					return l(ac)
				})
			}
			if (L.arrayIn([zp.aG.AV, "db"], ab)) {
				V.attr({
					autocorrect: "off",
					spellcheck: "false",
					autocomplete: "off",
					autocapitalize: "off"
				})
			}
			var aa = [];
			aa.push("name=" + W.name);
			aa.push("Length=" + W.maxLength);
			aa.push("type=" + W.type);
			aa.push("E2E=" + I(W));
			aa.push("ID=" + bh.ID);
			aa.push("IME=" + y(W));
			aa.push("Dummy=ON");
			B(s, aa.join("&"), {
				ax: function(ac) {
					if (L.r9(ac, function() {
							bh.f7(Z, W)
						})) {
						return
					}
					var ae = p(W, zp.aG.AN);
					if (!L.bn(ac)) {
						c(W);
						nq(document).trigger({
							type: "nppfs-npk-after-regist-field",
							message: N.m62.replace("%p1%", V.attr("name")),
							target: W,
							form: (!L.au(Z)) ? X.attr("name") : null,
							name: W.name,
							time: new Date()
						})
					}
					f.splice(L.indexOf(f, U), 1);
					if (f.length == 0) {
						nq(document).trigger({
							type: "nppfs-npk-jkrf",
							time: new Date()
						})
					}
				}
			});
			if (!L.bn(e(W))) {
				L.c1(Z, [e(W)]);
				npPfsCtrl.putDynamicField(Z, W.name, [e(W)])
			}
		};
		this.iM = function(V, U) {
			if (typeof(U) == "string") {
				U = L.bZ(U, V)
			}
			if (typeof(U) == "undefined") {
				return
			}
			U.value = "";
			var W = z(U);
			if (!L.au(W)) {
				W.value = ""
			}
		};
		this.setColor = function(U) {
			b.eK.hZ = U.TextColor;
			b.eK.gx = U.FieldBgColor;
			b.eK.Kq = U.ReTextColor;
			b.eK.Xe = U.ReFieldBgColor
		};
	
		function l(W) {
			var V = true;
			var X = W.target ? W.target : W.srcElement;
			try {
				if (L.au(W) || zp.JF == true || bh.ID == "") {
					L.so(W);
					return false
				}
				switch (W.type) {
					case "contextmenu":
					case "dragstart":
						L.so(W);
						break;
					case "selectstart":
						if (D.op) {
							L.so(W);
							V = false
						}
						var Z = p(X, zp.aG.AN);
						if (Z !== "" && Z !== "key") {
							L.so(W)
						}
						break;
					case "focusin":
					case "focus":
						V = x(W);
						break;
					case "focusout":
					case "blur":
						V = n(W);
						break;
					case "click":
						V = G(W);
						break;
					case "keydown":
						V = o(W);
						break;
					case "keypress":
						if (typeof(bh) == "undefined" || bh == null) {
							return false
						}
						if (D.ff) {
							var U = U = W.which;
							if (U == 8 || W.keyCode == 9) {
								return true
							}
							if (112 <= W.keyCode && W.keyCode <= 123) {
								return true
							}
							L.so(W);
							if ((W.ctrlKey == true && U == 97) || (W.ctrlKey == true && U == 99) || (W.ctrlKey == true && U == 118) || (W.ctrlKey == true && U == 120)) {
								V = false
							}
						}
						break
				}
			} catch (Y) {}
			return V
		}
	
		function G(U) {
			if (typeof(bh) == "undefined" || bh == null) {
				return false
			}
			try {
				var Z = U.target ? U.target : U.srcElement;
				if (Z.type == "text" || Z.type == "password" || Z.type == "tel") {
					var W = p(Z, zp.aG.AN);
					if (L.arrayIn(["db", "re", "sub", "des"], W)) {
						var ab = Z.value.length;
						if (Z.createTextRange) {
							var Y = Z.createTextRange();
							Y.move("character", ab);
							Y.select()
						} else {
							if (Z.setSelectionRange) {
								Z.setSelectionRange(ab, ab)
							} else {}
						}
					} else {
						if (W === "key") {
							var Y = q(Z);
							var V = Y.start;
							var X = Y.end;
							var ac = Z.value.length;
							var ab = S(Z);
							if (V != X || (ac > 0 && ab <= ac - 1)) {
								C = true
							} else {
								C = false
							}
						}
					}
				}
			} catch (aa) {}
		}
	
		function x(U) {
			if (typeof(bh) == "undefined" || bh == null) {
				return false
			}
			try {
				var W = U.target ? U.target : U.srcElement;
				if (nq(W).prop("readonly") == true || nq(W).prop("disabled") == true) {
					L.so(U);
					return
				}
				if (!nq(W).is(":visible")) {
					W = null;
					L.so(U);
					return false
				}
				if (!L.au(W)) {
					W.selectionStart = 0;
					W.selectionEnd = 0;
					if (!D.ie && !D.qq) {
						W.focus()
					}
					bh.av = W;
					var Z = p(W, zp.aG.AN);
					if ((L.arrayIn([zp.aG.AV, "db"], Z) && false) || L.arrayIn(["re", "sub", "des"], Z)) {
						W.value = "";
						var V = z(W);
						if (!L.au(V)) {
							V.value = ""
						}
					}
					var Y = j + "=" + bh.ID + "=" + W.name;
					B(Q, Y, {
						ax: function(aa) {
							if (!D.CB()) {
								if (L.r9(aa, function() {
										x(U)
									})) {
									return
								}
							}
							var ac = q(W);
							var ag = ac.start;
							var ab = ac.end;
							var ae = W.value.length;
							var af = S(W);
							if (ag != ab || (ae > 0 && af <= ae - 1)) {
								C = true
							} else {
								C = false
							}
						}
					});
					nq(document).trigger({
						type: "nppfs-npk-focusin",
						message: N.m63.replace("%p1%", nq(W).attr("name")),
						target: W,
						form: (!L.au(W.form)) ? nq(W.form).attr("name") : null,
						name: W.name,
						time: new Date()
					})
				}
			} catch (X) {}
		}
		this.doFocusOut = function(W, U) {
			if (L.au(bh.av)) {
				return
			}
			if (L.au(W)) {
				W = bh.av
			}
			var V = M + "=" + bh.ID + "=" + bh.av.name;
			B(Q, V, {
				direct: true,
				ax: function(X) {
					if (!D.CB()) {
						if (L.r9(X, function() {
								bh.doFocusOut(W)
							})) {
							return
						}
					}
					nq(document).trigger({
						type: "nppfs-npk-focusout",
						message: N.m64.replace("%p1%", nq(W).attr("name")),
						target: W,
						form: (!L.au(W.form)) ? nq(W.form).attr("name") : null,
						name: nq(W).attr("name"),
						time: new Date()
					});
					nq(bh.av).trigger({
						type: "change"
					});
					if (typeof(U) == "function") {
						U(W)
					}
				}
			});
			bh.av = null
		};
	
		function n(U) {
			if (typeof(bh) == "undefined" || bh == null) {
				return false
			}
			var V = U.target ? U.target : U.srcElement;
			bh.doFocusOut(V)
		}
	
		function o(U) {
			if (typeof(bh) == "undefined" || bh == null) {
				return false
			}
			try {
				var V = U.target ? U.target : U.srcElement;
				if (L.au(V) || (V.type != "text" && V.type != "password" && V.type != "tel") || L.au(bh.av)) {
					L.so(U);
					return false
				}
				var V = bh.av;
				var Y = p(V, zp.aG.AN);
				Mc.log("키보드보안 키다운 이벤트발생 : " + V.name + " : " + V.value + " : " + U.keyCode);
				try {
					if (Y !== "key" && U.keyCode == 8) {
						L.so(U)
					}
				} catch (X) {}
				if (D.mac && D.sf) {
					if (U.keyCode == 38) {
						U.keyCode = 49
					} else {
						if (U.keyCode == 40) {
							U.keyCode = 32
						}
					}
				}
				if ((U.ctrlKey == true || U.metaKey == true) && (U.keyCode == 67 || U.keyCode == 86 || U.keyCode == 88)) {
					L.so(U);
					return false
				}
				if (U.keyCode == 93) {
					L.so(U);
					return false
				}
				if (L.arrayIn([33, 34, 38, 40, 45], U.keyCode)) {
					L.so(U);
					return false
				}
				if ((Y != "" && Y != "key") && L.arrayIn([37, 39, 46], U.keyCode)) {
					L.so(U);
					return false
				}
				if (L.arrayIn([37, 39], U.keyCode)) {
					C = true
				}
				if (!L.au(U.charCode) && U.charCode != 0) {
					return false
				}
				if (U.keyCode == 32 || U.keyCode == 49 || (U.keyCode == 16 && D.win)) {
					if (D.lnx || D.mac) {
						var W = J + "=" + bh.ID + "=" + V.name
					} else {
						var W = J + "=" + bh.ID + "=" + V.name + "=" + bh.useInitechHex
					}
					B(Q, W, {
						ax: function(Z) {
							if (L.r9(Z, function() {
									o(U)
								})) {
								return
							}
							var aa = Z.split("&&");
							v(aa[1], aa[2])
						}
					});
					L.so(U);
					return false
				} else {
					if (U.keyCode == 8) {
						var W = H + "=" + bh.ID + "=" + V.name;
						B(Q, W, {
							ax: function(Z) {
								if (L.r9(Z, function() {
										o(U)
									})) {
									return
								}
								var aa = Z.split("&&");
								E()
							}
						})
					} else {
						if ((Y === "" || Y == "key") && (U.keyCode == 35 || U.keyCode == 36 || U.keyCode == 37 || U.keyCode == 39 || U.keyCode == 46)) {} else {
							if (U.keyCode == 9) {} else {
								if (U.keyCode == 13) {} else {
									if ((Y === "" || Y === "key") && D.mac && D.ff) {
										if (D.lnx || D.mac) {
											var W = J + "=" + bh.ID + "=" + V.name
										} else {
											var W = J + "=" + bh.ID + "=" + V.name + "=" + bh.useInitechHex
										}
										B(Q, W, {
											ax: function(Z) {
												if (Z === Ye.kk || Z === Ye.a4) {} else {
													if (L.r9(Z, function() {
															o(U)
														})) {
														return
													}
													var aa = Z.split("&&");
													v(aa[1], aa[2])
												}
											}
										})
									} else {
										if (U.keyCode == 229) {} else {
											L.so(U);
											return false
										}
									}
								}
							}
						}
					}
				}
			} catch (X) {}
		}
		var C = false;
		this.he = null;
		this.jw = function(U) {
			if (typeof(bh) == "undefined" || bh == null) {
				return false
			}
			if (!L.au(U) && U.keyCode == 9) {
				var V = new Date().getTime();
				if (L.au(bh.he)) {} else {
					if (V - bh.he <= 150) {
						L.so(U)
					} else {}
				}
				bh.he = V
			}
		};
	
		function v(aa, U) {
			if (L.au(bh.av)) {
				return
			}
			var an = bh.av;
			var ag = nq(an);
			var aq = an.value;
			if (ag.prop("readonly") == true || ag.prop("disabled") == true) {
				return
			}
			if (ag.attr("data-keypad-action") == "amount") {
				aq = L.uncomma(ag.val())
			}
			var al = nq(an).prop("maxlength");
			var af = q(an);
			var W = af.start;
			var V = af.end;
			if (W == V && !L.bn(al) && !L.bn(aq) && al > 0 && aq.length >= al) {
				return
			}
			try {
				var ai = L.ha(aa);
				if (L.bn(ai)) {
					return
				}
				var ac = L.gu(ai, L.ha(bh.ID), "ECB", 128);
				if (L.bn(ac)) {
					return
				}
				if (ac.length > 0) {
					ac = ac.substring(0, 1)
				}
				if (L.bn(ac)) {
					return
				}
				var ab = ac.charCodeAt(0);
				var am = L.au(zp.cI);
				am = am || typeof(zp.cI) !== "function";
				am = am || zp.cI(ab, an);
				if (typeof(npPfsExtension) != "undefined" && typeof(npPfsExtension.keyValidation) == "function") {
					am = am && npPfsExtension.keyValidation(an, ab)
				}
				if (am == false) {
					var Y = H + "=" + bh.ID + "=" + an.name;
					B(Q, Y, {
						ax: function(ar) {
							if (L.r9(ar, function() {
									v(aa, U)
								})) {
								return
							}
							var at = ar.split("&&")
						}
					});
					Mc.log("The key value(" + ab + ") is invalid, clear the keystroke.");
					return
				}
				if (ag.attr("data-keypad-action") == "amount") {
					ag.val(L.uncomma(ag.val()))
				}
				var ae = p(an, zp.aG.AN);
				if ((L.arrayIn([zp.aG.AV, "db"], ae) && false) || L.arrayIn(["re", "sub", "des"], ae)) {
					var ak = z(an);
					if (L.au(ak)) {
						return
					}
					if (L.arrayIn(["re", "sub"], ae)) {
						var ai = L.ha(U);
						if (L.bn(ai)) {
							return
						}
						var ah = L.gu(ai, L.ha(bh.ID), "ECB", 128);
						if (L.bn(ah)) {
							return
						}
						if (ah.length > 0) {
							ah = ah.substring(0, 1)
						}
						an.value += ac;
						ak.value += ah
					} else {
						if (L.arrayIn([zp.aG.AV, "des", "db"], ae)) {
							if (bh.useInitechHex == "on") {
								var ai = L.ha(U);
								if (L.bn(ai)) {
									return
								}
								an.value += ac;
								ak.value += ai
							} else {
								an.value += ac;
								ak.value += U
							}
						}
					}
				} else {
					var ap = an.value.length;
					var Z = S(an);
					if (W != V) {
						var aj = an.value.substring(0, W);
						var X = an.value.substring(V);
						an.value = aj + ac + X;
						A(an, W + 1)
					} else {
						if (ap == 0 || C == false) {
							an.value += ac;
							A(an, ap + 1)
						} else {
							var aj = an.value.substring(0, Z);
							var X = an.value.substring(Z);
							an.value = aj + ac + X;
							A(an, Z + 1)
						}
					}
				}
				if (ag.attr("data-keypad-action") == "amount") {
					ag.val(L.comma(ag.val()))
				}
				Mc.log(N.m65.replace("%p1%", an.name).replace("%p2%", ac.charCodeAt(0)));
				nq(document).trigger({
					type: "nppfs-npk-put-complete",
					message: N.m66,
					target: an,
					form: (!L.au(an.form)) ? nq(an.formm).attr("name") : null,
					name: an.name,
					time: new Date()
				});
				var ab = ac.charCodeAt(0);
				nq(an).trigger({
					type: "keypress",
					which: ab,
					keyCode: ab
				});
				nq(an).trigger({
					type: "keyup",
					which: ab,
					keyCode: ab
				})
			} catch (ao) {}
		}
	
		function q(X) {
			var W = {
				start: 0,
				end: 0
			};
			if (typeof X.selectionStart == "number" && typeof X.selectionEnd == "number") {
				W.start = X.selectionStart;
				W.end = X.selectionEnd
			} else {
				if (document.selection) {
					var V = document.selection.createRange().getBookmark();
					var Y = X.createTextRange();
					var U = Y.duplicate();
					Y.moveToBookmark(V);
					U.setEndPoint("EndToStart", Y);
					W.start = U.text.length;
					W.end = W.start + Y.text.length
				}
			}
			return W
		}
	
		function A(V, W) {
			if (V.createTextRange) {
				var U = V.createTextRange();
				U.move("character", W);
				U.select()
			} else {
				if (V.setSelectionRange) {
					V.setSelectionRange(W, W)
				} else {}
			}
		}
	
		function S(V) {
			var W = 0;
			if (document.selection) {
				if (!D.ie && !D.qq) {
					V.focus()
				}
				var U = document.selection.createRange();
				U.moveStart("character", -V.value.length);
				W = U.text.length
			} else {
				if (V.selectionStart || V.selectionStart == "0") {
					W = V.selectionStart
				}
			}
			return (W)
		}
	
		function z(W) {
			var U = e(W);
			var V = !L.au(W.form) ? W.form : null;
			return L.bZ(U, V)
		}
	
		function E() {
			try {
				var W = bh.av;
				var V = z(W);
				var U = nq(W);
				if (U.attr("data-keypad-action") == "amount") {
					U.val(L.uncomma(U.val()))
				}
				var Y = p(W, zp.aG.AN);
				if (L.bn(Y)) {
					return
				}
				if (!L.au(V)) {
					W.value = W.value.substring(0, W.value.length - 1);
					if (L.arrayIn(["re", "sub"], Y)) {
						V.value = V.value.substring(0, V.value.length - 1)
					} else {
						if (L.arrayIn([zp.aG.AV, "des"], Y)) {
							V.value = V.value.substring(0, V.value.length - 64)
						}
					}
				}
				if (U.attr("data-keypad-action") == "amount") {
					U.val(L.comma(U.val()))
				}
				Mc.log(N.m67.replace("%p1%", W.name).replace("%p2%", W.value))
			} catch (X) {}
		}
		this.resetColor = function(U) {
			if (L.au(U)) {
				return
			}
			var V = p(U, zp.aG.AN);
			if (L.arrayIn(["re", "sub", "des"], V)) {
				U.style.color = b.eK.Kq;
				U.style.backgroundColor = b.eK.Xe
			} else {
				if (L.arrayIn([zp.aG.AV, "db"], V) && false) {
					U.style.color = b.eK.hZ;
					U.style.backgroundColor = b.eK.gx
				}
			}
		};
		this.iu = function(V, X) {
			if (L.au(X)) {
				return ""
			}
			var U = (typeof(X) == "object") ? X : L.bZ(X, V);
			var W = z(U);
			if (L.au(W) || L.au(W.value)) {
				return ""
			}
			if (bh.isRunnable()) {
				return W.value
			}
			return ""
		};
		this.im = function(V, X) {
			if (bh.isRunnable()) {
				if (L.au(bh.Qb)) {
					return
				}
				var U = X;
				if (typeof(U) == "string") {
					U = L.bZ(X, V)
				}
				if (typeof(U) == "undefined") {
					return ""
				}
				try {
					var Y = nq(U).attr(zp.aG.AN);
					Y = (L.au(Y)) ? "" : Y.toLowerCase();
					if (L.arrayIn(["sub", "des"], Y)) {
						return bh.ID + "=" + U.name
					}
					return bh.Qb
				} catch (W) {}
				return bh.Qb
			}
		};
		this.eX = function(U, V) {
			if (!L.bn(U)) {
				if (typeof(U) == "string") {
					U = nq("form[name='" + U + "']").get(0)
				}
			}
			if (typeof(V) == "string") {
				V = L.bZ(V, U)
			}
			if (V == null || typeof(V) == "undefined") {
				return
			}
			if (!bh.isRunnable()) {
				return
			}
			bh.f7(U, V);
			nq(document).bind("nppfs-npk-jkrf", function(W) {
				k()
			})
		}
	};
	hI.define({
		id: bh.id,
		name: "nProtect Online Security V1.0, Key Protection",
		handshake: true,
		endtoend: false,
		runvirtualos: false,
		controller: bh,
		isExecutable: function(a) {
			return (typeof(a.SK) != "undefined") ? a.SK : true
		}
	});
	var AES = new function() {
		var x = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145];
		var f = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
		var n = [2774754246, 2222750968, 2574743534, 2373680118, 234025727, 3177933782, 2976870366, 1422247313, 1345335392, 50397442, 2842126286, 2099981142, 436141799, 1658312629, 3870010189, 2591454956, 1170918031, 2642575903, 1086966153, 2273148410, 368769775, 3948501426, 3376891790, 200339707, 3970805057, 1742001331, 4255294047, 3937382213, 3214711843, 4154762323, 2524082916, 1539358875, 3266819957, 486407649, 2928907069, 1780885068, 1513502316, 1094664062, 49805301, 1338821763, 1546925160, 4104496465, 887481809, 150073849, 2473685474, 1943591083, 1395732834, 1058346282, 201589768, 1388824469, 1696801606, 1589887901, 672667696, 2711000631, 251987210, 3046808111, 151455502, 907153956, 2608889883, 1038279391, 652995533, 1764173646, 3451040383, 2675275242, 453576978, 2659418909, 1949051992, 773462580, 756751158, 2993581788, 3998898868, 4221608027, 4132590244, 1295727478, 1641469623, 3467883389, 2066295122, 1055122397, 1898917726, 2542044179, 4115878822, 1758581177, 0, 753790401, 1612718144, 536673507, 3367088505, 3982187446, 3194645204, 1187761037, 3653156455, 1262041458, 3729410708, 3561770136, 3898103984, 1255133061, 1808847035, 720367557, 3853167183, 385612781, 3309519750, 3612167578, 1429418854, 2491778321, 3477423498, 284817897, 100794884, 2172616702, 4031795360, 1144798328, 3131023141, 3819481163, 4082192802, 4272137053, 3225436288, 2324664069, 2912064063, 3164445985, 1211644016, 83228145, 3753688163, 3249976951, 1977277103, 1663115586, 806359072, 452984805, 250868733, 1842533055, 1288555905, 336333848, 890442534, 804056259, 3781124030, 2727843637, 3427026056, 957814574, 1472513171, 4071073621, 2189328124, 1195195770, 2892260552, 3881655738, 723065138, 2507371494, 2690670784, 2558624025, 3511635870, 2145180835, 1713513028, 2116692564, 2878378043, 2206763019, 3393603212, 703524551, 3552098411, 1007948840, 2044649127, 3797835452, 487262998, 1994120109, 1004593371, 1446130276, 1312438900, 503974420, 3679013266, 168166924, 1814307912, 3831258296, 1573044895, 1859376061, 4021070915, 2791465668, 2828112185, 2761266481, 937747667, 2339994098, 854058965, 1137232011, 1496790894, 3077402074, 2358086913, 1691735473, 3528347292, 3769215305, 3027004632, 4199962284, 133494003, 636152527, 2942657994, 2390391540, 3920539207, 403179536, 3585784431, 2289596656, 1864705354, 1915629148, 605822008, 4054230615, 3350508659, 1371981463, 602466507, 2094914977, 2624877800, 555687742, 3712699286, 3703422305, 2257292045, 2240449039, 2423288032, 1111375484, 3300242801, 2858837708, 3628615824, 84083462, 32962295, 302911004, 2741068226, 1597322602, 4183250862, 3501832553, 2441512471, 1489093017, 656219450, 3114180135, 954327513, 335083755, 3013122091, 856756514, 3144247762, 1893325225, 2307821063, 2811532339, 3063651117, 572399164, 2458355477, 552200649, 1238290055, 4283782570, 2015897680, 2061492133, 2408352771, 4171342169, 2156497161, 386731290, 3669999461, 837215959, 3326231172, 3093850320, 3275833730, 2962856233, 1999449434, 286199582, 3417354363, 4233385128, 3602627437, 974525996];
		var i = [1667483301, 2088564868, 2004348569, 2071721613, 4076011277, 1802229437, 1869602481, 3318059348, 808476752, 16843267, 1734856361, 724260477, 4278118169, 3621238114, 2880130534, 1987505306, 3402272581, 2189565853, 3385428288, 2105408135, 4210749205, 1499050731, 1195871945, 4042324747, 2913812972, 3570709351, 2728550397, 2947499498, 2627478463, 2762232823, 1920132246, 3233848155, 3082253762, 4261273884, 2475900334, 640044138, 909536346, 1061125697, 4160222466, 3435955023, 875849820, 2779075060, 3857043764, 4059166984, 1903288979, 3638078323, 825320019, 353708607, 67373068, 3351745874, 589514341, 3284376926, 404238376, 2526427041, 84216335, 2593796021, 117902857, 303178806, 2155879323, 3806519101, 3958099238, 656887401, 2998042573, 1970662047, 151589403, 2206408094, 741103732, 437924910, 454768173, 1852759218, 1515893998, 2694863867, 1381147894, 993752653, 3604395873, 3014884814, 690573947, 3823361342, 791633521, 2223248279, 1397991157, 3520182632, 0, 3991781676, 538984544, 4244431647, 2981198280, 1532737261, 1785386174, 3419114822, 3200149465, 960066123, 1246401758, 1280088276, 1482207464, 3486483786, 3503340395, 4025468202, 2863288293, 4227591446, 1128498885, 1296931543, 859006549, 2240090516, 1162185423, 4193904912, 33686534, 2139094657, 1347461360, 1010595908, 2678007226, 2829601763, 1364304627, 2745392638, 1077969088, 2408514954, 2459058093, 2644320700, 943222856, 4126535940, 3166462943, 3065411521, 3671764853, 555827811, 269492272, 4294960410, 4092853518, 3537026925, 3452797260, 202119188, 320022069, 3974939439, 1600110305, 2543269282, 1145342156, 387395129, 3301217111, 2812761586, 2122251394, 1027439175, 1684326572, 1566423783, 421081643, 1936975509, 1616953504, 2172721560, 1330618065, 3705447295, 572671078, 707417214, 2425371563, 2290617219, 1179028682, 4008625961, 3099093971, 336865340, 3739133817, 1583267042, 185275933, 3688607094, 3772832571, 842163286, 976909390, 168432670, 1229558491, 101059594, 606357612, 1549580516, 3267534685, 3553869166, 2896970735, 1650640038, 2442213800, 2509582756, 3840201527, 2038035083, 3890730290, 3368586051, 926379609, 1835915959, 2374828428, 3587551588, 1313774802, 2846444000, 1819072692, 1448520954, 4109693703, 3941256997, 1701169839, 2054878350, 2930657257, 134746136, 3132780501, 2021191816, 623200879, 774790258, 471611428, 2795919345, 3031724999, 3334903633, 3907570467, 3722289532, 1953818780, 522141217, 1263245021, 3183305180, 2341145990, 2324303749, 1886445712, 1044282434, 3048567236, 1718013098, 1212715224, 50529797, 4143380225, 235805714, 1633796771, 892693087, 1465364217, 3115936208, 2256934801, 3250690392, 488454695, 2661164985, 3789674808, 4177062675, 2560109491, 286335539, 1768542907, 3654920560, 2391672713, 2492740519, 2610638262, 505297954, 2273777042, 3924412704, 3469641545, 1431677695, 673730680, 3755976058, 2357986191, 2711706104, 2307459456, 218962455, 3216991706, 3873888049, 1111655622, 1751699640, 1094812355, 2576951728, 757946999, 252648977, 2964356043, 1414834428, 3149622742, 370551866];
		var y = [1673962851, 2096661628, 2012125559, 2079755643, 4076801522, 1809235307, 1876865391, 3314635973, 811618352, 16909057, 1741597031, 727088427, 4276558334, 3618988759, 2874009259, 1995217526, 3398387146, 2183110018, 3381215433, 2113570685, 4209972730, 1504897881, 1200539975, 4042984432, 2906778797, 3568527316, 2724199842, 2940594863, 2619588508, 2756966308, 1927583346, 3231407040, 3077948087, 4259388669, 2470293139, 642542118, 913070646, 1065238847, 4160029431, 3431157708, 879254580, 2773611685, 3855693029, 4059629809, 1910674289, 3635114968, 828527409, 355090197, 67636228, 3348452039, 591815971, 3281870531, 405809176, 2520228246, 84545285, 2586817946, 118360327, 304363026, 2149292928, 3806281186, 3956090603, 659450151, 2994720178, 1978310517, 152181513, 2199756419, 743994412, 439627290, 456535323, 1859957358, 1521806938, 2690382752, 1386542674, 997608763, 3602342358, 3011366579, 693271337, 3822927587, 794718511, 2215876484, 1403450707, 3518589137, 0, 3988860141, 541089824, 4242743292, 2977548465, 1538714971, 1792327274, 3415033547, 3194476990, 963791673, 1251270218, 1285084236, 1487988824, 3481619151, 3501943760, 4022676207, 2857362858, 4226619131, 1132905795, 1301993293, 862344499, 2232521861, 1166724933, 4192801017, 33818114, 2147385727, 1352724560, 1014514748, 2670049951, 2823545768, 1369633617, 2740846243, 1082179648, 2399505039, 2453646738, 2636233885, 946882616, 4126213365, 3160661948, 3061301686, 3668932058, 557998881, 270544912, 4293204735, 4093447923, 3535760850, 3447803085, 202904588, 321271059, 3972214764, 1606345055, 2536874647, 1149815876, 388905239, 3297990596, 2807427751, 2130477694, 1031423805, 1690872932, 1572530013, 422718233, 1944491379, 1623236704, 2165938305, 1335808335, 3701702620, 574907938, 710180394, 2419829648, 2282455944, 1183631942, 4006029806, 3094074296, 338181140, 3735517662, 1589437022, 185998603, 3685578459, 3772464096, 845436466, 980700730, 169090570, 1234361161, 101452294, 608726052, 1555620956, 3265224130, 3552407251, 2890133420, 1657054818, 2436475025, 2503058581, 3839047652, 2045938553, 3889509095, 3364570056, 929978679, 1843050349, 2365688973, 3585172693, 1318900302, 2840191145, 1826141292, 1454176854, 4109567988, 3939444202, 1707781989, 2062847610, 2923948462, 135272456, 3127891386, 2029029496, 625635109, 777810478, 473441308, 2790781350, 3027486644, 3331805638, 3905627112, 3718347997, 1961401460, 524165407, 1268178251, 3177307325, 2332919435, 2316273034, 1893765232, 1048330814, 3044132021, 1724688998, 1217452104, 50726147, 4143383030, 236720654, 1640145761, 896163637, 1471084887, 3110719673, 2249691526, 3248052417, 490350365, 2653403550, 3789109473, 4176155640, 2553000856, 287453969, 1775418217, 3651760345, 2382858638, 2486413204, 2603464347, 507257374, 2266337927, 3922272489, 3464972750, 1437269845, 676362280, 3752164063, 2349043596, 2707028129, 2299101321, 219813645, 3211123391, 3872862694, 1115997762, 1758509160, 1099088705, 2569646233, 760903469, 253628687, 2960903088, 1420360788, 3144537787, 371997206];
		var a = [3332727651, 4169432188, 4003034999, 4136467323, 4279104242, 3602738027, 3736170351, 2438251973, 1615867952, 33751297, 3467208551, 1451043627, 3877240574, 3043153879, 1306962859, 3969545846, 2403715786, 530416258, 2302724553, 4203183485, 4011195130, 3001768281, 2395555655, 4211863792, 1106029997, 3009926356, 1610457762, 1173008303, 599760028, 1408738468, 3835064946, 2606481600, 1975695287, 3776773629, 1034851219, 1282024998, 1817851446, 2118205247, 4110612471, 2203045068, 1750873140, 1374987685, 3509904869, 4178113009, 3801313649, 2876496088, 1649619249, 708777237, 135005188, 2505230279, 1181033251, 2640233411, 807933976, 933336726, 168756485, 800430746, 235472647, 607523346, 463175808, 3745374946, 3441880043, 1315514151, 2144187058, 3936318837, 303761673, 496927619, 1484008492, 875436570, 908925723, 3702681198, 3035519578, 1543217312, 2767606354, 1984772923, 3076642518, 2110698419, 1383803177, 3711886307, 1584475951, 328696964, 2801095507, 3110654417, 0, 3240947181, 1080041504, 3810524412, 2043195825, 3069008731, 3569248874, 2370227147, 1742323390, 1917532473, 2497595978, 2564049996, 2968016984, 2236272591, 3144405200, 3307925487, 1340451498, 3977706491, 2261074755, 2597801293, 1716859699, 294946181, 2328839493, 3910203897, 67502594, 4269899647, 2700103760, 2017737788, 632987551, 1273211048, 2733855057, 1576969123, 2160083008, 92966799, 1068339858, 566009245, 1883781176, 4043634165, 1675607228, 2009183926, 2943736538, 1113792801, 540020752, 3843751935, 4245615603, 3211645650, 2169294285, 403966988, 641012499, 3274697964, 3202441055, 899848087, 2295088196, 775493399, 2472002756, 1441965991, 4236410494, 2051489085, 3366741092, 3135724893, 841685273, 3868554099, 3231735904, 429425025, 2664517455, 2743065820, 1147544098, 1417554474, 1001099408, 193169544, 2362066502, 3341414126, 1809037496, 675025940, 2809781982, 3168951902, 371002123, 2910247899, 3678134496, 1683370546, 1951283770, 337512970, 2463844681, 201983494, 1215046692, 3101973596, 2673722050, 3178157011, 1139780780, 3299238498, 967348625, 832869781, 3543655652, 4069226873, 3576883175, 2336475336, 1851340599, 3669454189, 25988493, 2976175573, 2631028302, 1239460265, 3635702892, 2902087254, 4077384948, 3475368682, 3400492389, 4102978170, 1206496942, 270010376, 1876277946, 4035475576, 1248797989, 1550986798, 941890588, 1475454630, 1942467764, 2538718918, 3408128232, 2709315037, 3902567540, 1042358047, 2531085131, 1641856445, 226921355, 260409994, 3767562352, 2084716094, 1908716981, 3433719398, 2430093384, 100991747, 4144101110, 470945294, 3265487201, 1784624437, 2935576407, 1775286713, 395413126, 2572730817, 975641885, 666476190, 3644383713, 3943954680, 733190296, 573772049, 3535497577, 2842745305, 126455438, 866620564, 766942107, 1008868894, 361924487, 3374377449, 2269761230, 2868860245, 1350051880, 2776293343, 59739276, 1509466529, 159418761, 437718285, 1708834751, 3610371814, 2227585602, 3501746280, 2193834305, 699439513, 1517759789, 504434447, 2076946608, 2835108948, 1842789307, 742004246];
	
		function c(A) {
			return (A & 255)
		}
	
		function o(A) {
			return ((A >> 8) & 255)
		}
	
		function m(A) {
			return ((A >> 16) & 255)
		}
	
		function b(A) {
			return ((A >> 24) & 255)
		}
	
		function s(E, C, A, B) {
			return o(n[E & 255]) | (o(n[(C >> 8) & 255]) << 8) | (o(n[(A >> 16) & 255]) << 16) | (o(n[B >>> 24]) << 24)
		}
	
		function j(F) {
			var C, B;
			var E = F.length;
			var A = new Array(E / 4);
			if (!F || E % 4) {
				return
			}
			for (C = 0, B = 0; B < E; B += 4) {
				A[C++] = F[B] | (F[B + 1] << 8) | (F[B + 2] << 16) | (F[B + 3] << 24)
			}
			return A
		}
	
		function g(E) {
			var C;
			var B = 0,
				A = E.length;
			var F = new Array(A * 4);
			for (C = 0; C < A; C++) {
				F[B++] = c(E[C]);
				F[B++] = o(E[C]);
				F[B++] = m(E[C]);
				F[B++] = b(E[C])
			}
			return F
		}
		var u = 8;
		var v = 14;
		this.F = function(K) {
			var G, F, E, A, P;
			var I;
			var B = new Array(v + 1);
			var J = K.length;
			var C = new Array(u);
			var O = new Array(u);
			var H = 0;
			if (J == 16) {
				I = 10;
				G = 4
			} else {
				if (J == 24) {
					I = 12;
					G = 6
				} else {
					if (J == 32) {
						I = 14;
						G = 8
					} else {
						return
					}
				}
			}
			for (F = 0; F < v + 1; F++) {
				B[F] = new Array(4)
			}
			for (F = 0, E = 0; E < J; E++, F += 4) {
				C[E] = K.charCodeAt(F) | (K.charCodeAt(F + 1) << 8) | (K.charCodeAt(F + 2) << 16) | (K.charCodeAt(F + 3) << 24)
			}
			for (E = G - 1; E >= 0; E--) {
				O[E] = C[E]
			}
			A = 0;
			P = 0;
			for (E = 0;
				(E < G) && (A < I + 1);) {
				for (;
					(E < G) && (P < 4); E++, P++) {
					B[A][P] = O[E]
				}
				if (P == 4) {
					A++;
					P = 0
				}
			}
			while (A < I + 1) {
				var M = O[G - 1];
				O[0] ^= f[o(M)] | (f[m(M)] << 8) | (f[b(M)] << 16) | (f[c(M)] << 24);
				O[0] ^= x[H++];
				if (G != 8) {
					for (E = 1; E < G; E++) {
						O[E] ^= O[E - 1]
					}
				} else {
					for (E = 1; E < G / 2; E++) {
						O[E] ^= O[E - 1]
					}
					M = O[G / 2 - 1];
					O[G / 2] ^= f[c(M)] | (f[o(M)] << 8) | (f[m(M)] << 16) | (f[b(M)] << 24);
					for (E = G / 2 + 1; E < G; E++) {
						O[E] ^= O[E - 1]
					}
				}
				for (E = 0;
					(E < G) && (A < I + 1);) {
					for (;
						(E < G) && (P < 4); E++, P++) {
						B[A][P] = O[E]
					}
					if (P == 4) {
						A++;
						P = 0
					}
				}
			}
			this.aU = I;
			this.bo = B;
			return this
		};
		this.eU = 128;
		this.gl = 256;
		var r = [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125];
		var k = [1353184337, 1399144830, 3282310938, 2522752826, 3412831035, 4047871263, 2874735276, 2466505547, 1442459680, 4134368941, 2440481928, 625738485, 4242007375, 3620416197, 2151953702, 2409849525, 1230680542, 1729870373, 2551114309, 3787521629, 41234371, 317738113, 2744600205, 3338261355, 3881799427, 2510066197, 3950669247, 3663286933, 763608788, 3542185048, 694804553, 1154009486, 1787413109, 2021232372, 1799248025, 3715217703, 3058688446, 397248752, 1722556617, 3023752829, 407560035, 2184256229, 1613975959, 1165972322, 3765920945, 2226023355, 480281086, 2485848313, 1483229296, 436028815, 2272059028, 3086515026, 601060267, 3791801202, 1468997603, 715871590, 120122290, 63092015, 2591802758, 2768779219, 4068943920, 2997206819, 3127509762, 1552029421, 723308426, 2461301159, 4042393587, 2715969870, 3455375973, 3586000134, 526529745, 2331944644, 2639474228, 2689987490, 853641733, 1978398372, 971801355, 2867814464, 111112542, 1360031421, 4186579262, 1023860118, 2919579357, 1186850381, 3045938321, 90031217, 1876166148, 4279586912, 620468249, 2548678102, 3426959497, 2006899047, 3175278768, 2290845959, 945494503, 3689859193, 1191869601, 3910091388, 3374220536, 0, 2206629897, 1223502642, 2893025566, 1316117100, 4227796733, 1446544655, 517320253, 658058550, 1691946762, 564550760, 3511966619, 976107044, 2976320012, 266819475, 3533106868, 2660342555, 1338359936, 2720062561, 1766553434, 370807324, 179999714, 3844776128, 1138762300, 488053522, 185403662, 2915535858, 3114841645, 3366526484, 2233069911, 1275557295, 3151862254, 4250959779, 2670068215, 3170202204, 3309004356, 880737115, 1982415755, 3703972811, 1761406390, 1676797112, 3403428311, 277177154, 1076008723, 538035844, 2099530373, 4164795346, 288553390, 1839278535, 1261411869, 4080055004, 3964831245, 3504587127, 1813426987, 2579067049, 4199060497, 577038663, 3297574056, 440397984, 3626794326, 4019204898, 3343796615, 3251714265, 4272081548, 906744984, 3481400742, 685669029, 646887386, 2764025151, 3835509292, 227702864, 2613862250, 1648787028, 3256061430, 3904428176, 1593260334, 4121936770, 3196083615, 2090061929, 2838353263, 3004310991, 999926984, 2809993232, 1852021992, 2075868123, 158869197, 4095236462, 28809964, 2828685187, 1701746150, 2129067946, 147831841, 3873969647, 3650873274, 3459673930, 3557400554, 3598495785, 2947720241, 824393514, 815048134, 3227951669, 935087732, 2798289660, 2966458592, 366520115, 1251476721, 4158319681, 240176511, 804688151, 2379631990, 1303441219, 1414376140, 3741619940, 3820343710, 461924940, 3089050817, 2136040774, 82468509, 1563790337, 1937016826, 776014843, 1511876531, 1389550482, 861278441, 323475053, 2355222426, 2047648055, 2383738969, 2302415851, 3995576782, 902390199, 3991215329, 1018251130, 1507840668, 1064563285, 2043548696, 3208103795, 3939366739, 1537932639, 342834655, 2262516856, 2180231114, 1053059257, 741614648, 1598071746, 1925389590, 203809468, 2336832552, 1100287487, 1895934009, 3736275976, 2632234200, 2428589668, 1636092795, 1890988757, 1952214088, 1113045200];
		var t = [2817806672, 1698790995, 2752977603, 1579629206, 1806384075, 1167925233, 1492823211, 65227667, 4197458005, 1836494326, 1993115793, 1275262245, 3622129660, 3408578007, 1144333952, 2741155215, 1521606217, 465184103, 250234264, 3237895649, 1966064386, 4031545618, 2537983395, 4191382470, 1603208167, 2626819477, 2054012907, 1498584538, 2210321453, 561273043, 1776306473, 3368652356, 2311222634, 2039411832, 1045993835, 1907959773, 1340194486, 2911432727, 2887829862, 986611124, 1256153880, 823846274, 860985184, 2136171077, 2003087840, 2926295940, 2692873756, 722008468, 1749577816, 4249194265, 1826526343, 4168831671, 3547573027, 38499042, 2401231703, 2874500650, 686535175, 3266653955, 2076542618, 137876389, 2267558130, 2780767154, 1778582202, 2182540636, 483363371, 3027871634, 4060607472, 3798552225, 4107953613, 3188000469, 1647628575, 4272342154, 1395537053, 1442030240, 3783918898, 3958809717, 3968011065, 4016062634, 2675006982, 275692881, 2317434617, 115185213, 88006062, 3185986886, 2371129781, 1573155077, 3557164143, 357589247, 4221049124, 3921532567, 1128303052, 2665047927, 1122545853, 2341013384, 1528424248, 4006115803, 175939911, 256015593, 512030921, 0, 2256537987, 3979031112, 1880170156, 1918528590, 4279172603, 948244310, 3584965918, 959264295, 3641641572, 2791073825, 1415289809, 775300154, 1728711857, 3881276175, 2532226258, 2442861470, 3317727311, 551313826, 1266113129, 437394454, 3130253834, 715178213, 3760340035, 387650077, 218697227, 3347837613, 2830511545, 2837320904, 435246981, 125153100, 3717852859, 1618977789, 637663135, 4117912764, 996558021, 2130402100, 692292470, 3324234716, 4243437160, 4058298467, 3694254026, 2237874704, 580326208, 298222624, 608863613, 1035719416, 855223825, 2703869805, 798891339, 817028339, 1384517100, 3821107152, 380840812, 3111168409, 1217663482, 1693009698, 2365368516, 1072734234, 746411736, 2419270383, 1313441735, 3510163905, 2731183358, 198481974, 2180359887, 3732579624, 2394413606, 3215802276, 2637835492, 2457358349, 3428805275, 1182684258, 328070850, 3101200616, 4147719774, 2948825845, 2153619390, 2479909244, 768962473, 304467891, 2578237499, 2098729127, 1671227502, 3141262203, 2015808777, 408514292, 3080383489, 2588902312, 1855317605, 3875515006, 3485212936, 3893751782, 2615655129, 913263310, 161475284, 2091919830, 2997105071, 591342129, 2493892144, 1721906624, 3159258167, 3397581990, 3499155632, 3634836245, 2550460746, 3672916471, 1355644686, 4136703791, 3595400845, 2968470349, 1303039060, 76997855, 3050413795, 2288667675, 523026872, 1365591679, 3932069124, 898367837, 1955068531, 1091304238, 493335386, 3537605202, 1443948851, 1205234963, 1641519756, 211892090, 351820174, 1007938441, 665439982, 3378624309, 3843875309, 2974251580, 3755121753, 1945261375, 3457423481, 935818175, 3455538154, 2868731739, 1866325780, 3678697606, 4088384129, 3295197502, 874788908, 1084473951, 3273463410, 635616268, 1228679307, 2500722497, 27801969, 3003910366, 3837057180, 3243664528, 2227927905, 3056784752, 1550600308, 1471729730];
		var q = [4098969767, 1098797925, 387629988, 658151006, 2872822635, 2636116293, 4205620056, 3813380867, 807425530, 1991112301, 3431502198, 49620300, 3847224535, 717608907, 891715652, 1656065955, 2984135002, 3123013403, 3930429454, 4267565504, 801309301, 1283527408, 1183687575, 3547055865, 2399397727, 2450888092, 1841294202, 1385552473, 3201576323, 1951978273, 3762891113, 3381544136, 3262474889, 2398386297, 1486449470, 3106397553, 3787372111, 2297436077, 550069932, 3464344634, 3747813450, 451248689, 1368875059, 1398949247, 1689378935, 1807451310, 2180914336, 150574123, 1215322216, 1167006205, 3734275948, 2069018616, 1940595667, 1265820162, 534992783, 1432758955, 3954313000, 3039757250, 3313932923, 936617224, 674296455, 3206787749, 50510442, 384654466, 3481938716, 2041025204, 133427442, 1766760930, 3664104948, 84334014, 886120290, 2797898494, 775200083, 4087521365, 2315596513, 4137973227, 2198551020, 1614850799, 1901987487, 1857900816, 557775242, 3717610758, 1054715397, 3863824061, 1418835341, 3295741277, 100954068, 1348534037, 2551784699, 3184957417, 1082772547, 3647436702, 3903896898, 2298972299, 434583643, 3363429358, 2090944266, 1115482383, 2230896926, 0, 2148107142, 724715757, 287222896, 1517047410, 251526143, 2232374840, 2923241173, 758523705, 252339417, 1550328230, 1536938324, 908343854, 168604007, 1469255655, 4004827798, 2602278545, 3229634501, 3697386016, 2002413899, 303830554, 2481064634, 2696996138, 574374880, 454171927, 151915277, 2347937223, 3056449960, 504678569, 4049044761, 1974422535, 2582559709, 2141453664, 33005350, 1918680309, 1715782971, 4217058430, 1133213225, 600562886, 3988154620, 3837289457, 836225756, 1665273989, 2534621218, 3330547729, 1250262308, 3151165501, 4188934450, 700935585, 2652719919, 3000824624, 2249059410, 3245854947, 3005967382, 1890163129, 2484206152, 3913753188, 4238918796, 4037024319, 2102843436, 857927568, 1233635150, 953795025, 3398237858, 3566745099, 4121350017, 2057644254, 3084527246, 2906629311, 976020637, 2018512274, 1600822220, 2119459398, 2381758995, 3633375416, 959340279, 3280139695, 1570750080, 3496574099, 3580864813, 634368786, 2898803609, 403744637, 2632478307, 1004239803, 650971512, 1500443672, 2599158199, 1334028442, 2514904430, 4289363686, 3156281551, 368043752, 3887782299, 1867173430, 2682967049, 2955531900, 2754719666, 1059729699, 2781229204, 2721431654, 1316239292, 2197595850, 2430644432, 2805143000, 82922136, 3963746266, 3447656016, 2434215926, 1299615190, 4014165424, 2865517645, 2531581700, 3516851125, 1783372680, 750893087, 1699118929, 1587348714, 2348899637, 2281337716, 201010753, 1739807261, 3683799762, 283718486, 3597472583, 3617229921, 2704767500, 4166618644, 334203196, 2848910887, 1639396809, 484568549, 1199193265, 3533461983, 4065673075, 337148366, 3346251575, 4149471949, 4250885034, 1038029935, 1148749531, 2949284339, 1756970692, 607661108, 2747424576, 488010435, 3803974693, 1009290057, 234832277, 2822336769, 201907891, 3034094820, 1449431233, 3413860740, 852848822, 1816687708, 3100656215];
		var p = [1364240372, 2119394625, 449029143, 982933031, 1003187115, 535905693, 2896910586, 1267925987, 542505520, 2918608246, 2291234508, 4112862210, 1341970405, 3319253802, 645940277, 3046089570, 3729349297, 627514298, 1167593194, 1575076094, 3271718191, 2165502028, 2376308550, 1808202195, 65494927, 362126482, 3219880557, 2514114898, 3559752638, 1490231668, 1227450848, 2386872521, 1969916354, 4101536142, 2573942360, 668823993, 3199619041, 4028083592, 3378949152, 2108963534, 1662536415, 3850514714, 2539664209, 1648721747, 2984277860, 3146034795, 4263288961, 4187237128, 1884842056, 2400845125, 2491903198, 1387788411, 2871251827, 1927414347, 3814166303, 1714072405, 2986813675, 788775605, 2258271173, 3550808119, 821200680, 598910399, 45771267, 3982262806, 2318081231, 2811409529, 4092654087, 1319232105, 1707996378, 114671109, 3508494900, 3297443494, 882725678, 2728416755, 87220618, 2759191542, 188345475, 1084944224, 1577492337, 3176206446, 1056541217, 2520581853, 3719169342, 1296481766, 2444594516, 1896177092, 74437638, 1627329872, 421854104, 3600279997, 2311865152, 1735892697, 2965193448, 126389129, 3879230233, 2044456648, 2705787516, 2095648578, 4173930116, 0, 159614592, 843640107, 514617361, 1817080410, 4261150478, 257308805, 1025430958, 908540205, 174381327, 1747035740, 2614187099, 607792694, 212952842, 2467293015, 3033700078, 463376795, 2152711616, 1638015196, 1516850039, 471210514, 3792353939, 3236244128, 1011081250, 303896347, 235605257, 4071475083, 767142070, 348694814, 1468340721, 2940995445, 4005289369, 2751291519, 4154402305, 1555887474, 1153776486, 1530167035, 2339776835, 3420243491, 3060333805, 3093557732, 3620396081, 1108378979, 322970263, 2216694214, 2239571018, 3539484091, 2920362745, 3345850665, 491466654, 3706925234, 233591430, 2010178497, 728503987, 2845423984, 301615252, 1193436393, 2831453436, 2686074864, 1457007741, 586125363, 2277985865, 3653357880, 2365498058, 2553678804, 2798617077, 2770919034, 3659959991, 1067761581, 753179962, 1343066744, 1788595295, 1415726718, 4139914125, 2431170776, 777975609, 2197139395, 2680062045, 1769771984, 1873358293, 3484619301, 3359349164, 279411992, 3899548572, 3682319163, 3439949862, 1861490777, 3959535514, 2208864847, 3865407125, 2860443391, 554225596, 4024887317, 3134823399, 1255028335, 3939764639, 701922480, 833598116, 707863359, 3325072549, 901801634, 1949809742, 4238789250, 3769684112, 857069735, 4048197636, 1106762476, 2131644621, 389019281, 1989006925, 1129165039, 3428076970, 3839820950, 2665723345, 1276872810, 3250069292, 1182749029, 2634345054, 22885772, 4201870471, 4214112523, 3009027431, 2454901467, 3912455696, 1829980118, 2592891351, 930745505, 1502483704, 3951639571, 3471714217, 3073755489, 3790464284, 2050797895, 2623135698, 1430221810, 410635796, 1941911495, 1407897079, 1599843069, 3742658365, 2022103876, 3397514159, 3107898472, 942421028, 3261022371, 376619805, 3154912738, 680216892, 4282488077, 963707304, 148812556, 3634160820, 1687208278, 2069988555, 3580933682, 1215585388, 3494008760];
		var z = [0, 185403662, 370807324, 488053522, 741614648, 658058550, 976107044, 824393514, 1483229296, 1399144830, 1316117100, 1165972322, 1952214088, 2136040774, 1648787028, 1766553434, 2966458592, 3151862254, 2798289660, 2915535858, 2632234200, 2548678102, 2331944644, 2180231114, 3904428176, 3820343710, 4272081548, 4121936770, 3297574056, 3481400742, 3533106868, 3650873274, 2075868123, 1890988757, 1839278535, 1722556617, 1468997603, 1552029421, 1100287487, 1251476721, 601060267, 685669029, 902390199, 1053059257, 266819475, 82468509, 436028815, 317738113, 3412831035, 3227951669, 3715217703, 3598495785, 3881799427, 3964831245, 4047871263, 4199060497, 2466505547, 2551114309, 2233069911, 2383738969, 3208103795, 3023752829, 2838353263, 2720062561, 4134368941, 4250959779, 3765920945, 3950669247, 3663286933, 3511966619, 3426959497, 3343796615, 2919579357, 2768779219, 3089050817, 3004310991, 2184256229, 2302415851, 2485848313, 2670068215, 1186850381, 1303441219, 1353184337, 1537932639, 1787413109, 1636092795, 2090061929, 2006899047, 517320253, 366520115, 147831841, 63092015, 853641733, 971801355, 620468249, 804688151, 2379631990, 2262516856, 2613862250, 2428589668, 2715969870, 2867814464, 3086515026, 3170202204, 3586000134, 3736275976, 3282310938, 3366526484, 4186579262, 4068943920, 4019204898, 3835509292, 1023860118, 906744984, 723308426, 538035844, 288553390, 440397984, 120122290, 203809468, 1701746150, 1852021992, 1937016826, 2021232372, 1230680542, 1113045200, 1598071746, 1414376140, 4158319681, 4242007375, 3787521629, 3939366739, 3689859193, 3504587127, 3455375973, 3338261355, 2947720241, 2764025151, 3114841645, 2997206819, 2206629897, 2290845959, 2510066197, 2660342555, 1191869601, 1275557295, 1360031421, 1511876531, 1799248025, 1613975959, 2099530373, 1982415755, 526529745, 342834655, 158869197, 41234371, 861278441, 945494503, 625738485, 776014843, 2355222426, 2272059028, 2591802758, 2440481928, 2689987490, 2874735276, 3058688446, 3175278768, 3557400554, 3741619940, 3256061430, 3374220536, 4164795346, 4080055004, 3995576782, 3844776128, 1018251130, 935087732, 715871590, 564550760, 277177154, 461924940, 111112542, 227702864, 1691946762, 1876166148, 1925389590, 2043548696, 1223502642, 1138762300, 1593260334, 1442459680, 28809964, 179999714, 397248752, 480281086, 763608788, 646887386, 999926984, 815048134, 1507840668, 1389550482, 1338359936, 1154009486, 1978398372, 2129067946, 1676797112, 1761406390, 2976320012, 3127509762, 2809993232, 2893025566, 2639474228, 2522752826, 2336832552, 2151953702, 3910091388, 3791801202, 4279586912, 4095236462, 3309004356, 3459673930, 3542185048, 3626794326, 2047648055, 1895934009, 1813426987, 1729870373, 1446544655, 1563790337, 1076008723, 1261411869, 577038663, 694804553, 880737115, 1064563285, 240176511, 90031217, 407560035, 323475053, 3403428311, 3251714265, 3703972811, 3620416197, 3873969647, 3991215329, 4042393587, 4227796733, 2461301159, 2579067049, 2226023355, 2409849525, 3196083615, 3045938321, 2828685187, 2744600205];
		var l = [0, 218697227, 437394454, 387650077, 874788908, 959264295, 775300154, 591342129, 1749577816, 1698790995, 1918528590, 2136171077, 1550600308, 1365591679, 1182684258, 1266113129, 3499155632, 3717852859, 3397581990, 3347837613, 3837057180, 3921532567, 4272342154, 4088384129, 3101200616, 3050413795, 2731183358, 2948825845, 2365368516, 2180359887, 2532226258, 2615655129, 3141262203, 3056784752, 2703869805, 2887829862, 2401231703, 2182540636, 2500722497, 2550460746, 3547573027, 3732579624, 3378624309, 3295197502, 3881276175, 3932069124, 4249194265, 4031545618, 1806384075, 1721906624, 1907959773, 2091919830, 1603208167, 1384517100, 1167925233, 1217663482, 65227667, 250234264, 435246981, 351820174, 935818175, 986611124, 768962473, 551313826, 1836494326, 1618977789, 2003087840, 2054012907, 1498584538, 1415289809, 1128303052, 1313441735, 88006062, 137876389, 523026872, 304467891, 823846274, 1007938441, 722008468, 637663135, 3185986886, 2968470349, 2817806672, 2868731739, 2311222634, 2227927905, 2479909244, 2665047927, 3584965918, 3634836245, 3485212936, 3266653955, 3783918898, 3968011065, 4221049124, 4136703791, 3595400845, 3678697606, 3428805275, 3243664528, 3798552225, 4016062634, 4168831671, 4117912764, 3188000469, 3003910366, 2752977603, 2837320904, 2317434617, 2267558130, 2419270383, 2637835492, 115185213, 198481974, 483363371, 298222624, 855223825, 1072734234, 686535175, 635616268, 1855317605, 1671227502, 1955068531, 2039411832, 1521606217, 1471729730, 1084473951, 1303039060, 3672916471, 3622129660, 3237895649, 3455538154, 4006115803, 3821107152, 4107953613, 4191382470, 2997105071, 3215802276, 2830511545, 2780767154, 2256537987, 2341013384, 2626819477, 2442861470, 175939911, 125153100, 275692881, 493335386, 1045993835, 860985184, 608863613, 692292470, 1647628575, 1866325780, 2015808777, 1966064386, 1443948851, 1528424248, 1275262245, 1091304238, 1641519756, 1826526343, 2076542618, 1993115793, 1442030240, 1492823211, 1340194486, 1122545853, 161475284, 76997855, 328070850, 512030921, 1035719416, 817028339, 665439982, 715178213, 2974251580, 3159258167, 2874500650, 2791073825, 2237874704, 2288667675, 2675006982, 2457358349, 3641641572, 3557164143, 3273463410, 3457423481, 3979031112, 3760340035, 4147719774, 4197458005, 3080383489, 3130253834, 2911432727, 2692873756, 2210321453, 2394413606, 2578237499, 2493892144, 3755121753, 3537605202, 3317727311, 3368652356, 3958809717, 3875515006, 4058298467, 4243437160, 1728711857, 1778582202, 2098729127, 1880170156, 1395537053, 1579629206, 1228679307, 1144333952, 256015593, 38499042, 357589247, 408514292, 996558021, 913263310, 561273043, 746411736, 211892090, 27801969, 380840812, 465184103, 948244310, 898367837, 580326208, 798891339, 1693009698, 1776306473, 2130402100, 1945261375, 1355644686, 1573155077, 1256153880, 1205234963, 3694254026, 3510163905, 3324234716, 3408578007, 3893751782, 3843875309, 4060607472, 4279172603, 3027871634, 3111168409, 2926295940, 2741155215, 2153619390, 2371129781, 2588902312, 2537983395];
		var e = [0, 151915277, 303830554, 454171927, 607661108, 758523705, 908343854, 1059729699, 1215322216, 1098797925, 1517047410, 1398949247, 1816687708, 1699118929, 2119459398, 2002413899, 2430644432, 2582559709, 2197595850, 2347937223, 3034094820, 3184957417, 2797898494, 2949284339, 3633375416, 3516851125, 3398237858, 3280139695, 4238918796, 4121350017, 4004827798, 3887782299, 1004239803, 852848822, 700935585, 550069932, 534992783, 384654466, 234832277, 82922136, 1940595667, 2057644254, 1639396809, 1756970692, 1469255655, 1587348714, 1167006205, 1283527408, 2872822635, 2721431654, 3106397553, 2955531900, 2399397727, 2249059410, 2636116293, 2484206152, 3813380867, 3930429454, 4049044761, 4166618644, 3346251575, 3464344634, 3580864813, 3697386016, 1991112301, 2141453664, 1689378935, 1841294202, 1385552473, 1536938324, 1082772547, 1233635150, 1054715397, 936617224, 750893087, 634368786, 451248689, 334203196, 150574123, 33005350, 3863824061, 4014165424, 4098969767, 4250885034, 3262474889, 3413860740, 3496574099, 3647436702, 2923241173, 2805143000, 3156281551, 3039757250, 2315596513, 2198551020, 2551784699, 2434215926, 1299615190, 1148749531, 1600822220, 1449431233, 1766760930, 1614850799, 2069018616, 1918680309, 84334014, 201907891, 387629988, 504678569, 557775242, 674296455, 857927568, 976020637, 3717610758, 3566745099, 3481938716, 3330547729, 4188934450, 4037024319, 3954313000, 3803974693, 2514904430, 2632478307, 2281337716, 2398386297, 2984135002, 3100656215, 2747424576, 2865517645, 3963746266, 3847224535, 4267565504, 4149471949, 3363429358, 3245854947, 3664104948, 3547055865, 2754719666, 2906629311, 3056449960, 3206787749, 2148107142, 2298972299, 2450888092, 2602278545, 2090944266, 1974422535, 1857900816, 1739807261, 1486449470, 1368875059, 1250262308, 1133213225, 886120290, 1038029935, 650971512, 801309301, 283718486, 434583643, 49620300, 201010753, 3617229921, 3734275948, 3313932923, 3431502198, 4087521365, 4205620056, 3787372111, 3903896898, 2682967049, 2531581700, 2381758995, 2230896926, 3151165501, 3000824624, 2848910887, 2696996138, 1199193265, 1316239292, 1432758955, 1550328230, 1665273989, 1783372680, 1901987487, 2018512274, 252339417, 100954068, 488010435, 337148366, 724715757, 574374880, 959340279, 807425530, 2599158199, 2481064634, 2297436077, 2180914336, 3201576323, 3084527246, 2898803609, 2781229204, 3533461983, 3683799762, 3229634501, 3381544136, 4137973227, 4289363686, 3837289457, 3988154620, 168604007, 50510442, 403744637, 287222896, 775200083, 658151006, 1009290057, 891715652, 1115482383, 1265820162, 1348534037, 1500443672, 1715782971, 1867173430, 1951978273, 2102843436, 2704767500, 2822336769, 3005967382, 3123013403, 2232374840, 2348899637, 2534621218, 2652719919, 3913753188, 3762891113, 4217058430, 4065673075, 3447656016, 3295741277, 3747813450, 3597472583, 836225756, 953795025, 600562886, 717608907, 368043752, 484568549, 133427442, 251526143, 2041025204, 1890163129, 1807451310, 1656065955, 1570750080, 1418835341, 1334028442, 1183687575];
		var d = [0, 235605257, 471210514, 303896347, 942421028, 908540205, 607792694, 707863359, 1884842056, 2119394625, 1817080410, 1648721747, 1215585388, 1182749029, 1415726718, 1516850039, 3769684112, 4005289369, 4238789250, 4071475083, 3634160820, 3600279997, 3297443494, 3397514159, 2431170776, 2665723345, 2365498058, 2197139395, 2831453436, 2798617077, 3033700078, 3134823399, 3682319163, 3580933682, 3345850665, 3378949152, 3814166303, 3982262806, 4282488077, 4048197636, 2871251827, 2770919034, 3073755489, 3107898472, 2467293015, 2634345054, 2400845125, 2165502028, 1003187115, 901801634, 668823993, 701922480, 65494927, 233591430, 535905693, 301615252, 1267925987, 1167593194, 1468340721, 1502483704, 1941911495, 2108963534, 1873358293, 1638015196, 2918608246, 2751291519, 2984277860, 3219880557, 2514114898, 2614187099, 2311865152, 2277985865, 3719169342, 3550808119, 3250069292, 3484619301, 3850514714, 3951639571, 4187237128, 4154402305, 1296481766, 1129165039, 1364240372, 1599843069, 1969916354, 2069988555, 1769771984, 1735892697, 1025430958, 857069735, 554225596, 788775605, 87220618, 188345475, 421854104, 389019281, 1989006925, 2022103876, 1788595295, 1687208278, 1319232105, 1084944224, 1387788411, 1555887474, 114671109, 148812556, 449029143, 348694814, 1056541217, 821200680, 586125363, 753179962, 2520581853, 2553678804, 2318081231, 2216694214, 2920362745, 2686074864, 2986813675, 3154912738, 3865407125, 3899548572, 4201870471, 4101536142, 3729349297, 3494008760, 3261022371, 3428076970, 1106762476, 1341970405, 1575076094, 1407897079, 2044456648, 2010178497, 1707996378, 1808202195, 833598116, 1067761581, 767142070, 598910399, 159614592, 126389129, 362126482, 463376795, 2705787516, 2940995445, 3176206446, 3009027431, 2573942360, 2539664209, 2239571018, 2339776835, 3508494900, 3742658365, 3439949862, 3271718191, 3912455696, 3879230233, 4112862210, 4214112523, 2592891351, 2491903198, 2258271173, 2291234508, 2728416755, 2896910586, 3199619041, 2965193448, 3939764639, 3839820950, 4139914125, 4173930116, 3539484091, 3706925234, 3471714217, 3236244128, 2050797895, 1949809742, 1714072405, 1747035740, 1108378979, 1276872810, 1577492337, 1343066744, 174381327, 74437638, 376619805, 410635796, 843640107, 1011081250, 777975609, 542505520, 3959535514, 3792353939, 4028083592, 4263288961, 3559752638, 3659959991, 3359349164, 3325072549, 2623135698, 2454901467, 2152711616, 2386872521, 2759191542, 2860443391, 3093557732, 3060333805, 212952842, 45771267, 279411992, 514617361, 882725678, 982933031, 680216892, 645940277, 2095648578, 1927414347, 1627329872, 1861490777, 1153776486, 1255028335, 1490231668, 1457007741, 930745505, 963707304, 728503987, 627514298, 257308805, 22885772, 322970263, 491466654, 1193436393, 1227450848, 1530167035, 1430221810, 2131644621, 1896177092, 1662536415, 1829980118, 3620396081, 3653357880, 3420243491, 3319253802, 4024887317, 3790464284, 4092654087, 4261150478, 2811409529, 2845423984, 3146034795, 3046089570, 2680062045, 2444594516, 2208864847, 2376308550];
		this.gU = function(B) {
			var F, A;
			var E = new Array(v + 1);
			var C = new AES.F(B);
			var G = C.aU;
			for (F = 0; F < v + 1; F++) {
				E[F] = new Array(4);
				E[F][0] = C.bo[F][0];
				E[F][1] = C.bo[F][1];
				E[F][2] = C.bo[F][2];
				E[F][3] = C.bo[F][3]
			}
			for (F = 1; F < G; F++) {
				A = E[F][0];
				E[F][0] = z[c(A)] ^ l[o(A)] ^ e[m(A)] ^ d[b(A)];
				A = E[F][1];
				E[F][1] = z[c(A)] ^ l[o(A)] ^ e[m(A)] ^ d[b(A)];
				A = E[F][2];
				E[F][2] = z[c(A)] ^ l[o(A)] ^ e[m(A)] ^ d[b(A)];
				A = E[F][3];
				E[F][3] = z[c(A)] ^ l[o(A)] ^ e[m(A)] ^ d[b(A)]
			}
			this.bo = E;
			this.aU = G;
			return this
		};
		this.J = function(C, P) {
			var A;
			var B, G, F, E;
			var K = j(C);
			var H = P.aU;
			var O = K[0];
			var M = K[1];
			var J = K[2];
			var I = K[3];
			for (A = 0; A < H - 1; A++) {
				B = O ^ P.bo[A][0];
				G = M ^ P.bo[A][1];
				F = J ^ P.bo[A][2];
				E = I ^ P.bo[A][3];
				O = n[B & 255] ^ i[(G >> 8) & 255] ^ y[(F >> 16) & 255] ^ a[E >>> 24];
				M = n[G & 255] ^ i[(F >> 8) & 255] ^ y[(E >> 16) & 255] ^ a[B >>> 24];
				J = n[F & 255] ^ i[(E >> 8) & 255] ^ y[(B >> 16) & 255] ^ a[G >>> 24];
				I = n[E & 255] ^ i[(B >> 8) & 255] ^ y[(G >> 16) & 255] ^ a[F >>> 24]
			}
			A = H - 1;
			B = O ^ P.bo[A][0];
			G = M ^ P.bo[A][1];
			F = J ^ P.bo[A][2];
			E = I ^ P.bo[A][3];
			K[0] = s(B, G, F, E) ^ P.bo[H][0];
			K[1] = s(G, F, E, B) ^ P.bo[H][1];
			K[2] = s(F, E, B, G) ^ P.bo[H][2];
			K[3] = s(E, B, G, F) ^ P.bo[H][3];
			return g(K)
		};
		this.er = function(C, J) {
			var A;
			var B, G, F, E;
			var H = J.aU;
			var I = j(C);
			for (A = H; A > 1; A--) {
				B = I[0] ^ J.bo[A][0];
				G = I[1] ^ J.bo[A][1];
				F = I[2] ^ J.bo[A][2];
				E = I[3] ^ J.bo[A][3];
				I[0] = k[c(B)] ^ t[o(E)] ^ q[m(F)] ^ p[b(G)];
				I[1] = k[c(G)] ^ t[o(B)] ^ q[m(E)] ^ p[b(F)];
				I[2] = k[c(F)] ^ t[o(G)] ^ q[m(B)] ^ p[b(E)];
				I[3] = k[c(E)] ^ t[o(F)] ^ q[m(G)] ^ p[b(B)]
			}
			B = I[0] ^ J.bo[1][0];
			G = I[1] ^ J.bo[1][1];
			F = I[2] ^ J.bo[1][2];
			E = I[3] ^ J.bo[1][3];
			I[0] = r[c(B)] | (r[o(E)] << 8) | (r[m(F)] << 16) | (r[b(G)] << 24);
			I[1] = r[c(G)] | (r[o(B)] << 8) | (r[m(E)] << 16) | (r[b(F)] << 24);
			I[2] = r[c(F)] | (r[o(G)] << 8) | (r[m(B)] << 16) | (r[b(E)] << 24);
			I[3] = r[c(E)] | (r[o(F)] << 8) | (r[m(G)] << 16) | (r[b(B)] << 24);
			I[0] ^= J.bo[0][0];
			I[1] ^= J.bo[0][1];
			I[2] ^= J.bo[0][2];
			I[3] ^= J.bo[0][3];
			return g(I)
		}
	};
w.npPfsCtrl.isStartup = false;

// 기존 함수 호환용
w.npPfsStartup = function(form, firewall, securekey, fds, keypad, e2eattr, e2eval) {
	npPfsStartupV2(form, [firewall, securekey, fds, keypad], e2eattr, e2eval);
}

w.startupParameters = null;

w.npPfsStartupV2 = function(form, flags, e2eattr, e2eval) {
	
	function isNull(val) {
		if(typeof(val) == "undefined" || val === null) return true;
		return false;
	}
	
	function isBlank(val) {
		if(typeof(val) == "undefined" || val === null || val === "") return true;
		return false;
	}
	
	function n2b(val, def) {
		def = (isBlank(def)) ? "" : def;
		return (isBlank(val)) ? def : val;
	}

	
	function setCookie(key, value){
		try {
			L.hf(key, value, 0, "/");
		} catch(e){
			try { npCommon.setCookie(key, value, 0, "/"); } catch(e) { }
		}
	}
	
	function getCookie(key){
		var value = null;
		try {
			value = L.jv(key);
		} catch(e){
			try { value = npCommon.getCookie(key); } catch(e) { }
		}
		return value;
	}
	
	
	var flags = n2b(flags, []);
	var firewall = false;
	var securekey = false;
	var fds = false;
	var keypad = false;
	var submit = false;
	var device = false;
	for(var i = 0 ; i< flags.length ; i++) {
		switch(i) {
			case 0 : firewall = flags[i]; break;
			case 1 : securekey = flags[i]; break;
			case 2 : fds = flags[i]; break;
			case 3 : keypad = flags[i]; break;
			case 4 : submit = flags[i]; break;
			case 5 : device = flags[i]; break;
		}
	}
	
	var options = {
		Firewall : n2b(firewall, false),
		SecureKey : n2b(securekey, false),
		Fds : n2b(fds, false),
		Keypad : n2b(keypad, false),
		Submit : n2b(submit, false),
		Device : n2b(device, false),
		AutoStartup : true,
		Debug : false,
		Form : (isNull(form)) ? null : form,
		AutoScanAttrName : n2b(e2eattr, "npkencrypt"),
//		AutoScanAttrName : n2b(e2eattr, "enc"),
		AutoScanAttrValue : n2b(e2eval, "on"),
		MoveToInstall : function(url, isUpdate, useLayer, hideLoading){
			var message = (typeof(npMessage) != "undefined") ? npMessage.m95 : N.m95;
			if(isUpdate) {
				message = (typeof(npMessage) != "undefined") ? npMessage.m96 : N.m96;
			}
			if(url !== null && url !== ""){
				if(useLayer){
					startupParameters = {form : form, flags : flags, e2eattr : e2eattr, e2eval : e2eval};
					url = url + "?redirect=" + encodeURIComponent(location.href);
					try {
						L.showInstallLayer(url);
					} catch(e){
						npCommon.showInstallLayer(url);
					}
				} else {
					var agent = navigator.userAgent.toLowerCase();

					if(confirm(message)) {
						window.location.href = url
						window.location.reload()
						
						// if (agent.indexOf("chrome") != -1) {

						// 	window.location.href = url
						// } else {
							
						// 	window.location.href = url
						// 	window.location.reload()
						// }
					} else {
						window.location.href = "/"
					}
				}
			} else {
				alert((typeof(npMessage) != "undefined") ? npMessage.m97 : N.m97);
			}
		},
		Loading : {
			Default : false,
			Before : function() {
				//alert("작업시작 전에 사용자 로딩함수를 여기에 구현합니다.");
			},
			After : function() {
				//alert("작업시작 후에 사용자 로딩함수를 여기에 구현합니다.");
			}
		}

	};
	
	//setCookie("npPfsIgnore", "");
//	if("true" !== getCookie("npPfsIgnore")) {
//		setCookie("npPfsIgnore", "");
		if(typeof(npEXCtrl) != "undefined" && typeof(npEXCtrl.init) == "function") {
			var timeoutid;
			if(npEXCtrl.isRunnable() == true) {

				npPfsCtrl.showLoading();
				npEXCtrl.init();

				function wwait(){
					if(npEXCtrl.isRunning() == true) {
						clearTimeout(timeoutid);
						npPfsCtrl.functionQueue.push(function(){
							npPfsCtrl.init(options);
							npPfsCtrl.isStartup = true;
						});
					} else {
						timeoutid = setTimeout(wwait, 3000);
					}
				}
				wwait();
			}
		} else {
			npPfsCtrl.functionQueue.push(function(){
				npPfsCtrl.init(options);
				npPfsCtrl.isStartup = true;
			});
		}
		if(npPfsCtrl.functionQueue.length > 0) {
			function wwait() {
				if(npPfsCtrl.isStarting == false) {
					npPfsCtrl.functionExecute();
				} else {
					setTimeout(wwait, npPfsPolicy.Common.WaitTimeout);
				}
			}
			wwait();
		}
		
//	}

/*
	npPfsCtrl.isInstall({
		success:function() {
			options.Loading.Default = false;
			npPfsCtrl.init(options);
			npPfsCtrl.isStartup = true;
		},
		fail : function() {
			options.Loading.Default = true;
			npPfsCtrl.init(options);
			npPfsCtrl.isStartup = true;
		}
	});
*/
}

/*
w.uV.dV.Gf = "/pluginfree/jsp/nppfs.key.jsp";    // 키발급 경로
w.uV.dV.zf = "/pluginfree/jsp/nppfs.remove.jsp"; // 키삭제 경로
w.uV.dV.zo = "/pluginfree/jsp/nppfs.keypad.jsp;  // 마우스입력기 페이지
w.uV.dV.eP = "/pluginfree/jsp/nppfs.ready.jsp";  // 초기화상태 확인경로 
w.uV.dV.Fz = "/pluginfree/jsp/nppfs.install.jsp; // 설치안내 페이지
w.uV.dV.de = "/pluginfree/jsp/nppfs.session.jsp; // 세션유지 페이지
w.uV.dV.iB = "/pluginfree/jsp/nppfs.submit.jsp; // 구간암호화 페이지
 */

/*
function checkInstallKeyCryptPlugin(){
	if(typeof(bh) == "undefined") {
		return false;
	}
	if(typeof(D) != "undefined" && D.virtualMachine == true){
		return false;
	}
	return true;
}

w.npPfsCtrl.SetGlobalKeyValidation(function(keyCode, element) {
	//console.log("global key validataion");
	// true : do process biz logic, false : stop event
	if(keyCode >= 48 && keyCode <=57) return false;
	return true;
});


w.npPfsCtrl.makeJson = function(original, formname, keyName){
	var ret = original;

	if(typeof(ret) == "undefined" || ret == null) ret = {};
	if(typeof(keyName) == "undefined" || keyName == null || keyName == "") keyName = "__nppfs_json_vo__";
	
	ret[keyName] = npPfsCtrl.toJson(formname);
	
	return original;
}
*/


/*
 * ----- NOS 확장기능 스크립트 -----
 *  npPfsStartup() 함수 호출 전 선언되야 함
 * ------------------------------
 * 1. 키 유효성체크
 * 2. 페이지 벗어남 경고
 * 3. 키보드보안 초기화 전 추가 옵션적용
 * 4. 마우스입력기 초기화 전 추가 옵션적용
 * 5. 단말정보수집 추가정보 데이터 반환
 *//*
w.npPfsExtension = new function() {
	// 입력양식의 키 유효성 체크
	this.keyValidation = function(element, keyCode) {
		// 0 = 48, 9 = 57, a = 97, z = 122, A = 65, Z = 90
		var key = parseInt("" + keyCode);
		if(key < 48 || key > 57) {
			return false;
		}
		
		return true;			// true : 입력가능문자, false : 정합성불가/입력불가문자
	},
	// 페이지 벗어나기 전의 경고메시지 추가
	this.beforeFinalize = function(event) {
		if(false) {
			event = (event || window.event);
			var m = '작업이 아직 진행중에 있습니다. 저장하지 않은 채로 다른 페이지로 이동하시겠습니까?';  // a space
			(event || window.event).returnValue = m;
			return m;
		}
		return null;
	},
	// 키보드보안 초기화 전 추가 옵션적용
	this.secureKeyUiModifier = function(element) {
		var attr = jQuery(element).attr("enc");
		if(typeof(attr) == "undefined" || attr == "") {
			jQuery(element).attr({"enc" : "off"});
		}
	},
	// 마우스입력기 초기화 전 추가 옵션적용
	this.keypadUiModifier = function(element) {
		
	},
	// 단말정보수집 추가정보 데이터 반환
	this.additionalData = function() {
		return "";
	}
};

// 필드 색상 변경
w.npPfsCtrl.setColor({
	TextColor : "", 			// 키보드보안 글자 색상
	FieldBgColor : "", 			// 키보드보안 배경 색상
	ReTextColor : "", 			// 키보드보안 치환 글자 색상
	ReFieldBgColor : "", 		// 키보드보안 치환 배경 색상
	OnTextColor : "#FF0000", 	// 마우스입력기 포커스 글자 색상
	OnFieldBgColor : "#0100FF", // 마우스입력기 포커스 배경 색상
	OffTextColor : "#1DDB16", 	// 마우스입력기 글자 색상
	OffFieldBgColor : "#FF007F" // 마우스입력기 배경 색상
});



jQuery(document).on("nppfs-npv-enabled", function(event){
	console.log(event.message);
});
jQuery(document).on("nppfs-npv-disabled", function(event){
	console.log(event.message);
});

jQuery(document).on("nppfs-npv-before-show", function(event){
	console.log(event.message);
});

jQuery(document).on("nppfs-npv-after-show", function(event){
	console.log(event.message);
});

jQuery(document).on("nppfs-npv-after-hide", function(event){
	console.log(event.message);
});

$(document).ready(function(){
	$(document).bind("nppfs-npk-focusin nppfs-npk-focusout", function(e){
		var element = e.target;
		var type = $(element).attr("data-format");
		if(type == "num") {
		}
		console.log(e.type + " : " + element.name);
		switch(e.type) {
			case "nppfs-npk-focusin" :
				break;
			case "nppfs-npk-focusout" :
			break;
		}
	});
});
*/

	window.nppfsLoaded=true;
})();