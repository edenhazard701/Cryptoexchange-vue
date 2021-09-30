<template>
  <el-container class="investment">
    <el-tabs type="card" @tab-click="handleClick" v-model="activeName">
      <!-- 시작 : 자산 탭 -->
      <el-tab-pane name="deposit" :label="$t('m_invest.a002')" class="deposit-tab01">
        <el-row class="all-price-bx">
          <el-col :span="6" class="price-tit">
            <strong class="txt">{{$t('m_invest.b001')}}</strong>
            <el-button class="text-btn question-btn" v-on:click="depositDialogVisible = true">
              <i class="el-icon-question"></i>
            </el-button>
          </el-col>
          <el-col :span="18" class="value">
            {{ formatAmount(tot.tot_asset) }}
            <span>KRW</span>
          </el-col>
        </el-row>
        <el-row class="price-krw-bx">
          <el-col :span="12" class="krw-tit">{{$t('m_invest.b002')}}</el-col>
          <el-col :span="12" class="value">
            {{ formatAmount(tot.krw_remn_bal) }}
            <span>KRW</span>
          </el-col>
        </el-row>
        <el-row class="all-price-lst">
          <el-row class="all-price-info">
            <el-row class="lst-bx">
              <el-col class="info_lft_bx">
                <el-col :span="6" class="lst-tit">{{$t('m_invest.b004')}}</el-col>
                <el-col :span="6" class="lst-value">{{ formatAmount(tot.tot_buy_pamt) }}</el-col>
              </el-col>
              <el-col class="info_rgt_bx">
                <el-col :span="6" class="lst-tit">{{$t('m_invest.b005')}}</el-col>
                <el-col :span="6" class="lst-value" :class="redOrBlue(tot.tot_evlt_pl)">
                  <span>{{ formatAmount(tot.tot_evlt_pl) }}</span>
                </el-col>
              </el-col>
              <!-- +일떄 class명 : red // - 일떄 클래스명 : blue // 손익 x : class 안붙힘 -->
            </el-row>
            <el-row class="lst-bx">
              <el-col class="info_lft_bx">
                <el-col :span="6" class="lst-tit">{{$t('m_invest.b006')}}</el-col>
                <el-col :span="6" class="lst-value">{{ formatAmount(tot.tot_evlt_amt) }}</el-col>
              </el-col>
              <el-col class="info_rgt_bx">
                <el-col :span="6" class="lst-tit">{{$t('m_invest.b007')}}</el-col>
                <el-col :span="6" class="lst-value" :class="redOrBlue(tot.tot_prft_rt)">
                  <span>{{ formatRate(tot.tot_prft_rt) }}</span>
                  <span class="percent_txt">%</span>
                </el-col>
              </el-col>
              <!-- +일떄 class명 : red // - 일떄 클래스명 : blue // 손익 x : class 안붙힘 -->
            </el-row>
          </el-row>
        </el-row>
        <!-- 보유 자산 없을경우
                <el-row class="price-no-data">보유한 자산이 없습니다.</el-row>
        //보유 자산 없을경우-->
        <div v-if="assetProfitList.length < 1" class="no-data">{{$t('m_invest.b014')}}</div>
        <div v-else class="invest-lst-bx">
          <div
            v-for="item in assetProfitList"
            :key="item.cur_cd"
            class="investment-list"
            @click="onAssetProfitListItemClick(item)"
          >
            <el-row class="status">
              <el-col :span="12" class="name-status">
                <div class="coin-name">{{ getCoinName(item.cur_cd) }} {{item.cur_cd}}</div>
                <div class="coin-value">{{formatCoin(item.cur_cd, item.remn_qty)}}</div>
              </el-col>
              <el-col :span="12" class="name-data">
                <el-row class="data-lst">
                  <el-col class="label">{{$t('m_invest.b008')}}</el-col>
                  <el-col class="value">
                    <span :class="redOrBlue(item.evlt_pl)">{{ formatAmount(item["evlt_pl"]) }}</span>
                  </el-col>
                </el-row>
                <el-row class="data-lst">
                  <el-col class="label">{{$t('m_invest.b009')}}</el-col>
                  <el-col class="value">
                    <span :class="redOrBlue(item.prft_rt)">{{ formatRate(item["prft_rt"]) }} %</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="summary">
              <el-col :span="12" class="summary-line">
                <el-row class="summary-data">
                  <el-col class="label">{{$t('m_invest.b010')}}</el-col>
                  <el-col class="value">{{priceFormat('KRW', item.buy_prc)}}</el-col>
                </el-row>
                <el-row class="summary-data">
                  <el-col class="label">{{$t('m_invest.b011')}}</el-col>
                  <el-col class="value">{{formatAmount(item.buy_pamt)}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="12" class="summary-line">
                <el-row class="summary-data">
                  <el-col class="label">{{$t('m_invest.b012')}}</el-col>
                  <el-col class="value">{{priceFormat('KRW', item.sbst_base_prc)}}</el-col>
                </el-row>
                <el-row class="summary-data">
                  <el-col class="label">{{$t('m_invest.b013')}}</el-col>
                  <el-col class="value">{{formatAmount(item.evlt_amt)}}</el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
      <!-- 끝 : 자산 탭 -->
      <!-- 시작 : 미체결 탭 -->
      <el-tab-pane name="notSign" :label="$t('m_invest.a003')" class="deposit-tab02">
        <el-table
          ref="multipleTable"
          :empty-text="$t('m_invest.d023')"
          :data="notSignList"
          style="width: 100%"
          @selection-change="notSignSelectionChange"
        >
          <infinite-loading
            :identifier="infiniteNotSign"
            slot="append"
            @infinite="infiniteHandler"
            force-use-infinite-wrapper=".el-table__body-wrapper"
          ></infinite-loading>
          <!-- 체크박스  -->
          <el-table-column type="selection" width="35" header-align="center"></el-table-column>
          <!-- 종목 -->
          <el-table-column
            :label="$t('m_invest.d001')"
            min-width="80"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row.trgt_cur_cd + '/' + scope.row.setl_cur_cd}}
              <br>
              <span
                v-if="scope.row.buy_sell_tp === '2'"
                class="gray_txt red"
              >{{$t('m_invest.d017')}}</span>
              <span v-else class="gray_txt blue">{{$t('m_invest.d018')}}</span>
              <!-- 매수 class명 red / 매도 class명 blue -->
            </template>
          </el-table-column>
          <!-- 주문가격 -->
          <el-table-column :label="$t('m_invest.d002')" header-align="right" align="right">
            <template slot-scope="scope">
              <span :class="chkStrLength2(priceFormat(scope.row.setl_cur_cd, scope.row.ord_prc))">
                {{priceFormat(scope.row.setl_cur_cd, scope.row.ord_prc)}}
                <span
                  class="gray_txt"
                >{{scope.row.setl_cur_cd}}</span>
              </span>
            </template>
          </el-table-column>
          <!-- 체결/주문수량 -->
          <el-table-column
            :label="$t('m_invest.d003')"
            label-class-name="cell_wid"
            prop="purchaseAmount"
            min-width="90"
            header-align="center"
            align="right"
          >
            <template slot-scope="scope">
              <span
                :class="chkStrLength(formatCoin(scope.row.trgt_cur_cd, scope.row.cntr_qty))"
              >{{scope.row.cntr_qty > 0 ? formatCoin(scope.row.trgt_cur_cd, scope.row.cntr_qty) : "-"}}/</span>
              <br>
              <span
                :class="chkStrLength(formatCoin(scope.row.trgt_cur_cd, scope.row.ord_qty))"
              >{{formatCoin(scope.row.trgt_cur_cd, scope.row.ord_qty)}}</span>
            </template>
          </el-table-column>
          <!-- 일시 -->
          <el-table-column
            property="name"
            :label="$t('m_invest.d004')"
            width="75"
            header-align="center"
            align="left"
          >
            <template slot-scope="scope">
              <span class="gray_txt" v-html="dateFormat(scope.row.ord_dtm)"></span>
            </template>
          </el-table-column>
        </el-table>
        <el-button class="cancel-btn" v-on:click="cancelDialogClick">{{$t('m_invest.d005')}}</el-button>
      </el-tab-pane>
      <!-- 끝 : 미체결 탭 -->
      <!-- 시작 : 체결 내역 탭 -->
      <el-tab-pane name="sign" :label="$t('m_invest.a004')" class="deposit-tab03">
        <el-table
          ref="concludedTableData"
          :empty-text="$t('m_invest.e007')"
          :data="signList"
          style="width:100%"
          @selection-change="handleSelectionChange"
        >
          <infinite-loading
            :identifier="infiniteSign"
            slot="append"
            @infinite="infiniteHandler"
            force-use-infinite-wrapper=".el-table__body-wrapper"
          ></infinite-loading>
          <!-- 일시 -->
          <el-table-column
            prop="concludedTableData"
            min-width="72"
            :label="$t('m_invest.e001')"
            header-align="left"
            align="left"
          >
            <template slot-scope="scope">
              <span class="gray_txt" v-html="dateFormat(scope.row.trd_dtm)"></span>
            </template>
          </el-table-column>
          <!-- 종목 -->
          <el-table-column
            :label="$t('m_invest.e002')"
            min-width="80"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row.trgt_cur_cd + '/' + scope.row.setl_cur_cd}}
              <br>
              <span
                v-if="scope.row.buy_sell_tp === '2'"
                class="gray_txt red"
              >{{$t('m_invest.d017')}}</span>
              <span v-else class="gray_txt blue">{{$t('m_invest.d018')}}</span>
            </template>
          </el-table-column>
          <!-- 체결가격, 체결수량 -->
          <el-table-column
            :label="$t('m_invest.e003') + ' ' + $t('m_invest.e004')"
            prop="concludedTableData"
            label-class-name="cell_wid"
            min-width="114"
            header-align="center"
            align="right"
          >
            <template slot-scope="scope">
              {{priceFormat(scope.row.setl_cur_cd, scope.row.cntr_prc)}}
              <span
                class="gray_txt"
              >{{scope.row.setl_cur_cd}}</span>

              <div :class="chkStrLength(formatCoin(scope.row.trgt_cur_cd, scope.row.cntr_qty))">
                {{formatCoin(scope.row.trgt_cur_cd, scope.row.cntr_qty)}}
                <span
                  class="gray_txt"
                >{{scope.row.trgt_cur_cd}}</span>
              </div>
            </template>
          </el-table-column>
          <!-- 체결금액, 수수료 -->
          <el-table-column
            :label="$t('m_invest.e005') + ' ' + $t('m_invest.e006')"
            prop="concludedTableData"
            label-class-name="cell_wid wid02"
            min-width="94"
            header-align="center"
            align="right"
          >
            <template slot-scope="scope">
              <span :class="chkStrLength2(trdAmtFormat(scope.row.setl_cur_cd, scope.row.trd_amt))">
                {{trdAmtFormat(scope.row.setl_cur_cd, scope.row.trd_amt)}}
                <span
                  class="gray_txt"
                >{{scope.row.setl_cur_cd}}</span>
              </span>

              <div :class="chkStrLength2(trdAmtFormat(scope.row.setl_cur_cd, scope.row.fee))">
                {{trdAmtFormat(scope.row.setl_cur_cd, scope.row.fee)}}
                <span
                  class="gray_txt"
                >{{scope.row.setl_cur_cd}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 끝 : 체결 내역 탭 -->
      <!-- 시작 : 감시내역 탭 -->
      <el-tab-pane name="watch" :label="$t('m_invest.a005')" class="deposit-tab04">
        <el-tabs v-model="activeWatchName" type="card" @tab-click="subTabHandleClick" stretch>
          <el-col :span="4" :offset="10" class="tab04_ico">
            <el-button class="text-btn question-btn" v-on:click="watchDialogVisible = true" center>
              <i class="el-icon-question"></i>
            </el-button>
          </el-col>
          <!-- 시작: 감시중 탭 -->
          <el-tab-pane name="watching" :label="$t('m_invest.f001')" class="deposit-tab04-01">
            <el-table
              :empty-text="$t('m_invest.f024')"
              ref="watchingHistroyTableData"
              :data="watchingList"
              style="width: 100%"
              :show-header="false"
              @row-click="whatchRowClicked"
            >
              <infinite-loading
                :identifier="infiniteWatching"
                slot="append"
                @infinite="infiniteHandler"
                force-use-infinite-wrapper=".el-table__body-wrapper"
              ></infinite-loading>
              <!-- 디데이 -->
              <el-table-column align="left" width="75">
                <template slot-scope="scope">D-{{scope.row.end_dt | Dday}}</template>
              </el-table-column>
              <!-- 종목 -->
              <el-table-column min-width="80" align="center">
                <template slot-scope="scope">
                  {{scope.row.symbol_abbr}}
                  <br>
                  <span
                    v-if="scope.row.trd_ccd === '2'"
                    class="gray_txt red"
                  >{{$t('m_invest.d017')}}</span>
                  <span v-else class="gray_txt blue">{{$t('m_invest.d018')}}</span>
                </template>
              </el-table-column>
              <!-- 감시 조건 -->
              <el-table-column min-width="120" prop="watchingHistroyTableData" align="left">
                <template slot-scope="scope">
                  <span class="under-data" v-if="scope.row.md_cd == '1'">{{$t('m_invest.f055')}}</span>
                  <span
                    class="under-data"
                    v-else-if="scope.row.md_cd == '2'"
                  >{{$t('m_invest.f056')}}</span>
                  <span
                    class="under-data"
                    v-else-if="scope.row.md_cd == '3'"
                  >{{$t('m_invest.f057')}}</span>
                  <br>
                  <span v-if="scope.row.md_cd == '1' || scope.row.md_cd =='2'" class="color-data">
                    {{$t('m_invest.f058')}}
                    <br>
                    <span
                      :class="chkStrLength(priceFormat(scope.row.paycurrcode, scope.row.stop_prc))"
                    >
                      {{priceFormat(scope.row.paycurrcode, scope.row.stop_prc)}}
                      <span
                        class="gray_txt"
                      >{{scope.row.paycurrcode}}</span>
                    </span>
                  </span>
                  <span
                    v-else-if="scope.row.md_cd == '3' && scope.row.trd_ccd =='2'"
                    class="color-data"
                  >
                    {{$t('m_invest.f059')}}
                    <br>
                    <span
                      :class="chkStrLength(priceFormat(scope.row.paycurrcode, scope.row.distance))"
                    >
                      {{priceFormat(scope.row.paycurrcode, scope.row.distance)}}
                      <span
                        class="gray_txt"
                      >{{scope.row.paycurrcode}}</span>
                    </span>
                  </span>
                  <span
                    v-else-if="scope.row.md_cd == '3' && scope.row.trd_ccd =='1'"
                    class="color-data"
                  >
                    {{$t('m_invest.f060')}}
                    <br>
                    <span
                      :class="chkStrLength(priceFormat(scope.row.paycurrcode, scope.row.distance))"
                    >
                      {{priceFormat(scope.row.paycurrcode, scope.row.distance)}}
                      <span
                        class="gray_txt"
                      >{{scope.row.paycurrcode}}</span>
                    </span>
                  </span>
                </template>
              </el-table-column>
              <!-- 취소 버튼 -->
              <el-table-column prop="watchingHistroyTableData" width="85" align="right">
                <template slot-scope="scope">
                  <el-button
                    @click="watchingCancelClicked(scope.$index, scope.row)"
                    class="btn_gray"
                  >{{$t('m_invest.f027')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- 끝 : 감시중 탭 -->
          <!-- 시작 : 감시완료 탭 -->
          <el-tab-pane name="watched" :label="$t('m_invest.f025')" class="deposit-tab04-02">
            <el-table
              :empty-text="$t('m_invest.f054')"
              ref="watchedHistroyTableData"
              :data="watchedList"
              style="width: 100%"
              :show-header="false"
              @row-click="whatchFinishClicked"
            >
              <infinite-loading
                :identifier="infiniteWatched"
                slot="append"
                @infinite="infiniteHandler"
                force-use-infinite-wrapper=".el-table__body-wrapper"
              ></infinite-loading>
              <!-- 일시 -->
              <el-table-column prop="time" align="left" width="75">
                <template slot-scope="scope">
                  <span v-html="dateFormat(scope.row.st_upt_dy_tm)" class="gray_txt"></span>
                </template>
              </el-table-column>
              <!-- 종목 -->
              <el-table-column min-width="80" align="center">
                <template slot-scope="scope">
                  {{scope.row.symbol_abbr}}
                  <br>
                  <span
                    v-if="scope.row.trd_ccd === '2'"
                    class="gray_txt red"
                  >{{$t('m_invest.d017')}}</span>
                  <span v-else class="gray_txt blue">{{$t('m_invest.d018')}}</span>
                </template>
              </el-table-column>
              <!-- 감시 조건 -->
              <el-table-column min-width="125" prop="watchingHistroyTableData" align="left">
                <template slot-scope="scope">
                  <span class="under-data" v-if="scope.row.md_cd == '1'">{{$t('m_invest.f055')}}</span>
                  <span
                    class="under-data"
                    v-else-if="scope.row.md_cd == '2'"
                  >{{$t('m_invest.f056')}}</span>
                  <span
                    class="under-data"
                    v-else-if="scope.row.md_cd == '3'"
                  >{{$t('m_invest.f057')}}</span>
                  <br>
                  <span v-if="scope.row.md_cd == '1' || scope.row.md_cd =='2'" class="color-data">
                    {{$t('m_invest.f058')}}
                    <br>
                    <span
                      :class="chkStrLength(priceFormat(scope.row.paycurrcode, scope.row.stop_prc))"
                    >
                      {{priceFormat(scope.row.paycurrcode, scope.row.stop_prc)}}
                      <span
                        class="gray_txt"
                      >{{scope.row.paycurrcode}}</span>
                    </span>
                  </span>
                  <span
                    v-else-if="scope.row.md_cd == '3' && scope.row.trd_ccd =='2'"
                    class="color-data"
                  >
                    {{$t('m_invest.f059')}}
                    <br>
                    <span
                      :class="chkStrLength(priceFormat(scope.row.paycurrcode, scope.row.distance))"
                    >
                      {{priceFormat(scope.row.paycurrcode, scope.row.distance)}}
                      <span
                        class="gray_txt"
                      >{{scope.row.paycurrcode}}</span>
                    </span>
                  </span>
                  <span
                    v-else-if="scope.row.md_cd == '3' && scope.row.trd_ccd =='1'"
                    class="color-data"
                  >
                    {{$t('m_invest.f060')}}
                    <br>
                    <span
                      :class="chkStrLength(priceFormat(scope.row.paycurrcode, scope.row.distance))"
                    >
                      {{priceFormat(scope.row.paycurrcode, scope.row.distance)}}
                      <span
                        class="gray_txt"
                      >{{scope.row.paycurrcode}}</span>
                    </span>
                  </span>
                </template>
              </el-table-column>
              <!-- 상태 -->
              <el-table-column width="80" align="right">
                <template slot-scope="scope">
                  <!-- '주문접수' -->
                  <!-- '주문거부' -->
                  <span
                    class="btn_state"
                    :class="{'register' : watchedStatus(scope.row.hndl_st_vl, scope.row.ordr_hndl_ccd) == $t('m_invest.f026')
                                                ,'refusal' : watchedStatus(scope.row.hndl_st_vl, scope.row.ordr_hndl_ccd) == $t('m_invest.f029')}"
                  >{{watchedStatus(scope.row.hndl_st_vl, scope.row.ordr_hndl_ccd)}}</span>
                  <!-- 주문접수 : class register, 주문거부 : class refusal -->
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- 끝 : 감시완료 탭 -->
        </el-tabs>
      </el-tab-pane>
      <!-- 끝: 감시내역 탭 -->
    </el-tabs>

    <!-- Native App일 때만 나타남 -->
    <app-menu></app-menu>
    <!-- 미체결 필터 dialog 팝업 -->
    <el-dialog
      :title="$t('m_invest.d014')"
      :visible.sync="faleDialogVisible"
      :close-on-click-modal="false"
      width="300"
      center
      class="el-dialog-filter"
    >
      <el-row class="filter-dialog-content">
        <el-row class="filter-lst-bx">
          <strong class="bullet-tit-type01">{{$t('m_invest.d015')}}</strong>
          <div class="rdo-lst-type">
            <el-radio-group v-model="outStandingRadio2">
              <el-radio-button label>{{$t('m_invest.d016')}}</el-radio-button>
              <el-radio-button label="2">{{$t('m_invest.d017')}}</el-radio-button>
              <el-radio-button label="1">{{$t('m_invest.d018')}}</el-radio-button>
            </el-radio-group>
          </div>
        </el-row>
        <el-row class="filter-lst-bx">
          <strong class="bullet-tit-type01">{{$t('m_invest.d019')}}</strong>
          <!--
                    <div class="lst_srh_type">
                        <el-input placeholder="암호화폐 검색" v-model="outStandingSrh" class="input-with-select">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
          -->
          <div class="input_dropdown">
            <el-row class="demo-autocomplete">
              <el-col>
                <el-autocomplete
                  class="inline-input"
                  :popper-append-to-body="false"
                  v-model="outStandingInput"
                  :fetch-suggestions="querySearch"
                  @select="handleSelect"
                  ref="outStandingInputRef"
                ></el-autocomplete>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="outStandingRadio2 = ''; outStandingInput = ''"
          type="info"
        >{{$t('m_invest.d021')}}</el-button>
        <el-button @click="notSignFilterSave" type="primary">{{$t('m_invest.d022')}}</el-button>
      </div>
    </el-dialog>
    <!-- //미체결 필터 dialog 팝업 -->
    <!-- 체결 필터 dialog 팝업 -->
    <el-dialog
      :title="$t('m_invest.e008')"
      :visible.sync="contractDialogVisible"
      :close-on-click-modal="false"
      width="300"
      center
      class="el-dialog-filter"
    >
      <el-row class="filter-dialog-content">
        <el-row class="filter-lst-bx">
          <strong class="bullet-tit-type01">{{$t('m_invest.e009')}}</strong>
          <div class="rdo-lst-type">
            <el-radio-group v-model="contractRadio1">
              <el-radio-button label="1">{{$t('m_invest.e010')}}</el-radio-button>
              <el-radio-button label="7">{{$t('m_invest.e011')}}</el-radio-button>
              <el-radio-button label="30">{{$t('m_invest.e012')}}</el-radio-button>
            </el-radio-group>
          </div>
          <div class="datepicker-type">
            <el-date-picker v-model="contractDate1" type="date" :picker-options="frDtValid"></el-date-picker>
            <span class="line-txt">~</span>
            <el-date-picker v-model="contractDate2" type="date" :picker-options="toDtValid"></el-date-picker>
          </div>
        </el-row>
      </el-row>
      <el-row class="filter-lst-bx">
        <strong class="bullet-tit-type01">{{$t('m_invest.d015')}}</strong>
        <div class="rdo-lst-type">
          <el-radio-group v-model="contractRadio2">
            <el-radio-button label>{{$t('m_invest.d016')}}</el-radio-button>
            <el-radio-button label="2">{{$t('m_invest.d017')}}</el-radio-button>
            <el-radio-button label="1">{{$t('m_invest.d018')}}</el-radio-button>
          </el-radio-group>
        </div>
      </el-row>
      <el-row class="filter-lst-bx">
        <strong class="bullet-tit-type01">{{$t('m_invest.d019')}}</strong>
        <!--
                <div class="lst_srh_type">
                    <el-input placeholder="암호화폐 검색" v-model="contractSrh" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
        -->
        <div class="input_dropdown">
          <el-row class="demo-autocomplete">
            <el-col>
              <el-autocomplete
                class="inline-input"
                :popper-append-to-body="false"
                v-model="contractInput"
                :fetch-suggestions="querySearch"
                @select="handleSelect"
                ref="contractInputRef"
              ></el-autocomplete>
            </el-col>
          </el-row>
        </div>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="contractRadio1 = '0'; contractRadio2 = ''; contractInput = '';"
          type="info"
        >{{$t('m_invest.d021')}}</el-button>
        <el-button @click="signFilterSave" type="primary">{{$t('m_invest.d022')}}</el-button>
      </div>
    </el-dialog>
    <!-- //체결 필터 dialog 팝업 -->
    <!-- 감시내역 필터 dialog 팝업 -->
    <el-dialog
      :title="$t('m_invest.f044')"
      :visible.sync="obsDialogVisible"
      :close-on-click-modal="false"
      width="300"
      center
      class="el-dialog-filter"
    >
      <el-row class="filter-dialog-content">
        <el-row class="filter-lst-bx">
          <strong class="bullet-tit-type01">{{$t('m_invest.d019')}}</strong>
          <!--
                    <div class="lst_srh_type">
                        <el-input placeholder="암호화폐 검색" v-model="watchSrh" class="input-with-select">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
          -->
          <div class="input_dropdown">
            <el-row class="demo-autocomplete">
              <el-col>
                <el-autocomplete
                  class="inline-input"
                  :popper-append-to-body="false"
                  v-model="watchInput"
                  :fetch-suggestions="querySearch"
                  @select="handleSelect"
                  ref="watchInputRef"
                ></el-autocomplete>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="watchInput = ''" type="info">{{$t('m_invest.d021')}}</el-button>
        <el-button @click="watchFilterSave" type="primary">{{$t('m_invest.d022')}}</el-button>
      </div>
    </el-dialog>
    <!-- //감시내역 필터 dialog 팝업 -->
    <!-- dialog 유의사항 // -->
    <el-dialog
      :title="$t('m_invest.b003')"
      :visible.sync="depositDialogVisible"
      :close-on-click-modal="false"
      width="300"
      center
      class="el-dialog-deposit"
    >
      <el-row class="deposit-dialog-content">
        <dl class="deposit-info-content">
          <dt>{{$t('m_invest.c001')}}</dt>
          <dd>
            {{$t('m_invest.c002')}}
            <p class="info_notice">{{$t('m_invest.c003')}}</p>
          </dd>
        </dl>
        <div class="deposit-info-btm">
          <strong class="deposit-info-tit">{{$t('m_invest.c004')}}</strong>
          <ul class="deposit-bullet-lst">
            <li>
              {{$t('m_invest.c005')}}
              <ul class="deposit-bullet-lst01">
                <li>{{$t('m_invest.c006')}}</li>
                <li>{{$t('m_invest.c007')}}</li>
                <li>{{$t('m_invest.c008')}}</li>
                <li>{{$t('m_invest.c009')}}</li>
              </ul>
              <p class="dialog-red-notice">{{$t('m_invest.c010')}}</p>
            </li>
            <li>{{$t('m_invest.c011_01')}}</li>
            <li>{{$t('m_invest.c011_02')}}</li>
            <li>{{$t('m_invest.c011_03')}}</li>
            <li>{{$t('m_invest.c011_04')}}</li>
          </ul>
        </div>
      </el-row>
      <div slot="footer" class="dialog-footer full_footer">
        <el-button type="primary" @click="depositDialogVisible = false">{{$t('m_invest.f008')}}</el-button>
      </div>
    </el-dialog>
    <!-- // dialog 유의사항 -->
    <!-- dialog 주문 취소 // -->
    <el-dialog
      :title="$t('m_invest.d006_01')"
      :visible.sync="cancelDialogVisible"
      :close-on-click-modal="false"
      width="20%"
      center
    >
      <el-row class="notice-dialog-contents-wrapper">
        <el-row class="notice-dialog-contents" v-html="$t('m_invest.d006_02')"></el-row>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="cancelDialogVisible = false">{{$t('m_invest.d008')}}</el-button>
        <el-button type="primary" @click="orderCancelMessage">{{$t('m_invest.d007')}}</el-button>
      </div>
    </el-dialog>
    <!-- // dialog 주문 취소  -->
    <!-- dialog 유의사항 // -->
    <el-dialog
      :title="$t('m_invest.b003')"
      :visible.sync="watchDialogVisible"
      :close-on-click-modal="false"
      width="300"
      center
      class="el-dialog-deposit"
    >
      <el-row class="deposit-dialog-content">
        <dl class="deposit-info-content">
          <dt>{{$t('m_invest.f045')}}</dt>
          <dd>
            <ul class="deposit-bullet-lst">
              <li>{{$t('m_invest.f046')}}</li>
              <li>{{$t('m_invest.f047')}}</li>
              <li>{{$t('m_invest.f048')}}</li>
              <li>{{$t('m_invest.f049')}}</li>
              <li>{{$t('m_invest.f050')}}</li>
            </ul>
          </dd>
        </dl>
        <p class="dialog-black-notice" v-html="$t('m_invest.f051')"></p>
        <dl class="notice-desc">
          <dt>{{$t('m_invest.f052')}}</dt>
          <dd v-html="$t('m_invest.f053')"></dd>
        </dl>
      </el-row>
      <div slot="footer" class="dialog-footer full_footer">
        <el-button type="primary" @click="watchDialogVisible = false">{{$t('m_invest.f008')}}</el-button>
      </div>
    </el-dialog>
    <!-- // dialog 유의사항 -->
    <!-- dialog 감시조건 취소 // -->
    <el-dialog
      :title="$t('m_invest.f004-0')"
      :visible.sync="watchCancelDialogVisible"
      :close-on-click-modal="false"
      width="20%"
      center
    >
      <el-row class="notice-dialog-contents-wrapper">
        <el-row class="notice-dialog-contents" v-html="$t('m_invest.f004-1')"></el-row>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="watchCancelDialogVisible = false">{{$t('m_invest.f005')}}</el-button>
        <el-button type="primary" @click="watchCancelMessage">{{$t('m_invest.f006')}}</el-button>
      </div>
    </el-dialog>
    <!-- // dialog 감시조건 취소 -->
  </el-container>
</template>

<script>
import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";
import fromExponential from "from-exponential";
import moment from "moment";
import AppMenu from "./common/MobileFooterMenu";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import { _ } from "vue-underscore";

/* Infinite-loading
 * guid     : https://peachscript.github.io/vue-infinite-loading/guide/#installation
 * options  : https://peachscript.github.io/vue-infinite-loading/api/#props
 */
Vue.use(InfiniteLoading, {
  slots: {
    noMore: "",
    noResults: ""
  }
});

export default {
  name: "Investment",
  components: {
    AppMenu,
    InfiniteLoading
  },
  data() {
    return {
      tot: {
        tot_buy_pamt: 0,
        tot_evlt_amt: 0,
        tot_evlt_pl: 0,
        tot_prft_rt: 0,
        krw_remn_bal: 0,
        tot_asset: 0
      },
      mySymbols: [],
      activeName: "",
      activeWatchName: "watching",
      outStandingRadio2: "", //미체결 필터 - 구분
      outStandingInput: this.$t("m_invest.d016"), //'전체', //미체결 필터 - 종목 input
      contractRadio1: "7", //체결 필터 - 기간
      contractDate1: "", //체결 필터 데이트 피커 - 시작
      contractDate2: "", //체결 필터 데이트 피커 - 종료
      frDtValid: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      contractRadio2: "", //체결 필터 - 구분
      contractInput: this.$t("m_invest.d016"), // '전체', //체결 필터 - 종목 input
      watchInput: this.$t("m_invest.d016"), //'전체', //감시내역 필터 - 종목 input
      coins: [],
      depositDialogVisible: false,
      watchDialogVisible: false,
      watchCancelDialogVisible: false,
      cancelDialogVisible: false,
      faleDialogVisible: false,
      contractDialogVisible: false,
      obsDialogVisible: false,
      notSignSelection: [],
      tmpNotSignSelection: [],
      notSignSearch: {
        /****** 미체결 검색Obj ******/
        qry_ord_tp: 0, // 조회주문 구분
        qry_cond_tp: 0, // 조회조건 구분
        symbol: "", // 종목코드dlaud
        buy_sell_tp: "", // 매수매도 구분
        qry_auto_trd_tp: null // 조회자동매매 구분
        // req_cnt         : 30    // 요청건수
      },
      signSearch: {
        /****** 체결 검색Obj ******/
        fr_dt: "", // 시작일
        to_dt: "", // 종료일
        trgt_coin: null, // 대상코인
        symbol: null, // 종목코드
        buy_sell_tp: "" // 매수매도 구분
        // req_cnt     : 30        // 요청건수
      },
      reqSignCancelObj: {
        /****** 주문취소요청 ******/
        org_ord_no: "", // 원주문번호
        modi_cncl_tp: "2", // 정정취소구분 1:정정 2:취소
        part_all_tp: "2", // 일부전부구분 1:일부 2:전부
        ord_qty: "", // 정정취소수량
        ord_prc: "" // 주문가격 (정정시만 지정)
      },
      watchingSearch: {
        /****** 감시중, 감시완료 검색Obj ******/
        mbr_ccd: "01", // 사용자구분 (00:직원 01:고객)
        hndl_st_vl: "1", // 조건상태 (0:감시해제 1:감시중 2:미체결감시중 3:조건만족 4:유효기간만료
        //          98:전체조회(감시중제외) 99:전체(감시중 포함))
        symbol: "" // 처리상태(space:전체 0:감시해제 1:감시중 2:미체결감시중 3:조건)
      },
      watchedSearch: {
        /****** 감시중, 감시완료 검색Obj ******/
        mbr_ccd: "01", // 사용자구분 (00:직원 01:고객)
        hndl_st_vl: "98", // 조건상태 (0:감시해제 1:감시중 2:미체결감시중 3:조건만족 4:유효기간만료
        //          98:전체조회(감시중제외) 99:전체(감시중 포함))
        symbol: "" // 처리상태(space:전체 0:감시해제 1:감시중 2:미체결감시중 3:조건)
      },
      reqWatchCancelObj: {
        /****** 감시취소요청 ******/
        est_dt: "", // 설정일자
        symbol: "", // 단축코드
        sq: "", // 조건일련번호
        mbr_ccd: "01", // 사용자구분
        md_cd: "", // 매체구분
        trd_ccd: "" // 1.매수 2.매도
      },
      tmpWatchCancelRow: {
        index: "",
        row: ""
      },
      infiniteNotSign: +new Date(),
      infiniteSign: +new Date(),
      infiniteWatching: +new Date(),
      infiniteWatched: +new Date(),
      defaultFilter: [true, true, true] // [미체결 filter, 체결내역 filter, 감시내역 filter]
    };
  },
  computed: {
    ...mapGetters([
      "assetTotal",
      "assetProfitList",
      "getCoinByCd",
      "getPairBySymbol",
      "getPairsByCd",
      "getPairsByCds",
      "getMyCds",
      "notSignList",
      "signList",
      "watchingList",
      "watchedList",
      "hogaUnit",
      "btcKRWCurPrc",
      "ethKRWCurPrc",
      "getLangKind"
    ]),
    /**
    * 검색기간 달력UI에서 종료일 disabled 유효성
    * 시작일 변경에 따라 동적으로 시작일 보다 작은 날짜 disabled 처리
    */
    toDtValid() {
      const self = this;

      var resFn = function() {};
      if (this.contractDate1 instanceof Date) {
        // 시작일 보다 작은 일짜 disabled
        resFn = function(time) {
          return time.getTime() < self.contractDate1.getTime();
        };
      }

      return { disabledDate: resFn };
    }
  },
  methods: {
    ...mapMutations([
      "setContiKey",
      "orderUnshift",
      "orderRemove",
      "orderUpdate"
    ]),
    ...mapActions([
      "fetchAssetProfitData",
      "filterAssetProfitList",
      "registerAssetNotification",
      "unregisterAssetNotification",
      "registerOrderNotification",
      "unregisterOrderNotification"
    ]),
    /**
     * 자산탭의 자산 목록 중 row Click Evnet
     * Click한 종목의 주문 페이지로 이동
     */
    onAssetProfitListItemClick(item) {
      const self = this;
      const symbols = self.getPairsByCd(item.cur_cd);
      const market = self.getPrimaryMarket(item.cur_cd);
      const targetSymbol = _.findWhere(symbols, { o_setl_cur_cd_n: market })
        .o_symbol;

      if (targetSymbol) {
        self.$store.commit("setCurrentSymbol", targetSymbol);
        sessionStorage.setItem("currentSymbol", targetSymbol);
        sessionStorage.setItem("selectedMarket", market);
      }

      self.$router.push({ name: "mOrder" });
    },
    /**
     * 통화 최우선 마켓
     * @param {string} cd 통화코드
     * @returns {string} 마켓코드
     */
    getPrimaryMarket(cd) {
      const self = this;
      let markets = self.getPairsByCd(cd).map(item => item.o_setl_cur_cd_n);
      if (markets.includes("KRW")) {
        return "KRW";
      } else if (markets.includes("BTC")) {
        return "BTC";
      } else {
        return "ETH";
      }
    },
    /**
     * +/- -> 빨강/파랑 css 클래스
     * @param {number} number
     * @returns {string} "red"/"blue"
     */
    redOrBlue(number) {
      if (number == 0) return "";
      return number > 0 ? "red" : "blue";
    },
    /**
     * 금액 포맷
     * 소수점 절사, 콤마 포맷
     * @param {number} number 금액
     * @returns {string} 포맷 스트링
     */
    formatAmount(number) {
      let self = this;
      return UnitManager.flooredDecimalWithCommas(number, 0);
    },
    /**
     * 코인 수량 포맷
     * getCoinByCd 통화정보의 소수점자릿수 기준 소수점 고정, 콤마 포맷
     * @param {string} cd 통화코드
     * @param {number} number 수량
     * @returns {string} 포맷 스트링
     */
    formatCoin(cd, number) {
      if (
        cd == "" ||
        cd == null ||
        cd == undefined ||
        this.getCoinByCd(cd) == undefined
      )
        return;

      let self = this;
      let dec_digt = self.getCoinByCd(cd).dec_digt;

      return UnitManager.fixedDecimalWithCommas(
        number,
        dec_digt ? dec_digt : 8
      );
    },
    /**
     * 수익률 -> (+)00.00 포맷
     * @param {number} number
     * @returns {string} (+)00.00
     */
    formatRate(number) {
      let self = this;
      const tmpNumber = UnitManager.numberWithCommas(Number(number).toFixed(2));
      return number > 0 ? "+" + tmpNumber : tmpNumber;
    },
    /**
     * Tab Click Event
     * Click한 탭의 해당하는 데이터 조회처리
     */
    handleClick(tab, event) {
      const tabIndex = tab.index;
      const self = this;

      if (tabIndex !== "0") {
        self.$EventBus.$emit("mobile-nav-menus", [
          "notification",
          "filter",
          {
            filterIdx: tabIndex,
            defaultFilter: this.defaultFilter[tabIndex - 1]
          }
        ]);
      } else {
        self.$EventBus.$emit("mobile-nav-menus", ["notification"]);
      }

      switch (tabIndex) {
        case "0":
          self.fetchAssets(true);
          break;
        case "1":
          self.getDispatchTableList("searchNotSignList");
          break;
        case "2":
          self.getDispatchTableList("searchSignList");
          break;
        case "3":
          self.getDispatchTableList("searchWatchingList");
          break;
        default:
          break;
      }
    },
    /**
     * 감시내역 탭내의 감시중, 감시완료 탭 Click Event
     * Click한 탭의 해당하는 데이터 조회처리
     */
    subTabHandleClick(tab, event) {
      this.setContiKey(null);

      if (tab.index == "0") {
        // 감시 중

        this.getDispatchTableList("searchWatchingList");
      } else {
        // 감시 완료

        this.getDispatchTableList("searchWatchedList");
      }
    },
    /**
     * 미체결 탭의 주문취소 btn Click Event
     * 체크한 항목이 없을경우 '선택된 없음'내용의 팝업 노출,
     * 체크한 항목이 있을경우 취소요청 팝업 노출,
     * 선택된 미체결 List를 tmpNotSignSelection에 저장
     *   > tmpNotSignSelection는 취소 전문요청의 param으로 사용
     */
    cancelDialogClick() {
      if (this.notSignSelection.length == "0") {
        if (document.getElementsByClassName("notify_order_reject").length > 0)
          return;

        this.$message({
          // dangerouslyUseHTMLString: true,
          // title: '',
          message: this.$t("m_invest.d012"), //'선택된 주문이 없습니다.',
          // offset: 44,
          customClass: "notify_order_reject not-sign",
          duration: 2000
        });
      } else {
        this.tmpNotSignSelection = this.notSignSelection;
        this.cancelDialogVisible = true;
      }
    },
    /**
     * 미체결 주문 취소요청
     * @vuex {actions: reqSignAllCancel} : tr102 TR요청
     * @vuex {param : this.tmpNotSignSelection} : 주문취소 TR요청할 미체결 List
     * TR요청의 결과값에 따라 alert 메시지 노출
     */
    orderCancelMessage() {
      let self = this;

      self.$store
        .dispatch("reqSignAllCancel", this.tmpNotSignSelection)
        .then(obj => {
          if (obj.failObjArr.length > 0) {
            for (var i in obj.failObjArr) {
              if (obj.failObjArr[i]["errorData"]["errCode"] != "31048") {
                // '취소중 오류가 발생했습니다.'
                self.alertMsg(self.$t("m_invest.d013"), null, false);
                return;
              }
            }
          }

          if (obj.successArr.length > 0) {
            // '주문 취소가 신청되었습니다. 취소주문은 web > 주문내역에서 확인 가능합니다.'
            self.alertMsg(self.$t("m_invest.d009"), null, false);
            return;
          }

          if (obj.failObjArr.length > 0) {
            for (var i in obj.failObjArr) {
              if (obj.failObjArr[i]["errorData"]["errCode"] == "31048") {
                // '체결이 완료되었거나 이미 취소된 주문입니다.'
                self.alertMsg(self.$t("m_invest.d011"), null, false);
                return;
              }
            }
          }
        })
        .catch(action => {});

      this.cancelDialogVisible = false;
    },
    /**
     * 감시중 주문 취소
     * @vuex {actions : reqWatchCancel} : s0021(매수취소) or s0003(매도취소) tr요청
     * 취소요청의 결과에 따라 alert메시지 노출
     */
    watchCancelMessage() {
      let self = this;

      this.reqWatchCancelObj["est_dt"] = this.tmpWatchCancelRow.row.est_dt;
      this.reqWatchCancelObj["symbol_tmp"] = this.tmpWatchCancelRow.row.symbol;
      this.reqWatchCancelObj["sq"] = this.tmpWatchCancelRow.row.sq;
      this.reqWatchCancelObj["trd_ccd"] = this.tmpWatchCancelRow.row.trd_ccd;

      this.$store
        .dispatch("reqWatchCancel", self.reqWatchCancelObj)
        .then(obj => {
          // '감시조건이 취소되었습니다.<br>취소내역은 감시완료에서 확인 가능합니다.'
          self.alertMsg(self.$t("m_invest.f007"), null, true);
        })
        .catch(obj => {
          var msgText = "";
          if (obj["errCode"] == "90148" || obj["errCode"] == "90068") {
            msgText = self.$t("m_invest.f009"); // '감시가 완료되었거나 이미 취소된 주문입니다.'
          } else {
            msgText = self.$t("m_invest.f010"); // '취소중 오류가 발생했습니다.'
          }
          self.alertMsg(msgText, null, false);
        });

      this.watchCancelDialogVisible = false;
    },
    handleSelectionChange() {},
    /**
     * @selection-change에 연결된 Evnet
     * 미체결 List의 selectBox 선택된 목록을 param으로 전달받는 Element-UI내에서 지원하는 기능
     * 선택된 목록을 this.notSignSelection 변수의 담아둠 > 감시중 취소요청에서 사용
     */
    notSignSelectionChange(val) {
      this.notSignSelection = val;
    },
    /**
     * 감시중 주문 취소 팝업 노출
     */
    watchingCancelClicked(index, row) {
      this.tmpWatchCancelRow["index"] = index;
      this.tmpWatchCancelRow["row"] = row;

      this.watchCancelDialogVisible = true;
    },
    /**
     * 감시중 Row Click Event
     * Click한 Row 상세내역 페이지로 이동
     */
    whatchRowClicked(row, event, column) {
      var buttonObj = event.target;
      if (
        buttonObj.className.indexOf("el-button") === -1 &&
        buttonObj.parentNode.className.indexOf("el-button") === -1
      ) {
        this.$router.push({ name: "mInvestWatchview", params: { row: row } });
      }
    },
    /**
     * 감시완료 Row Click Event
     * Click한 Row 상세내역 페이지로 이동
     */
    whatchFinishClicked(row, event, column) {
      this.$router.push({ name: "mInvestFinishhview", params: { row: row } });
    },
    /**
     * querySearch, createFilter
     * 암호화폐 검색시 입력중인 값에 해당하는 List를 검색input창 하단에 노출하기 위한 메서드
     */
    querySearch(queryString, cb) {
      let coins = this.coins;
      let results = queryString
        ? coins.filter(this.createFilter(queryString))
        : coins;
      // call callback function to return suggestions
      cb(results);
    },
    createFilter(queryString) {
      return coin => {
        return (
          coin.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      
    },
    /**
     * RB03 실시간 TR 콜백함수
     * 현재 활성화 된 탭에 따라 분기처리하여 로직 작성
     * (미체결, 체결, 감시내역) 데이터 추가, 삭제, 업데이트, 재조회
     */
    onOrderNotification(resData) {
      let self = this;

      if (self.activeName == "notSign") {
        resData.cntr_qty = resData.tot_cntr_qty
         
        //----- 미체결 data set START -----//
        if (resData.evnt_tp == "1") {
          // 주문확인(신규주문)
          if (
            (self.notSignSearch["buy_sell_tp"] != "" &&
              self.notSignSearch["buy_sell_tp"] != resData["buy_sell_tp"]) ||
            (self.notSignSearch["symbol"] != "" &&
              self.notSignSearch["symbol"] != resData["symbol"])
          )
            return;

          self.orderUnshift({ listName: "notSignList", addObj: [resData] });
          return;
        }

        for (var idx in self.notSignList) {
          var item = self.notSignList[idx];

          if (resData.evnt_tp == "2") {
            // 주문거부

            if (parseInt(item.ord_no) == parseInt(resData.ord_no)) {
              // ord_no = 주문번호

              self.orderRemove({ listName: "notSignList", idx: idx });
              return;
            }
          } else if (resData.evnt_tp == "6") {
            // 체결

            if (parseInt(item.ord_no) == parseInt(resData.ord_no)) {
              if (resData.ord_prc_tp == "1") {
                // 시장가 주문

                if (resData.all_cntr_yn == "Y") {
                  //전체체결 여부

                  self.orderRemove({ listName: "notSignList", idx: idx });
                  return;
                }
              } else {
                if (resData.remn_qty <= 0) {
                  //잔여수량 <= 0

                  self.orderRemove({ listName: "notSignList", idx: idx });
                  return;
                }
              }

              self.orderUpdate({
                listName: "notSignList",
                idx: idx,
                updObj: resData
              });
              return;
            }
          } else if (resData.evnt_tp == "5") {
            // 자동취소 '5'이면 주문번호끼리 비교해서 자동삭제 한다.

            if (parseInt(item.ord_no) == parseInt(resData.ord_no)) {
              self.orderRemove({ listName: "notSignList", idx: idx });
              return;
            }
          }

          // 주문번호와 원주문번호를 비교해서 갱신한다.
          if (parseInt(item.ord_no) == parseInt(resData.org_ord_no)) {
            if (resData.evnt_tp == "3") {
              // 정정확인

              if (
                Math.abs(
                  parseFloat(item.remn_qty) - parseFloat(resData.cnfm_qty)
                ) < NumberUtil.EPSILON ||
                item.remn_qty <= 0
              ) {
                self.orderRemove({ listName: "notSignList", idx: idx });
              } else {
                self.orderUpdate({
                  listName: "notSignList",
                  idx: idx,
                  updObj: resData
                });
              }

              if (parseFloat(resData.ord_qty) > 0) {
                self.orderUnshift({
                  listName: "notSignList",
                  addObj: [resData]
                });
              }
              return;
            } else {
              if (parseFloat(item.remn_qty) <= parseFloat(resData.cnfm_qty)) {
                self.orderRemove({ listName: "notSignList", idx: idx });
                return;
              }

              self.orderUpdate({
                listName: "notSignList",
                idx: idx,
                updObj: resData
              });
              return;
            }
          }
        }

        // 정정시 체결이 먼저 일어났을 때
        if (resData.evnt_tp == "3" && parseFloat(resData.ord_qty) > 0) {
          self.orderUnshift({ listName: "notSignList", addObj: [resData] });
        }
        //----- 미체결 data set END -----//
      } else if (self.activeName == "sign") {
        //----- 체결 data set START -----//
        if (resData.evnt_tp == "6") {
          // 체결

          // if (
          //   (self.signSearch["buy_sell_tp"] != "" &&
          //     self.signSearch["buy_sell_tp"] != resData["buy_sell_tp"]) ||
          //   (self.signSearch["symbol"] != "" &&
          //     self.signSearch["symbol"] != resData["symbol"])
          // )
          //   return;

          var tmpData = {};
          Object.assign(tmpData, resData);
          tmpData["trd_dtm"] = resData["ord_dtm"];
          tmpData["fee"] = Number(resData["fee"]);
          tmpData["trd_amt"] = Number(resData["cntr_amt"]);

          self.orderUnshift({ listName: "signList", addObj: [tmpData] });
          return;
        }
        //----- 체결 data set END -----//
        //self.getDispatchTableList("searchSignList"); // 체결
      } else if (self.activeName == "watch") {
        if (resData.evnt_tp == '1' || resData.evnt_tp == '6') { //재조회 기준 조건 추가 (1주문확인,6체결)
          if (self.activeWatchName == "watching") {
            self.getDispatchTableList("searchWatchingList"); // 감시중
          } else if (self.activeWatchName == "watched") {
            self.getDispatchTableList("searchWatchedList"); // 감시완료
          }
        }
      }
    },
    /**
     * 잔고변동(RB02) 실시간 콜백
     * @param {object} res 잔고변동 데이터
     * KRW 는 보유 KRW (tot.krw_remn_bal) 업데이트
     * 목록에 존재하는 통화는 데이터를 찾아 보유수량, 평균매수가, 매수금액 업데이트하고 평가금액, 평가손익, 수익률은 계산하여 업데이트
     * 목록에 없는 통화일 경우에는 투자손익 데이터 재조회, KVM2 재설정
     */
    onAssetNotification(res) {
      const self = this;

      if (res.cur_cd === "KRW") {
        self.tot = Object.assign(self.tot, {
          krw_remn_bal: res.cur_bal * 1
        });
      } else {
        let changed = _.findWhere(self.assetProfitList, { cur_cd: res.cur_cd });
        let remn_qty = res.cur_bal * 1;

        if (changed) {
          if (remn_qty > 0) {
            let buy_pamt = res.buy_pamt * 1;
            let buy_prc = res.avg_buy_prc * 1;
            let evlt_amt = Math.floor(
              self.$big(remn_qty).times(changed.sbst_base_prc)
            );
            let evlt_pl = evlt_amt - buy_pamt;
            let prft_rt = ((evlt_pl / buy_pamt) * 100).toFixed(2);
            if (isNaN(prft_rt)) 
               prft_rt = 0;
            changed = Object.assign(changed, {
              remn_qty,
              buy_pamt,
              buy_prc,
              evlt_amt,
              evlt_pl,
              prft_rt
            });
          } else {
            self.filterAssetProfitList(res.cur_cd);
          }
        } else {
          self.fetchAssets(true);
        }
      }
      self.reloadTotal();
    },
    /**
     * KVM2 실시간 콜백
     * @param {object} queryData KVM2 데이터
     * 거래소 심볼 단위라서 통화코드를 뽑고 최우선 마켓을 확인
     * 목록에서 아이템을 찾아 현재가를 업데이트 하고 평가금액, 평가손익, 수익률은 계산하여 업데이트
     */
    onPriceChange(queryData) {
      const self = this;
      const data = queryData.getBlockData("OutBlock1")[0];
      const cd = self.getPairBySymbol(data["symbol"]).o_trgt_cur_cd_n;

      if (self.getMyCds.includes(cd)) {
        let sbst_base_prc = data.curprc * 1;
        const market = data.symbol.slice(-5).replace(/[_]/g, "");

        if (market === "BTC") {
          if (self.getPrimaryMarket(cd) !== market) return;
          sbst_base_prc = self.$big(sbst_base_prc).times(self.btcKRWCurPrc);
          sbst_base_prc = self.krPriceFormat(sbst_base_prc);
        } else if (market === "ETH") {
          if (self.getPrimaryMarket(cd) !== market) return;
          sbst_base_prc = self.$big(sbst_base_prc).times(self.ethKRWCurPrc);
          sbst_base_prc = self.krPriceFormat(sbst_base_prc);
        }

        let changed = _.findWhere(self.assetProfitList, { cur_cd: cd });
        let evlt_amt = Math.floor(
          self.$big(changed.remn_qty).times(sbst_base_prc)
        );
        let evlt_pl = evlt_amt - changed.buy_pamt;
        let prft_rt = ((evlt_pl / changed.buy_pamt) * 100).toFixed(2);
        if (isNaN(prft_rt)) 
          prft_rt = 0;
        changed = Object.assign(changed, {
          sbst_base_prc,
          evlt_amt,
          evlt_pl,
          prft_rt
        });
        self.reloadTotal();
      }
    },
    /**
     * assetProfitList 데이터로 계산하여 총 자산 영역 데이터 업데이트
     */
    reloadTotal() {
      let self = this;
      let tot_evlt_amt = self.assetProfitList
        .map(item => item.evlt_amt * 1)
        .reduce((a, b) => a + b);
      let tot_buy_pamt = self.assetProfitList
        .map(item => item.buy_pamt * 1)
        .reduce((a, b) => a + b);
      let tot_evlt_pl = tot_evlt_amt - tot_buy_pamt;
      let tot_prft_rt = ((tot_evlt_pl / tot_buy_pamt) * 100).toFixed(2);
      if (isNaN(tot_prft_rt)) 
        tot_prft_rt = 0;
      let tot_asset = self.tot.krw_remn_bal + tot_evlt_amt;
      self.tot = Object.assign(self.tot, {
        tot_buy_pamt,
        tot_evlt_amt,
        tot_evlt_pl,
        tot_prft_rt,
        tot_asset
      });
    },
    /**
     * 미체결, 체결, 감시내역) 목록 조회 TR호출
     */
    getDispatchTableList(name) {
      var payload = {};
      let self = this;
      var resolve = null;
      var dispatchName = "";
      var idx = null;

      if (name == "searchNotSignList") {
        idx = 0;
        dispatchName = "searchNotSignList";
        payload = this.notSignSearch;
        resolve = obj => {
          self.infiniteNotSign = +new Date();
        };
      } else if (name == "searchSignList") {
        idx = 1;
        dispatchName = "searchSignList";
        payload = this.signSearch;
        resolve = obj => {
          self.infiniteSign = +new Date();
        };
      } else if (name == "searchWatchingList") {
        idx = 2;
        dispatchName = "searchWatchList";
        payload = this.watchingSearch;
        resolve = obj => {
          self.infiniteWatching = +new Date();
        };
      } else if (name == "searchWatchedList") {
        idx = 3;
        dispatchName = "searchWatchList";
        payload = this.watchedSearch;
        resolve = obj => {
          self.infiniteWatched = +new Date();
        };
      }

      var reject = err => {
        console.log("reject", err);
      };

      this.$store
        .dispatch(dispatchName, payload)
        .then(obj => {
          document.getElementsByClassName("el-table__body-wrapper")[
            idx
          ].scrollTop = 0;
          document.getElementsByClassName("el-table__append-wrapper")[
            idx
          ].style.display = "";
          resolve(obj);
        })
        .catch(reject);
    },
    priceFormat(cd, prc) {
      if (
        cd == "" ||
        cd == null ||
        cd == undefined ||
        this.hogaUnit == undefined
      )
        return;

      let self = this;
      let nLenBelowDigitArray = [1];
      UnitManager.getHogaUnit(
        self.hogaUnit,
        cd,
        prc,
        undefined,
        undefined,
        nLenBelowDigitArray
      );

      return UnitManager.fixedDecimalWithCommas(prc, nLenBelowDigitArray[0]);
    },
    dateFormat(ord_dtm) {
      if (!ord_dtm) return "";
      ord_dtm = ord_dtm.replace(/\./g, "");
      ord_dtm = ord_dtm.replace(/:/g, "");
      ord_dtm = ord_dtm.replace(/ /g, "");

      return moment(ord_dtm.substr(0, 8) + "T" + ord_dtm.substr(8, 6)).format(
        "YY/MM/DD <br> HH:mm:ss"
      );
    },
    /**
     * 미체결 취소 or 감시 취소 tr요청 결과값에 따른 팝업 노출
     */
    alertMsg(text, callback, useHTML) {
      if (!useHTML) useHTML = false;

      if (typeof callback != "function" || !callback) {
        callback = action => {};
      }

      this.$alert(text, {
        confirmButtonText: this.$t("m_invest.f008"), // '확인',
        dangerouslyUseHTMLString: useHTML,
        callback: callback
      });
    },
    /**
     * header 영역의 검색필터(돋보기 아이콘) Click Event
     * (미체결, 체결, 감시내역)의 활성화 탭에 따라 다른 필터화면 노출
     */
    openFilter(tabIdx) {
      var self = this;

      if (tabIdx == "1") {
        // 미체결

        this.outStandingRadio2 = this.notSignSearch["buy_sell_tp"]
          ? this.notSignSearch["buy_sell_tp"]
          : "";
        const tmpSymbol = this.notSignSearch["symbol"]
          ? this.notSignSearch["symbol"]
          : "";
        const coin = this.coins.filter(coin => {
          return coin.coin == tmpSymbol;
        })[0];
        this.outStandingInput = coin ? coin.value : "";
        if (this.outStandingInput == this.$t("m_invest.d016"))
          this.outStandingInput = "";

        this.faleDialogVisible = true;

        setTimeout(() => {
          var ref = this.$refs.outStandingInputRef;
          var input = ref.$el.getElementsByTagName("input")[0];
          $(input).off("keyup");
          $(input).bind("keyup", function(e) {
            if (e.target.value == "") {
              setTimeout(() => {
                ref.handleChange("");
              }, 150);
            } else {
              //this.outStandingInput = e.target.value;
              ref.handleChange(e.target.value);
            }
          });
        }, 150);
      } else if (tabIdx == "2") {
        // 체결내역

        this.contractDate1 = new Date(
          this.signSearch["fr_dt"].substr(0, 4) +
            "-" +
            this.signSearch["fr_dt"].substr(4, 2) +
            "-" +
            this.signSearch["fr_dt"].substr(6, 2)
        );
        this.contractDate2 = new Date(
          this.signSearch["to_dt"].substr(0, 4) +
            "-" +
            this.signSearch["to_dt"].substr(4, 2) +
            "-" +
            this.signSearch["to_dt"].substr(6, 2)
        );
        this.contractRadio2 = this.signSearch["buy_sell_tp"]
          ? this.signSearch["buy_sell_tp"]
          : "";
        const tmpSymbol = this.signSearch["symbol"]
          ? this.signSearch["symbol"]
          : "";
        const coin = this.coins.filter(coin => {
          return coin.coin == tmpSymbol;
        })[0];
        this.contractInput = coin ? coin.value : "";
        if (this.contractInput == this.$t("m_invest.d016"))
          this.contractInput = "";

        this.contractDialogVisible = true;

        setTimeout(() => {
          var ref = this.$refs.contractInputRef;
          var input = ref.$el.getElementsByTagName("input")[0];
          $(input).off("keyup");
          $(input).bind("keyup", function(e) {
            if (e.target.value == "") {
              setTimeout(() => {
                ref.handleChange("");
              }, 150);
            } else {
              //this.outStandingInput = e.target.value;
              ref.handleChange(e.target.value);
            }
          });
        }, 150);
      } else {
        // 감시내역

        const tmpSymbol = this.watchingSearch["symbol"]
          ? this.watchingSearch["symbol"]
          : "";
        const coin = this.coins.filter(coin => {
          return coin.coin == tmpSymbol;
        })[0];
        this.watchInput = coin ? coin.value : "";
        if (this.watchInput == this.$t("m_invest.d016")) this.watchInput = "";

        this.obsDialogVisible = true;

        setTimeout(() => {
          var ref = this.$refs.watchInputRef;
          var input = ref.$el.getElementsByTagName("input")[0];
          $(input).off("keyup");
          $(input).bind("keyup", function(e) {
            if (e.target.value == "") {
              setTimeout(() => {
                ref.handleChange("");
              }, 150);
            } else {
              //this.outStandingInput = e.target.value;
              ref.handleChange(e.target.value);
            }
          });
        }, 150);
      }
    },
    /**
     * 미체결 필터 팝업의 데이터 저장
     * ( 탭 이동 시 필터 페이지가 변경되기 때문에 
     * 검색했던 필터 내용이 소멸되는 문제를 해결하고자 각각의 Object에 저장)
     */
    notSignFilterSave() {
      this.notSignSearch["buy_sell_tp"] = this.outStandingRadio2;
      const coin = this.coins.filter(coin => {
        return coin.value == this.outStandingInput;
      })[0];
      this.notSignSearch["symbol"] = coin ? coin.coin : "";

      this.getDispatchTableList("searchNotSignList"); // 미체결
      this.defaultFilter[0] =
        this.notSignSearch["buy_sell_tp"] == "" &&
        this.notSignSearch["symbol"] == ""
          ? true
          : false;
      this.$EventBus.$emit("mobile-nav-menus", [
        "notification",
        "filter",
        { filterIdx: 1, defaultFilter: this.defaultFilter[0] }
      ]);

      this.faleDialogVisible = false;
    },
    /**
     * 체결 필터 팝업의 데이터 저장
     * ( 탭 이동 시 필터 페이지가 변경되기 때문에 
     * 검색했던 필터 내용이 소멸되는 문제를 해결하고자 각각의 Object에 저장)
     */
    signFilterSave() {
      this.signSearch["fr_dt"] = this.contractDate1.format("yyyyMMdd");
      this.signSearch["to_dt"] = this.contractDate2.format("yyyyMMdd");
      this.signSearch["buy_sell_tp"] = this.contractRadio2;
      const coin = this.coins.filter(coin => {
        return coin.value == this.contractInput;
      })[0];
      this.signSearch["symbol"] = coin ? coin.coin : "";

      this.getDispatchTableList("searchSignList"); // 체결

      var tmpFrDay = new Date();
      tmpFrDay.setDate(tmpFrDay.getDate() - 7).format("yyyyMMdd");
      var tmpFr = tmpFrDay.format("yyyyMMdd");
      var tmpTo = new Date().format("yyyyMMdd");

      this.defaultFilter[1] =
        this.signSearch["fr_dt"] == tmpFr &&
        this.signSearch["to_dt"] == tmpTo &&
        this.signSearch["buy_sell_tp"] == "" &&
        this.signSearch["symbol"] == ""
          ? true
          : false;
      this.$EventBus.$emit("mobile-nav-menus", [
        "notification",
        "filter",
        { filterIdx: 2, defaultFilter: this.defaultFilter[1] }
      ]);

      this.contractDialogVisible = false;
    },
    /**
     * 감시내역 필터 팝업의 데이터 저장
     * ( 탭 이동 시 필터 페이지가 변경되기 때문에 
     * 검색했던 필터 내용이 소멸되는 문제를 해결하고자 각각의 Object에 저장)
     */
    watchFilterSave() {
      const coin = this.coins.filter(coin => {
        return coin.value == this.watchInput;
      })[0];
      this.watchingSearch["symbol"] = coin ? coin.coin : "";
      this.watchedSearch["symbol"] = coin ? coin.coin : "";

      this.getDispatchTableList("searchWatchingList"); // 감시중
      this.getDispatchTableList("searchWatchedList"); // 감시완료

      this.$store.state.watchSearchCoin = coin ? coin.coin : "";
      this.$store.state.watchSearchValue = coin ? coin.value : "";
      this.defaultFilter[2] =
        this.watchingSearch["symbol"] == "" ? true : false;
      this.$EventBus.$emit("mobile-nav-menus", [
        "notification",
        "filter",
        { filterIdx: 3, defaultFilter: this.defaultFilter[2] }
      ]);

      this.obsDialogVisible = false;
    },
    /**
     * 암호화폐 검색에 필터처리를 위해 암호화폐 목록 설정 ( 페이지 로드시 최초 1회 실행 )
     *   > 마켓 순서로 정렬( KRW > BTC > ETH 순서 )해서 this.coins에 할당.
     */
    setCoins() {
      let self = this;
      if (self.coins.length > 0) return;

      var tmpObj = {
        all: [
          {
            value: "", //'전체',
            coin: ""
          }
        ],
        KRW: [],
        BTC: [],
        ETH: []
      };

      self.$socket.sendProcessByName(
        "n1001",
        function(queryData) {
          var block = queryData.getBlockData("InBlock1")[0];
          block["i_qrydiv"] = "0";
        },
        function(queryData) {
          if (queryData != null) {
            const nameList = queryData["queryObj"]["OutBlock2"];

            for (var idx in nameList) {
              if (nameList[idx]["o_setl_cur_cd_n"] == "KRW") {
                tmpObj["KRW"].push({
                  value: nameList[idx]["o_inst_eng_abbr"],
                  coin: nameList[idx]["o_symbol"]
                });
              } else if (nameList[idx]["o_setl_cur_cd_n"] == "BTC") {
                tmpObj["BTC"].push({
                  value: nameList[idx]["o_inst_eng_abbr"],
                  coin: nameList[idx]["o_symbol"]
                });
              } else if (nameList[idx]["o_setl_cur_cd_n"] == "ETH") {
                tmpObj["ETH"].push({
                  value: nameList[idx]["o_inst_eng_abbr"],
                  coin: nameList[idx]["o_symbol"]
                });
              }
            }

            (tmpObj["all"][0]["value"] = self.$t("m_invest.d016")), //'전체',
              (tmpObj["all"][0]["coin"] = "");

            self.coins = tmpObj["all"]
              .concat(tmpObj["KRW"])
              .concat(tmpObj["BTC"])
              .concat(tmpObj["ETH"]);
          } else {
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse(
              window.sessionStorage.getItem("lastErrorData")
            );
            if (errorData.trName != "n1001") return;

            self.$alert(self.$t("sys_err." + errorData.errCode), "", {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t("sys_err.a001")
            });
          }
        }
      );
    },
    /**
     * 감시 상태값 텍스트 반환
     */
    watchedStatus(hndl_st_vl, ordr_hndl_ccd) {
      var res = "";

      if (hndl_st_vl === "2") {
        // 2:Expired

        res = this.$t("m_invest.f028"); //'유효기간만료'
      } else if (hndl_st_vl === "3") {
        // 3:Completed

        res =
          ordr_hndl_ccd === "1"
            ? this.$t("m_invest.f026") // '주문접수'
            : ordr_hndl_ccd === "2"
            ? this.$t("m_invest.f029") // '주문거부'
            : ordr_hndl_ccd === "3"
            ? this.$t("m_invest.f026") // '주문접수'
            : ordr_hndl_ccd === "4"
            ? this.$t("m_invest.f029") // '주문거부'
            : ordr_hndl_ccd === "5"
            ? this.$t("m_invest.f026") // '주문접수'
            : ordr_hndl_ccd === "6"
            ? this.$t("m_invest.f029") // '주문거부'
            : ordr_hndl_ccd === "7"
            ? this.$t("m_invest.f026") // '주문접수'
            : ordr_hndl_ccd === "8"
            ? this.$t("m_invest.f026") // '주문접수' // '취소'
            : this.$t("m_invest.f026"); // '주문접수'
      } else if (hndl_st_vl === "4") {
        // 4:Cancel

        res = this.$t("m_invest.f062"); // '취소';
      }

      return res;
    },
    /**
     * 스크롤 이벤트
     * 테이블의 스크롤이 가장 하단에 도달하는 시점에 실행
     * 활성화된 탭의 데이터 조회
     */
    infiniteHandler($state) {
      if (!this.$store.state.exchange.contiKey) {
        $state.reset();
        return;
      }

      var dispatchName = "";
      var param = {};
      var idx = null;
      param["contiFlag"] = true;

      if (this.activeName == "notSign") {
        // 미체결

        idx = 0;
        dispatchName = "searchNotSignList";
        Object.assign(param, this.notSignSearch);
      } else if (this.activeName == "sign") {
        // 체결내역
        idx = 1;
        dispatchName = "searchSignList";
        Object.assign(param, this.signSearch);
      } else if (this.activeName == "watch") {
        if (this.activeWatchName == "watching") {
          // 감시중

          idx = 2;
          dispatchName = "searchWatchList";
          Object.assign(param, this.watchingSearch);
        } else if (this.activeWatchName == "watched") {
          // 감시완료

          idx = 3;
          dispatchName = "searchWatchList";
          Object.assign(param, this.watchedSearch);
        }
      }

      this.$store.dispatch(dispatchName, param).then(obj => {
        if (obj.getContiKey() == null) {
          $state.complete();
          document.getElementsByClassName("el-table__append-wrapper")[
            idx
          ].style.display = "none";
        } else {
          $state.loaded();
        }
      });
    },
    // 글자수 11초과시 다른 class 적용
    chkStrLength(_srt) {
      var length = _srt.length;
      if (length > 10) {
        return "fs11";
      }
    },
    chkStrLength2(_srt) {
      var length = _srt.length;
      if (length > 8) {
        return "fs11";
      }
    },
    trdAmtFormat(cd, prc) {
      let self = this;
      var nLenBelowDigitArray = [0];

      if (cd == "KRW") {

        prc = Math.floor(Number(prc));
      } else {
        UnitManager.getHogaUnit(
          self.hogaUnit,
          cd,
          prc,
          undefined,
          undefined,
          nLenBelowDigitArray
        );
      }
      return UnitManager.fixedDecimalWithCommas(prc, nLenBelowDigitArray);
    },
    /**
     * 코인명 텍스트 반환
     */
    getCoinName(curCd) {
      const self = this;
      let langKey;
      if (self.getLangKind == "KR") {
        langKey = "cur_kor_nm";
      } else if (self.getLangKind == "EN") {
        langKey = "cur_eng_nm";
      }
      let name = self.getCoinByCd(curCd)
        ? self.getCoinByCd(curCd)[langKey]
        : "";
      return name;
    },
    fetchAssets(re) {
      let self = this;
      self.fetchAssetProfitData({ fee_tp: "0" }).then(res => {
        if (re) {
          self.$socket.unregisterReal(
            "KVM2",
            self.mySymbols,
            self.$options.name
          );
        }
        self.tot = Object.assign(self.tot, self.assetTotal);
        let cds = self.getMyCds;
        self.mySymbols = self.getPairsByCds(cds).map(item => item.o_symbol);
        self.$socket.registerReal(
          "KVM2",
          "symbol",
          self.mySymbols,
          self.$options.name,
          self.onPriceChange
        );
      });
    },
    krPriceFormat(number) { // 한화 환산가 형식
      var fixedVal = 0;

      if (number < 10) {
        fixedVal = 2;
      }
      if (10 <= number && number < 100) {
        fixedVal = 1;
      }
      if (number >= 100) {
        fixedVal = 0;
      }
      
      if (number < 100) {
        if (number > 0) {
          var num = number.toFixed(10);
          var val1 = UnitManager.numberWithCommas(parseInt(number.toString()));
          var val2 = num.toString().split('.')[1];
          val2 = parseFloat('0.' + val2).toFixed(fixedVal);
          val2 = val2.toString().split('.')[1];
          return val1 + '.' + val2;
        } else {
          return number.toFixed(fixedVal);
        }
      } else {
        return UnitManager.numberWithCommas(parseInt(number))
      }
    },
  },
  mounted() {
    let self = this;

    if (self.$store.getters.isSocketConnected) {
      self.fetchAssets(false);
      self.registerAssetNotification({
        vue_name: self.$options.name,
        callback: self.onAssetNotification
      });
      self.registerOrderNotification({
        vue_name: self.$options.name,
        callback: self.onOrderNotification
      });
      /*
            self.getDispatchTableList('searchNotSignList'); // 미체결
            self.getDispatchTableList('searchSignList');    // 체결
            self.getDispatchTableList('searchWatchingList');   // 감시중
            self.getDispatchTableList('searchWatchedList');   // 감시완료
            */

      // 기간설정 default 1주일
      self.contractDate2 = new Date();
      self.contractDate1 = new Date();
      self.contractDate1.setDate(self.contractDate1.getDate() - 7);
      self.signSearch["fr_dt"] = self.contractDate1.format("yyyyMMdd");
      self.signSearch["to_dt"] = self.contractDate2.format("yyyyMMdd");

      self.$EventBus.$on("openFilterIndex", self.openFilter);
      self.setCoins();
    } else {
      self.$EventBus.$on("socketConnected", () => {
        self.fetchAssets(false);
        self.registerAssetNotification({
          vue_name: self.$options.name,
          callback: self.onAssetNotification
        });
        self.registerOrderNotification({
          vue_name: self.$options.name,
          callback: self.onOrderNotification
        });
        /*
                self.getDispatchTableList('searchNotSignList'); // 미체결
                self.getDispatchTableList('searchSignList');    // 체결
                self.getDispatchTableList('searchWatchingList');   // 감시중
                self.getDispatchTableList('searchWatchedList');   // 감시완료
                */

        // 기간설정 default 1주일
        self.contractDate2 = new Date();
        self.contractDate1 = new Date();
        self.contractDate1.setDate(self.contractDate1.getDate() - 7);
        self.signSearch["fr_dt"] = self.contractDate1.format("yyyyMMdd");
        self.signSearch["to_dt"] = self.contractDate2.format("yyyyMMdd");

        self.$EventBus.$on("openFilterIndex", self.openFilter);
        self.setCoins();
      });
    }
  },
  created() {
    let self = this;
    this.$EventBus.$emit("mobile-nav-title", this.$t("m_main.e006"));
    self.$EventBus.$emit("mobile-nav-menus", ["notification"]);
  },
  beforeDestroy() {
    let self = this;
    self.$socket.unregisterReal("KVM2", self.mySymbols, self.$options.name);
    self.unregisterAssetNotification({ vue_name: self.$options.name });
    self.unregisterOrderNotification({ vue_name: self.$options.name });
  },
  watch: {
    /**
     * 체결필터에 기간데이터가 있을경우 기간 데이터 변경시 실행
     */
    contractRadio1(val, old) {
      this.contractDate2 = new Date();
      var frDtObj = new Date(); // default : 당일

      if (val == "7") {
        // 1주일

        frDtObj.setDate(frDtObj.getDate() - 7);
      } else if (val == "30") {
        // 1개월

        frDtObj.setMonth(frDtObj.getMonth() - 1);
      }

      if (this.contractRadio1 == "0") this.contractRadio1 = "7";
      this.contractDate1 = frDtObj;
    }
  },
  filters: {
    /**
     * D-day 포멧 텍스트 반환
     */
    Dday(end_dt) {
      var tmp_dt = end_dt.replace(/\./g, "/");
      const today = new Date();
      const endDay = new Date(tmp_dt);

      return (
        Math.floor(
          (endDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1
      );
    }
  },
  beforeRouteEnter(to, from, next) {
    next(self => {
      if (
        from.name == "mInvestWatchview" ||
        from.name == "mInvestFinishhview"
      ) {
        self.activeName = "watch";
        self.activeWatchName =
          from.name == "mInvestWatchview" ? "watching" : "watched";

        if (self.$store.state.watchSearchCoin) {
          self.watchingSearch["symbol"] = self.$store.state.watchSearchCoin;
          self.watchedSearch["symbol"] = self.$store.state.watchSearchCoin;
          self.watchInput = self.$store.state.watchSearchValue;
        }

        self.getDispatchTableList("searchWatchingList"); // 감시중
        self.getDispatchTableList("searchWatchedList"); // 감시완료

        self.$EventBus.$emit("mobile-nav-menus", [
          "notification",
          "filter",
          {
            filterIdx: 3,
            defaultFilter:
              self.watchInput == "" ||
              self.watchInput == "전체" ||
              self.watchInput == "All"
                ? true
                : false
          }
        ]);
      } else if (from.name == "mOrder") {
        if (self.$route.params.reqTab == "1") {
          self.activeName = "notSign";
          self.getDispatchTableList("searchNotSignList");
          self.$EventBus.$emit("mobile-nav-menus", [
            "notification",
            "filter",
            { filterIdx: 1 }
          ]);
        } else if (self.$route.params.reqTab == "2") {
          self.activeName = "watch";
          self.getDispatchTableList("searchWatchingList");
          self.$EventBus.$emit("mobile-nav-menus", [
            "notification",
            "filter",
            { filterIdx: 3 }
          ]);
        } else {
          self.activeName = "deposit";
          self.$EventBus.$emit("mobile-nav-menus", ["notification"]);
        }
      } else {
        self.activeName = "deposit";
        self.$EventBus.$emit("mobile-nav-menus", ["notification"]);
      }
    });
  }
};
</script>

