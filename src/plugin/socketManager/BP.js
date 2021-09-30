//------------------------------------------------------------------------------------------------------------------
//	SIZE
//------------------------------------------------------------------------------------------------------------------
global.SZ_SIZE_HEADER				= 4;	// 사이즈를 얻어올 수 있는 헤더 영역 사이즈, SZ_SOCK_ETX 포함

//--------------------------------------------------
//	XT_SOCK_PACKET
//--------------------------------------------------
global.SZ_SOCK_STX					= 1;	// 
global.SZ_SOCK_HI					= 1;	// 
global.SZ_SOCK_LO					= 1;	// 
global.SZ_SOCK_ETX					= 1;	//  이 값은 패킷의 맨 뒷 부분에 있다.

//--------------------------------------------------
//	XT_COMM_HEAD
//--------------------------------------------------
global.SZ_COMM_FLAG				= 1;	// 
global.SZ_COMM_ID					= 1;	// 
global.SZ_COMM_CMD					= 1;	// 

//-------------------------------------------------- ------------------------------------------------
//	XT_MSG_PACKET
//-------------------------------------------------- ------------------------------------------------
global.SZ_MSG_CODE					= 5;
global.SZ_MSG_MESSAGE				= 130;

//-------------------------------------------------- ------------------------------------------------
//	XT_TR_HEAD
//-------------------------------------------------- ------------------------------------------------
global.SZ_TR_FLAG					= 1;	// 
global.SZ_TR_TRCODE				= 5;	// 
global.SZ_TR_MEDIA					= 1;	// 
global.SZ_TR_DHEAD_TYPE			= 1;	// 
global.SZ_TR_DHEAD_HI				= 1;	// 
global.SZ_TR_DHEAD_LO				= 1;	// 
global.SZ_TR_FID_OUT				= 1;	//	FID OutData Type 1:Json 2:Xml ' ':struct
global.SZ_TR_SEQCHK				= 5;	//	시퀀스 체크 1 ~ 99999 

//--------------------------------------------------
//	XT_DATA_HEAD (정보계)
//--------------------------------------------------
global.SZ_BDH_CONTI_FLAG		= 1;	// 연속 FLAG 
global.SZ_BDH_PAGING_KEY		= 80;	// 연속 조회키 
global.SZ_BDH_SCREEN_NO			= 4;	// 화면 번호
global.SZ_BDH_UNIT_CODE			= 5;	// 유닛 코드
global.SZ_BDH_FILLER				= 110;	// 필러 

//--------------------------------------------------
//	XT_DATA_HEAD (업무계)
//--------------------------------------------------
global.SZ_ADH_ACCOUNT_ID		= 10;	// 계정
global.SZ_ADH_CHANNEL				= 2;	// 매체 구분
global.SZ_ADH_PUB_IP				= 16;	// 공인 IP 주소
global.SZ_ADH_PRV_IP				= 16;	// 사설 IP 주소
global.SZ_ADH_MAC_ADDR			= 32;	// MAC 주소
global.SZ_ADH_CONTI_FLAG		= 1;	// 연속 FLAG 
global.SZ_ADH_PAGING_KEY		= 80;	// 연속 조회키 
global.SZ_ADH_CHANNEL_AREA 	= 20;	// 채널 영역
global.SZ_ADH_UNIT_CODE	  	= 5;	// 유닛 코드
global.SZ_ADH_FILLER				= 18;	// 필러 

global.SZ_INF_DHEAD			  	= 200;
global.SZ_ACC_DHEAD			  	= 200;

//global.PACKET_CHAIN_SIZE			= 2048;
global.PACKET_CHAIN_SIZE		= 2055; //2048+7
//암호화 전송 (send buffer 12000)
//global.PACKET_CHAIN_SIZE			= 12000; //2048+7

//------------------------------------------------------------------------------------------------------------------
//	OFFSET
//------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------
//	XT_SOCK_PACKET
//--------------------------------------------------
global.OS_SOCK_STX					= 0;
global.OS_SOCK_HI					= OS_SOCK_STX + SZ_SOCK_STX;
global.OS_SOCK_LO					= OS_SOCK_HI + SZ_SOCK_HI;

//--------------------------------------------------
//	XT_COMM_HEAD
//--------------------------------------------------
global.OS_COMM_FLAG				= OS_SOCK_LO + SZ_SOCK_LO;
global.OS_COMM_ID					= OS_COMM_FLAG + SZ_COMM_FLAG;
global.OS_COMM_CMD				= OS_COMM_ID + SZ_COMM_ID;

//-------------------------------------------------- ------------------------------------------------
//	XT_MSG_PACKET
//-------------------------------------------------- ------------------------------------------------
global.OS_MSG_CODE				= OS_COMM_CMD + SZ_COMM_CMD;
global.OS_MSG_MESSAGE			= OS_MSG_CODE + SZ_MSG_CODE;

