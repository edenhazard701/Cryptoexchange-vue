<template>
  <div class="StockWatch">
    <el-tabs @tab-click="tabClicked" v-model="activeName">
      <el-tab-pane name="0">
        <span slot="label"><!-- 미체결 -->{{ $t('exchange.f006') }}</span>
        <div class="login" v-if="!LoggedIn">
          <!-- 로그인 후 확인 가능합니다. -->{{ $t('exchange.f001') }}
          <el-button @click="goLogin"><!-- 로그인 -->{{ $t('exchange.f002') }}</el-button>
        </div>

        <div class="el-table">
          <div class="el-table__header-wrapper">
            <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
              <thead>
                <th width="21%"><div class="cell"><!-- 종목 -->{{ $t('exchange.f007') }}</div></th>
                <th width="8%"><div class="cell"><!-- 구분 -->{{ $t('exchange.f008') }}</div></th>
                <th width="16%"><div class="cell"><!-- 주문가격 -->{{ $t('exchange.f009') }}</div></th>
                <th width="16%"><div class="cell"><!-- 주문수량 -->{{ $t('exchange.f010') }}</div></th>
                <th width="16%"><div class="cell"><!-- 미체결수량 -->{{ $t('exchange.f011') }}</div></th>
                <th width="13%"><div class="cell"><!-- 주문일시 -->{{ $t('exchange.f012') }}</div></th>
                <th width="10%"><div class="cell"></div></th>
              </thead>
            </table>
          </div>
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
          <el-table @cell-click="onCellClick" v-if="LoggedIn" :data="tableDataNotSign" highlight-current-row :empty-text="$t('exchange.f055')" @current-change="handleCurrentChange" stripe :show-header="false">
          <infinite-loading :identifier="infiniteId" slot="append" @infinite="infiniteHandler" force-use-infinite-wrapper=".scrollbar-wrapper"></infinite-loading>
            <el-table-column label="종목" min-width="21%">
              <template slot-scope="scope">
                <span>{{scope.row.trgt_cur_cd + '/' + scope.row.setl_cur_cd}}</span>
              </template>
            </el-table-column>
            <el-table-column label="구분" align="center" min-width="8%">
              <template slot-scope="scope">
                <span v-if="scope.row.buy_sell_tp === '2'" class="red"><!-- 매수 -->{{ $t('exchange.e001') }}</span>
                <span v-else class="blue"><!-- 매도 -->{{ $t('exchange.e002') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="주문가격" align="right" min-width="16%">
              <template slot-scope="scope">
                {{priceFormat(scope.row.setl_cur_cd, scope.row.ord_prc)}}
                <span class="unit">{{scope.row.setl_cur_cd}}</span>
              </template>
            </el-table-column>
            <el-table-column label="주문수량" align="right" min-width="16%">
              <template slot-scope="scope">
                {{coinFormat(scope.row.trgt_cur_cd, scope.row.ord_qty)}}
                <span class="unit">{{scope.row.trgt_cur_cd}}</span>
              </template>
            </el-table-column>
            <el-table-column label="미체결수량" align="right" min-width="16%">
              <template slot-scope="scope">
                <span v-if="scope.row.remn_qty > 0">
                  {{coinFormat(scope.row.trgt_cur_cd, scope.row.remn_qty)}}
                  <span class="unit">{{scope.row.trgt_cur_cd}}</span>
                </span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column label="주문일시" align="center" min-width="13%">
              <template slot-scope="scope" >
                <span v-html="dateFormat(scope.row.ord_dtm)"></span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="10%">
              <template slot-scope="scope">
                <el-button @click="orderCancelClicked(scope.$index, scope.row)" size="small"><!-- 취소 -->{{ $t('exchange.f013') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
        <el-dialog :title="$t('order.b021-1')" :visible.sync="orderCancelDialogVisible" :close-on-click-modal="false" width="20%" center>
          <el-row class="order-dialog-contents-wrapper">
            <el-row class="order-dialog-contents">
              <el-col :span="24" class="order-dialog-contents-title">
                <!-- 선택한 주문을 취소하시려면 [주문취소] 버튼을 눌러주세요. -->
                {{ $t('order.b021-2') }}
              </el-col>
            </el-row>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button type="info" @click="orderCancelDialogVisible = false">{{$t('order.b019')}}<!--닫기--></el-button>
            <el-button type="primary" @click="orderCancelReqClicked()">{{$t('order.b022')}}<!--주문취소--></el-button>
          </div>
        </el-dialog>
        <el-dialog :title="orderCancelReqDisalogTitle" :visible.sync="orderCancelReqDisalogVisible" :close-on-click-modal="false" width="20%" center>
          <el-row class="order-dialog-contents-wrapper">
            <el-row class="order-dialog-contents">
              <el-col :span="24" class="order-dialog-contents-title" v-html="orderCancelReqDisalogText"></el-col>
            </el-row>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="orderCancelReqDisalogVisible = false">{{$t('order.b024')}}<!--확인--></el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane name="1">
        <span slot="label"><!-- 체결 -->{{ $t('exchange.f020') }}</span>
        <div class="login" v-if="!LoggedIn">
            <!-- 로그인 후 확인 가능합니다. -->{{ $t('exchange.f001') }}
            <el-button @click="goLogin"><!-- 로그인 -->{{ $t('exchange.f002') }}</el-button>
        </div>
        <div class="el-table">
            <div class="el-table__header-wrapper">
                <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
                    <thead>
                        <th width="21%"><div class="cell"><!-- 종목 -->{{ $t('exchange.f021') }}</div></th>
                        <th width="8%"><div class="cell"><!-- 구분 -->{{ $t('exchange.f022') }}</div></th>
                        <th width="21%"><div class="cell"><!-- 체결가격 -->{{ $t('exchange.f023') }}</div></th>
                        <th width="18%"><div class="cell"><!-- 체결수량 -->{{ $t('exchange.f024') }}</div></th>
                        <th width="18%"><div class="cell"><!-- 체결금액 -->{{ $t('exchange.f025') }}</div></th>
                        <th width="14%"><div class="cell"><!-- 체결일시 -->{{ $t('exchange.f026') }}</div></th>
                    </thead>
                </table>
            </div>
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
            <el-table v-if="LoggedIn" @cell-click="onCellClick" :data="tableDataSign" :empty-text="$t('exchange.a020')" class="table-contract" stripe :show-header="false">
              <infinite-loading :identifier="infiniteId" slot="append" @infinite="infiniteHandler" force-use-infinite-wrapper=".scrollbar-wrapper"></infinite-loading>
              <el-table-column prop="trd_cur_cd" label="종목" min-width="21%"></el-table-column>
              <el-table-column label="구분" align="center" min-width="8%">
                <template slot-scope="scope">
                  <span v-if="scope.row.buy_sell_tp === '2'" class="red"><!-- 매수 -->{{ $t('exchange.e001') }}</span>
                  <span v-else class="blue"><!-- 매도 -->{{ $t('exchange.e002') }}</span>
                </template>
              </el-table-column>
              <el-table-column label="체결가격" align="right" min-width="21%">
                <template slot-scope="scope">{{priceFormat(scope.row.setl_cur_cd, scope.row.cntr_prc)}}<span class="unit">{{scope.row.setl_cur_cd}}</span></template>
              </el-table-column>
              <el-table-column label="체결수량" align="right" min-width="18%">
                <template slot-scope="scope">{{coinFormat(scope.row.trgt_cur_cd, scope.row.cntr_qty) }}<span class="unit">{{scope.row.trgt_cur_cd}}</span></template>
              </el-table-column>
              <el-table-column label="체결금액" align="right" min-width="18%">
                <template slot-scope="scope">{{trdAmtFormat(scope.row.setl_cur_cd, scope.row.trd_amt)}}<span class="unit">{{scope.row.setl_cur_cd}}</span></template>
              </el-table-column>
              <el-table-column label="체결일시" align="center" min-width="14%">
                <template slot-scope="scope"><span v-html="dateFormat(scope.row.trd_dtm)"></span></template>
              </el-table-column>
          </el-table>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label"><!-- 감시중 -->{{ $t('exchange.f027') }}</span>
        <div class="login" v-if="!LoggedIn">
          <!-- 로그인 후 확인 가능합니다. -->{{ $t('exchange.f001') }}
          <el-button @click="goLogin"><!-- 로그인 -->{{ $t('exchange.f002') }}</el-button>
        </div>
        <div class="el-table">
          <div class="el-table__header-wrapper">
            <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
              <thead>
                <th width="21%"><div class="cell"><!-- 종목 -->{{ $t('exchange.f028') }}</div></th>
                <th width="8%"><div class="cell"><!-- 구분 -->{{ $t('exchange.f022') }}</div></th>
                <th width="16%"><div class="cell"><!-- 감시조건 -->{{ $t('exchange.f029') }}</div></th>
                <th width="14%"><div class="cell"><!-- 조건값 -->{{ $t('exchange.f030') }}</div></th>
                <th width="18%"><div class="cell"><!-- 주문 -->{{ $t('exchange.f031') }}</div></th>
                <th width="13%"><div class="cell"><!-- 유효기간 -->{{ $t('exchange.f032') }}</div></th>
                <th width="10%"><div class="cell"></div></th>
              </thead>
            </table>
          </div>
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
          <el-table v-if="LoggedIn" @cell-click="onCellClick" :data="tableDataWatching" :empty-text="$t('exchange.a019')" stripe :show-header="false">
            <infinite-loading :identifier="infiniteId" slot="append" @infinite="infiniteHandler" force-use-infinite-wrapper=".scrollbar-wrapper"></infinite-loading>
            <el-table-column prop="symbol_abbr" label="종목" min-width="21%"></el-table-column>
            <el-table-column label="구분" align="center" min-width="8%">
                <template slot-scope="scope">
                  <span v-if="scope.row.trd_ccd === '2'" class="red"><!-- 매수 -->{{ $t('exchange.e001') }}</span>
                  <span v-else class="blue"><!-- 매도 -->{{ $t('exchange.e002') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="감시조건" align="center" min-width="16%">
                <template slot-scope="scope">
                  <span v-if="scope.row.md_cd === '1'"><!-- 스탑 시장가 -->{{ $t('exchange.e007') }}</span>
                  <span v-if="scope.row.md_cd === '2'"><!-- 스탑 지정가 -->{{ $t('exchange.e006') }}</span>
                  <span v-if="scope.row.md_cd === '3'"><!-- 트레일링 스탑 -->{{ $t('exchange.e008') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="조건값" align="center" min-width="14%">
              <template slot-scope="scope">
                <span v-if="scope.row.md_cd === '1' || scope.row.md_cd === '2'"><!-- 스탑가격 -->{{ $t('exchange.e067') }}<br>{{priceFormat(scope.row.paycurrcode, scope.row.stop_prc)}}<span class="unit">{{scope.row.paycurrcode}}</span></span>
                <span v-if="scope.row.md_cd === '3' && scope.row.trd_ccd === '2'"><!-- 최저가대비상승폭 -->{{ $t('exchange.e087') }}<br>{{priceFormat(scope.row.paycurrcode, scope.row.distance)}}<span class="unit">{{scope.row.paycurrcode}}</span></span>
                <span v-if="scope.row.md_cd === '3' && scope.row.trd_ccd === '1'"><!-- 최고가대비하락폭 -->{{ $t('exchange.e094') }}<br>{{priceFormat(scope.row.paycurrcode, scope.row.distance)}}<span class="unit">{{scope.row.paycurrcode}}</span></span>
              </template>
            </el-table-column>
            <el-table-column label="주문" header-align="center" min-width="18%">
              <template slot-scope="scope">
                <span v-if="scope.row.ordr_typ_cd === '1' && scope.row.trd_ccd === '2'"><!-- 금액 -->{{ $t('exchange.f056') }} {{priceFormat(scope.row.paycurrcode, scope.row.ordr_amt)}}<span class="unit">{{scope.row.paycurrcode}}</span></span>
                <span v-if="scope.row.ordr_typ_cd === '1' && scope.row.trd_ccd === '1'"><!-- 수량 -->{{ $t('exchange.c003') }} {{coinFormat(scope.row.tradcurrcode, scope.row.ordr_q)}}<span class="unit">{{scope.row.tradcurrcode}}</span></span>
                <span v-if="scope.row.ordr_typ_cd === '2'"><!-- 수량 -->{{ $t('exchange.c003') }} {{coinFormat(scope.row.tradcurrcode, scope.row.ordr_q)}}<span class="unit">{{scope.row.tradcurrcode}}</span><br><!-- 가격 -->{{ $t('exchange.c001') }} {{priceFormat(scope.row.paycurrcode, scope.row.ordr_prc)}}<span class="unit">{{scope.row.paycurrcode}}</span></span>
              </template>
            </el-table-column>
            <el-table-column prop="watchDeadline" label="유효기간" align="center" min-width="13%">
              <template slot-scope="scope"><span v-html="dateFormat(scope.row.end_dt)"></span></template>
            </el-table-column>
            <el-table-column align="center" min-width="10%">
              <template slot-scope="scope"><el-button @click="watchingCancelClicked(scope.$index, scope.row)" type="text" size="small"><!-- 취소 -->{{ $t('exchange.f013') }}</el-button></template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
        <el-dialog :title="$t('order.d017-1')" :visible.sync="watchCancelDialogVisible" :close-on-click-modal="false" width="20%" center>
          <el-row class="order-dialog-contents-wrapper">
            <el-row class="order-dialog-contents">
              <el-col :span="24" class="order-dialog-contents-title" v-html="$t('order.d017-2')"></el-col>
            </el-row>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button type="info" @click="watchCancelDialogVisible = false">{{$t('order.d018')}}<!--닫기--></el-button>
            <el-button type="primary" @click="watchCancelReqClicked()">{{$t('order.d019')}}<!--감시취소--></el-button>
          </div>
        </el-dialog>
        <el-dialog :title="watchCancelReqDisalogTitle" :visible.sync="watchCancelReqDisalogVisible" :close-on-click-modal="false" width="20%" center>
          <el-row class="order-dialog-contents-wrapper">
            <el-row class="order-dialog-contents">
              <el-col :span="24" class="order-dialog-contents-title" v-html="watchCancelReqDisalogText"></el-col>
            </el-row>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary"  @click="watchCancelReqDisalogVisible = false">{{$t('order.d021')}}<!--확인--></el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane name="3">
        <span slot="label">{{$t('exchange.f039')}}<!--감시완료--></span>
        <div class="login" v-if="!LoggedIn">
          <!-- 로그인 후 확인 가능합니다. -->{{ $t('exchange.f001') }}
          <el-button @click="goLogin"><!-- 로그인 -->{{ $t('exchange.f002') }}</el-button>
        </div>
        <div class="el-table">
          <div class="el-table__header-wrapper">
            <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
              <thead>
                <th width="21%"><div class="cell">{{$t('exchange.f040')}}<!--종목--></div></th>
                <th width="8%"><div class="cell">{{$t('exchange.f041')}}<!--구분--></div></th>
                <th width="10%"><div class="cell">{{$t('exchange.f042')}}<!--감시조건--></div></th>
                <th width="22%"><div class="cell">{{$t('exchange.f043')}}<!--조건값--></div></th>
                <th width="16%"><div class="cell">{{$t('exchange.f044')}}<!--주문--></div></th>
                <th width="13%"><div class="cell">{{$t('exchange.f045')}}<!--감시완료--></div></th>
                <th width="10%"><div class="cell">{{$t('exchange.f046')}}<!--상태--></div></th>
              </thead>
            </table>
          </div>
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
          <el-table if="LoggedIn" @cell-click="onCellClick" :data="tableDataWatched" :empty-text="$t('exchange.a021')" class="table-watch" stripe :show-header="false">
            <infinite-loading :identifier="infiniteId" slot="append" @infinite="infiniteHandler" force-use-infinite-wrapper=".scrollbar-wrapper"></infinite-loading>
            <el-table-column prop="symbol_abbr" label="종목" min-width="21%"></el-table-column>
            <el-table-column label="구분" align="center" min-width="8%">
                <template slot-scope="scope">
                  <span v-if="scope.row.trd_ccd === '2'" class="red">{{ $t('exchange.e001') }}</span>
                  <span v-else class="blue">{{ $t('exchange.e002') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="감시조건" align="center" min-width="10%">
                <template slot-scope="scope">
                  <span v-if="scope.row.md_cd === '1'">{{$t('order.e016')}}<!--스탑 시장가--></span>
                  <span v-if="scope.row.md_cd === '2'">{{$t('order.e017')}}<!--스탑 지정가--></span>
                  <span v-if="scope.row.md_cd === '3'">{{$t('order.e018')}}<!--트레일링 스탑--></span>
                </template>
            </el-table-column>
            <el-table-column label="조건값" align="center" min-width="22%">
              <template slot-scope="scope">
                <span v-if="scope.row.md_cd === '1' || scope.row.md_cd === '2'">
                  {{$t('order.e019')}}<!--스탑 가격--><br>{{priceFormat(scope.row.paycurrcode, scope.row.stop_prc)}}
                  <span class="unit">{{scope.row.paycurrcode}}</span>
                </span>
                <span v-if="scope.row.md_cd === '3' && scope.row.trd_ccd === '2'">
                  {{$t('order.e020')}}<!--최저가대비상승폭--><br>{{priceFormat(scope.row.paycurrcode, scope.row.distance)}}
                  <span class="unit">{{scope.row.paycurrcode}}</span>
                </span>
                <span v-if="scope.row.md_cd === '3' && scope.row.trd_ccd === '1'">
                  {{$t('order.e021')}}<!--최고가대비하락폭--><br>{{priceFormat(scope.row.paycurrcode, scope.row.distance)}}
                  <span class="unit">{{scope.row.paycurrcode}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="주문" header-align="center" min-width="16%">
              <template slot-scope="scope">
                <span v-if="scope.row.ordr_typ_cd === '1' && scope.row.trd_ccd === '2'">
                  <!-- 금액 -->{{$t('exchange.c004')}} {{priceFormat(scope.row.paycurrcode, scope.row.ordr_amt)}}
                  <span class="unit">{{scope.row.paycurrcode}}</span>
                </span>
                <span v-if="scope.row.ordr_typ_cd === '1' && scope.row.trd_ccd === '1'">
                  <!-- 수량 -->{{$t('exchange.c003')}} {{coinFormat(scope.row.tradcurrcode, scope.row.ordr_q)}}
                  <span class="unit">{{scope.row.tradcurrcode}}</span>
                </span>
                <span v-if="scope.row.ordr_typ_cd === '2'">
                  <!-- 수량 -->{{$t('exchange.c003')}} {{coinFormat(scope.row.tradcurrcode, scope.row.ordr_q)}}
                  <span class="unit">{{scope.row.tradcurrcode}}</span><br>
                  <!-- 가격 -->{{$t('exchange.c001')}} {{priceFormat(scope.row.paycurrcode, scope.row.ordr_prc)}}
                  <span class="unit">{{scope.row.paycurrcode}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="watchDeadline" label="감시완료" align="center" min-width="13%">
              <template slot-scope="scope"><span v-html="dateFormat(scope.row.st_upt_dy_tm)"></span></template>
            </el-table-column>
            <el-table-column label="상태" align="center" min-width="10%">
              <template slot-scope="scope">
                <el-tooltip v-if="watchedStatus(scope.row.hndl_st_vl, scope.row.ordr_hndl_ccd) === $t('order.e013-3')" :content="$t('sys_err.'+scope.row.rfsl_cd)" placement="left"><span><!-- 주문거부 -->{{$t('order.c029')}}</span></el-tooltip>
                <span v-else>{{watchedStatus(scope.row.hndl_st_vl, scope.row.ordr_hndl_ccd)}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane name="4">
        <span slot="label"><!-- 자산 -->{{$t('exchange.f047')}}</span>
        <div class="login" v-if="!LoggedIn">
          <!-- 로그인 후 확인 가능합니다. -->{{ $t('exchange.f001') }}
          <el-button @click="goLogin"><!-- 로그인 -->{{ $t('exchange.f002') }}</el-button>
        </div>
        <div class="el-table">
          <div class="el-table__header-wrapper">
            <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
              <thead>
                <tr>
                  <th width="14%"><div class="cell"><!-- 자산 -->{{$t('exchange.f048')}}</div></th>
                  <th width="14%"><div class="cell"><!-- 보유수량 -->{{$t('exchange.f049')}}</div></th>
                  <th width="14%"><div class="cell"><!-- 평균매수가 -->{{$t('exchange.f050')}}</div></th>
                  <!-- "sortClass(assetSortClass[0])" -->
                  <th width="14%" class="is-sortable" :class="{'descending' : sortClass_buy_pamt === 'desc', 'ascending' : sortClass_buy_pamt == 'asc'}" @click="assetSort('buy_pamt', 0)">    <!-- ascending 혹은 descending일 때 th class에 ascending 혹은 descending 추가 -->
                    <div class="cell">
                      <!-- 매수금액 -->{{$t('exchange.f051')}}
                      <span class="caret-wrapper">
                        <i class="sort-caret ascending"></i>
                        <i class="sort-caret descending"></i>
                      </span>
                    </div>
                  </th>
                  <th width="14%"><div class="cell"><!-- 현재가 -->{{$t('exchange.f052')}}</div></th>
                  <th width="14%" class="is-sortable" :class="{'descending' : sortClass_evlt_amt == 'desc', 'ascending' : sortClass_evlt_amt == 'asc'}" @click="assetSort('evlt_amt', 1)">    <!-- ascending 혹은 descending일 때 th class에 ascending 혹은 descending 추가 -->
                    <div class="cell">
                      <!-- 평가금액 -->{{$t('exchange.f053')}}
                      <span class="caret-wrapper">
                        <i class="sort-caret ascending"></i>
                        <i class="sort-caret descending"></i>
                      </span>
                    </div>
                  </th>
                  <th width="16%" class="is-sortable" :class="{'descending' : sortClass_prft_rt == 'desc', 'ascending' : sortClass_prft_rt == 'asc'}" @click="assetSort('prft_rt', 2)">    <!-- ascending 혹은 descending일 때 th class에 ascending 혹은 descending 추가 -->
                    <div class="cell">
                      <!-- 수익률 -->{{$t('exchange.f054')}}
                      <span class="caret-wrapper">
                        <i class="sort-caret ascending"></i>
                        <i class="sort-caret descending"></i>
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
          <el-table v-if="LoggedIn" :data="tableDataAsset" :empty-text="$t('exchange.f057')" class="table-asset" stripe :show-header="false">
            <el-table-column prop="cur_cd" label="자산" min-width="14%">
              <template slot-scope="scope">
                <div v-if="getLangKind=='KR'">{{ getCurNm(scope.row.cur_cd) }}<br><span class="unit">{{scope.row.cur_cd}}</span></div>                                
                <div v-if="getLangKind=='EN'">{{ getCurNm(scope.row.cur_cd) }}<br><span class="unit">{{scope.row.cur_cd}}</span></div>
              </template>
            </el-table-column>
            <el-table-column label="보유수량" align="right" min-width="14%">
              <template slot-scope="scope">{{formatCoin(scope.row["cur_cd"], scope.row["remn_qty"])}}<span class="unit">{{scope.row.cur_cd}}</span></template>
            </el-table-column>
            <el-table-column label="평균매수가" align="right" min-width="14%">
              <template slot-scope="scope">{{priceFormat('KRW', scope.row.buy_prc)}}<span class="unit">KRW</span></template>
            </el-table-column>
            <el-table-column prop="buy_pamt" sortable :sort-orders="sortOrder" label="매수금액" align="right" min-width="14%">
              <template slot-scope="scope">{{formatAmount(scope.row.buy_pamt)}}<span class="unit">KRW</span>
              </template>
            </el-table-column>
            <el-table-column label="현재가" align="right" min-width="14%">
              <template slot-scope="scope">{{priceFormat('KRW', scope.row.sbst_base_prc)}} <span class="unit">KRW</span></template>
            </el-table-column>
            <el-table-column prop="evlt_amt" sortable :sort-orders="sortOrder" label="평가금액" align="right" min-width="14%">
              <template slot-scope="scope">{{formatAmount(scope.row.evlt_amt)}}<span class="unit">KRW</span></template>
            </el-table-column>
            <el-table-column prop="prft_rt" sortable :sort-orders="sortOrder" label="수익률" align="right" min-width="16%">
              <template slot-scope="scope">
                <span :class="[scope.row.prft_rt > 0 ? 'red' : scope.row.prft_rt < 0 ? 'blue' : '']">{{formatAmount(scope.row.evlt_pl)}}</span> <span class="unit">KRW</span><br>
                <span :class="[scope.row.prft_rt > 0 ? 'red' : scope.row.prft_rt < 0 ? 'blue' : '']">{{formatRate(scope.row.prft_rt)}}</span> <span class="unit">%</span>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
    <el-checkbox v-model="nowCoinChk" class="nowCoin" :disabled="nowCoinDisabled"><!-- 현재 종목만 보기 -->{{ $t('exchange.f005') }}</el-checkbox>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import fromExponential from 'from-exponential';
import moment from 'moment';
import {_} from 'vue-underscore';
import InfiniteLoading from 'vue-infinite-loading';

/* Infinite-loading
* guid     : https://peachscript.github.io/vue-infinite-loading/guide/#installation
* options  : https://peachscript.github.io/vue-infinite-loading/api/#props
*/
Vue.use(InfiniteLoading, {
  slots: { noMore: '', noResults: '' }
});

export default {
  name: "StockWatch",
  data() {
    return {
      activeName: '0',
      nowCoinChk: true,
      tabIndex: '0',
      currentRow: null,
      nowCoinDisabled: false,
      sortOrder: ['descending', 'ascending', null],
      notSignSearch: {         /****** 미체결 검색Obj ******/
        qry_ord_tp      : 0,    // 조회주문 구분
        qry_cond_tp     : 0,    // 조회조건 구분
        symbol          : null, // 종목코드
        buy_sell_tp     : null, // 매수매도 구분
        qry_auto_trd_tp : null, // 조회자동매매 구분
        // req_cnt         : 30    // 요청건수
      },
      signSearch: {           /****** 체결 검색Obj ******/
        fr_dt       : '',       // 시작일
        to_dt       : '',       // 종료일
        trgt_coin   : null,     // 대상코인
        symbol      : null,     // 종목코드
        // req_cnt     : 30        // 요청건수
      },
      reqSignCancelObj: {     /****** 주문취소요청 ******/
        org_ord_no: '',         // 원주문번호
        modi_cncl_tp: '',       // 정정취소구분 1:정정 2:취소
        part_all_tp: '',        // 일부전부구분 1:일부 2:전부
        ord_qty: '',            // 정정취소수량
        ord_prc: ''             // 주문가격 (정정시만 지정)
      },
      watchSearch: {          /****** 감시중, 감시완료 검색Obj ******/
        mbr_ccd: '01',          // 사용자구분 (00:직원 01:고객)
        hndl_st_vl: '',         // 조건상태 (0:감시해제 1:감시중 2:미체결감시중 3:조건만족 4:유효기간만료
                                //          98:전체조회(감시중제외) 99:전체(감시중 포함))
        symbol: '',             // 처리상태(space:전체 0:감시해제 1:감시중 2:미체결감시중 3:조건)
      },
      reqWatchCancelObj: {     /****** 감시취소요청 ******/
        est_dt: '',             // 설정일자
        symbol: '',             // 단축코드
        sq: '',                 // 조건일련번호
        mbr_ccd: '01',          // 사용자구분
        md_cd: '',              // 매체구분
        trd_ccd: ''             // 1.매수 2.매도
      },
      /* inifinite loading 컴포넌트 초기화 변수 */
      infiniteId: +new Date(),
      orderCancelDialogVisible: false,
      orderCancelReqDisalogVisible: false,
      orderCancelReqDisalogText: '',
      orderCancelReqDisalogTitle: '',
      watchCancelDialogVisible: false,
      watchCancelReqDisalogVisible: false,
      watchCancelReqDisalogText: '',
      watchCancelReqDisalogTitle: '',
      sortClass_buy_pamt: '',
      sortClass_prft_rt: '',
      sortClass_evlt_amt: '',
      dataLoaded: false,      // 데이터 로드 상태
    };
  },
  computed: {
    ...mapState({
      currentSymbol : state => state.data.currentSymbol,
      nameList: state => state.data['n1001'],
    }),
    ...mapGetters({
      tableDataNotSign    : 'notSignList',
      tableDataSign       : 'signList',
      tableDataWatching   : 'watchingList',
      tableDataWatched    : 'watchedList',
      tableDataAsset      : 'assetProfitList',
      LoggedIn            : 'isLoggedIn',
      changeOrderWatch    : 'isOrderWatch',
      getCoinByCd         : 'getCoinByCd',
      hogaUnit            : 'hogaUnit',
      getPairBySymbol     : 'getPairBySymbol',
      getMyCds            : 'getMyCds',
      getLangKind         : 'getLangKind',
      getPairsByCds       : 'getPairsByCds',
      getPairsByCd        : 'getPairsByCd'
    }),
    socketConnected() {
      return this.$store.getters.isSocketConnected
    }
  },
  watch: {
    /**
    * 현재 종목만 보기 checkbox 클릭시 활성화 탭의 data reload
    */
    nowCoinChk(val, old) {
      this.tabClicked({index : this.tabIndex}, null);
    },
    /*
    *  desc : currentSymbol이 변경되고, 현재 종목만 보기 checkbox가 체크된 경우 활성화 탭의 data reload
    */
    currentSymbol() {
      if (this.nowCoinChk) this.tabClicked({index : this.tabIndex}, null);
    },
    /**
     * 감시중 주문이 요청된 경우 활성화 탭을 감시중탭으로 이동
     *   > 감시중 주문 확인의 실시간TR이 없어 exchange.js vuex에서 감시중 주문 요청시 changeOrderWatch값 변경처리
     *     > changeOrderWatch의 변경을 watch로 감지하여 감시중을 활성화 처리
     */
    changeOrderWatch(val) {
      // 활성화 탭 변경
      this.activeName = '2';
      // 감시중 데이터 조회
      this.tabClicked({index : 2}, null);
    },
  },
  methods: {
    ...mapActions([
      'registerAssetNotification',
      'unregisterAssetNotification',
      'fetchAssetProfitData',
      'filterAssetProfitList'
    ]),
    ...mapMutations(['orderUnshift', 'orderRemove', 'orderUpdate', 'setContiKey']),
    /**
     * 자산 코인명 사용자 언어팩에 따라 변경하여 반환
     */
    getCurNm(cd) {
      if(cd == '' || cd == null || cd == undefined || this.getCoinByCd(cd) == undefined) return;
      const curType = this.getLangKind == 'KR' ? 'cur_kor_nm' : 'cur_eng_nm'
      return this.getCoinByCd(cd)[curType]
    },
    /**
     * KVM2 실시간 콜백
     * @param {object} queryData KVM2 데이터
     * 거래소 심볼 단위라서 통화코드를 뽑고 최우선 마켓을 확인
     * 목록에서 아이템을 찾아 현재가를 업데이트 하고 평가금액, 평가손익, 수익률은 계산하여 업데이트
     */
    onPriceChange(queryData) {
      var self = this;
      if (self.tabIndex != 4) return;

      let data = queryData.getBlockData("OutBlock1")[0];
      let cd = self.getPairBySymbol(data["symbol"]).o_trgt_cur_cd_n;

      if (self.getMyCds.includes(cd)) {
        let sbst_base_prc = data.curprc * 1;
        const market = data.symbol.slice(-5).replace(/[_]/g, "");

        if (market === "BTC") {
          if (self.getPrimaryMarket(cd) !== market) return;
          sbst_base_prc = self.$big(sbst_base_prc).times(self.btcKRWCurPrc);
        }
        if (market === "ETH") {
          if (self.getPrimaryMarket(cd) !== market) return;
          sbst_base_prc = self.$big(sbst_base_prc).times(self.ethKRWCurPrc);
        }

        let changed = _.findWhere(self.tableDataAsset, { cur_cd: cd });
        let evlt_amt = Math.floor(
          self.$big(changed.remn_qty).times(sbst_base_prc)
        );
        let evlt_pl = evlt_amt - changed.buy_pamt;
        let prft_rt = ((evlt_pl / changed.buy_pamt) * 100).toFixed(2);
        if (isNaN(prft_rt)) prft_rt = 0;
        changed = Object.assign(changed, {
          sbst_base_prc,
          evlt_amt,
          evlt_pl,
          prft_rt
        });
      }
    },
    /**
     * RB03 실시간 TR 콜백함수
     * 현재 활성화 된 탭에 따라 분기처리하여 로직 작성
     * (미체결, 체결, 감시중, 감시완료) 데이터 추가, 삭제, 업데이트
     */
    onOrderNotification(resData) {
        var self = this;
        
        //----- 미체결 data set START -----//
        if (self.tabIndex == '0') {
            //현재 종목만 보기 체크시 처리 
            if (self.nowCoinChk && self.currentSymbol != resData.symbol) return;
            
            if (resData.evnt_tp == '1') { // 주문확인(신규주문)
                self.orderUnshift({listName: 'notSignList', addObj: [resData]})
                return;
            }

            for (var idx in self.tableDataNotSign) {
                var item = self.tableDataNotSign[idx]

                if (resData.evnt_tp == '2') { // 주문거부

                    if (parseInt(item.ord_no) == parseInt(resData.ord_no)) { // ord_no = 주문번호

                        self.orderRemove({listName: 'notSignList', idx: idx})
                        return
                    }
                } else if (resData.evnt_tp == '6') { // 체결
                    
                    if (parseInt(item.ord_no) == parseInt(resData.ord_no)) {
                        
                        if (resData.ord_prc_tp == '1') { // 시장가 주문
                            
                            if (resData.all_cntr_yn == 'Y') { //전체체결 여부
                                
                                self.orderRemove({listName: 'notSignList', idx: idx})
                                return
                            }
                        } else {

                            if (resData.remn_qty <= 0) { //잔여수량 <= 0
                                
                                self.orderRemove({listName: 'notSignList', idx: idx})
                                return;
                            }
                        }

                        self.orderUpdate({listName: 'notSignList', idx: idx, updObj: resData})
                        return;
                    }
                } else if (resData.evnt_tp == '5') { // 자동취소 '5'이면 주문번호끼리 비교해서 자동삭제 한다.

                    if (parseInt(item.ord_no) == parseInt(resData.ord_no)) {
                        
                        self.orderRemove({listName: 'notSignList', idx: idx})
                        return;
                    }
                }

                // 주문번호와 원주문번호를 비교해서 갱신한다.
                if (parseInt(item.ord_no) == parseInt(resData.org_ord_no)) {
                    
                    if (resData.evnt_tp == '3') { // 정정확인

                        if (Math.abs(parseFloat(item.remn_qty) - parseFloat(resData.cnfm_qty)) < NumberUtil.EPSILON || item.remn_qty <= 0) {

                            self.orderRemove({listName: 'notSignList', idx: idx})
                        } else {
                            
                            self.orderUpdate({listName: 'notSignList', idx: idx, updObj: resData})
                        }

                        if (parseFloat (resData.ord_qty) > 0) {
                            
                            self.orderUnshift({listName: 'notSignList', addObj: [resData]})
                        }
                        return;
                    } else {

                        if (parseFloat(item.remn_qty) <= parseFloat(resData.cnfm_qty)) {
                            
                            self.orderRemove({listName: 'notSignList', idx: idx})
                            return;
                        }

                        self.orderUpdate({listName: 'notSignList', idx: idx, updObj: resData})
                        return;
                    }
                }
            }

            // 정정시 체결이 먼저 일어났을 때
            if (resData.evnt_tp == '3' && parseFloat(resData.ord_qty) > 0) {
                
                self.orderUnshift({listName: 'notSignList', addObj: [resData]})
            }
        }
        //----- 미체결 data set END -----//

        //----- 체결 data set START -----//
        if (resData.evnt_tp == '6' && self.tabIndex == '1') { // 체결
            
            if (self.nowCoinChk && self.currentSymbol != resData.symbol) return;
            var tmpData = {};
            Object.assign(tmpData, resData);
            tmpData['trd_cur_cd'] = resData['trgt_cur_cd'] + '/' + resData['setl_cur_cd']
            tmpData['trd_dtm'] = resData['evnt_dtm']
            tmpData['trd_amt'] = Number(resData['cntr_amt'])

            self.orderUnshift({listName: 'signList', addObj: [tmpData]})
            return;
        }
        //----- 체결 data set END -----//


        //----- 감시중, 감시완료 data set START -----//
        if (self.tabIndex == '2' || self.tabIndex == '3') {
            
            // 감시중은 실시간 데이터가 없어 주문이 이뤄질 경우 데이터 재조회 처리.
            // ( 감시요청 시에도 데이터 재조회 처리 : changeOrderWatch )
            if (resData.evnt_tp == '1' || resData.evnt_tp == '6') { //재조회 기준 조건 추가 (1주문확인,6체결)
                self.tabClicked({index : self.tabIndex}, null);
            }
        }
        //----- 감시중, 감시완료 data set END -----//
    },
    onAssetNotification(res) {
        var self = this;
        
        if (res.cur_cd === 'KRW') return;
        var changed = _.findWhere(self.tableDataAsset, {cur_cd: res.cur_cd});
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
            self.fetchAssetProfitData({ fee_tp: "0" }).then(res => {
                self.$socket.unregisterReal(
                    "KVM2",
                    self.mySymbols,
                    self.$options.name
                );
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
        }
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
    getDispatchData(name, payload, resolve, reject) {
      let self = this
      if (typeof resolve != 'function' || !resolve) {
        resolve = (obj) => {
          // console.log('resolve', obj);
        }
      }
      if (typeof reject != 'function' || !reject) {
        reject = (obj) => {
          // console.log('reject', obj)
        }
      }
      payload['symbol'] = this.nowCoinChk ? this.currentSymbol : null;
      this.$store.dispatch(name, payload).then(resolve).catch(reject);
    },
    tabClicked(tab, event) {
      var name        = '',
          payload     = {},
          callback    = null;
      this.tabIndex = tab.index;
      this.nowCoinDisabled = false;
      this.infiniteId = +new Date();            

      if (tab.index == 0) { // 미체결 tab
        name = 'searchNotSignList';
        payload = this.notSignSearch;
      } else if (tab.index == 1) { // 체결 tab
        name = 'searchSignList';
        payload = this.signSearch;
      } else if (tab.index == 2) { // 감시중 tab
        name = 'searchWatchList';
        this.watchSearch['hndl_st_vl'] = '1';
        payload = this.watchSearch;
      } else if (tab.index == 3) { // 감시완료 tab
        name = 'searchWatchList';
        this.watchSearch['hndl_st_vl'] = '98';
        payload = this.watchSearch;
      } else { // 자산 tab
        this.nowCoinDisabled = true;
        name = 'fetchAssetProfitData';
        payload = {fee_tp : '0'};
      }
      payload['contiFlag'] = false;
      this.setContiKey(null)
      
      this.getDispatchData(name, payload, callback);
    },
    orderCancelClicked(index, row) {
      this.reqSignCancelObj['org_ord_no'] = row.ord_no;
      this.reqSignCancelObj['ord_qty'] = row.remn_qty;

      this.orderCancelDialogVisible = true;
    },
    orderCancelReqClicked() {
      this.orderCancelDialogVisible = false;
      this.reqSignCancelObj['modi_cncl_tp'] = '2';
      this.reqSignCancelObj['part_all_tp'] = '2';

      const self = this;
      var successFn = function(res) {
        self.orderCancelReqDisalogVisible = true;
        self.orderCancelReqDisalogTitle = self.$t('order.b023-1');
        self.orderCancelReqDisalogText = self.$t('order.b023-2');
      }

      var failFn = function(res) {
        if (res.trName == 'tr102') {
          if (res.errCode == '19999') {
            self.$alert(self.$t('sys_err.19999'), '', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t('sys_err.a001')
            })
            return;
          }
        }
        
        self.orderCancelReqDisalogVisible = true;
        self.orderCancelReqDisalogTitle = '';
        self.orderCancelReqDisalogText = self.$t('exchange.f019');
      }
      
      this.getDispatchData('reqSignCancel', this.reqSignCancelObj, successFn, failFn);
    },
    watchingCancelClicked(index, row) {
      this.watchCancelDialogVisible = true;
      this.reqWatchCancelObj['est_dt']        = row.est_dt;
      this.reqWatchCancelObj['symbol_tmp']    = row.symbol;
      this.reqWatchCancelObj['sq']            = row.sq;
      this.reqWatchCancelObj['trd_ccd']       = row.trd_ccd;
    },
    watchCancelReqClicked() {
      this.watchCancelDialogVisible = false;

      const self = this;
      var successFn = function(res) {
        self.watchCancelReqDisalogVisible = true;
        self.watchCancelReqDisalogTitle = self.$t('order.d020-1');
        self.watchCancelReqDisalogText = self.$t('order.d020-2');
      }

      var failFn = function(res) {
        self.watchCancelReqDisalogTitle = '';
        self.watchCancelReqDisalogVisible = true;
        self.watchCancelReqDisalogText = self.$t('order.d022');
      }
      this.getDispatchData('reqWatchCancel', this.reqWatchCancelObj, successFn, failFn);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    dateFormat(ord_dtm) {
      if (!ord_dtm) return '';
      ord_dtm = ord_dtm.replace(/\./g, "");
      ord_dtm = ord_dtm.replace(/:/g, "");
      ord_dtm = ord_dtm.replace(/ /g, "");

      return moment(ord_dtm.substr(0,8) + "T" + ord_dtm.substr(8,6)).format("YYYY-MM-DD HH:mm:ss");
    },
    goLogin() {
      this.$router.push({name: 'login'});
    },
    coinFormat(cd, number) {
      if(cd == '' || cd == null || cd == undefined || this.getCoinByCd(cd) == undefined) return;

      let self = this;
      let dec_digt = self.getCoinByCd(cd).dec_digt
      // let formatter = Intl.NumberFormat(self.$i18n.locale, {
      //     minimumFractionDigits: dec_digt? dec_digt : 8,
      //     maximumFractionDigits: dec_digt? dec_digt : 8
      // });
      // return formatter.format(number);
      return UnitManager.fixedDecimalWithCommas(number, dec_digt? dec_digt : 8)
    },
    priceFormat(cd, prc) {
      if(cd == '' || cd == null || cd == undefined || this.hogaUnit == undefined) return;

      let self = this;
      var nLenBelowDigitArray = [1];
      UnitManager.getHogaUnit(self.hogaUnit, cd, prc, undefined, undefined, nLenBelowDigitArray);
      // let formatter = Intl.NumberFormat(self.$i18n.locale, {
      //     minimumFractionDigits: nLenBelowDigitArray[0],
      //     maximumFractionDigits: nLenBelowDigitArray[0]
      // });
      // return formatter.format(prc);
      return UnitManager.fixedDecimalWithCommas(prc, nLenBelowDigitArray[0])
    },
    formatCoin(cd, number) {
      let self = this;
      let dd = 8;
      
      if(cd == '' || cd == null || cd == undefined || this.getCoinByCd(cd) == undefined) return;

      if (self.getCoinByCd(cd).dec_digt) {
        dd = self.getCoinByCd(cd).dec_digt;
      }
      return UnitManager.numberWithCommas(NumberUtil.Floor( '', '', number, dd)); 
    },
    trdAmtFormat(cd, prc) {
      let self = this;
      // var formatter;
      var nLenBelowDigitArray = [0];

      if (cd == 'KRW') {
        // formatter = Intl.NumberFormat(self.$i18n.locale, {
        //     minimumFractionDigits: 0,
        //     maximumFractionDigits: 0
        // });

        prc = Math.floor(Number(prc))
      } else {
        UnitManager.getHogaUnit(self.hogaUnit, cd, prc, undefined, undefined, nLenBelowDigitArray);
        // formatter = Intl.NumberFormat(self.$i18n.locale, {
        //     minimumFractionDigits: nLenBelowDigitArray[0],
        //     maximumFractionDigits: nLenBelowDigitArray[0]
        // });
      }
      // return formatter.format(prc);
      return UnitManager.fixedDecimalWithCommas(prc, nLenBelowDigitArray[0])
    },
    /* 감시완료탭 > 상태컬럼 */
    watchedStatus(hndl_st_vl, ordr_hndl_ccd) {
      var res = '';
      if (hndl_st_vl === '2') {           // 2:Expired 
        res = this.$t('order.e013-4')
      } else if (hndl_st_vl === '3') {    // 3:Completed 
        res = ordr_hndl_ccd === '1' ? this.$t('order.e013-2') //주문접수 주문거부
          : ordr_hndl_ccd === '2' ? this.$t('order.e013-3')
          : ordr_hndl_ccd === '3' ? this.$t('order.e013-2')
          : ordr_hndl_ccd === '4' ? this.$t('order.e013-3')
          : ordr_hndl_ccd === '5' ? this.$t('order.e013-2')
          : ordr_hndl_ccd === '6' ? this.$t('order.e013-3')
          : ordr_hndl_ccd === '7' ? this.$t('order.e013-2')
          : ordr_hndl_ccd === '8' ? this.$t('order.e013-2')
          : this.$t('order.e013-2')
      } else if (hndl_st_vl === '4') {    // 4:Canceled                
        res = this.$t('order.e013-5');
      }

      return res;
    },
    infiniteHandler($state) {
      if (!this.$store.state.exchange.contiKey) {
        $state.reset()
        return;
      }
      
      var payload = {};
      var name    = '';
      if (this.tabIndex == 0) { // 미체결 tab
        name = 'searchNotSignList';
        payload = this.notSignSearch;
      } else if (this.tabIndex == 1) { // 체결 tab
        name = 'searchSignList';
        payload = this.signSearch;
      } else if (this.tabIndex == 2) { // 감시중 tab
        name = 'searchWatchList';
        this.watchSearch['hndl_st_vl'] = '1';
        payload = this.watchSearch;
      } else if (this.tabIndex == 3) { // 감시완료 tab
        name = 'searchWatchList';
        this.watchSearch['hndl_st_vl'] = '98';
        payload = this.watchSearch;
      } else { // 자산 tab
        this.nowCoinDisabled = true;
        name = 'fetchAssetProfitData';
        payload = {fee_tp : '0'};
      }
      payload['contiFlag'] = true;
      
      var resolve = (obj) => {
        obj.getContiKey() == null ? $state.complete() : $state.loaded();
      }

      /* data Serach */
      this.getDispatchData(name, payload, resolve);
    },
    formatRate(number) {
      let res = UnitManager.flooredDecimalWithCommas(number, 2);
      return number > 0 ? "+" + res : res;
    },
    onCellClick(row, column, cell, event) {
      var param = {}
      if (this.tabIndex == 0 || this.tabIndex == 1) { // 미체결 || 체결
        if (column['label'] == '' || column['label'] == undefined) {
          return;
        }
        param = {
          symbol: row.symbol,
          trgt_cur_cd: row.trgt_cur_cd, 
          setl_cur_cd: row.setl_cur_cd  // market
        }
      } else if (this.tabIndex == 2 || this.tabIndex == 3) { // 감시중 || 감시완료
        if (column['label'] == '' || column['label'] == undefined) {
          return;
        }
        param = {
          symbol: row.symbol,
          trgt_cur_cd: row.tradcurrcode, 
          setl_cur_cd: row.paycurrcode  // market
        }
      }

      if(this.nowCoinChk || param.symbol == this.currentSymbol) {
        return
      }

      this.$EventBus.$emit('stockWatchCellClick', param);
    },
    formatAmount(number) {
      let self = this;
      return UnitManager.flooredDecimalWithCommas(number, 0);
    },
    assetSort(trgtCd) {
      var trgtClass = this['sortClass_'+ trgtCd]
      if (trgtClass == 'desc') { // descending -> ascending
        this['sortClass_'+ trgtCd]  = 'asc';
        this.tableDataAsset.sort(function(a, b) {
          return a[trgtCd] - b[trgtCd]
        });
      } else if (trgtClass == 'asc') { // ascending -> default
        this['sortClass_'+ trgtCd]  = '';
        this.tableDataAsset.sort(function(a, b) {
          return a['cur_cd'] < b['cur_cd'] ? -1 : a['cur_cd'] > b['cur_cd'] ? 1 : 0;
        });
      } else { // default -> descending
        this['sortClass_'+ trgtCd] = 'desc';
        this.tableDataAsset.sort(function(a, b) {
          return b[trgtCd] - a[trgtCd]
        });
      }
      var tmpStr = '';
      for (var i in ['buy_pamt', 'evlt_amt', 'evlt_pl']) {
        tmpStr = ['buy_pamt', 'evlt_amt', 'evlt_pl'][i]
        if (tmpStr != trgtCd) {
          this['sortClass_'+ tmpStr] = ''
        }
      }
    },
    sortClass(param) {
      return param
    },
    loadStockDataCallback() {
      var self = this;
      if(self.dataLoaded) return;
      self.dataLoaded = true;
      self.getData();
    },
    resetLoadStockDataCallback(){ // resetLoadStockData 이벤트 콜백 함수
      var self = this;
      self.dataLoaded = false;
    },
    getData() {
      var self = this;
      self.tabClicked({index : self.tabIndex}, null);
      self.getDispatchData('orderNotification', {
        vue_name : self.$options.name,
        callback : function(resData) {
          if (self.tabIndex == 4) return;
          self.onOrderNotification(resData);
        }
      });
      self.registerAssetNotification({
        vue_name : self.$options.name,
        callback : function(resData) {
          if (self.tabIndex != 4) return;
          self.onAssetNotification(resData);
        }
      });
      self.fetchAssetProfitData({ fee_tp: "0" }).then(res => {
        let cds = self.getMyCds;
        self.mySymbols = self.getPairsByCds(cds).map(item => item.o_symbol);
        self.$socket.registerReal("KVM2", "symbol", self.mySymbols, self.$options.name, self.onPriceChange);
      });
    }
  },
  created() {
    // let self = this;
    // self.$EventBus.$on("KVS0", self.onPriceChange);
  },
  mounted() {
    var self = this;
    if (self.$store.getters.isSocketConnected) 
    {
      self.$EventBus.$on('loadStockData', self.loadStockDataCallback);
      self.$EventBus.$on('resetLoadStockData', self.resetLoadStockDataCallback);      

      if(self.nameList.length > 0 && !self.dataLoaded){
        self.$EventBus.$emit('loadStockData');
      }
    }else{
      self.$EventBus.$on('socketConnected', () => 
      {
        self.$EventBus.$on('loadStockData', self.loadStockDataCallback);
        self.$EventBus.$on('resetLoadStockData', self.resetLoadStockDataCallback);      

        if(self.nameList.length > 0 && !self.dataLoaded){
          self.$EventBus.$emit('loadStockData');
        }
      })
    }
  },
  beforeDestroy() {
    var self = this;
    
    self.$socket.unregisterReal('RB03', [self.$store.state.user.user_id], self.$options.name);
    self.unregisterAssetNotification({ vue_name: self.$options.name });
    if (self.mySymbols) {
      self.$socket.unregisterReal("KVM2", self.mySymbols, self.$options.name);
    }
    
    self.$EventBus.$off('loadStockData', self.loadStockDataCallback);
    self.$EventBus.$off('resetLoadStockData', self.resetLoadStockDataCallback);
  },
  destroyed() {
    this.setContiKey(null);
  },
};
</script>
