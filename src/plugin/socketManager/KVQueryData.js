
/**
 * @author asoocool
 */

import AQueryData from './AQueryData.js';

//-----------------------------------------------------------------------------------------
//	class KVQueryData
//-----------------------------------------------------------------------------------------

export default class extends AQueryData {
	constructor(aquery) {
    super(aquery);

		this.encFlag = 0x00;
		this.zipFlag = 0x00;
	}

	outBlockOccurs(block, prevData) {
		if(block.occurs)  {
			//바로 이전 블럭의 out_cnt, rsp_cnt 안에 값이 들어 있음.
			return parseInt(prevData[block.occurs], 10);
		}
		else return 1;
	}

	inBlockOccurs(block) {
		//복수개 이므로 입력하는 시점에 추가하기 위해 지금은 추가하지 않는다.
		if(block.occurs) return 0;

		else return 1;
	}

	//QueryData to InBlock Buffer
	inBlockBuffer(abuf, offset) {
		super.inBlockBuffer(abuf, offset);

		//패킷 종료 플래그
		abuf.addByte(PACKET_ETX);
	}

	// ENCRYPT
	enableEnc(enable) {
		//웹에서 보안 해제 후 F12로 디버그 테스트 하려는 경우 아래 코드 주석처리할 것
		this.encFlag = enable ? PACKET_FLAG.ENCRYPT : 0x00; 
	}

	// COMPRESS
	enableZip(enable) {
		this.zipFlag = enable ? PACKET_FLAG.COMPRESS : 0x00; 
	}
}