//-------------------------------------------------- ------------------------------------------------
//	XT_TR_HEAD
//-------------------------------------------------- ------------------------------------------------
global.OS_TR_FLAG					= OS_COMM_CMD + SZ_COMM_CMD;
global.OS_TR_TRCODE				= OS_TR_FLAG + SZ_TR_FLAG;
global.OS_TR_MEDIA				= OS_TR_TRCODE + SZ_TR_TRCODE;
global.OS_TR_DHEAD_TYPE		= OS_TR_MEDIA + SZ_TR_MEDIA;
global.OS_TR_DHEAD_HI			= OS_TR_DHEAD_TYPE + SZ_TR_DHEAD_TYPE;
global.OS_TR_DHEAD_LO			= OS_TR_DHEAD_HI + SZ_TR_DHEAD_HI;

//global.OS_TR_FILLER				= OS_TR_DHEAD_LO + SZ_TR_DHEAD_LO;	//보안 시퀀스 작업으로 아래와 같이 변경됨.

global.OS_TR_FID_OUT			= OS_TR_DHEAD_LO + SZ_TR_DHEAD_LO;
global.OS_TR_SEQCHK				= OS_TR_FID_OUT + SZ_TR_FID_OUT;


//데이터 헤드 시작 위치
global.OS_TR_DHEAD				= OS_TR_SEQCHK + SZ_TR_SEQCHK;

//--------------------------------------------------
//	XT_DATA_HEAD (정보계)
//--------------------------------------------------
global.OS_BDH_CONTI_FLAG	= OS_TR_SEQCHK + SZ_TR_SEQCHK;
global.OS_BDH_PAGING_KEY	= OS_BDH_CONTI_FLAG + SZ_BDH_CONTI_FLAG;
global.OS_BDH_SCREEN_NO		= OS_BDH_PAGING_KEY + SZ_BDH_PAGING_KEY;
global.OS_BDH_UNIT_CODE		= OS_BDH_SCREEN_NO + SZ_BDH_SCREEN_NO;
global.OS_BDH_FILLER			= OS_BDH_UNIT_CODE + SZ_BDH_UNIT_CODE;

//--------------------------------------------------
//	XT_DATA_HEAD (업무계)
//--------------------------------------------------
global.OS_ADH_ACCOUNT_ID	= OS_TR_SEQCHK + SZ_TR_SEQCHK;
global.OS_ADH_CHANNEL			= OS_ADH_ACCOUNT_ID + SZ_ADH_ACCOUNT_ID;
global.OS_ADH_PUB_IP			= OS_ADH_CHANNEL + SZ_ADH_CHANNEL;
global.OS_ADH_PRV_IP			= OS_ADH_PUB_IP + SZ_ADH_PUB_IP;
global.OS_ADH_MAC_ADDR		= OS_ADH_PRV_IP + SZ_ADH_PRV_IP;
global.OS_ADH_CONTI_FLAG	= OS_ADH_MAC_ADDR + SZ_ADH_MAC_ADDR;
global.OS_ADH_PAGING_KEY	= OS_ADH_CONTI_FLAG + SZ_ADH_CONTI_FLAG;
global.OS_ADH_CHANNEL_AREA= OS_ADH_PAGING_KEY + SZ_ADH_PAGING_KEY;
global.OS_ADH_UNIT_CODE		= OS_ADH_CHANNEL_AREA + SZ_ADH_CHANNEL_AREA;
global.OS_ADH_FILLER			= OS_ADH_UNIT_CODE + SZ_ADH_UNIT_CODE;

//KVQuerymanager.js 전역변수
global.PACKET_STX = 0x02;
global.PACKET_ETX = 0x03;

global.PACKET_TYPE = {
	A: 0x41,	// 시세 실시간 요청 패킷
	B: 0x42,	// 시세 실시간 요청 해지 패킷
	D: 0x44,	// 시세 실시간 패킷
	E: 0x45, 	// Transaction 호출 I/O 패킷
	F: 0x46,	// Transaction 종료 패킷

	G: 0x47,	// 주문 실시간 요청 패킷
	H: 0x48,	// 주문 실시간 요청 해지 패킷
	I: 0x49,	// 주문 실시간 패킷

	O: 0x4F,	// 로그인 세션 등록 패킷
	P: 0x50,	// Transaction 메시지 패킷
	Q: 0x51,	// 시스템 오류 패킷

	X: 0x58,	// 구간암호화 키 받는 패킷
	Y: 0x59,	// m/w 로 부터 자신의 공개 IP 를 받는 패킷

	k: 0x6b,	// 암호화된 계정아이디를 등록하는 패킷

	z: 0x7a,    //POLL(POLL Frame을 수신하며 POLL 응답을 하여야 함, POLL Timeout:300sec)
};

global.DHEAD_TYPE = {
	A: 0x41,	// 업무계
	B: 0x42,	// 정보계
};

global.PACKET_FLAG = {
	FIRST:		0x01,
	MID:		0x02,
	LAST:		0x03,
	ENCRYPT:	0x10,
	COMPRESS:	0x20,
	BLOCKING:	0x40,
};

global.MEDIA_TYPE = '40';
