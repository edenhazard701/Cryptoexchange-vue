<template>
	<el-tabs v-model="activeName" @tab-click="tabClicked" class="MyOpenAPI">
		<el-tab-pane :label="$t('api.b001')" name="intro"><!-- 소개 -->
			<div class="my-open-api-intro">
				<h1>{{$t('api.b004')}}<!-- Open API 란? --></h1>
				<ul>
					<li>{{$t('api.b005')}}<!-- 이용자가 일방적으로 웹 검색 결과 및 사용자 화면 등을 제공받는 데 그치지 않고 직접 응용 프로그램과 서비스를 개발할 수 있도록 공개된 개발자를 위한 인터페이스 입니다. --></li>
				</ul>
				<h1>{{$t('api.b006')}}<!-- Open API 강점 --></h1>
				<ul>
					<li>{{$t('api.b007')}}<!-- 본인만의 시스템트레이딩 전략을 구현하여 매매 가능 --></li>
					<li>{{$t('api.b008')}}<!-- 자동매매를 구축하여 공격적이고 안정적인 매매 가능 --></li>
					<li>{{$t('api.b009')}}<!-- 거래소 서버 연결로 빠른 주문과 매매 --></li>					
				</ul>
				<h1>{{$t('api.b010')}}<!-- 사용가능 항목 --></h1>
				<el-row class="open-able-item">
					<el-col class="intro-cell"><span class="label">{{$t('api.b011')}}</span><!-- 현재가 --></el-col>
					<el-col class="intro-cell"><span class="label">{{$t('api.b012')}}</span><!-- 일반주문 --></el-col>
					<el-col class="intro-cell"><span class="label">{{$t('api.b013')}}</span><!-- 정정취소주문 --></el-col>
					<el-col class="intro-cell"><span class="label">{{$t('api.b014')}}</span><!-- 체결 --></el-col>
					<el-col class="intro-cell"><span class="label">{{$t('api.b015')}}</span><!-- 미체결내역 --></el-col>
				</el-row>
				<el-row class="open-able-item">
					<el-col class="intro-cell"><span class="label">{{$t('api.b016')}}</span><!-- 차트조회 --></el-col>
					<el-col class="intro-cell"><span class="label">{{$t('api.b017')}}</span><!-- 관심종목 --></el-col>
					<el-col class="intro-cell"><span class="label">{{$t('api.b018')}}</span><!-- 원화고시환율 --></el-col>
					<el-col class="intro-cell"><span class="label">{{$t('api.b019')}}</span><!-- 일반잔고 --></el-col>
					<el-col class="intro-cell"><span class="label">{{$t('api.b020')}}</span><!-- 종목정보 리스트 --></el-col>
				</el-row>
				<h1>{{$t('api.b021')}}<!-- Open API 사용 --></h1>
				<div class="diagram">
					<div class="item">
						<span class="icon step1"></span>
						<span class="num">1</span>
						<span class="text">{{$t('api.b022')}}<!-- 상단 신청 탭 클릭 --></span>
					</div>
					<div class="item">
						<span class="icon step2"></span>
						<span class="num">2</span>
						<span class="text">{{$t('api.b023')}}<!-- 약관 동의 후 API 신청 --></span>
					</div>
					<div class="item">
						<span class="icon step3"></span>
						<span class="num">3</span>
						<span class="text">{{$t('api.b024')}}<!-- 인증키 발급 --></span>
					</div>
					<div class="item">
						<span class="icon step4"></span>
						<span class="num">4</span>
						<span class="text">{{$t('api.b025')}}<!-- 테스트 및 실행 --></span>
					</div>
				</div>
				<div class="guide-download">
					<el-button type="primary">{{$t('api.b026')}}<!-- 가이드 및 샘플 다운로드 --><i class="el-icon-download"></i></el-button>
				</div>
				<h1>{{$t('api.b027')}}<!-- 개발 환경 --></h1>
				<div class="open-api-environment">
					<table border="0" cellpadding="0" cellspacing="0">
						<colgroup>
							<col width="50%">
							<col width="50%">
						</colgroup>
						<thead>
							<tr>
								<th>{{$t('api.b028')}}<!-- 운영체제 --></th>
								<th>{{$t('api.b029')}}<!-- 개발언어 --></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Window</td>
								<td>Visual C++<br>(Visual Studio 2012 이상)</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</el-tab-pane>
		<el-tab-pane :label="$t('api.b002')" name="apply"><!-- 신청 -->
			<div class="my-open-api-intro">
				<h1>{{$t('api.b021')}}<!-- Open API 신청 --></h1>
				<h3>{{$t('api.c002')}}<!-- API 이용약관 동의 --></h3>
				<el-scrollbar>
					<div class="terms">
						<span class="terms-title">Open API 이용약관</span><br>
						제 1 조 [목적]<br>
						본 약관은 ‘KOVEX ㈜’(이하 ‘회사’라 합니다)가 제공하는 매매 API 서비스를 이용함에 있어 회사와 이를 이용하는 ‘고객’(이하 ‘사용자’이라 합니다)의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.<br><br>
						제 2 조 [용어의 정의]<br>
						본 약관에서 사용하는 용어는 다음과 같이 정의합니다.<br>
						가) '사용자’라 함은 본 약관에 동의한 후 회사가 제공하는 API 서비스를 이용하는 자를 말합니다.<br>
						나) API 서비스라 함은 회원이 자발적인 참여를 통해 자유롭게 정보를 공유하고 창조적인 서비스를 생산할 수 있도록 돕기 위하여 회사가 일정 한도 내에서 API를 제공하고 운영하는 것을 말합니다.<br>
						다) 회사가 제공하는 API를 이용하여 사용자가 직접 회사의 HTS와 동일한 환경의 접속, 일반주문, 시세, 데이터조회를 시행할 수 있는 서비스입니다.<br>
						라) 개발 언어: Visual C++<br><br>
						제 3 조 (서비스의 이용)<br>
						가) API는 회사가 제공하는 온라인 매체 (PC웹, 모바일웹, 모바일앱, API 등)의 한 종류로써 PC를 이용하여 나)항의 내용을 이용할 수 있는 통신 시스템이다.<br>
						나) API를 통하여 제공하는 서비스 내용은 아래와 같다.<br>
						&nbsp;&nbsp;① 매매주문업무: 매수, 매도, 정정/취소<br>
						&nbsp;&nbsp;② 정보조회: 잔고내역, 거래내역, 체결결과, 미체결 조회 등<br>
						&nbsp;&nbsp;③ 투자정보조회: 종목조회, 차트조회<br><br>
						제 4 조 (서비스 가입, 이용 및 해지)<br>
						가)	서비스에 가입하고자 하는 자는 회사에 회원가입을 마치고 보안인증을 완료한 자.<br>
						나)	제 1항의 가입조건을 충족한 자 중 서비스를 이용하고자 하는 자는 회사의 홈페이지 (고객센터 > API > 사용신청/해지)에서 서비스 사용 신청을 하여야 한다.<br>
						다)	회사는 [나]항을 충족한 사용자에 한하여 샘플 및 매뉴얼을 제공한다.<br>
						라)	사용자가 다음 각 호의 어느 하나에 해당되는 경우, 회사는 사용자에게 시정조치를 요구할 수 있고 사용자가 시정하지 않을 시 서비스를 해지할 수 있다.<br>
						&nbsp;&nbsp;① 사용자가 API 사용등록일부터 3개월 이상 API를 통한 로그인이 없는 경우<br>
						&nbsp;&nbsp;② 3개월간 API를 통한 주문체결이 20회 이하인 경우<br>
						&nbsp;&nbsp;③ 회사의 서버에 일정 수준 이상의 부하를 유발하거나 다른 고객의 이용에 제한을 주는 행위를 하는 경우<br>
						&nbsp;&nbsp;④ 서비스를 이용해 얻을 수 있는 투자정보, 시세, 계좌, 체결내역, 잔고 등의 데이터를 타인에게 양도하거나 매도하는 경우<br>
						&nbsp;&nbsp;⑤ 서비스를 이용하여 불법 대여 계좌 및 미니 도박형 계좌를 운영한 경우<br>
						&nbsp;&nbsp;⑥ 감독당국의 행정조치 대상이 되는 경우<br>
						&nbsp;&nbsp;⑦ 상기 항목에 의해 해지된 사용자가 가입을 다시 신청할 경우 회사는 그 가입을 제한할 수 있다.<br><br>
						제 5 조 (수수료)<br>
						사용자가 API 서비스를 이용하여 주문할 경우, 수수료는 PC웹, 모바일앱, 모바일웹과 동일한 매매수수료 (회사 홈페이지 > 고객센터 > 이용방법 > 거래 이용 안내)를 적용하여 부과된다.<br><br>
						제 6 조 (저작권)<br>
						가)	회사가 제공하는 API 및 관련 프로그램의 저작권은 회사에 있으며, 회사는 회사의 정책 및 운영의 필요상 API 또는 API서비스를 변경하거나 중단할 수 있다.<br>
						나)	API서비스를 이용한 검색결과의 저작권은 회사에 있으며, 회사의 API 서비스 이용 승낙으로 인하여 회원이 검색결과에 대한 저작권 또는 사용권을 취득하는 것은 아니다<br>
						다)	회원은 API 서비스를 통하여 실시간으로 제공되는 검색결과를 연동할 수 있을 뿐이며, 검색결과를 복제 또는 저장하거나 전송할 수 없다<br><br>
						제 7 조 (사용자의 의무와 책임)<br>
						가)	다음의 변경사항들에 관한 공지는 SMS, PC웹 공지사항을 통하여 사전에 제공됨으로 사용자는 이를 반드시 확인하여야 하며, 미확인에 따른 책임은 사용자에게 있다<br>
						&nbsp;&nbsp;① API 업데이트<br>
						&nbsp;&nbsp;② 제도 변경<br>
						&nbsp;&nbsp;③ 데이터서비스(TR) 변경 및 추가 공지<br>
						&nbsp;&nbsp;④ 회사 정책 변경에 따른 공지<br>
						&nbsp;&nbsp;⑤ 기타 긴급 공지 등<br><br>
						제 8 조 (면책사항)<br>
						회사는 회사의 책임 있는 사유가 없는 경우로서 다음 각 호의 어느 하나에 해당하는 사유로 인하여 사용자에게 발생하는 손해에 대하여 책임을 지지 아니한다.<br>
						가)	천재지변, 전시에 준하는 불가항력이라고 인정되는 사유에 의한 업무의 지연 또는 불능<br>
						나)	사용자가 작성한 프로그램의 사용<br>
						다)	사용자 이외의 제 3 자가 작성한 프로그램의 사용<br>
						라)	사용자가 제 7 조를 위반한 경우<br>
						마)	사용자의 책임 있는 사유로 사용자의 아이디, 비밀번호, 보안비밀번호 등이 유출된 경우<br>
						바)	주문폭주 및 시세급변, 혹은 시스템 오류 등으로 인하여 주문의 미처리 및 미체결 등의 오류가 발생하거나 원치 않는 호가에 주문 처리 될 수 있음<br>
						사)	시스템 오류 또는 특정 운영장비, 프로그램 및 시세의 백업전환 등으로 서비스를 일시적으로 중기자 필요할 경우 주문 전체가 취소될 수 있음<br><br>
						제 9 조 (개인정보의 보호)<br>
						가)	회사는 API 서비스를 운영함에 있어 회원에 대한 각종 고지사항의 전달, 이용실태에 대한 조사 등을 위하여 회원의 연락처 등 개인정보를 보관합니다.<br>
						나)	회사는 회원의 정보제공 동의에 따라 직접 회원이 제공한 정보만을 보관하며, 회사의 개인정보보호정책에 따라 이를 철저히 관리합니다.<br><br>
						제 10 조 (관계법규의 적용)<br>
						가)	이 약관에서 정하지 아니한 사항은 별도의 약정이 없는 한 관계법규에서 정하는 바에 따르며 관계 법규에도 정함이 없을 경우에는 일반적인 상관례에 따른다.<br>
						나)	이 약관에 의한 매매거래 중 전자금융거래에 관하여는 “전자금융거래이용에 관한 기본약관” 및 전자금융거래법령이 우선 적용된다.<br><br>
						제 11 조 (관할법원)<br>
						이 약관에 의한 거래와 관련하여 발생된 분쟁에 대하여 회사와 사용자 사이에 소송의 필요가 생긴 경우에는 그 관할법원은 ‘민사소송법’이 정한 바에 따른다.
					</div>
				</el-scrollbar>
				<div class="terms-agree">
					<el-checkbox v-model="termsAgreed" @change="agreeChk">
						<span v-html="$t('api.c004')"></span>
						<!-- 상기 API 약관동의에 대해 숙지하고 동의합니다. 
						<span class="agree-require">(필수)</span>--> </el-checkbox>
				</div>

				<h3>리스크 약관 동의</h3>
				<el-scrollbar>
					<div class="terms">
						<span class="terms-title">Open API 유의사항</span><br>
						1. 고객님이 구현한 전략 프로그램은 실 매매 적용 전, 충분한 테스트를 거친 후 실제 매매에 사용 하는 것을 적극 권장합니다.<br>
						2. 고객에게 제공되는 TR(Transaction)과 모듈은 오류가 발견되거나 시스템 보완 등으로 인하여 지속적으로 변경될 수 있습니다. 이 같은 변경사항은 공지사항에 게시하며 변경된 내용을 프로그램에 직접 반영하셔야 합니다. 미 반영으로 인한 프로그램 실행 오류 등은 당사에서 책임지지 않습니다.<br>
						3. 과도한 TR 요청시, 시스템 부하 등 여러 문제가 발생할 수 있는 상황을 초례 할 경우 임의로 고객님에 대하여 접속 차단 등의 조치가 이루어질 수 있습니다. <br>
						4. 시스템 오류 또는 특정 운영장비, 프로그램 및 시세의 백업전환 등 으로 서비스를 일시적으로 중지가 필요할 경우 주문 전체가 취소될 수 있습니다. <br>
						5. 시스템 장애로 인하여 백업서버 전환 처리시 주문중지 및 원하지 않는 호가에 주문 처리될 수 있습니다. <br>
						6. 주문에 대한 결과 지연, 이로 인하여 주문의 미처리 등 처리 결과가 상이하게 나타날 수 있습니다.<br>
						7. 주문폭주 및 시세급변, 혹은 시스템 오류 등으로 인하여 주문의 미처리 및 미체결 등의 오류가 발생하거나 원치 않는 호가에 주문 처리 될 수 있습니다.<br>
						8. 회사의 귀책사유가 아닌 전산장애, 회선장애, 천재지변 또는 부득이한 사유가 있는 경우 서비스 제공이 지연되거나, 중단될 수 있으며 이로 인하여 발생한 손실에 대하여는 당사가 책임지지 않습니다.
					</div>
				</el-scrollbar>
				<div class="terms-agree">
					<el-checkbox v-model="riskAgreed" @change="agreeChk">
						<span v-html="$t('api.c005')"></span>
						<!-- 상기 리스크 약관 동의에 대해 숙지하고 동의합니다. <span class="agree-require">(필수)</span> -->
					</el-checkbox>
				</div>
				
				<div class="setting-area" :class="{'disabled': !settingAgree}">
					<div class="category">
						<h2>
							<span v-html="$t('api.c006')"><!-- 사용가능 항목 <span class="agree-require">(필수)</span> --></span>
							<div class="check-all">
								{{$t('api.c017')}}<!-- API로 이용하실 항목을 선택하세요. --> &nbsp;&nbsp;
								<el-checkbox v-model="applyAll" @change="applyOptionAll" :disabled="settingAgree ? false : true">{{$t('api.c018')}}<!-- 전체선택 --></el-checkbox>
							</div>
						</h2>
						
						<el-row class="open-able-item">
							<el-col class="intro-cell"><el-checkbox v-model="applyOptions[0]" @change="applyOptionsChanged" :disabled="settingAgree ? false : true">{{$t('api.c007')}}<!-- 현재가 --></el-checkbox></el-col>
							<el-col class="intro-cell"><el-checkbox v-model="applyOptions[1]" @change="applyOptionsChanged" :disabled="settingAgree ? false : true">{{$t('api.c008')}}<!-- 일반주문 --></el-checkbox></el-col>
							<el-col class="intro-cell"><el-checkbox v-model="applyOptions[2]" @change="applyOptionsChanged" :disabled="settingAgree ? false : true">{{$t('api.c009')}}<!-- 정정취소주문 --></el-checkbox></el-col>
							<el-col class="intro-cell"><el-checkbox v-model="applyOptions[3]" @change="applyOptionsChanged" :disabled="settingAgree ? false : true">{{$t('api.c010')}}<!-- 체결 --></el-checkbox></el-col>
							<el-col class="intro-cell"><el-checkbox v-model="applyOptions[4]" @change="applyOptionsChanged" :disabled="settingAgree ? false : true">{{$t('api.c011')}}<!-- 미체결내역 --></el-checkbox></el-col>
						</el-row>
						<el-row class="open-able-item">
							<el-col class="intro-cell"><el-checkbox v-model="applyOptions[5]" @change="applyOptionsChanged" :disabled="settingAgree ? false : true">{{$t('api.c012')}}<!-- 차트조회 --></el-checkbox></el-col>
							<el-col class="intro-cell"><el-checkbox v-model="applyOptions[6]" @change="applyOptionsChanged" :disabled="settingAgree ? false : true">{{$t('api.c013')}}<!-- 관심종목 --></el-checkbox></el-col>
							<el-col class="intro-cell"><el-checkbox v-model="applyOptions[7]" @change="applyOptionsChanged" :disabled="settingAgree ? false : true">{{$t('api.c014')}}<!-- 원화고시환율 --></el-checkbox></el-col>
							<el-col class="intro-cell"><el-checkbox v-model="applyOptions[8]" @change="applyOptionsChanged" :disabled="settingAgree ? false : true">{{$t('api.c015')}}<!-- 일반잔고 --></el-checkbox></el-col>
							<el-col class="intro-cell"><el-checkbox v-model="applyOptions[9]" @change="applyOptionsChanged" :disabled="settingAgree ? false : true">{{$t('api.c016')}}<!-- 종목정보 리스트 --></el-checkbox></el-col>
						</el-row>
					</div>
					
					<el-row class="category">
						<el-col :span="12">
							<h2 v-html="$t('api.c019')"><!-- 접속IP 설정 <span class="agree-select">(선택)</span> --></h2>
							<el-input :placeholder="$t('api.c020')" v-model="ipAddress" :disabled="settingAgree ? false : true"></el-input><!-- IP 주소 입력. 예)111.222.333.444 -->
							<div class="validity-caution" v-show="ipValidity">IP를 다시 확인해 주세요.</div>

							<ol>
								<li>{{$t('api.c021')}}<!-- 입력하신 IP만 API 접속이 가능합니다. --></li>
								<li>{{$t('api.c022')}}<!-- 접속 IP 설정을 하지 않으실 경우 보안상 취약하므로 가급적 설정하는 것을 추천합니다. --></li>
							</ol>

							<h2 v-html="$t('api.c023')"><!-- SMS 본인인증 <span class="agree-require">(필수)</span> --></h2>
							<div class="conf-sms">
								<el-input :placeholder="$t('api.a020')" v-model="smsVerificationCode" :disabled="settingAgree ? false : true"><!-- 인증번호 -->
									<template slot="prepend">{{$t('api.c024')}}<!-- SMS 인증하기 --></template>
									<el-button v-if="!smsVerified && smsSent" type="primary" slot="append" class="conf-ok-btn">확인</el-button>
								</el-input>
								<el-button type="primary" class="conf-btn" @click="smsRequestClicked">{{$t('api.c026')}}<!-- 인증요청 --></el-button>
								<span v-if="countdowning" class="time-counter">2:59</span>
							</div>
							<div v-show="smsValidity" class="validity-caution">인증번호가 일치하지 않습니다.</div>
						</el-col>

						<el-col :span="12">
							<el-scrollbar>
								<div class="terms">
									<span class="terms-title">{{$t('api.c027')}}<!-- 유의사항 --></span><br>
									<ul>
										<li>
											{{$t('api.c028')}}<!-- 아래와 같은 시스템 과부하 발생시 일시적으로 사용을 제한할 수 있습니다. --><br>
											{{$t('api.c029')}}<!-- ① 초당 10회 초과 요청시 --><br>
											{{$t('api.c030')}}<!-- ② 비정상정인 방식의 이상거래 행위를 한 경우 --><br>
											{{$t('api.c031')}}<!-- ③ 허수주문을 발생시켜 시장 교란을 일으킨 경우 -->
										</li>
										<li>
											{{$t('api.c032')}}<!-- API 시스템 자동 해지 --><br>
											{{$t('api.c033')}}<!-- ① 3개월 이상 API 서비스를 이용한 거래가 없는 경우 -->
										</li>
										<li>
											{{$t('api.c032')}}<!-- API 시스템 자동 해지 --><br>
											{{$t('api.c033')}}<!-- ① 3개월 이상 API 서비스를 이용한 거래가 없는 경우 -->
										</li>
										<li>
											{{$t('api.c032')}}<!-- API 시스템 자동 해지 --><br>
											{{$t('api.c033')}}<!-- ① 3개월 이상 API 서비스를 이용한 거래가 없는 경우 -->
										</li>
										<li>
											{{$t('api.c032')}}<!-- API 시스템 자동 해지 --><br>
											{{$t('api.c033')}}<!-- ① 3개월 이상 API 서비스를 이용한 거래가 없는 경우 -->
										</li>
									</ul>
								</div>
							</el-scrollbar>
						</el-col>
					</el-row>
					<div class="guide-download request">
						<el-button type="primary" @click="apiApplyClicked" :disabled="settingAgree ? false : true">{{$t('api.c035')}}<!-- API 신청 --></el-button>
					</div>
				</div>
					
				<div class="category contents" :class="{'disabled': !settingAgree}">
					<h2>{{$t('api.c036')}}<!-- 사용중 --></h2>
					<el-table :data="usingList" stripe>
						<el-table-column prop="userID" :label="$t('api.c037')"></el-table-column><!-- 계정ID -->
						<el-table-column prop="date" :label="$t('api.c038')" align="center" width="160"></el-table-column><!-- 신청일 -->
						<el-table-column :label="$t('api.c039')" align="center" width="120"><!-- 권한 -->
							<template slot-scope="scope">
								<el-button @click="apiInfoClicked(scope.$index, scope.row)" type="primary" plain>{{$t('api.c041')}}<!-- 보기 --></el-button>
							</template>
						</el-table-column>
						<el-table-column :label="$t('api.c040')" align="center" width="120"><!-- 비고 -->
							<template slot-scope="scope">
								<el-button @click="apiDeleteClicked(scope.$index, scope.row)" type="danger" plain>{{$t('api.c042')}}<!-- 삭제 --></el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="use-info">({{$t('api.c044')}}<!-- 사용하지 않는 API는 삭제해 주세요 -->)</div>

					<el-dialog :visible.sync="keyVisible" :title="$t('api.c045')" width="680px"><!-- 사용가능항목 -->
						<div class="box-data">{{$t('api.c046')}}<!-- 계정 ID --> kimtw043@naver.com</div>
						<div class="box-data">{{$t('api.c047')}}<!-- 허용IP --> 211.212.248.252</div>
						<div class="box-item">
							<span class="item">{{$t('api.c048')}}<!-- 현재가 --></span>
							<span class="item">{{$t('api.c049')}}<!-- 일반주문 --></span>
							<span class="item">{{$t('api.c050')}}<!-- 정정취소주문 --></span>
							<span class="item">{{$t('api.c051')}}<!-- 체결 --></span>
							<span class="item">{{$t('api.c052')}}<!-- 미체결 내역 --></span>
						</div>
						<div class="box-item">
							<span class="item">{{$t('api.c053')}}<!-- 차트조회 --></span>
							<span class="item">{{$t('api.c054')}}<!-- 관심종목 --></span>
							<span class="item">{{$t('api.c055')}}<!-- 원화고시환율 --></span>
							<span class="item">{{$t('api.c056')}}<!-- 일반잔고 --></span>
							<span class="item">{{$t('api.c057')}}<!-- 종목정보 리스트 --></span>
						</div>
						<div slot="footer">
							<!-- <el-button type="primary" @click="keyVisible = false">확인</el-button> -->
						</div>
					</el-dialog>
				</div>
			</div>
		</el-tab-pane>
		<el-tab-pane :label="$t('api.b003')" name="faq"><!-- FAQ -->
			<div class="my-open-api-intro">
				<h2>Open API FAQ</h2>
				<el-collapse v-model="activeFaq" accordion class="accordion">
					<el-collapse-item v-for="item in faqData" :key="item.id" v-bind:title="item.title" v-bind:name="item.id">
						<div>{{item.content}}</div>
					</el-collapse-item>
				</el-collapse>
			</div>

			<div class="faq-info" v-html="$t('cs.f007')">
				<!-- 찾고자 하는 질문의 답을 찾지 못하셨다면 고객센터 (<span class="caution">1588-5588</span>) 으로 문의 또는<br>
				<span class="caution">1:1 문의하기</span>로 문의 내용을 남겨주세요. -->
			</div>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
      		return {  
				activeName: 'intro',
				termsAgreed: false,
				riskAgreed: false,
				settingAgree: false,
				applyAll: false,
				applyOptions: [false, false, false, false, false, false, false, false, false, false],
				ipAddress: '',
				ipValidity: false,
				smsVerificationCode: '',
				smsValidity: false,
				smsVerified: false,
				smsSent: false,
				countdowning: false,
				keyVisible: false,
				activeFaq: '1',
				faqData : [{
					id: '1',
					title : '미성년자도 가입 및 거래가 가능한가요?',
					content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at mi placerat, rhoncus neque id, rutrum turpis. In eget elementum erat, et pellentesque leo. Integer sed bibendum nulla, non dictum lorem. Mauris tellus urna, commodo et rhoncus ac, congue eget orci. Quisque vitae turpis sit amet ex cursus mattis eu vitae mauris. Praesent commodo ac erat a ultricies. Fusce at sem eget massa hendrerit volutpat. Nam lectus dui, ultricies sed consequat vel, porttitor a arcu. Mauris in vulputate odio. Aliquam sagittis ex eget nisl volutpat finibus. Cras et tellus eget massa pellentesque facilisis non sit amet magna. Cras ut neque dui. Fusce tempus eget tortor sed iaculis. Suspendisse potenti. In vel ipsum vitae tellus luctus scelerisque.'
				},{
					id: '2',
					title : '외국인도 가입 및 거래가 가능한가요?',
					content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at mi placerat, rhoncus neque id, rutrum turpis. In eget elementum erat, et pellentesque leo. Integer sed bibendum nulla, non dictum lorem. Mauris tellus urna, commodo et rhoncus ac, congue eget orci. Quisque vitae turpis sit amet ex cursus mattis eu vitae mauris. Praesent commodo ac erat a ultricies. Fusce at sem eget massa hendrerit volutpat. Nam lectus dui, ultricies sed consequat vel, porttitor a arcu. Mauris in vulputate odio. Aliquam sagittis ex eget nisl volutpat finibus. Cras et tellus eget massa pellentesque facilisis non sit amet magna. Cras ut neque dui. Fusce tempus eget tortor sed iaculis. Suspendisse potenti. In vel ipsum vitae tellus luctus scelerisque.'
				},{
					id: '3',
					title : '본인 명의 휴대 전화, 계좌가 없어도 되나요?',
					content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at mi placerat, rhoncus neque id, rutrum turpis. In eget elementum erat, et pellentesque leo. Integer sed bibendum nulla, non dictum lorem. Mauris tellus urna, commodo et rhoncus ac, congue eget orci. Quisque vitae turpis sit amet ex cursus mattis eu vitae mauris. Praesent commodo ac erat a ultricies. Fusce at sem eget massa hendrerit volutpat. Nam lectus dui, ultricies sed consequat vel, porttitor a arcu. Mauris in vulputate odio. Aliquam sagittis ex eget nisl volutpat finibus. Cras et tellus eget massa pellentesque facilisis non sit amet magna. Cras ut neque dui. Fusce tempus eget tortor sed iaculis. Suspendisse potenti. In vel ipsum vitae tellus luctus scelerisque.'
				},{
					id: '4',
					title : '동일한 휴대폰 번호로 여러 계정을 만들 수 있나요?',
					content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at mi placerat, rhoncus neque id, rutrum turpis. In eget elementum erat, et pellentesque leo. Integer sed bibendum nulla, non dictum lorem. Mauris tellus urna, commodo et rhoncus ac, congue eget orci. Quisque vitae turpis sit amet ex cursus mattis eu vitae mauris. Praesent commodo ac erat a ultricies. Fusce at sem eget massa hendrerit volutpat. Nam lectus dui, ultricies sed consequat vel, porttitor a arcu. Mauris in vulputate odio. Aliquam sagittis ex eget nisl volutpat finibus. Cras et tellus eget massa pellentesque facilisis non sit amet magna. Cras ut neque dui. Fusce tempus eget tortor sed iaculis. Suspendisse potenti. In vel ipsum vitae tellus luctus scelerisque.'
				},{
					id: '5',
					title : '가입인증 메일이 오지 않아요.',
					content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at mi placerat, rhoncus neque id, rutrum turpis. In eget elementum erat, et pellentesque leo. Integer sed bibendum nulla, non dictum lorem. Mauris tellus urna, commodo et rhoncus ac, congue eget orci. Quisque vitae turpis sit amet ex cursus mattis eu vitae mauris. Praesent commodo ac erat a ultricies. Fusce at sem eget massa hendrerit volutpat. Nam lectus dui, ultricies sed consequat vel, porttitor a arcu. Mauris in vulputate odio. Aliquam sagittis ex eget nisl volutpat finibus. Cras et tellus eget massa pellentesque facilisis non sit amet magna. Cras ut neque dui. Fusce tempus eget tortor sed iaculis. Suspendisse potenti. In vel ipsum vitae tellus luctus scelerisque.'
				},{
					id: '6',
					title : '회원 탈퇴하고 싶어요.',
					content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at mi placerat, rhoncus neque id, rutrum turpis. In eget elementum erat, et pellentesque leo. Integer sed bibendum nulla, non dictum lorem. Mauris tellus urna, commodo et rhoncus ac, congue eget orci. Quisque vitae turpis sit amet ex cursus mattis eu vitae mauris. Praesent commodo ac erat a ultricies. Fusce at sem eget massa hendrerit volutpat. Nam lectus dui, ultricies sed consequat vel, porttitor a arcu. Mauris in vulputate odio. Aliquam sagittis ex eget nisl volutpat finibus. Cras et tellus eget massa pellentesque facilisis non sit amet magna. Cras ut neque dui. Fusce tempus eget tortor sed iaculis. Suspendisse potenti. In vel ipsum vitae tellus luctus scelerisque.'
				},{
					id: '7',
					title : '탈퇴 후 재가입이 가능한가요?',
					content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at mi placerat, rhoncus neque id, rutrum turpis. In eget elementum erat, et pellentesque leo. Integer sed bibendum nulla, non dictum lorem. Mauris tellus urna, commodo et rhoncus ac, congue eget orci. Quisque vitae turpis sit amet ex cursus mattis eu vitae mauris. Praesent commodo ac erat a ultricies. Fusce at sem eget massa hendrerit volutpat. Nam lectus dui, ultricies sed consequat vel, porttitor a arcu. Mauris in vulputate odio. Aliquam sagittis ex eget nisl volutpat finibus. Cras et tellus eget massa pellentesque facilisis non sit amet magna. Cras ut neque dui. Fusce tempus eget tortor sed iaculis. Suspendisse potenti. In vel ipsum vitae tellus luctus scelerisque.'
				}], 
				usingList: [
					{
						userID: 'kim**@kovex.co.kr',
						date: '2018.05.22 18:32:12'
					}
				]
      		};
    	},
    	methods: {
			/* 사용 가능 항목 선택에 따른 전체선택 체크박스 체크 여부 */
      		applyOptionsChanged(val) {
				if (this.applyOptions.indexOf(false) < 0) {
					this.applyAll = true;
				} else {
					this.applyAll = false;
				}
			},
			/* SMS 인증번호 발송 함수 */
			smsRequestClicked() {
				alert('TODO: SMS 인증번호 요청');
			},
			/* API 신청하기 confirm 팝업 띄우기 */
			apiApplyClicked() {
				this.$confirm( this.$t('api.c065'), '', { // 'API를 신청하시겠습니까?'
					cancelButtonText: '취소',
					confirmButtonText: '확인'
				}).then(() => {
					const h = this.$createElement;
					this.$msgbox({
						title: this.$t('api.c059'), // 'API 서비스 신청이 완료되었습니다.'
						message: h('div', {class: 'pop-request'}, [
							h('span', {class: 'text-underline'}, this.$t('api.c060')), //'사용 전 아래 유의사항을 꼭 지켜주세요!'
							h('ul', {class: 'dot'}, [
								h('li', null, this.$t('api.c061') ), // '초당 20회 초과 (TR) 요청시 5분간 사용이 제한될 수 있습니다'
								h('li', null, this.$t('api.c062')) // '고객님이 구현한 전략 프로그램은 검증 후 사용 하는 것을 권장합니다.'
							]),
						]),
						confirmButtonText: '확인'
					})
				});

				/* 1계정에 API신청이 이미 되어 있을 때 */
				// this.$alert('API 신청은 1계정당 1개까지만 신청이 가능합니다.', '', {
				// 	confirmButtonText: '확인'
				// });

				/* 해지 후 당일 재신청할 때 */
				// this.$alert('API 해지 후 당일 재신청은 불가합니다.<br>00:00시 이후 다시 신청해주세요.', '', {
				// 	dangerouslyUseHTMLString: true,
				// 	confirmButtonText: '확인'
				// });
			},
			/* 계정ID에 따른 권한 팝업 보기 */
			apiInfoClicked(index, row) {
				this.keyVisible = true;
			},
			/* 계정ID에 따른 api 삭제 confirm 팝업 띄우기 */
			apiDeleteClicked(index, row) {
				this.$confirm('API를 삭제하시겠습니까?', '', {
					cancelButtonText: '취소',
					confirmButtonText: '확인'
				}).then(() => {
					this.$alert('API KEY 삭제가 완료되었습니다.', '', {
						cancelButtonText: '취소',
						confirmButtonText: '확인'
					})
				});
			},
			/* 전체선택 */
			applyOptionAll() {
				if (this.applyAll === true) {
					this.applyOptions = [true, true, true, true, true, true, true, true, true, true];
				} else {
					this.applyOptions = [false, false, false, false, false, false, false, false, false, false];
				}
			},
			/* 약관 동의 체크 */
			agreeChk() {
				var appiAgree = this.termsAgreed;
				var riskAgree = this.riskAgreed;

				if (appiAgree === true && riskAgree === true) {
					this.settingAgree = true;
				} else {
					this.settingAgree = false;
				}
			}
		},
		created() {
			
		},
		mounted() {
			/* GNB 하단 location bar에서의 위치 표시 */
			let self = this;
			self.$EventBus.$emit('pc-navi', [
				{ label: self.$t('header.me'), target: 'mypageInfo' },
				{ label: self.$t('mypage.a003'), target: 'mypageOpenApi' },
            	{ label: self.$t('mypage.a004'), target: null }
			]);

			self.$EventBus.$on('langChange', () => {
				self.$EventBus.$emit('pc-navi', [
					{ label: self.$t('header.me'), target: 'mypageInfo' },
					{ label: self.$t('mypage.a003'), target: 'mypageOpenApi' },
					{ label: self.$t('mypage.a004'), target: null }
				]);
			});
		}
	};

</script>