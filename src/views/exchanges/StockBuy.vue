<template>
    <div class="StockBuy">
        <!-- <el-scrollbar wrap-class="scrollbar-wrapper" :native="false" class="form-scroll"> -->
        <el-form class="form-area">
            <el-row v-if="isPC" class="able-order">
                <el-col :span="12">
                    {{$t('exchange.e003')}}<!-- 주문가능 -->
                    <el-button icon="el-icon-refresh" class="reload" size="small" circle @click="getOrderAble"></el-button>
                </el-col>
                <el-col :span="12">
                    <span class="price">{{ getUserId !== null && orderAble != null ? getOrderAbleAmountUnit(orderAble.buy_able_amt) : '' }}</span>
                    {{ setlCurCd }}
                </el-col>
            </el-row>

            <el-form-item class="select-price">
                <el-select v-model="orderType" popper-class="m_style stock-select">
                    <el-option v-for="item in orderTypeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-popover v-if="isPC" placement="bottom-start" trigger="hover">
                    <div class="info">
                        <h2>&lt;{{buyHelpInfo('title', orderType)}}&gt;</h2>
                        <p>{{buyHelpInfo('content', orderType)}}</p>
                    </div>
                    <el-button slot="reference" icon="el-icon-question" class="question"></el-button>
                </el-popover>
            </el-form-item>

            <el-form-item v-if="orderType === '3' || orderType === '4'">
                <el-col class="inputNumber">
                    <span v-if="isPC" class="order-label">{{$t('exchange.e067')}}<!-- 스탑가격 --></span>
                    <el-input ref="stopPrice" id="stopPrice" v-model="stopPrice" v-bind:disabled="!isPC" @keydown.native="keyDown" @keypress.native="keyPress" @keyup.native="keyUp" @click.native="viewKeyPad('stopPricePad')">
                        <div slot="append" @click="$refs.stopPrice.focus()">
                            <span v-if="!isPC" class="order-label">{{$t('exchange.e067')}}<!-- 스탑가격 --></span>
                            {{ setlCurCd }}
                        </div>
                    </el-input>
                </el-col>

                <div @mouseover="isPcStopPad = true" @mouseleave="isPcStopPad = false">
                    <el-col class="btns">
                        <el-button class="minus-btn" @click="subtractStopPrice">-</el-button>
                    </el-col>
                    <el-col class="btns">
                        <el-button class="plus-btn" @click="addStopPrice">+</el-button>
                    </el-col>

                    <div v-if="isPC && isPcStopPad" class="keypad price">
                        <el-row>
                            <el-col>
                                <el-button @click="stopPrice = addComma(highprc)"><span v-html="$t('m_keypad.a003')"></span></el-button>
                                <el-button @click="stopPrice = addComma(lowprc)"><span v-html="$t('m_keypad.a004')"></span></el-button>
                                <el-button @click="setAveragePrice('stopPrice')"><span v-html="$t('m_keypad.a005')"></span></el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <el-button @click="setStopPricePercent('0.05')"><span class="plus" v-html="$t('m_keypad.a019', ['+5'])"></span></el-button>
                                <el-button @click="setStopPricePercent('0.10')"><span class="plus" v-html="$t('m_keypad.a019', ['+10'])"></span></el-button>
                                <el-button @click="setStopPricePercent('0.15')"><span class="plus" v-html="$t('m_keypad.a019', ['+15'])"></span></el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <el-button @click="setStopPricePercent('-0.05')"><span class="minus" v-html="$t('m_keypad.a019', ['-5'])"></span></el-button>
                                <el-button @click="setStopPricePercent('-0.10')"><span class="minus" v-html="$t('m_keypad.a019', ['-10'])"></span></el-button>
                                <el-button @click="setStopPricePercent('-0.15')"><span class="minus" v-html="$t('m_keypad.a019', ['-15'])"></span></el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-form-item>

            <el-form-item v-if="orderType === '2' || orderType === '3'">
                <el-col class="inputNumber">
                    <span v-if="isPC" class="order-label">{{$t('exchange.e023')}}<!-- 매수가격 --></span>
                    <el-input ref="price" id="buyPrice" :class="buyPriceChange === true ? 'change-price': ''" v-model="price" v-bind:disabled="!isPC" @keydown.native="keyDown" @keypress.native="keyPress" @keyup.native="keyUp" @click.native="viewKeyPad('pricePad')">
                        <div slot="append" @click="$refs.price.focus()">
                            <span v-if="!isPC" class="order-label">{{$t('exchange.e023')}}<!-- 매수가격 --></span>
                            {{ setlCurCd }}
                        </div>
                    </el-input>
                </el-col>

                <div @mouseover="isPcPricePad = true" @mouseleave="isPcPricePad = false">
                    <el-col class="btns">
                        <el-button class="minus-btn" @click="subtractPrice">-</el-button>
                    </el-col>
                    <el-col class="btns">
                        <el-button class="plus-btn" @click="addPrice">+</el-button>
                    </el-col>

                    <div v-if="isPC && isPcPricePad" class="keypad price">
                        <el-row>
                            <el-col>
                                <el-button @click="price = addComma(highprc)"><span v-html="$t('m_keypad.a003')"></span></el-button>
                                <el-button @click="price = addComma(lowprc)"><span v-html="$t('m_keypad.a004')"></span></el-button>
                                <el-button @click="setAveragePrice('price')"><span v-html="$t('m_keypad.a005')"></span></el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <el-button @click="setPricePercent('0.05')"><span class="plus" v-html="$t('m_keypad.a019', ['+5'])"></span></el-button>
                                <el-button @click="setPricePercent('0.10')"><span class="plus" v-html="$t('m_keypad.a019', ['+10'])"></span></el-button>
                                <el-button @click="setPricePercent('0.15')"><span class="plus" v-html="$t('m_keypad.a019', ['+15'])"></span></el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <el-button @click="setPricePercent('-0.05')"><span class="minus" v-html="$t('m_keypad.a019', ['-5'])"></span></el-button>
                                <el-button @click="setPricePercent('-0.10')"><span class="minus" v-html="$t('m_keypad.a019', ['-10'])"></span></el-button>
                                <el-button @click="setPricePercent('-0.15')"><span class="minus" v-html="$t('m_keypad.a019', ['-15'])"></span></el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-form-item>

            <el-form-item v-if="orderType === '2' || orderType === '3'">
                <el-col class="inputNumber" :class="{'full':orderType === '2' || (orderType === '3' && !isPC)}">
                    <span v-if="isPC" class="order-label">{{$t('exchange.e009')}}<!-- 매수수량 --></span>
                    <el-input ref="quantity" id="buyQuantity" v-model="quantity" v-bind:disabled="!isPC" @keydown.native="keyDown" @keypress.native="keyPress" @keyup.native="keyUp" @click.native="viewKeyPad('quantityPad')">
                        <div slot="append" @click="$refs.quantity.focus()">
                            <span v-if="!isPC" class="order-label">{{$t('exchange.e009')}}<!-- 매수수량 --></span>
                            {{ trgtCurCd }}
                        </div>
                    </el-input>
                    <div v-if="orderType === '2' || (orderType === '3' && !isPC)" class="order-quantity-btns">
                        <el-button @click="setOrdQty('0.10')">10%</el-button>
                        <el-button @click="setOrdQty('0.25')">25%</el-button>
                        <el-button @click="setOrdQty('0.50')">50%</el-button>
                        <el-button @click="setOrdQty('1.00')">{{$t('exchange.e010')}}<!-- 최대 --></el-button>
                    </div>
                </el-col>
                <el-col class="btns" v-if="orderType === '3' && isPC">
                    <el-dropdown @command="setOrdQty">
                        <span class="el-dropdown-link">
                            <el-button>%</el-button>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1.00">100%</el-dropdown-item>
                            <el-dropdown-item command="0.50">50%</el-dropdown-item>
                            <el-dropdown-item command="0.25">25%</el-dropdown-item>
                            <el-dropdown-item command="0.10">10%</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <el-col class="btns" v-if="orderType === '3' && isPC">
                    <el-button v-on:click="setOrdQty('1.00')">{{$t('exchange.e010')}}<!-- 최대 --></el-button>
                </el-col>
            </el-form-item>

            <el-form-item v-if="orderType === '5'">
                <el-col class="inputNumber">
                    <span v-if="isPC" class="order-label">{{$t('exchange.e087')}}<!-- 최저가대비상승폭 --></span>
                    <el-input ref="distance" id="distance" v-model="distance" v-bind:disabled="!isPC" @keydown.native="keyDown" @keypress.native="keyPress" @keyup.native="keyUp" @click.native="viewKeyPad('distancePad')">
                        <div slot="append" @click="$refs.distance.focus()">
                            <span v-if="!isPC" class="order-label">{{$t('exchange.e087')}}<!-- 최저가대비상승폭 --></span>
                            {{ setlCurCd }}
                        </div>
                    </el-input>
                </el-col>
                <div @mouseover="isPcTrailingPad = true" @mouseleave="isPcTrailingPad = false">
                    <el-col class="btns">
                        <el-button class="minus-btn" @click="subtractHoga">-</el-button>
                    </el-col>
                    <el-col class="btns">
                        <el-button class="plus-btn" @click="addHoga">+</el-button>
                    </el-col>

                    <div v-if="isPC && isPcTrailingPad" class="keypad trailing">
                        <el-row>
                            <el-col>
                                <el-button @click="setDistancePercent('0.03')"><span v-html="$t('m_keypad.a018', ['3'])"></span></el-button>
                                <el-button @click="setDistancePercent('0.05')"><span v-html="$t('m_keypad.a018', ['5'])"></span></el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <el-button @click="setDistancePercent('0.10')"><span v-html="$t('m_keypad.a018', ['10'])"></span></el-button>
                                <el-button @click="setDistancePercent('0.15')"><span v-html="$t('m_keypad.a018', ['15'])"></span></el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-form-item>
            
            <el-form-item v-if="orderType === '1' || orderType === '4' || orderType === '5'">
                <el-col class="inputNumber" :class="{'full': orderType === '1' || orderType === '4' || orderType === '5'}">
                    <span v-if="isPC" class="order-label">{{$t('exchange.e012')}}<!-- 주문금액 --></span>
                    <el-input ref="amount" id="amount" v-model="amount" v-bind:disabled="!isPC" @keydown.native="keyDown" @keypress.native="keyPress" @keyup.native="keyUp" @click.native="viewKeyPad('amountPad')">
                        <div slot="append" @click="$refs.amount.focus()">
                            <span v-if="!isPC" class="order-label">{{$t('exchange.e012')}}<!-- 주문금액 --></span>
                            {{ setlCurCd }}
                        </div>
                    </el-input>
                    
                    <div class="order-quantity-btns">
                        <el-button @click="setAmount('0.10')">10%</el-button>
                        <el-button @click="setAmount('0.25')">25%</el-button>
                        <el-button @click="setAmount('0.50')">50%</el-button>
                        <el-button @click="setAmount('1.00')">{{$t('exchange.e010')}}<!-- 최대 --></el-button>
                    </div>
                </el-col>
                <!-- <el-col class="btns">
                    <el-dropdown @command="setAmount">
                        <span class="el-dropdown-link">
                            <el-button>%</el-button>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1.00">100%</el-dropdown-item>
                            <el-dropdown-item command="0.50">50%</el-dropdown-item>
                            <el-dropdown-item command="0.25">25%</el-dropdown-item>
                            <el-dropdown-item command="0.10">10%</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <el-col class="btns">
                    <el-button v-on:click="setAmount('1.00')">최대</el-button>
                </el-col> -->
            </el-form-item>

            <el-row class="order-price" v-if="orderType === '2' || orderType === '3'">
                <el-col :span="7">{{$t('exchange.e012')}}<!-- 주문금액 --></el-col>
                <el-col :span="17">
                    <span class="price" v-bind:class="getOnlyNumber(totalAmount).length > 12 ? 'small' : ''">{{ totalAmount }}</span>
                    {{ setlCurCd }}
                </el-col>
            </el-row>
            <el-row v-if="isPC" class="min-order-price">
                <el-col :span="16">{{$t('exchange.e013')}}<!-- 최소주문수량 --> {{ $_.findWhere(coinList, {o_symbol : currentSymbol}) | minOrdQtyFilter }} {{ trgtCurCd }}</el-col>
                <el-col :span="8">{{$t('exchange.e014')}}<!-- 수수료 --> {{ getUserId !== null && feeRatio != null ? addComma(feeRatio.fee_rt) : '' }}%</el-col>
            </el-row>
        </el-form>
        <!-- </el-scrollbar> -->

        <!-- 자동감시주문 이용동의 창 -->
        <div class="order-bottom">
            <el-dialog :append-to-body="!isPC ?  true : false " :visible.sync="autoOrderDialogVisible" :class="!isPC ? 'm_body_pop StockBuy auto-order' : ''" :close-on-click-modal="false" :before-close="autoOrderDialogClose" width="480px" center>
                <div class="autowatch-order">
                    <div class="label">{{$t('exchange.g001')}}</div><!-- 1. 자동감시주문 정의 -->
                    <el-scrollbar>
                        <div class="cont">
                            {{$t('exchange.g002')}}<!-- 자동감시주문 정의 내용 -->
                        </div>
                    </el-scrollbar>
                    <div class="label">{{$t('exchange.g003')}}</div><!-- 2. 자동감시주문 유의사항 -->
                    <el-scrollbar>
                        <div class="cont">
                            {{$t('exchange.g004')}}<!-- 자동감시주문 유의사항 내용 -->
                        </div>
                    </el-scrollbar>
                    <el-checkbox v-model="autoOrderTerms">{{$t('exchange.g005')}}<!-- 위의 내용을 모두 읽고 이용 동의합니다. --></el-checkbox>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="setAutoOrderTerms" :disabled="autoOrderTerms ? false : true" class="autoOrderBtn">{{$t('exchange.g006')}}<!-- 동의 --></el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 자동감시주문 이용동의 창 -->

        <div class="order-bottom">
            <el-row class="order-btns">
                <el-col class="init">
                    <el-button v-on:click="reset">{{$t('exchange.e015')}}<!-- 초기화 --></el-button>
                </el-col>
                <el-col class="order">
                    <el-button v-on:click="formPreCheck(true)">{{$t('exchange.e001-1', [trgtCurCd])}}<!-- 매수 --></el-button>
                    <el-dialog :title="$t('exchange.e018')/* 매수주문확인 */" :append-to-body="!isPC ?  true : false " :visible.sync="orderDialogVisible" :class="!isPC ? 'm_body_pop StockBuy' : ''" :close-on-click-modal="false" width="360px" center>
                        <el-row class="order-dialog-contents-wrapper">
                            <el-row class="order-dialog-contents">
                                <el-col :span="10" class="order-dialog-contents-title">{{$t('exchange.e042')}}<!-- 종목 --></el-col>
                                <el-col :span="14">{{ nameFilter($_.findWhere(coinList, {o_symbol : currentSymbol})) }}<span class="unit"> ({{ $_.findWhere(coinList, {o_symbol : currentSymbol}) | symbolUnitFilter }})</span></el-col>
                            </el-row>
                            <el-row class="order-dialog-contents">
                                <el-col :span="10" class="order-dialog-contents-title">{{$t('exchange.e043')}}<!-- 매매구분 --></el-col>
                                <el-col :span="14"><span class="order-dialog-type">{{$t('exchange.e001')}}<!-- 매수 --></span> <span class="unit">({{ orderTypeOption.find(x => x.value == orderType).label }})</span></el-col>
                            </el-row>
                            <el-row v-if="orderType === '3' || orderType === '4'" class="order-dialog-contents">
                                <el-col :span="10" class="order-dialog-contents-title">{{$t('exchange.e067')}}<!-- 스탑가격 --></el-col>
                                <el-col :span="14">{{ stopPrice }} <span class="unit">{{ setlCurCd }}</span></el-col>
                            </el-row>
                            <el-row v-if="orderType === '2' || orderType === '3'" class="order-dialog-contents">
                                <el-col :span="10" class="order-dialog-contents-title">{{$t('exchange.e022')}}<!-- 매수수량 --></el-col>
                                <el-col :span="14">{{ quantity }} <span class="unit">{{ trgtCurCd }}</span></el-col>
                            </el-row>
                            <el-row v-if="orderType === '2' || orderType === '3'" class="order-dialog-contents">
                                <el-col :span="10" class="order-dialog-contents-title">{{$t('exchange.e011')}}<!-- 매수가격 --></el-col>
                                <el-col :span="14">{{ price }} <span class="unit">{{ setlCurCd }}</span></el-col>
                            </el-row>
                            <el-row v-if="orderType === '5'" class="order-dialog-contents">
                                <el-col :span="10" class="order-dialog-contents-title">{{$t('exchange.e087')}}<!-- 최저가대비상승폭 --></el-col>
                                <el-col :span="14">{{ distance }} <span class="unit">{{ setlCurCd }}</span></el-col>
                            </el-row>
                            <el-row v-if="orderType === '1' || orderType === '4' || orderType === '5'" class="order-dialog-contents">
                                <el-col :span="10" class="order-dialog-contents-title">{{$t('exchange.e012')}}<!-- 주문금액 --></el-col>
                                <el-col :span="14">{{ amount }} <span class="unit">{{ setlCurCd }}</span></el-col>
                            </el-row>
                            <el-row v-if="orderType === '2'" class="order-dialog-contents">
                                <el-col :span="10" class="order-dialog-contents-title">{{$t('exchange.e012')}}<!-- 주문금액 --></el-col>
                                <el-col :span="14">{{ totalAmount }} <span class="unit">{{ setlCurCd }}</span></el-col>
                            </el-row>
                        </el-row>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="info" @click="orderDialogVisible = false">{{$t('exchange.e026')}}<!-- 취소 --></el-button>
                            <el-button type="primary" @click="formPreCheck(false)">{{$t('exchange.e025')}}<!-- 매수확인 --></el-button>
                        </div>
                    </el-dialog>
                </el-col>
            </el-row>

            <el-row v-if="!isPC" class="able-order">
                <el-col :span="12">
                    <el-button class="reload" @click="getOrderAble">{{$t('m_exchange.c012')}}<!-- 주문가능 --></el-button>
                </el-col>
                <el-col :span="12">
                    <span class="price">{{ getUserId !== null && orderAble != null ? getOrderAbleAmountUnit(orderAble.buy_able_amt) : '' }}</span>
                    {{ setlCurCd }}
                </el-col>
            </el-row>

            <el-row v-if="!isPC" class="min-order-price">
                <el-col :span="16"><span class="order-tit">{{$t('exchange.e013')}}<!-- 최소주문수량 --></span> <span class="order-data">{{ $_.findWhere(coinList, {o_symbol : currentSymbol}) | minOrdQtyFilter }} {{ trgtCurCd }}</span></el-col>
                <el-col :span="8"><span class="order-tit">{{$t('exchange.e014')}}<!-- 수수료 --></span> <span class="order-data">{{ getUserId !== null && feeRatio != null ? addComma(feeRatio.fee_rt) : '' }}%</span></el-col>
            </el-row>
            
            <!-- 모바일 키패드 -->
            <!-- keypad : 스탑가격 -->
            <el-dialog :visible.sync="stopPricePad" :append-to-body="!isPC ?  true : false " class="keypad price" :class="!isPC ? 'mobile' : ''" :close-on-click-modal="false" :show-close="false">
                <el-row class="amount-order">
                    <el-col class="input">
                        <div class="label">{{$t('m_keypad.a015')}}<!-- 스탑가격 --></div>
                        <div class="value_bx">
                            <div class="value_account">
                                <div class="value" v-bind:class="getOnlyNumber(stopPrice).length > 9 ? 'f_size_small' : ''">
                                    {{ stopPrice }}
                                    <span class="unit">{{ setlCurCd }}</span>
                                </div>
                                <div class="sum" v-if="setlCurCd !== 'KRW'">= {{ changedStopPrice }} KRW</div>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="btns">
                        <el-button @click="subtractStopPrice">-</el-button>
                    </el-col>
                    <el-col class="btns">
                        <el-button @click="addStopPrice">+</el-button>
                    </el-col>
                </el-row>
                <el-row class="number-input">
                    <el-col class="number-part">
                        <el-row class="amount-btns">
                            <el-col :span="12">
                                <el-button @click="stopPrice = ''">{{$t('m_keypad.a002')}}<!-- 초기화 --></el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-button @click="setStopPriceKeypad('delete')">←</el-button>
                            </el-col>
                        </el-row>
                        <el-row class="amount-btns">
                            <el-col :span="8">
                                <el-button @click="stopPrice = addComma(highprc)">{{$t('m_keypad.a003')}}<!-- 고가 --></el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button @click="stopPrice = addComma(lowprc)">{{$t('m_keypad.a004')}}<!-- 저가 --></el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button @click="setAveragePrice('stopPrice')">{{$t('m_keypad.a005')}}<!-- 매수평균가 --></el-button>
                            </el-col>
                        </el-row>
                        <el-row class="number-pad pad2">
                            <el-col>
                                <el-button @click="setStopPriceKeypad('7')">7</el-button>
                                <el-button @click="setStopPriceKeypad('8')">8</el-button>
                                <el-button @click="setStopPriceKeypad('9')">9</el-button>
                                <el-button @click="setStopPriceKeypad('4')">4</el-button>
                                <el-button @click="setStopPriceKeypad('5')">5</el-button>
                                <el-button @click="setStopPriceKeypad('6')">6</el-button>
                                <el-button @click="setStopPriceKeypad('1')">1</el-button>
                                <el-button @click="setStopPriceKeypad('2')">2</el-button>
                                <el-button @click="setStopPriceKeypad('3')">3</el-button>
                                <el-button @click="setStopPriceKeypad('.')">.</el-button>
                                <el-button @click="setStopPriceKeypad('0')">0</el-button>
                                <el-button @click="setStopPriceKeypad('000')">000</el-button>
                            </el-col>
                        </el-row>
                        <div class="keypad-footer">
                            <el-button @click="setStopPriceKeypad('close')">{{$t('m_keypad.a008')}}<!-- 취소 --></el-button>
                            <el-button @click="stopPricePad = false">{{$t('m_keypad.a007')}}<!-- 확인 --></el-button>
                        </div>
                    </el-col>
                    <el-col class="number-select">
                        <el-button @click="setStopPricePercent('0.15')" class="plus">+15%</el-button>
                        <el-button @click="setStopPricePercent('0.10')" class="plus">+10%</el-button>
                        <el-button @click="setStopPricePercent('0.05')" class="plus">+5%</el-button>
                        <el-button @click="setStopPricePercent('0')">{{$t('m_keypad.a006')}}<!-- 현재가 --></el-button>
                        <el-button @click="setStopPricePercent('-0.05')" class="minus">-5%</el-button>
                        <el-button @click="setStopPricePercent('-0.10')" class="minus">-10%</el-button>
                        <el-button @click="setStopPricePercent('-0.15')" class="minus">-15%</el-button>
                    </el-col>
                </el-row>
            </el-dialog>

            <!-- keypad : 매수수량 -->
            <el-dialog :visible.sync="quantityPad" :append-to-body="!isPC ?  true : false " class="keypad amount" :class="!isPC ? 'mobile' : ''" :close-on-click-modal="false" :show-close="false">
                <el-row class="amount-price">
                    <el-col class="price">
                        <div class="label">{{$t('m_keypad.a009')}}<!-- 가격 --></div>
                        <div class="value_bx">
                            <div class="value_account">
                                <div class="value">
                                    {{ price }}
                                    <span class="unit">{{ setlCurCd }}</span>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="order_price">
                        <div class="label">{{$t('m_keypad.a010')}}<!-- 금액 --></div>
                        <div class="value_bx">
                            <div class="value_account">
                                <div class="value">
                                    {{ totalAmount }}
                                    <span class="unit">{{ setlCurCd }}</span>
                                </div>
                                <div class="sum" v-if="setlCurCd !== 'KRW'">= {{ changedTotalAmount }} KRW</div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="amount-order">
                    <div class="label">{{$t('m_keypad.a011')}}<!-- 주문수량 --></div>
                    <div class="value_bx">
                        <div class="value_account">
                            <div class="value" v-bind:class="getOnlyNumber(quantity).length > 10 ? 'f_size_small' : ''">
                                {{ quantity }}
                                <span class="unit">{{ trgtCurCd }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <el-row class="amount-btns">
                    <el-col :span="12">
                        <el-button @click="quantity = ''">{{$t('m_keypad.a002')}}<!-- 초기화 --></el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button @click="setQuantityKeypad('delete')">←</el-button>
                    </el-col>
                </el-row>
                <el-row class="number-pad">
                    <el-col>
                        <el-button @click="setQuantityKeypad('7')">7</el-button>
                        <el-button @click="setQuantityKeypad('8')">8</el-button>
                        <el-button @click="setQuantityKeypad('9')">9</el-button>
                        <el-button @click="setQuantityKeypad('4')">4</el-button>
                        <el-button @click="setQuantityKeypad('5')">5</el-button>
                        <el-button @click="setQuantityKeypad('6')">6</el-button>
                        <el-button @click="setQuantityKeypad('1')">1</el-button>
                        <el-button @click="setQuantityKeypad('2')">2</el-button>
                        <el-button @click="setQuantityKeypad('3')">3</el-button>
                        <el-button @click="setQuantityKeypad('.')">.</el-button>
                        <el-button @click="setQuantityKeypad('0')">0</el-button>
                        <el-button @click="setQuantityKeypad('000')">000</el-button>
                    </el-col>
                    <el-col>
                        <el-button @click="setOrdQty('1.00')"><span v-html="$t('m_keypad.a012')"></span><!-- 최대 --></el-button>
                        <el-button @click="setOrdQty('0.50')">50%</el-button>
                        <el-button @click="setOrdQty('0.25')">25%</el-button>
                        <el-button @click="setOrdQty('0.10')">10%</el-button>
                    </el-col>
                </el-row>
                <div slot="footer" class="keypad-footer">
                    <el-button @click="setQuantityKeypad('close')">{{$t('m_keypad.a008')}}<!-- 취소 --></el-button>
                    <el-button @click="quantityPad = false">{{$t('m_keypad.a007')}}<!-- 확인 --></el-button>
                </div>
            </el-dialog>

            <!-- keypad : 매수가격 -->
            <el-dialog :visible.sync="pricePad" :append-to-body="!isPC ?  true : false " class="keypad price" :class="!isPC ? 'mobile' : ''" :close-on-click-modal="false" :show-close="false">
                <el-row class="amount-order">
                    <el-col class="input">
                        <div class="label">{{$t('m_keypad.a001')}}<!-- 주문가격 --></div>
                        <div class="value_bx">
                            <div class="value_account">
                                <div class="value" v-bind:class="getOnlyNumber(price).length > 10 ? 'f_size_small' : ''">
                                    {{ price }}
                                    <span class="unit">{{ setlCurCd }}</span>
                                </div>
                                <div class="sum" v-if="setlCurCd !== 'KRW'">= {{ changedPrice }} KRW</div>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="btns">
                        <el-button @click="subtractPrice">-</el-button>
                    </el-col>
                    <el-col class="btns">
                        <el-button @click="addPrice">+</el-button>
                    </el-col>
                </el-row>
                <el-row class="number-input">
                    <el-col class="number-part">
                        <el-row class="amount-btns">
                            <el-col :span="12">
                                <el-button @click="price = ''">{{$t('m_keypad.a002')}}<!-- 초기화 --></el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-button @click="setPriceKeypad('delete')">←</el-button>
                            </el-col>
                        </el-row>
                        <el-row class="amount-btns">
                            <el-col :span="8">
                                <el-button @click="price = addComma(highprc)">{{$t('m_keypad.a003')}}<!-- 고가 --></el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button @click="price = addComma(lowprc)">{{$t('m_keypad.a004')}}<!-- 저가 --></el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button @click="setAveragePrice('price')">{{$t('m_keypad.a005')}}<!-- 매수평균가 --></el-button>
                            </el-col>
                        </el-row>
                        <el-row class="number-pad pad2">
                            <el-col>
                                <el-button @click="setPriceKeypad('7')">7</el-button>
                                <el-button @click="setPriceKeypad('8')">8</el-button>
                                <el-button @click="setPriceKeypad('9')">9</el-button>
                                <el-button @click="setPriceKeypad('4')">4</el-button>
                                <el-button @click="setPriceKeypad('5')">5</el-button>
                                <el-button @click="setPriceKeypad('6')">6</el-button>
                                <el-button @click="setPriceKeypad('1')">1</el-button>
                                <el-button @click="setPriceKeypad('2')">2</el-button>
                                <el-button @click="setPriceKeypad('3')">3</el-button>
                                <el-button @click="setPriceKeypad('.')">.</el-button>
                                <el-button @click="setPriceKeypad('0')">0</el-button>
                                <el-button @click="setPriceKeypad('000')">000</el-button>
                            </el-col>
                        </el-row>
                        <div class="keypad-footer">
                            <el-button @click="setPriceKeypad('close')">{{$t('m_keypad.a008')}}<!-- 취소 --></el-button>
                            <el-button @click="pricePad = false">{{$t('m_keypad.a007')}}<!-- 확인 --></el-button>
                        </div>
                    </el-col>
                    <el-col class="number-select">
                        <el-button @click="setPricePercent('0.15')" class="plus">+15%</el-button>
                        <el-button @click="setPricePercent('0.10')" class="plus">+10%</el-button>
                        <el-button @click="setPricePercent('0.05')" class="plus">+5%</el-button>
                        <el-button @click="setPricePercent('0')">{{$t('m_keypad.a006')}}<!-- 현재가 --></el-button>
                        <el-button @click="setPricePercent('-0.05')" class="minus">-5%</el-button>
                        <el-button @click="setPricePercent('-0.10')" class="minus">-10%</el-button>
                        <el-button @click="setPricePercent('-0.15')" class="minus">-15%</el-button>
                    </el-col>
                </el-row>
            </el-dialog>

            <!-- keypad : 최저가대비상승폭 -->
            <el-dialog :visible.sync="distancePad" :append-to-body="!isPC ?  true : false " class="keypad amount" :class="!isPC ? 'mobile' : ''" :close-on-click-modal="false" :show-close="false">
                <el-row class="amount-order">
                    <el-col class="small">
                        <div class="label">{{$t('m_keypad.a016')}}<!-- 최저가대비상승폭 --></div>
                        <div class="value_bx">
                            <div class="value_account">
                                <div class="value" v-bind:class="getOnlyNumber(distance).length > 10 ? 'f_size_small' : ''">
                                    {{ distance }}
                                    <span class="unit">{{ setlCurCd }}</span>
                                </div>
                                <div class="sum" v-if="setlCurCd !== 'KRW'">= {{ changedDistance }} KRW</div>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="btns">
                        <el-button @click="subtractHoga">-</el-button>
                    </el-col>
                    <el-col class="btns">
                        <el-button @click="addHoga">+</el-button>
                    </el-col>
                </el-row>
                <el-row class="amount-btns">
                    <el-col :span="12">
                        <el-button @click="distance = ''">{{$t('m_keypad.a002')}}<!-- 초기화 --></el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button @click="setDistanceKeypad('delete')">←</el-button>
                    </el-col>
                </el-row>
                <el-row class="number-pad">
                    <el-col>
                        <el-button @click="setDistanceKeypad('7')">7</el-button>
                        <el-button @click="setDistanceKeypad('8')">8</el-button>
                        <el-button @click="setDistanceKeypad('9')">9</el-button>
                        <el-button @click="setDistanceKeypad('4')">4</el-button>
                        <el-button @click="setDistanceKeypad('5')">5</el-button>
                        <el-button @click="setDistanceKeypad('6')">6</el-button>
                        <el-button @click="setDistanceKeypad('1')">1</el-button>
                        <el-button @click="setDistanceKeypad('2')">2</el-button>
                        <el-button @click="setDistanceKeypad('3')">3</el-button>
                        <el-button @click="setDistanceKeypad('.')">.</el-button>
                        <el-button @click="setDistanceKeypad('0')">0</el-button>
                        <el-button @click="setDistanceKeypad('000')">000</el-button>
                    </el-col>
                    <el-col>
                        <el-button @click="setDistancePercent('0.15')"><span v-html="$t('m_keypad.a018', ['15'])"></span><!-- 현재가의<br>15% --></el-button>
                        <el-button @click="setDistancePercent('0.10')"><span v-html="$t('m_keypad.a018', ['10'])"></span><!-- 현재가의<br>10% --></el-button>
                        <el-button @click="setDistancePercent('0.05')"><span v-html="$t('m_keypad.a018', ['5'])"></span><!-- 현재가의<br>5% --></el-button>
                        <el-button @click="setDistancePercent('0.03')"><span v-html="$t('m_keypad.a018', ['3'])"></span><!-- 현재가의<br>3% --></el-button>
                    </el-col>
                </el-row>
                <div slot="footer" class="keypad-footer">
                    <el-button @click="setDistanceKeypad('close')">{{$t('m_keypad.a008')}}<!-- 취소 --></el-button>
                    <el-button @click="distancePad = false">{{$t('m_keypad.a007')}}<!-- 확인 --></el-button>
                </div>
            </el-dialog>

            <!-- keypad : 주문금액 -->
            <el-dialog :visible.sync="amountPad" :append-to-body="!isPC ?  true : false " class="keypad amount" :class="!isPC ? 'mobile' : ''" :close-on-click-modal="false" :show-close="false">
                <div class="amount-order">
                    <el-col class="input">
                        <div class="label">{{$t('m_keypad.a013')}}<!-- 주문금액 --></div>
                        <div class="value_bx">
                            <div class="value_account">
                                <div class="value" v-bind:class="getOnlyNumber(amount).length > 10 ? 'f_size_small02' : ''">
                                    {{ amount }}
                                    <span class="unit">{{ setlCurCd }}</span>
                                </div>
                                <div class="sum" v-if="setlCurCd !== 'KRW'">= {{ changedAmount }} KRW</div>
                            </div>
                        </div>
                    </el-col>
                </div>
                <el-row class="amount-btns">
                    <el-col :span="12">
                        <el-button @click="amount = ''">{{$t('m_keypad.a002')}}<!-- 초기화 --></el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button @click="setAmountKeypad('delete')">←</el-button>
                    </el-col>
                </el-row>
                <el-row class="number-pad">
                    <el-col>
                        <el-button @click="setAmountKeypad('7')">7</el-button>
                        <el-button @click="setAmountKeypad('8')">8</el-button>
                        <el-button @click="setAmountKeypad('9')">9</el-button>
                        <el-button @click="setAmountKeypad('4')">4</el-button>
                        <el-button @click="setAmountKeypad('5')">5</el-button>
                        <el-button @click="setAmountKeypad('6')">6</el-button>
                        <el-button @click="setAmountKeypad('1')">1</el-button>
                        <el-button @click="setAmountKeypad('2')">2</el-button>
                        <el-button @click="setAmountKeypad('3')">3</el-button>
                        <el-button @click="setAmountKeypad('.')">.</el-button>
                        <el-button @click="setAmountKeypad('0')">0</el-button>
                        <el-button @click="setAmountKeypad('000')">000</el-button>
                    </el-col>
                    <el-col>
                        <el-button @click="setAmount('1.00')" v-html="$t('m_keypad.a014')"><!-- 가능금액<br>최대 --></el-button>
                        <el-button @click="setAmount('0.50')">50%</el-button>
                        <el-button @click="setAmount('0.25')">25%</el-button>
                        <el-button @click="setAmount('0.10')">10%</el-button>
                    </el-col>
                </el-row>
                <div slot="footer" class="keypad-footer">
                    <el-button @click="setAmountKeypad('close')">{{$t('m_keypad.a008')}}<!-- 취소 --></el-button>
                    <el-button @click="amountPad = false">{{$t('m_keypad.a007')}}<!-- 확인 --></el-button>
                </div>
            </el-dialog>
            <!-- 모바일 키패드 -->
        </div>

        <div v-if="orderType != 2" class="order-guide">
            <span>{{ guideStrings[orderType] }}</span>
        </div>
    </div>
</template>
<script>
import MobileDetect from 'mobile-detect';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import {_} from 'vue-underscore';

export default {
    data() {
        return {
            orderDialogVisible: false,
            orderTypeOld: null,
            autoOrderDialogVisible: false,
            autoOrderTerms: false,
            orderType: '2',     // 주문 유형
            orderAbleType: '2', // 주문가격구분(주문가능 수량 조회 시 사용)
            ableQuantity: '',   // 매수가능수량
            ableAmount: '',     // 매수가능금액
            quantity: '',       // 매수수량
            price: '',          // 매수가격
            amount: '',         // 주문금액
            stopPrice: '',      // 스탑가격
            distance: '',       // 최저가대비상승폭
            totalAmount: '0',   // 총 주문금액
            curprc: '',         // 현재가
            highprc: '',        // 고가
            lowprc: '',         // 저가
            realDataKVS0: null, // kvs0 실시간 데이터
            setlCurCd: '',      // 결제통화코드
            trgtCurCd: '',      // 대상통화코드
            orderData: {
                user_id: '',                        // O 계정ID
                symbol : '',                        // O 종목코드
                // tr101
                buy_sell_tp: '2',                   // O 매수매도구분 1.매도, 2.매수
                ord_prc_tp: '',                     // O 주문호가유형 1.시장가, 2.지정가, 3.최유리, 4.최우선, 5.조건부지정가
                ord_cond: '0',                      // O 주문조건 0.FAS, 3.FAK, 4.FOK
                auto_trd_ord_tp: '0',               // O 자동매매주문구분 0.일반, 1.자동매매 * 자동매매시 자동매매수수료율 적용
                ord_qty: '',                        // 주문수량 IF 매수 THEN 2.지정가, 5.조건부지정가는 반드시 지정 // IF 매도 THEN 반드시 지정
                ord_prc: '',                        // 주문가격 지정가, 조건부지정가시 지정
                ord_amt: '',                        // 주문금액 IF 매수 THEN 1.시장가 반드시 지정
                ord_expr_dtm: '',                   // 주문만료일시 YYYYMMDDHHMM 고객 지정가능(30일 이내) 미지정시는 일반주문 30일후 자동설정 <NOT_DEF> 만료일시지정 OR 만료일수 지정  (1일이상 30일 이내)
                sys_trd_tp: '0',                    // O 시스템트레이딩구분 0.일반, 1.시그널메이커자동
                // s0020
                est_dt: '',	                        // 설정일자
                sq: '0000000000',                 	// 조건일련번호
                end_dt: '',	                        // 종료일자 당일기준 30일이후의 날짜
                at_mnl_ccd: '1',	                // 자동여부 0:수동 1:자동
                mbr_ccd: '01',	                    // 사용자구분   00:직원 01:고객
                ip: 'ip',                           // IP ADDRESS
                tmnl_mac_addr: '',	                // 단말MAC주소
                md_cd: 'WEB/MTS',	                // 매체구분                                                                            WEB/MTS / WEB/MTS / WEB/MTS
                up_qttn_cndt_est_f: '',             // O 이상 시세감시설정여부        0:미설정  1:설정                                       1 / 1 / 0
                up_qttn_cndt_est_prc_clsf: '',   	// O 이상 시세감시설정가격구분    1:현재가 2:매도1호가 3:매수1호가                        1 / 1 /
                up_qttn_cndt_est_vl: '',	        // O 이상 시세감시설정값                                                                스탑가격 / 스탑가격 / 0으로 채움
                dn_qttn_cndt_est_f: '0',	        // 이하 시세감시설정여부        0:미설정  1:설정                                         0 / 0 / 0                                   
                dn_qttn_cndt_est_prc_clsf: '',	    // 이하 시세감시설정가격구분    1:현재가 2:매도1호가 3:매수1호가                          
                dn_qttn_cndt_est_vl: '0',	        // 이하 시세감시설정값                                                                  0으로 채움 / 0으로 채움 / 0으로 채움    
                bdy_cndt_est_f: '0',	            // 전일감시설정여부             0:미설정  1:설정
                bdy_prc_clsf: '',	                // 전일가격구분                 1:전일종가  2:전일시가 3:전일고가  4:전일저가  5:당일시가
                bdy_cndt_est_vl: '0',	            // 전일감시설정값                                                                       0으로 채움 / 0으로 채움 / 0으로 채움
                bdy_cndt_unt_cd: '',	            // 전일감시조건설정단위         1:가격  2: 율(%)
                bdy_cndt_up_dwn_ccd: '',	        // 전일감시상승하락구분         1:상승  2:하락
                t_s_qttn_cndt_est_f: '',	        // O TS시세감시설정여부           0:미설정  1:설정                                         0 / 0 / 1
                t_s_qttn_cndt_est_vl: '',	        // O TS시세감시설정값                                                                     0으로 채움 / 0으로 채움 / 주문시점의 현재가
                t_s_hgh_mrk_cmpr_est_vl: '',	    // O TS고점대비설정값                                                                     0으로 채움 / 0으로 채움 / 최저가대비상승폭
                t_s_hgh_mrk_cmpr_est_unt: '',	    // O TS고점대비설정단위            1:가격  2:율  3:Tick                                     /  / 1
                trd_ccd: '2',	                    // 매매구분                     1:매도  2:매수
                ordr_cnd_dcd: '0',	                // 주문조건구분코드              0:FAS 3:FAK 4:FOK
                ordr_typ_cd: '',	                // O 주문유형                     1:시장가 2:지정가 3:최유리 4:최우선 5:조건부지정가          1 / 2 / 1
                ordr_prc_est_clsf: '',	            // O 주문가격설정구분              1:TICK  2:지정가                                         1 / 2 / 1
                ordr_prc_est_vl: '',	            // O 주문가격설정값                                                                      0으로 채움 / 매수가격 / 0으로 채움
                ordr_q_est_clsf: '',	            // O 주문수량설정구분            1:잔고대비율  2:주  3:금액(신규주문조건설정시)             3 / 2 / 3
                ordr_q_est_vl: '',	                // O 주문수량설정값                                                                      주문금액 / 매수수량 / 주문금액
                askprc_prtn_ordr_f: '0',	        // 호가분할주문여부              0:미설정 1:설정
                prtn_ordr_tno: '0',	                // 호가분할주문횟수
                at_crct_est_f: '0',	                // 미체결 자동정정설정여부       0:미설정 1:설정
                at_crct_cmpr_est_vl: '0',	        // 미체결 자동정정대비설정틱
                at_crct_est_vl: '0',	            // 미체결 자동정정설정틱
                at_crct_tno: '0',	                // 미체결 자동정정횟수
                proc_sec: '1'	                    // 처리구분                     1:신규  2:변경
            },
            isPC: true,
            prevValue: '',              // 키패드 입력 전 값
            changedStopPrice: '0',      // 키패드 스탑가격 환산값
            changedTotalAmount: '0',    // 키패드 총 주문금액 환산값
            changedPrice: '0',          // 키패드 매수가격 환산값
            changedDistance: '0',       // 키패드 최저가대비상승폭 환산값
            changedAmount: '0',         // 키패드 주문금액 환산값
            stopPricePad: false,        // 스탑가격 키패드 팝업 여부
            quantityPad: false,         // 매수수량 키패드 팝업 여부
            pricePad: false,            // 매수가격 키패드 팝업 여부
            amountPad: false,           // 주문금액 키패드 팝업 여부
            distancePad: false,         // 최저가대비상승폭 키패드 팝업 여부
            buyPriceChange: false,      // 매수가격 변경 여부
            krwchg: '',                 // 환산값 계산을 위한 결제통화코드 현재가
            currentBtcKrPrice: 0,       // BTC마켓인 경우 BTC 한화 현재가
            currentEthKrPrice: 0,       // ETH마켓인 경우 ETH 한화 현재가
            name: 'StockBuy',
            dataLoaded: false,          // 데이터 로드 상태
            isPcTrailingPad: false,     // 트레일링 키패드 (PC)
            isPcPricePad: false,        // 매수가격 키패드 (PC)
            isPcStopPad: false,         // 스탑가격 키패드 (PC)
        };
    },
    filters: {
        minOrdQtyFilter(obj) {   // 최소주문수량 가져오기
            if(obj != null) {
                return  obj['o_min_ord_qty'];
            } else {
                return  '';
            }
        },
        symbolUnitFilter(obj) {  // 종목영문약어 가져오기(BTC/KRW)
            if(obj != null) {
                return obj['o_inst_eng_abbr'];
            } else {
                return  '';
            }
        }
    },
    computed: {
		...mapState({
            coinList : state => state.data['n1001'],
            currentSymbol : state => state.data.currentSymbol,
            beforeSymbol: state => state.data.beforeSymbol,
            trSymbols: state => state.data.trSymbols
        }),
        ...mapGetters(['hogaUnit', 'priceLimit', 'orderAble', 'getUserId', 'feeRatio', 'assetProfitList', 'getAutoOrdTerms', 'getLangKind']),
        orderSuccessStrings() {
            return [
                '',
                this.$t('exchange.e058'),   // 매수(시장가) 주문이 요청되었습니다.
                this.$t('exchange.e036'),   // 매수(지정가) 주문이 요청되었습니다.
                this.$t('exchange.e076'),   // 매수(스탑 지정가) 주문이 요청되었습니다.<br>현재가격이 스탑가격에 도달하면 주문이 실행됩니다.
                this.$t('exchange.e083'),   // 매수(스탑 시장가) 주문이 요청되었습니다.<br>현재가격이 스탑가격에 도달하면 주문이 실행됩니다.
                this.$t('exchange.e093')    // 매수(트레일링 스탑) 주문이 요청되었습니다.<br>최저가에서 (최저가대비상승폭)만큼 상승하면 주문이 실행됩니다.
            ]
        },
        guideStrings() {
            return [
                '',
                this.$t('exchange.e104'),   // 주문금액만큼 시장가격으로 빠르게 매수합니다.
                '',
                this.$t('exchange.e108'),   // 현재가격이 스탑가격에 도달하면 주문이 실행됩니다.
                this.$t('exchange.e108'),   // 현재가격이 스탑가격에 도달하면 주문이 실행됩니다.
                this.$t('exchange.e111'),   // 최저가에서 (최저가대비상승폭)만큼 상승하면 주문이 실행됩니다.
            ]
        },
        orderTypeOption() {
            return [
                {
                    value: '2',
                    label: this.$t('exchange.e004')   // 지정가
                },
                {
                    value: '1',
                    label: this.$t('exchange.e005')   // '시장가'
                },
                {
                    value: '3',
                    label: this.$t('exchange.e006')   // '스탑 지정가'
                },
                {
                    value: '4',
                    label: this.$t('exchange.e007')   // '스탑 시장가'
                },
                {
                    value: '5',
                    label: this.$t('exchange.e008')   // '트레일링 스탑'
                }
            ]
        },
        confirmMessage() {
            return this.$t('exchange.g008');    // 확인
        }
    },
    methods: {
        kvAlert(msg, title, confirm = this.confirmMessage, callback) {  // 디자인 적용된 얼럿 메시지
            this.$alert(msg, title, {
                confirmButtonText: confirm,
                dangerouslyUseHTMLString: true,
                callback: action => {
                    if(typeof callback === 'function') {
                        callback();
                    }
                }
            });
        },
        nameFilter(obj) {    // 종목명 가져오기
            if(obj != null && obj['o_inst_kor_nm'] != undefined && obj['o_inst_eng_nm'] != undefined) {
                if(this.getLangKind == 'KR') {
                    return obj['o_inst_kor_nm'].split('/')[0];
                } else if(this.getLangKind == 'EN') {
                    return obj['o_inst_eng_nm'].split('/')[0];
                }
            } else {
                return  '';
            }
        },
        addComma(value) {       // 1,000 단위 콤마 추가
            var tmp = value.toString().split('.');
            return tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (tmp[1] ? '.' + tmp[1] : '');
        },
        getOnlyNumber(value) {      // 숫자, . 만 남김
            if(value === undefined || value === '') {
                return '';
            }

            if( value === 0) {
                return 0;
            }

            value = value.replace(/[^0-9.]/g, '');
            // 정수 앞쪽의 0 제거
            var splitValue = value.split('.');
            if(splitValue.length > 1) {
                value = (parseInt(splitValue[0], 10) > 0 ? parseInt(splitValue[0], 10) : '0') + ('.' + splitValue[1]);
            } else if(splitValue.length <= 1 && value != '0') {
                value = value.replace(/^[0|\D]*/, '');
            }

            return value;
        },
        keyDown(event) {
            var charCode = (typeof event.which === undefined) ? event.keyCode : event.which;
            var charStr = String.fromCharCode(charCode);
            
            if(charCode == '229') {     // 한글 입력 방지
                event.target.readOnly = true;
                return;
            }
        },
        keyPress(event) {
            var charCode = (typeof event.which === undefined) ? event.keyCode : event.which;
            var charStr = String.fromCharCode(charCode);
            var keyPosition = event.target.selectionStart;  // 키 입력 위치
            var targetId = event.target.id;

            var tmpText = event.target.value.substring(0, keyPosition);
            var commaCount = (tmpText.match(/,/g) || []).length;
            
            keyPosition -= commaCount;    //  콤마 개수 만큼 키 입력 위치 감소

            if(charCode !== 46 && (charCode < 48 || charCode > 57)) {   // 숫자, . 아니면 입력 방지
                event.preventDefault();
            }

            var text = this.getOnlyNumber(event.target.value);
            var pointPosition = text.indexOf('.');
            var splitText = text.split('.');
            var integer = splitText[0];
            var decimal = splitText[1];

            if(charCode === 46 && pointPosition !== -1) {   // . 이 이미 있는 경우 . 입력 방지
                event.preventDefault();
                return;
            } else if(charCode === 46 && this.getOnlyNumber(event.target.value).length <= 0) { // .만 입력 시 . 앞에 0 붙이기
                event.target.value = '0' + event.target.value;
            } else if(charCode === 48 && event.target.selectionStart === 0 && event.target.value.length > 0) {  // 정수 앞에 0 입력 방지
                //event.preventDefault();
            }

            if(charCode !== 46 && ((pointPosition === -1 && text.length <= keyPosition) || pointPosition !== -1 && keyPosition == pointPosition)) {  // 정수이거나 정수부분 입력 시 10억 단위 초과 방지
                if(integer.length >= 10) {
                    event.preventDefault();
                    return;
                }
            } else {
                var tmpValue = text;

                if(charCode != '46' && event.target.value != '0' && pointPosition >= keyPosition) {  // 호가단위 자릿수 조회를 위해 정수부분 입력인 경우 자릿수 추가(ex 123 -> 1231)
                    tmpValue = integer + '1';
                }
                
                var decimalLimit;   // 소수점 자릿수 조회
                if(targetId === 'stopPrice') {
                    decimalLimit = this.getHogaUnitValid(tmpValue, true);
                } else if(targetId === 'quantity') {
                    decimalLimit = this.getOrdQtyUnitValid(tmpValue, true);
                } else if(targetId === 'price') {
                    decimalLimit = this.getHogaUnitValid(tmpValue, true);
                } else if(targetId === 'distance') {
                    decimalLimit = this.getHogaUnitValid(tmpValue, true);
                } else if(targetId === 'amount') {
                    decimalLimit = this.getSetlDecValid(tmpValue, true);
                }
                
                // 정수부분 10억 단위 이상 입력 방지
                if(decimal) {   // 소수점 이하 숫자 있는 경우
                    if(pointPosition < keyPosition && decimalLimit <= decimal.length && keyPosition >= text.length) {
                        event.preventDefault();
                        return;
                    }
                } else {    // 소수점 이하 숫자 없는 경우
                    if(charCode == '46' && decimalLimit < 1 && keyPosition >= text.length) {
                        event.preventDefault();
                        return;
                    }
                }
            }
        },
        keyUp(event) {      // 값 입력 시 자릿수 보정
            event.target.readOnly = false;
            var targetId = event.target.id;

            if(targetId === 'stopPrice') {
                this.stopPrice = this.getHogaUnitValid(this.stopPrice);
            } else if(targetId === 'quantity') {
                this.quantity = this.getOrdQtyUnitValid(this.quantity);
            } else if(targetId === 'price') {
                this.price = this.getHogaUnitValid(this.price);
            } else if(targetId === 'distance') {
                this.distance = this.getHogaUnitValid(this.distance);
            } else if(targetId === 'amount') {
                this.amount = this.getSetlDecValid(this.amount);
            }
        },
        checkHogaUnit(value) {      // 정수부분 호가단위 체크
            if(value === undefined || value === '') {
                return;
            }

            var text = this.getOnlyNumber(value.toString());

            var splitText = text.toString().split('.');
            var integer = splitText[0].toString();

            var nLenBelowDigitArray = [1];
            var hogaUnit = UnitManager.getHogaUnit(this.hogaUnit, this.setlCurCd, text, undefined, undefined, nLenBelowDigitArray);
                
            if((integer % hogaUnit) >= 1) {
                return false;
            } else {
                return true;
            }
        },
        getOrderAbleAmountUnit(value) {     // 주문가능 금액 소수점 자릿수 처리 - 결제통화 소수점 자릿수 맞춰 0채우기
            if(value === undefined || value === '') {
                return '';
            }

            var setlDecDigt = this.coinList.length > 0 ? this.$_.findWhere(this.coinList, {o_symbol : this.currentSymbol}).o_setl_dec_digt : '';

            return UnitManager.numberWithCommas(NumberUtil.Floor('', '', value, setlDecDigt));
        },
        removeExponential(value) {      // 지수 표기 제거
            if(value === undefined || value === '') {
                return '';
            }

            var nLenBelowDigitArray = [1];
            var hogaUnit = UnitManager.getHogaUnit(this.hogaUnit, this.setlCurCd, value, undefined, undefined, nLenBelowDigitArray);
            var hogaUnitBelowPntDigit = NumberUtil.getLenBelowDigit(hogaUnit);

            var count = Math.pow(10, hogaUnitBelowPntDigit);
            var res = Math.floor(value * count) / count;
            res = this.addComma(res.toFixed(hogaUnitBelowPntDigit));
            
            return res;
        },
        getOrdQtyUnitValid(value, getUnit) {     // 소수점 자릿수 처리 - 주문수량단위
            if(value === undefined || value === '') {
                return;
            }

            var text = this.getOnlyNumber(value.toString());

            var splitText = text.toString().split('.');
            var integer = splitText[0].toString();
            
            if(integer >= 10000000000) {
                integer = integer.substring(0, 10);
            }

            var ordQtyUnit = this.coinList.length > 0 ? this.$_.findWhere(this.coinList, {o_symbol : this.currentSymbol}).o_ord_unit_qty : '';
            var ordQtyBelowPntDigit = NumberUtil.getLenBelowDigit(ordQtyUnit);

            if(getUnit) {
                return ordQtyBelowPntDigit;
            }
            
            if(splitText.length > 1) {
                var fraction = splitText[1].toString();

                if(fraction.length > ordQtyBelowPntDigit) {
                    fraction = fraction.substring(0, ordQtyBelowPntDigit * 1);
                }

                return this.addComma(integer) + (ordQtyBelowPntDigit > 0 ? '.' + fraction : '');
            } else {
                return this.addComma(integer);
            }
        },
        getHogaUnitValid(value, getUnit, round) {       // 소수점 자릿수 처리 - 호가단위
            if(value === undefined || value === '') {
                return;
            }

            var text = this.getOnlyNumber(value.toString());

            var splitText = text.toString().split('.');
            var integer = splitText[0].toString();
            
            if(integer >= 10000000000) {
                integer = integer.substring(0, 10);
            }

            var nLenBelowDigitArray = [1];
            var hogaUnit = UnitManager.getHogaUnit(this.hogaUnit, this.setlCurCd, text, undefined, undefined, nLenBelowDigitArray);
            var hogaUnitBelowPntDigit = NumberUtil.getLenBelowDigit(hogaUnit);

            if(getUnit) {   // 호가 단위 소수점 자릿수 리턴
                return hogaUnitBelowPntDigit;
            }

            if(splitText.length > 1) {
                if(round) {  // 매수평균가인 경우 반올림 처리
                    return this.addComma(parseFloat(text).toFixed(hogaUnitBelowPntDigit));
                }
                
                var fraction = splitText[1].toString();

                if(fraction.length > hogaUnitBelowPntDigit) {
                    fraction = fraction.substring(0, hogaUnitBelowPntDigit * 1);
                }
                
                return this.addComma(integer) + (hogaUnitBelowPntDigit > 0 ? '.' + fraction : '');
            } else {
                return this.addComma(integer);
            }
        },
        getSetlDecValid(value, getUnit) {        // 소수점 자릿수 처리 - 결제통화 고유 소수점 자릿수
            if(value === undefined || value === '') {
                return;
            }
            
            var text = this.getOnlyNumber(value.toString());

            var splitText = text.toString().split('.');
            var integer = splitText[0].toString();
            
            if(integer >= 10000000000) {
                integer = integer.substring(0, 10);
            }

            var setlDecDigt = this.coinList.length > 0 ? this.$_.findWhere(this.coinList, {o_symbol : this.currentSymbol}).o_setl_dec_digt : '';
            
            if(getUnit) {
                return setlDecDigt;
            }
            
            if(splitText.length > 1) {
                var fraction = splitText[1].toString();

                if(fraction.length > setlDecDigt) {
                    fraction = fraction.substring(0, setlDecDigt * 1);
                }
                
                return this.addComma(integer) + (setlDecDigt > 0 ? '.' + fraction : '');
            } else {
                return this.addComma(integer);
            }
        },
        setOrdQty(percent) {        // 매수수량 변경(퍼센트, 최대)
            var self = this;

            if(self.getUserId === null) {
                return;
            }

            if(self.price === '') {
                //가격 미입력 시 현재가 입력
                self.price = self.addComma(self.curprc);
            }

            var priceText = self.getOnlyNumber(self.price);

            var payload = [];
            payload.ord_prc = priceText;
            payload.ord_prc_tp = self.orderAbleType;

            this.$store.dispatch('getOrderAble', payload).then((data) => {
                if(data) {

                    if(data.buy_ord_able_qty <= 0) {
                        self.kvAlert(self.$t('exchange.e115'));     // '주문가능 수량이 없습니다.
                        return;
                    }
                    // 주문수량단위
                    var ordQtyUnit = self.coinList.length > 0 ? self.$_.findWhere(self.coinList, {o_symbol : self.currentSymbol}).o_ord_unit_qty : '';
                    // 주문수량단위의 소수점이하 자리수
                    var ordQtyBelowPntDigit = NumberUtil.getLenBelowDigit(ordQtyUnit);

                    // 퍼센트에 대한 계산 값
                    var qty = NumberUtil.multiply(data.buy_ord_able_qty, percent, ordQtyBelowPntDigit, 'floor');
                    
                    if (qty <= 0) {
                        self.quantity = 0;
                    } else {
                        self.quantity = self.addComma(parseFloat(qty));
                    }
                }
            }, null);
        },
        setAmount(percent) {        // 주문금액 변경(퍼센트, 최대)
            if(this.getUserId === null) {
                return;
            }

            if(this.orderAble.buy_ord_able_amt <= 0) {
                return;
            }
            
            var setlDecDigt = this.$_.findWhere(this.coinList, {o_symbol : this.currentSymbol}).o_setl_dec_digt;
            
            var amt = NumberUtil.multiply(this.orderAble.buy_ord_able_amt, percent, setlDecDigt, 'floor');
            this.amount = this.addComma(parseFloat(amt));
        },
        subtractStopPrice() {       // 스탑 매수 가격 빼기
            if(this.stopPrice === undefined || this.stopPrice === '') {  // 가격이 입력되지 않으면 선택종목의 현재가 입력
                this.stopPrice = this.addComma(this.curprc);
                return;
            }

            var stopPriceText = this.getOnlyNumber(this.stopPrice);

            if(stopPriceText <= 0) {
                return;
            }
           
            var nLenBelowDigitArray = [1], nLenTargetDigitArray = [1];

            var callPrice = stopPriceText * 1;// 문자형으로 들어오므로 숫자로 변화처리
            // 이전 값
            var call = UnitManager.getHogaUnit(this.hogaUnit, this.setlCurCd, callPrice, undefined, undefined, nLenBelowDigitArray);
            var nextprc = NumberUtil.substract_Hoga(callPrice, call, nLenBelowDigitArray[0]);
            nextprc *= 1;
            // -1 한 값
            call = UnitManager.getHogaUnit(this.hogaUnit, this.setlCurCd, nextprc, undefined, undefined, nLenTargetDigitArray);
            var price = NumberUtil.substract_Hoga(callPrice, call, nLenTargetDigitArray[0]);
            price *= 1;
            price = price.toFixed(nLenTargetDigitArray[0]).toString();
            
            this.stopPrice = this.addComma(price);
        },
        addStopPrice() {        // 스탑 매수 가격 더하기     
            if(this.stopPrice === undefined || this.stopPrice === '') {  // 가격이 입력되지 않으면 선택종목의 현재가 입력
                this.stopPrice = this.addComma(this.curprc);
                return;
            }
            
            var stopPriceText = this.getOnlyNumber(this.stopPrice);

            var nLenBelowDigitArray = [1], nLenTargetDigitArray = [1];
            // 소수점이 있을 경우,
            var callPrice = stopPriceText * 1;// 문자형으로 들어오므로 숫자로 변화처리
            
            // 이전 값
            var call = UnitManager.getHogaUnit(this.hogaUnit, this.setlCurCd, callPrice, undefined, undefined, nLenBelowDigitArray);
            var strPrice = stopPriceText.toString();
            var nIndexDot = strPrice.indexOf('.');
            if( nIndexDot > -1)
            {
                strPrice = strPrice.substr( 0, nIndexDot + nLenBelowDigitArray[0] + 1);
            }
            
            callPrice = strPrice * 1;
            var price = NumberUtil.add_Hoga( callPrice, call, nLenBelowDigitArray[0]);
            price *= 1;
            // +1 한 값
            call = UnitManager.getHogaUnit(this.hogaUnit, this.setlCurCd, price, undefined, undefined, nLenTargetDigitArray);
            price = price.toFixed( nLenTargetDigitArray[0]).toString();

            if(price >= 10000000000) {
                return;
            }

            this.stopPrice = this.addComma(price);
        },
        subtractPrice() {       // 매수 가격 빼기
            if(this.price === undefined || this.price === '') {  // 가격이 입력되지 않으면 선택종목의 현재가 입력
                this.price = this.addComma(this.curprc);
                return;
            }

            var priceText = this.getOnlyNumber(this.price);

            if(priceText <= 0) {
                return;
            }
           
            var nLenBelowDigitArray = [1], nLenTargetDigitArray = [1];

            var callPrice = priceText * 1;// 문자형으로 들어오므로 숫자로 변화처리
            // 이전 값
            var call = UnitManager.getHogaUnit(this.hogaUnit, this.setlCurCd, callPrice, undefined, undefined, nLenBelowDigitArray);
            var nextprc = NumberUtil.substract_Hoga(callPrice, call, nLenBelowDigitArray[0]);
            nextprc *= 1;
            // -1 한 값
            call = UnitManager.getHogaUnit(this.hogaUnit, this.setlCurCd, nextprc, undefined, undefined, nLenTargetDigitArray);
            var price = NumberUtil.substract_Hoga(callPrice, call, nLenTargetDigitArray[0]);
            price *= 1;
            price = price.toFixed(nLenTargetDigitArray[0]).toString();
            
            this.price = this.addComma(price);
        },
        addPrice() {        // 매수 가격 더하기
            if(this.price === undefined || this.price === '') {  // 가격이 입력되지 않으면 선택종목의 현재가 입력
                this.price = this.addComma(this.curprc);
                return;
            }

            var priceText = this.getOnlyNumber(this.price);

            var nLenBelowDigitArray = [1], nLenTargetDigitArray = [1];
            // 소수점이 있을 경우,
            var callPrice = priceText * 1;// 문자형으로 들어오므로 숫자로 변화처리
            
            // 이전 값
            var call = UnitManager.getHogaUnit(this.hogaUnit, this.setlCurCd, callPrice, undefined, undefined, nLenBelowDigitArray);
            var strPrice = priceText.toString();
            var nIndexDot = strPrice.indexOf('.');
            if( nIndexDot > -1)
            {
                strPrice = strPrice.substr( 0, nIndexDot + nLenBelowDigitArray[0] + 1);
            }
            
            callPrice = strPrice * 1;
            var price = NumberUtil.add_Hoga( callPrice, call, nLenBelowDigitArray[0]);
            price *= 1;
            // +1 한 값
            call = UnitManager.getHogaUnit(this.hogaUnit, this.setlCurCd, price, undefined, undefined, nLenTargetDigitArray);
            price = price.toFixed( nLenTargetDigitArray[0]).toString();
            
            if(price >= 10000000000) {
                return;
            }           

            this.price = this.addComma(price);
        },
        setStopPricePercent(percent) {      // 스탑가격 키패드 - 현재가의 n% 설정
            if(this.curprc <= 0) {
                return;
            }
            
            var calPrice = this.curprc * (1 + Number(percent));
            var nLenBelowDigitArray = [1];
            var hogaUnit = UnitManager.getHogaUnit(this.hogaUnit, this.setlCurCd, calPrice, undefined, undefined, nLenBelowDigitArray);
            var hogaUnitBelowPntDigit = NumberUtil.getLenBelowDigit(hogaUnit);
            
            var amt = NumberUtil.multiply(this.curprc, percent, hogaUnitBelowPntDigit, 'round');
            this.stopPrice = this.getHogaUnitValid(parseFloat(amt) + parseFloat(this.curprc));
            if(hogaUnit >= 1 && this.getOnlyNumber(this.stopPrice) % hogaUnit >= 1) {
                this.stopPrice = this.addComma(this.getOnlyNumber(this.stopPrice) - (this.getOnlyNumber(this.stopPrice) % hogaUnit));
            }
        },
        setPricePercent(percent) {      // 매수 가격 키패드 - 현재가의 n% 설정
            if(this.curprc <= 0) {
                return;
            }
            
            var calPrice = this.curprc * (1 + Number(percent));
            var nLenBelowDigitArray = [1];
            var hogaUnit = UnitManager.getHogaUnit(this.hogaUnit, this.setlCurCd, calPrice, undefined, undefined, nLenBelowDigitArray);
            var hogaUnitBelowPntDigit = NumberUtil.getLenBelowDigit(hogaUnit);
            
            var amt = NumberUtil.multiply(this.curprc, percent, hogaUnitBelowPntDigit, 'round');
            this.price = this.getHogaUnitValid(parseFloat(amt) + parseFloat(this.curprc));
            if(hogaUnit >= 1 && this.getOnlyNumber(this.price) % hogaUnit >= 1) {
                this.price = this.addComma(this.getOnlyNumber(this.price) - (this.getOnlyNumber(this.price) % hogaUnit));
            }
        },
        setDistancePercent(percent) {      // 최저가대비상승폭 키패드 - 현재가의 n% 설정
            if(this.curprc <= 0) {
                return;
            }
            
            var calPrice = this.curprc * (1 + Number(percent));
            var nLenBelowDigitArray = [1];
            var hogaUnit = UnitManager.getHogaUnit(this.hogaUnit, this.setlCurCd, calPrice, undefined, undefined, nLenBelowDigitArray);
            var hogaUnitBelowPntDigit = NumberUtil.getLenBelowDigit(hogaUnit);
            
            var amt = NumberUtil.multiply(this.curprc, percent, hogaUnitBelowPntDigit, 'round');
            this.distance = this.getHogaUnitValid(parseFloat(amt));
            if(hogaUnit >= 1 && this.getOnlyNumber(this.distance) % hogaUnit >= 1) {
                this.distance = this.addComma(this.getOnlyNumber(this.distance) - (this.getOnlyNumber(this.distance) % hogaUnit));
            }
        },
        setAveragePrice(type) {     // 스탑가격/매수가격 키패드 - 매수평균가
            if(type === 'price') {
                if(this.setlCurCd === 'KRW') {
                    var buyPrc = this.$_.findWhere(this.assetProfitList, {cur_cd : this.trgtCurCd});
                    this.price = buyPrc !== undefined && buyPrc.buy_prc > 0 ? this.getHogaUnitValid(buyPrc.buy_prc, false, true) : '';
                } else {
                    this.price = '';
                }
            } else if(type === 'stopPrice') {
                if(this.setlCurCd === 'KRW') {
                    var buyPrc = this.$_.findWhere(this.assetProfitList, {cur_cd : this.trgtCurCd});
                    this.stopPrice = buyPrc !== undefined && buyPrc.buy_prc > 0 ? this.getHogaUnitValid(buyPrc.buy_prc, false, true) : '';
                } else {
                    this.stopPrice = '';
                }
            }
        },
        setStopPriceKeypad(value) { // 스탑가격 키패드 - 키 입력
            if(value === 'delete') {
                this.stopPrice = this.stopPrice.toString().substring(0, this.stopPrice.toString().length - 1);
                this.stopPrice = this.getHogaUnitValid(this.stopPrice + value);
            } else if(value === 'close') {
                this.stopPricePad = false;
                this.stopPrice = this.prevValue;
            } else if((value === '0' || value === '000') && (this.stopPrice === '' || this.stopPrice < 0)) {
                this.stopPrice = '0';
            } else {
                this.stopPrice = this.getHogaUnitValid(this.stopPrice + value);
            }
        },
        setQuantityKeypad(value) {  // 매수수량 키패드 - 키 입력
            if(value === 'delete') {
                this.quantity = this.quantity.toString().substring(0, this.quantity.toString().length - 1);
                this.quantity = this.getOrdQtyUnitValid(this.quantity + value);
            } else if(value === 'close') {
                this.quantityPad = false;
                this.quantity = this.prevValue;
            } else if((value === '0' || value === '000') && (this.quantity === '' || this.quantity < 0)) {
                this.quantity = '0';
            } else {
                this.quantity = this.getOrdQtyUnitValid(this.quantity + value);
            }
        },
        setPriceKeypad(value) { // 매수가격 키패드 - 키 입력
            if(value === 'delete') {
                this.price = this.price.toString().substring(0, this.price.toString().length - 1);
                this.price = this.getHogaUnitValid(this.price + value);
            } else if(value === 'close') {
                this.pricePad = false;
                this.price = this.prevValue;
            } else if((value === '0' || value === '000') && (this.price === '' || this.price < 0)) {
                this.price = '0';
            } else {
                this.price = this.getHogaUnitValid(this.price + value);
            }
        },
        setDistanceKeypad(value) {      // 최저가대비상승폭 키패드 - 키 입력
            if(value === 'delete') {
                this.distance = this.distance.toString().substring(0, this.distance.toString().length - 1);
                this.distance = this.getHogaUnitValid(this.distance + value);
            } else if(value === 'close') {
                this.distancePad = false;
                this.distance = this.prevValue;
            } else if((value === '0' || value === '000') && (this.distance === '' || this.distance < 0)) {
                this.distance = '0';
            } else {
                this.distance = this.getHogaUnitValid(this.distance + value);
            }
        },
        setAmountKeypad(value) {        // 주문금액 키패드 - 키 입력
            if(value === 'delete') {
                this.amount = this.amount.toString().substring(0, this.amount.toString().length - 1);
                this.amount = this.getSetlDecValid(this.amount + value);
            } else if(value === 'close') {
                this.amountPad = false;
                this.amount = this.prevValue;
            } else if((value === '0' || value === '000') && (this.amount === '' || this.amount < 0)) {
                this.amount = '0';
            } else {
                this.amount = this.getSetlDecValid(this.amount + value);
            }
        },
        reset(){                    // 입력값 초기화
            this.quantity = '';     // 수량
            this.price = '';        // 가격
            this.amount = '';       // 금액
            this.stopPrice = '';    // 스탑 지정가
            this.distance = '';     // 최저가대비상승폭
            this.totalAmount = '0'; // 총 금액
        },
        /* keypad */
        viewKeyPad(_srt) {      // 키패드 팝업
            if (!this.isPC) {
                if(this.getUserId === null || this.getUserId === undefined || this.getUserId === '') {
                    this.kvAlert(this.$t('exchange.e017'), '', '', () => {this.$router.push({name: 'mLogin'})});      // 로그인 후 이용 가능합니다.
                    return;
                }
                
                switch(_srt) {
                    case 'stopPricePad':
                        if(this.stopPrice > 0) {
                            this.setChangedStopPrice(this.stopPrice);
                        }
                        this.prevValue = this.stopPrice;
                        this.stopPricePad = true;
                        break;
                    case 'pricePad':
                        if(this.price > 0) {
                            this.setChangedPrice(this.price);
                        }
                        this.prevValue = this.price;
                        this.pricePad = true;
                        break;
                    case 'quantityPad':
                        if(this.price === '') {  // 가격이 입력되지 않으면 선택종목의 현재가 입력
                            this.price = this.addComma(this.curprc);
                        }
                        if(this.price > 0 && this.quantity > 0) {
                            this.setTotalAmount();
                        }
                        this.prevValue = this.quantity;
                        this.quantityPad = true;
                        break;
                    case 'amountPad':
                        if(this.amount > 0) {
                            this.setChangedAmount(this.amount);
                        }
                        this.prevValue = this.amount;
                        this.amountPad = true;
                        break;
                    case 'distancePad':
                        if(this.distance > 0) {
                            this.setChangedDistance(this.distance);
                        }
                        this.prevValue = this.distance;
                        this.distancePad = true;
                        break;
                }
            }
        },
        getOrderableType() {    // 주문가능 수량 조회 시 주문가격구분 설정
            if(this.orderType === '2' || this.orderType === '3') {  // 지정가, 스탑지정가
                this.orderAbleType = '2';
            } else if(this.orderType === '1' || this.orderType === '4' || this.orderType === '5') { // 시장가, 스탑시장가, 트레일링스탑
                this.orderAbleType = '1';
            }
        },
        getPriceHighLowLimit(type) {        // 매수가격 상하한가 계산
            if(this.$_.findWhere(this.priceLimit, {symbol : this.currentSymbol}) === undefined) {
                return undefined;
            }

            var limitPrice;
            var limitRatio;
            if(type === 'high') {
                limitRatio = this.$_.findWhere(this.priceLimit, {symbol : this.currentSymbol}).high_limt_rt;
            } else if(type === 'low') {
                limitRatio = this.$_.findWhere(this.priceLimit, {symbol : this.currentSymbol}).low_limt_rt;
            }

            limitPrice = this.curprc * limitRatio / 100;  // 매수가격 상한가;            
            // console.log('limitPrice :', this.curprc + "*" + limitRatio + "=" + limitPrice);
            
            var nLenBelowDigitArray = [1];
            var hogaUnit = UnitManager.getHogaUnit(this.hogaUnit, this.setlCurCd, limitPrice, undefined, undefined, nLenBelowDigitArray);
            var hogaUnitBelowPntDigit = NumberUtil.getLenBelowDigit(hogaUnit);
                        
            if(hogaUnitBelowPntDigit > 0) {
                //limitPrice = limitPrice.toFixed(hogaUnitBelowPntDigit);//afc.floor
                if(type === 'high') {
                    limitPrice = afc.toFixed(limitPrice, hogaUnitBelowPntDigit);//버림
                }  else if(type === 'low') {
                    // limitPrice = limitPrice.toFixed(hogaUnitBelowPntDigit);
                    limitPrice = afc.ceil(limitPrice, hogaUnitBelowPntDigit);//올림
                }
            } else {
                limitPrice = (limitPrice - (limitPrice % hogaUnit)).toFixed(hogaUnitBelowPntDigit);
            }

            // console.log('limitPrice Result :', limitPrice);

            return limitPrice;
        },
        priceCheck(pre) {       // 매수가격 유효성 검사
            if(this.price === undefined || this.price === '' || this.getOnlyNumber(this.price) <= 0) {
                this.kvAlert(this.$t('exchange.e028'));     // 주문가격을 입력하세요.
                return false;
            }

            if(!this.checkHogaUnit(this.price)) {
                this.kvAlert(this.$t('exchange.e033'));     // 주문가격이 호가단위에 맞지 않습니다.
                return false;
            }            
            
            if(pre) {
                return true;
            }

            if(this.orderType != '1' && this.orderType != '2'){
                return true;
            }

            var highLimitPrice = this.getPriceHighLowLimit('high'); // 주문가능 상한가
            var lowLimitPrice = this.getPriceHighLowLimit('low');   // 주문가능 하한가

            if(highLimitPrice !== undefined && parseFloat(this.getOnlyNumber(this.price)) > highLimitPrice) {
                this.kvAlert(this.$t('exchange.e034', {'0' : this.addComma(this.removeExponential(highLimitPrice).toString()), '1': this.setlCurCd}));     // 주문가능 최고가격은 ' + this.addComma(this.removeExponential(highLimitPrice).toString()) + ' ' + this.setlCurCd + ' 입니다.
                this.orderDialogVisible = false;
                return false;
            }

            if(lowLimitPrice !== undefined && parseFloat(this.getOnlyNumber(this.price)) < lowLimitPrice) {
                this.kvAlert(this.$t('exchange.e035', {'0': this.addComma(this.removeExponential(lowLimitPrice).toString()), '1': this.setlCurCd}));    // 주문가능 최저가격은 ' + this.addComma(this.removeExponential(lowLimitPrice).toString()) + ' ' + this.setlCurCd + ' 입니다.
                this.orderDialogVisible = false;
                return false;
            }

            return true;
        },
        stopPriceCheck(pre) {       // 스탑가격 유효성 검사
            if(this.stopPrice === undefined || this.stopPrice === '' || this.getOnlyNumber(this.stopPrice) <= 0) {
                this.kvAlert(this.$t('exchange.e070'));     // 스탑가격을 입력하세요.
                return false;
            }

            if(!this.checkHogaUnit(this.stopPrice)) {
                this.kvAlert(this.$t('exchange.e074'));     // 스탑가격을 호가단위에 맞게 입력하세요.
                return false;
            }
            
            if(pre) {
                return true;
            }

            if (parseFloat(this.getOnlyNumber(this.stopPrice)) <= parseFloat(this.curprc)) {
              this.kvAlert(this.$t('exchange.e073'));     // 스탑가격을 현재가격보다 높게 입력하세요.
              this.orderDialogVisible = false;
              return false;
            }

            return true;
        },
        distanceCheck(pre) {        // 최저가대비상승폭 유효성 검사
            if(this.distance === undefined || this.distance === '' || this.getOnlyNumber(this.distance) <= 0) {
                this.kvAlert(this.$t('exchange.e090'));     // 최저가대비상승폭을 입력하세요.
                
                return false;
            }

            if(!this.checkHogaUnit(this.distance)) {
                this.kvAlert(this.$t('exchange.e092'));     // 최저가대비상승폭을 호가단위에 맞게 입력하세요.
                return false;
            }
            
            if(pre) {
                return true;
            }
            
            return true;
        },
        quantityCheck(pre) {        // 매수수량 유효성 검사
            var self = this;

            var ordQtyUnit = self.coinList.length > 0 ? self.$_.findWhere(self.coinList, {o_symbol : self.currentSymbol}).o_ord_unit_qty : '';  // 주문수량단위
            var minOrdQty = self.coinList.length > 0 ? self.$_.findWhere(self.coinList, {o_symbol : self.currentSymbol}).o_min_ord_qty : '';    // 최소주문수량

            if(self.quantity === undefined || self.quantity === '' || self.getOnlyNumber(self.quantity) <= 0) {
                self.kvAlert(self.$t('exchange.e061'));     // 주문수량을 입력하세요.
                return false;
            }
            
            if(ordQtyUnit >= 1 && self.quantity % ordQtyUnit > 0) {
                self.kvAlert(self.$t('exchange.e062', {'0': ordQtyUnit, '1': self.trgtCurCd}));     // 주문가능수량 단위는 ' + ordQtyUnit + ' ' + self.trgtCurCd + ' 입니다. 소수점 자릿수를 확인하세요.
                return false;
            }
            
            if(parseFloat(self.getOnlyNumber(self.quantity)) < parseFloat(minOrdQty)) {
                self.kvAlert(self.$t('exchange.e032', {'0': minOrdQty, '1': self.trgtCurCd}));      // 주문가능 최소수량은 ' + minOrdQty + ' ' + self.trgtCurCd + ' 입니다.
                return false;
            }
            
            if(pre) {
                return true;
            }

            if((self.orderType === '1' || self.orderType === '2') && parseFloat(self.getOnlyNumber(self.totalAmount)) > parseFloat(self.ableAmount)) {
                self.kvAlert(self.$t('exchange.e030'));     // 주문가능 잔고가 부족합니다.
                return false;
            }

            return true;
        },
        amountCheck(pre) {      // 주문금액 유효성 검사
            var self = this;

            var minOrdQty = self.coinList.length > 0 ? self.$_.findWhere(self.coinList, {o_symbol : self.currentSymbol}).o_min_ord_qty : '';    // 최소주문수량

            if(self.amount === undefined || self.amount === '' || self.getOnlyNumber(self.amount) <= 0) {
                self.kvAlert(self.$t('exchange.e053'));     // 주문금액을 입력하세요.
                return false;
            }
            
            var setlDecDigt = self.coinList.length > 0 ? self.$_.findWhere(self.coinList, {o_symbol : self.currentSymbol}).o_setl_dec_digt : '';
            var setlDec = setlDecDigt > 0 ? self.removeExponential(Math.pow(10, -setlDecDigt)) : Number(Math.pow(10, -setlDecDigt));
            var amountDecDigt = NumberUtil.getLenBelowDigit(self.amount);
            
            if(amountDecDigt > setlDecDigt) {
                self.kvAlert(self.$t('exchange.e054', {'0': setlDec, '1': self.setlCurCd}));     // 주문금액 단위는 ' + setlDec + ' ' + self.setlCurCd + '입니다. 소수점 자릿수를 확인하세요.
                return false;
            }
            
            if(pre) {
                return true;
            }

            if(self.amount > self.orderAble.buy_ord_able_amt) {
                self.kvAlert(self.$t('exchange.e030'));     // 주문가능 잔고가 부족합니다.
                return false;
            }

            return true;
        },
        formPreCheck(pre) {     // 매수 버튼 클릭 시 주문가능 금액/수량 재조회
            var self = this;

            var payload = [];
            if(self.orderType === '2' || self.orderType === '3') {
                payload.ord_prc = self.getOnlyNumber(self.price);
            } else {
                payload.ord_prc = self.getOnlyNumber(self.amount);
            }
            
            payload.ord_prc_tp = self.orderAbleType;

            self.$store.dispatch('getOrderAble', payload).then((data) => {
                if(data) {
                    self.ableQuantity = data.buy_ord_able_qty;
                    self.ableAmount = data.buy_ord_able_amt;
                    self.formCheck(pre);        
                }
            }).catch((errorData) => {
                if (errorData) {
                    self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: self.$t('sys_err.a001')
                    });
                }
            });
        },
        formCheck(pre) {        // 주문 유형별 해당 입력값 유효성 검사
            if(this.orderType === '1') {
                if(!this.amountCheck(pre)) {
                    if(!pre) {
                        this.orderDialogVisible = false;
                    }
                    return;
                }
            } else if(this.orderType === '2') {
                if(!this.priceCheck(pre)) {
                    if(!pre) {
                        this.orderDialogVisible = false;
                    }
                    return;
                }
                if(!this.quantityCheck(pre)) {
                    if(!pre) {
                        this.orderDialogVisible = false;
                    }
                    return;
                }
            } else if(this.orderType === '3') {
                if(!this.stopPriceCheck(pre)) {
                    if(!pre) {
                        this.orderDialogVisible = false;
                    }
                    return;
                }
                if(!this.priceCheck(pre)) {
                    if(!pre) {
                        this.orderDialogVisible = false;
                    }
                    return;
                }
                if(!this.quantityCheck(pre)) {
                    if(!pre) {
                        this.orderDialogVisible = false;
                    }
                    return;
                }
            } else if(this.orderType === '4') {
                if(!this.stopPriceCheck(pre)) {
                    if(!pre) {
                        this.orderDialogVisible = false;
                    }
                    return;
                }
                if(!this.amountCheck(pre)) {
                    if(!pre) {
                        this.orderDialogVisible = false;
                    }
                    return;
                }
            } else if(this.orderType === '5') {
                if(!this.distanceCheck(pre)) {
                    if(!pre) {
                        this.orderDialogVisible = false;
                    }
                    return;
                }
                if(!this.amountCheck(pre)) {
                    if(!pre) {
                        this.orderDialogVisible = false;
                    }
                    return;
                }
            }
            
            if(pre) {
                this.orderDialogVisible = true;
            } else {
                setTimeout(() => this.orderDialogVisible = false, 200);
                this.onSubmit();
            }
            
        },
        onSubmit() {    // 서버에 주문 요청
            var self = this;
            
            if(self.getUserId !== null) {
                var d = new Date();
                var d30 = new Date();
                d30.setDate(d30.getDate() + 29);
                var today = d.getFullYear().toString() + ("0" + (d.getMonth() + 1).toString()).slice(-2) + ("0" + d.getDate().toString()).slice(-2);
                var day30 = d30.getFullYear().toString() + ("0" + (d30.getMonth() + 1).toString()).slice(-2) + ("0" + d30.getDate().toString()).slice(-2);

                if(self.orderType === '1') {
                    self.orderData.ord_qty = '';
                    self.orderData.ord_prc = '';
                    self.orderData.ord_amt = self.getOnlyNumber(self.amount);
                } else if(self.orderType === '2') {
                    self.orderData.ord_qty = self.getOnlyNumber(self.quantity);
                    self.orderData.ord_prc = self.getOnlyNumber(self.price);
                    self.orderData.ord_amt = '';
                } else if(self.orderType === '3') {    // 스탑지정가
                    self.orderData.est_dt = today;
                    self.orderData.end_dt = day30;

                    self.orderData.up_qttn_cndt_est_f = '1';
                    self.orderData.up_qttn_cndt_est_prc_clsf = '1';
                    self.orderData.up_qttn_cndt_est_vl = self.getOnlyNumber(self.stopPrice);    // 스탑가 / 스탑가 / 0

                    self.orderData.t_s_qttn_cndt_est_f = '0';
                    self.orderData.t_s_qttn_cndt_est_vl = '0';              // 0 / 0 / 주문시점의 현재가
                    self.orderData.t_s_hgh_mrk_cmpr_est_vl = '0';           // 0 / 0 / 최저가대비상승폭
                    self.orderData.t_s_hgh_mrk_cmpr_est_unt = '';          //   /   / 1

                    self.orderData.ordr_typ_cd = '2';
                    self.orderData.ordr_prc_est_clsf = '2';
                    self.orderData.ordr_prc_est_vl = self.getOnlyNumber(self.price);        // 0 / 매수가격 / 0
                    self.orderData.ordr_q_est_clsf = '2';
                    self.orderData.ordr_q_est_vl = self.getOnlyNumber(self.quantity);     // 주문금액 / 매수수량 / 주문금액
                } else if(self.orderType === '4') {    // 스탑시장가
                    self.orderData.est_dt = today;
                    self.orderData.end_dt = day30;

                    self.orderData.up_qttn_cndt_est_f = '1';
                    self.orderData.up_qttn_cndt_est_prc_clsf = '1';
                    self.orderData.up_qttn_cndt_est_vl = self.getOnlyNumber(self.stopPrice);    // 스탑가 / 스탑가 / 0

                    self.orderData.t_s_qttn_cndt_est_f = '0';
                    self.orderData.t_s_qttn_cndt_est_vl = '0';              // 0 / 0 / 주문시점의 현재가
                    self.orderData.t_s_hgh_mrk_cmpr_est_vl = '0';           // 0 / 0 / 최저가대비상승폭
                    self.orderData.t_s_hgh_mrk_cmpr_est_unt = '';          //   /   / 1

                    self.orderData.ordr_typ_cd = '1';
                    self.orderData.ordr_prc_est_clsf = '1';
                    self.orderData.ordr_prc_est_vl = '0';        // 0 / 매수가격 / 0
                    self.orderData.ordr_q_est_clsf = '3';
                    self.orderData.ordr_q_est_vl = self.getOnlyNumber(self.amount);     // 주문금액 / 매수수량 / 주문금액
                } else if(self.orderType === '5') {    //트레일링 스탑
                    self.orderData.est_dt = today;
                    self.orderData.end_dt = day30;

                    self.orderData.up_qttn_cndt_est_f = '0';
                    self.orderData.up_qttn_cndt_est_prc_clsf = '';
                    self.orderData.up_qttn_cndt_est_vl = '0';    // 스탑가 / 스탑가 / 0

                    self.orderData.t_s_qttn_cndt_est_f = '1';
                    self.orderData.t_s_qttn_cndt_est_vl = self.curprc;    // 0 / 0 / 주문시점의 현재가
                    
                    self.orderData.t_s_hgh_mrk_cmpr_est_vl = self.getOnlyNumber(self.distance);    // 0 / 0 / 최저가대비상승폭
                    self.orderData.t_s_hgh_mrk_cmpr_est_unt = '1';          //   /   / 1

                    self.orderData.ordr_typ_cd = '1';
                    self.orderData.ordr_prc_est_clsf = '1';
                    self.orderData.ordr_prc_est_vl = '0';        // 0 / 매수가격 / 0
                    self.orderData.ordr_q_est_clsf = '3';
                    self.orderData.ordr_q_est_vl = self.getOnlyNumber(self.amount);     // 주문금액 / 매수수량 / 주문금액
                }
                self.orderData.user_id = self.getUserId;
                self.orderData.symbol = self.currentSymbol;
                self.orderData.ord_prc_tp = self.orderType;
                
                self.$store.dispatch('coinOrder', self.orderData).then((data) => {
                    if(data) {
                        if(self.orderData['ord_prc_tp'] === '1' || self.orderData['ord_prc_tp'] === '2') {  // 지정가/시장가
                            self.reset();
                            self.kvAlert(self.orderSuccessStrings[self.orderType]);
                        } else {
                            self.orderWatch(self.orderData['trd_ccd'], data);
                        }
                    }
                }, (errorData) => {
                    //trName errCode

                    // 31017 주문가능 잔고가 부족합니다.
                    // 31018 주문가능 잔고가 부족합니다.
                    // 31159 주문가능 최소금액 미만입니다.
                    // 31238 주문가능 최대금액을 초과하였습니다.

                    // 90024    감시중인 주문 건수가 이미 20건 이상입니다.
                    // 90159    스탑가격을 현재가격보다 낮게 입력하세요.    =====> 높게로 변경해야됨 기획팀에서 코드 및 메시지 서버팀에 요청함

                    console.log('StockBuy order error :', errorData);

                    if(errorData.errCode === '31017') {
                        self.kvAlert(self.$t('exchange.e030'));     // 주문가능 잔고가 부족합니다.
                    } else if(errorData.errCode === '31018') {
                        self.kvAlert(self.$t('exchange.e030'));     // 주문가능 잔고가 부족합니다.
                    } else if(errorData.errCode === '31159') {
                        self.kvAlert(self.$t('exchange.e057'));     // 주문가능 최소금액 미만입니다.
                    } else if(errorData.errCode === '31238') {
                        self.kvAlert(self.$t('exchange.e056'));     // 주문가능 최대금액을 초과하였습니다.
                    } else if(errorData.errCode === '90024') {
                        self.kvAlert(self.$t('exchange.e075'));     // 감시중인 주문 건수가 이미 20건 이상입니다.
                    } else if(errorData.errCode === '90159') {
                        self.kvAlert(self.$t('exchange.e078'));     // 스탑가격을 현재가격보다 낮게 입력하세요.
                    } else if(errorData.errCode === '90301') {
                        self.kvAlert(self.$t('exchange.e063'));     // 주문가능한 잔고가 부족합니다.
                    } else if(errorData.errCode === '32003') {
                        var price = errorData.errMsg.split(']')[1].replace(/[^0-9|.]/g, '');
                        self.kvAlert(self.$t('exchange.e035', {'0': "["+self.addComma(price)+"]", '1': this.setlCurCd}));    // 주문가능 최저가격은 ' + this.addComma(this.removeExponential(lowLimitPrice).toString()) + ' ' + this.setlCurCd + ' 입니다.
                    } else if(errorData.errCode === '32004') {
                        var price = errorData.errMsg.split(']')[1].replace(/[^0-9|.]/g, '');
                        self.kvAlert(self.$t('exchange.e034', {'0': "["+self.addComma(price)+"]", '1': this.setlCurCd}));     // 주문가능 최고가격은 ' + this.addComma(this.removeExponential(highLimitPrice).toString()) + ' ' + this.setlCurCd + ' 입니다.
                    } else if(errorData.errCode === '32005') {
                        var price = errorData.errMsg.split('[')[1].split(']')[0];
                        self.kvAlert(self.$t('exchange.e031', {'0': "["+price+"]", '1': this.trgtCurCd}));    // 주문가능 최대수량은 ' + this.addComma(this.removeExponential(lowLimitPrice).toString()) + ' ' + this.trgtCurCd + ' 입니다.
                    } else {
                        // self.kvAlert(errorData.errMsg);
                        // 전문 호출 에러 메시지 언어팩 적용
                        self.kvAlert(self.$t('sys_err.' + errorData.errCode));
                    }
                });
            } else {
                self.kvAlert(self.$t('exchange.e017'));     // 로그인 후 이용 가능합니다.
            }
        },
        orderWatch(buySell, orderResult) {      // 자동감시주문 요청
            var self = this;

            var payload = [];
            payload['buySell'] = buySell;
            payload['orderResult'] = orderResult;

            self.$store.dispatch('orderWatch', payload).then((data) => {
                if(data) {
                    self.reset();
                    self.kvAlert(self.orderSuccessStrings[self.orderType]);
                }
            }, (errorData) => {
                //trName errCode
                // 90159    스탑가격을 현재가격보다 낮게 입력하세요.    =====> 높게로 변경해야됨 기획팀에서 코드 및 메시지 서버팀에 요청함

                if(errorData.errCode === '90159') {
                    self.kvAlert(self.$t('exchange.e078'));     // 스탑가격을 현재가격보다 낮게 입력하세요.
                } else {
                    // self.kvAlert(errorData.errMsg);
                    // 전문 호출 에러 메시지 언어팩 적용
                    self.kvAlert(self.$t('sys_err.' + errorData.errCode));
                }
            });
        },
        setTotalAmount() {      // 총 주문금액 계산
            if(!isNaN(this.getOnlyNumber(this.quantity)) && !isNaN(this.getOnlyNumber(this.price)) && (this.getOnlyNumber(this.price) != '0' && this.getOnlyNumber(this.quantity) != '0')) {
                var setlDecDigt = this.coinList.length > 0 ? this.$_.findWhere(this.coinList, {o_symbol : this.currentSymbol}).o_setl_dec_digt : '';
            
                var amt = NumberUtil.multiply(this.getOnlyNumber(this.price), this.getOnlyNumber(this.quantity), setlDecDigt, 'floor');

                this.totalAmount = this.addComma(amt);
                if(!this.isPC) {
                    this.setChangedTotalAmount(amt);
                }
            } else {
                this.totalAmount = '0';
                this.changedTotalAmount = '0';
            }
        },
        setChangedStopPrice(price) {        // 스탑가격 KRW 환산값 계산
            if(this.setlCurCd !== 'KRW') {
                var text = this.getOnlyNumber(price.toString());
                var nLenBelowDigitArray = [1];

                var amtKRW = text * this.krwchg;

                var hogaUnit = UnitManager.getHogaUnit(this.hogaUnit, 'KRW', amtKRW, undefined, undefined, nLenBelowDigitArray);
                var hogaUnitBelowPntDigit = NumberUtil.getLenBelowDigit(hogaUnit);
                
                if(hogaUnitBelowPntDigit == 0){
                    this.changedStopPrice = this.addComma(Math.floor(amtKRW));
                }else{                    
                    this.changedStopPrice = this.addComma(amtKRW.toFixed(hogaUnitBelowPntDigit));   // 2019.02.15 환산값 반올림으로 수정
                }
            }
        },
        setChangedTotalAmount(price) {      // 총 주문금액 KRW 환산값 계산
            if(this.setlCurCd !== 'KRW') {
                var text = this.getOnlyNumber(price.toString());
                var nLenBelowDigitArray = [1];

                var amtKRW = text * this.krwchg;

                var hogaUnit = UnitManager.getHogaUnit(this.hogaUnit, 'KRW', amtKRW, undefined, undefined, nLenBelowDigitArray);
                var hogaUnitBelowPntDigit = NumberUtil.getLenBelowDigit(hogaUnit);

                if(hogaUnitBelowPntDigit == 0){
                    this.changedTotalAmount = this.addComma(Math.floor(amtKRW));
                }else{                    
                    this.changedTotalAmount = this.addComma(amtKRW.toFixed(hogaUnitBelowPntDigit));   // 2019.02.15 환산값 반올림으로 수정
                }
            }
        },
        setChangedPrice(price) {        // 매수가격 KRW 환산값 계산
            if(this.setlCurCd !== 'KRW') {
                var text = this.getOnlyNumber(price.toString());
                var nLenBelowDigitArray = [1];

                var amtKRW = text * this.krwchg;

                var hogaUnit = UnitManager.getHogaUnit(this.hogaUnit, 'KRW', amtKRW, undefined, undefined, nLenBelowDigitArray);
                var hogaUnitBelowPntDigit = NumberUtil.getLenBelowDigit(hogaUnit);

                if(hogaUnitBelowPntDigit == 0){
                    this.changedPrice = this.addComma(Math.floor(amtKRW));
                }else{                    
                    this.changedPrice = this.addComma(amtKRW.toFixed(hogaUnitBelowPntDigit));   // 2019.02.15 환산값 반올림으로 수정
                }
            }
        },
        setChangedDistance(price) {     // 최저가대비상승폭 KRW 환산값 계산
            if(this.setlCurCd !== 'KRW') {
                var text = this.getOnlyNumber(price.toString());
                var nLenBelowDigitArray = [1];

                var amtKRW = text * this.krwchg;

                var hogaUnit = UnitManager.getHogaUnit(this.hogaUnit, 'KRW', amtKRW, undefined, undefined, nLenBelowDigitArray);
                var hogaUnitBelowPntDigit = NumberUtil.getLenBelowDigit(hogaUnit);

                if(hogaUnitBelowPntDigit == 0){
                    this.changedDistance = this.addComma(Math.floor(amtKRW));
                }else{                    
                    this.changedDistance = this.addComma(amtKRW.toFixed(hogaUnitBelowPntDigit));   // 2019.02.15 환산값 반올림으로 수정
                }
            }
        },
        setChangedAmount(price) {       // 주문금액 KRW 환산값 계산
            if(this.setlCurCd !== 'KRW') {
                var text = this.getOnlyNumber(price.toString());
                var nLenBelowDigitArray = [1];

                //var amtKRW = text * this.krwchg;
                var amtKRW = text * this.curprc * this.krwchg;

                var hogaUnit = UnitManager.getHogaUnit(this.hogaUnit, 'KRW', amtKRW, undefined, undefined, nLenBelowDigitArray);
                var hogaUnitBelowPntDigit = NumberUtil.getLenBelowDigit(hogaUnit);

                if(hogaUnitBelowPntDigit == 0){
                    this.changedAmount = this.addComma(Math.floor(amtKRW));
                }else{                    
                    this.changedAmount = this.addComma(amtKRW.toFixed(hogaUnitBelowPntDigit));   // 2019.02.15 환산값 반올림으로 수정
                }
            }
        },
        buyInputChange(val) {       // 호가창 매수가격 클릭 시 가격입력 스타일 설정
            if (val !== this.getOnlyNumber(this.price)) {
                this.buyPriceChange = true;
            } else {
                this.buyPriceChange =  false;
            }

            setTimeout(() => this.buyPriceChange = false, 300);
        },
        buyHelpInfo(_part, _orderType) {        // 주문유형 도움말
            var title, content;
            switch(_orderType) {
                case '1':
                    title = this.$t('exchange.e103');       // 시장가(매수)
                    content = this.$t('exchange.e104');     // 주문금액만큼 시장가격으로 빠르게 매수합니다.
                    break;
                case '2':
                    title = this.$t('exchange.e101');       // 지정가
                    content = this.$t('exchange.e102');     // 직접 입력한 가격 및 수량으로 주문이 실행됩니다.
                    break;
                case '3':
                    title = this.$t('exchange.e107');       // 스탑 지정가
                    content = this.$t('exchange.e108');     // 현재가격이 스탑가격에 도달하면 주문이 실행됩니다.
                    break;
                case '4':
                    title = this.$t('exchange.e109');       // 스탑 시장가
                    content = this.$t('exchange.e108');     // 현재가격이 스탑가격에 도달하면 주문이 실행됩니다.
                    break;
                case '5':
                    title = this.$t('exchange.e110');       // 트레일링 스탑(매수)
                    content = this.$t('exchange.e111');     // 최저가에서 (최저가대비상승폭)만큼 상승하면 주문이 실행됩니다.
                    break;
            }

            if (_part === 'title') {
                return title;
            } else if (_part === 'content') {
                return content;
            }
        },
        getData() {
            var self = this;
            self.initOrderAble();
            self.getOrderAble();
            self.getFee();
            self.getPriceLimit();
            self.fetchAssetProfitData({fee_tp : '0'});
            self.requestNowPrice();
            self.registerReal();
        },
        requestNowPrice() {
            var self = this;
            var symbol = this.$store.state.data.currentSymbol;
            this.$socket.sendProcessByName('i0018',
                function (queryData) {
                    var block = queryData.getBlockData('InBlock1')[0];
                    // 조회구분
                    block['symbolcnt'] = '1';
                    block['qry_div'] = '4';
                    block['paycurrcode'] = '99999';
                    block['excode'] = '001';
                    var block2 = queryData.queryObj['InBlock2'];
                    block2.push({
                        'symbol': symbol
                    });
                }, function (queryData) {
                    if (queryData != null) {
                        var OutBlock1 = queryData['queryObj']['OutBlock2'][0];            
                        self.curprc = OutBlock1.curprc;
                        self.highprc = OutBlock1.highprc;
                        self.lowprc = OutBlock1.lowprc;
                    } else {

                        // 전문 에러 언어팩 적용
                        const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                        if (errorData.trName != "i0018") return

                        self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                            dangerouslyUseHTMLString: true,
                            confirmButtonText: self.$t('sys_err.a001')
                        });
                    }
                }
            );
        },
        registerReal() {
            var self = this;
            
            self.$socket.unregisterReal('KVS0', [self.beforeSymbol], self.name);
            self.$socket.registerReal('KVS0', "symbol", [self.currentSymbol], self.name,
                function (queryData) {
                    
                    // 리얼데이터 예외처리 Start
                    if(queryData == null) return;
                    self.realDataKVS0 = queryData.queryObj.OutBlock1[0];
                    if(self.realDataKVS0 == null || self.currentSymbol != self.realDataKVS0['symbol']) return;
                    // 리얼데이터 예외처리 End

                    self.excuetKVS0Buy();
                    // self.$nextTick(function() {
                    //     self.excuetKVS0Buy();
                    // });
                }
            );
        },
        excuetKVS0Buy() {
            var self = this;
            if(self.realDataKVS0 != null && self.realDataKVS0['execprice'] != null) {
                self.curprc = self.realDataKVS0['execprice'];
                self.highprc = self.realDataKVS0['highprc'];
                self.lowprc = self.realDataKVS0['lowprc'];
                //self.realDataKVS0 = null;
            }
        },
        autoOrderDialogClose() {    // 자동감시주문 이용동의 팝업창 닫기
            this.orderType = this.orderTypeOld;
            this.orderTypeOld = null;
            this.autoOrderTerms = false;
            this.autoOrderDialogVisible = false;
        },
        getAutoOrderTerms() {   // vuex에 저장된 자동감시주문 이용동의 여부 값이 없으면 새로 조회
            var self = this;
            var payload = [];
            
            self.$socket.sendProcessByName('ac535', (queryData) => {
                var block = queryData.getBlockData('InBlock1')[0];
                block['user_id'] = self.getUserId;
                block['terms_kind'] = '03';

            }, (queryData) => {
                if( queryData ) {
                    var res = queryData['queryObj']['OutBlock1'][0];    
                    
                    self.setAutoOrdTerms(res.use_terms);    // vuex에 자동감시주문 이용동의 여부 저장

                    if(res.use_terms == '1') {
                        self.autoOrderDialogVisible = false;
                        self.orderTypeOld = null;
                        self.reset();
                    } else {
                        self.autoOrderDialogVisible = true;
                    }
                } else {
                    
                    // 전문 에러 언어팩 적용
                    const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                    if (errorData.trName != "ac535") return

                    self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: self.$t('sys_err.a001')
                    });
                }
            });
        },
        setAutoOrderTerms() {   // 자동감시주문 이용 동의
            var self = this;
            var payload = [];

            payload.useTerms = '1';
            
            this.$store.dispatch('agreeAutoOrdTerms', payload).then((data) => {
                if(data) {
                    self.autoOrderTerms = true;
                    self.autoOrderDialogVisible = false;
                    self.orderTypeOld = null;
                    self.kvAlert(self.$t('exchange.g007')); // 이용 동의가 접수되었습니다.
                }
            }, null).catch((errorData) => {
                //trName: "ac170", errCode: "49108", errMsg: "이미 약관동의 상태입니다."}
                if(errorData.errCode === '49108') {
                    self.autoOrderTerms = true;
                    self.autoOrderDialogVisible = false;
                    self.orderTypeOld = null;
                    self.kvAlert(self.$t('exchange.g009'));
                } else {
                    // self.kvAlert(errorData.errMsg);
                    // 전문 호출 에러 메시지 언어팩 적용
                    self.kvAlert(self.$t('sys_err.' + errorData.errCode));
                }
            });
        },
        loadStockDataCallback(){
            var self = this;
            if(self.dataLoaded) return;
            self.dataLoaded = true;
            self.getData();
            
            self.setlCurCd = self.coinList.length > 0 ? self.$_.findWhere(self.coinList, {o_symbol : self.currentSymbol}).o_setl_cur_cd_n : '';
            self.trgtCurCd = self.coinList.length > 0 ? self.$_.findWhere(self.coinList, {o_symbol : self.currentSymbol}).o_trgt_cur_cd_n : '';
        },
        resetLoadStockDataCallback(){
            var self = this;
            self.dataLoaded = false;
        },
        changeCurrentSymbolCallback(symbol){
            var self = this;
            self.reset();
            self.getData();

            self.setlCurCd = self.coinList.length > 0 ? self.$_.findWhere(self.coinList, {o_symbol : self.currentSymbol}).o_setl_cur_cd_n : '';
            self.trgtCurCd = self.coinList.length > 0 ? self.$_.findWhere(self.coinList, {o_symbol : self.currentSymbol}).o_trgt_cur_cd_n : '';
        },
        // 호가가격 빼기
        subtractHoga() {
            var nLenBelowDigitArray = [1];
            var callPrice = this.curprc * 1;
            var hogaUnit = UnitManager.getHogaUnit(this.hogaUnit, this.setlCurCd, callPrice, undefined, undefined, nLenBelowDigitArray);

            if (this.distance === undefined || this.distance === '') {
                //값이 입력되지 않았을 경우 호가 입력
                var hoga = UnitManager.flooredDecimalWithCommas(hogaUnit, nLenBelowDigitArray[0]);
                this.distance = hoga;
                return;
            }

            var priceText = this.getOnlyNumber(this.distance);
            var nIndexDot = priceText.indexOf('.');
            if( nIndexDot > -1) {
                priceText = priceText.substr( 0, nIndexDot + nLenBelowDigitArray[0] + 1);
            }
            
            callPrice = priceText * 1;
            var price = NumberUtil.substract_Hoga(callPrice, hogaUnit, nLenBelowDigitArray[0]);
            price *= 1;
            if (price <= 0) {
                return;
            }

            price = price.toFixed(nLenBelowDigitArray[0]).toString();
            this.distance = this.addComma(price);
        },
        // 호가가격 더하기
        addHoga() {
            var nLenBelowDigitArray = [1];
            var callPrice = this.curprc * 1;
            var hogaUnit = UnitManager.getHogaUnit(this.hogaUnit, this.setlCurCd, callPrice, undefined, undefined, nLenBelowDigitArray);

            if(this.distance === undefined || this.distance === '') {
                //값이 입력되지 않았을 경우 호가 입력
                var hoga = UnitManager.flooredDecimalWithCommas(hogaUnit, nLenBelowDigitArray[0]);
                this.distance = hoga;
                return;
            }

            var priceText = this.getOnlyNumber(this.distance);
            var nIndexDot = priceText.indexOf('.');
            if( nIndexDot > -1) {
                priceText = priceText.substr( 0, nIndexDot + nLenBelowDigitArray[0] + 1);
            }
            
            callPrice = priceText * 1;
            var price = NumberUtil.add_Hoga(callPrice, hogaUnit, nLenBelowDigitArray[0]);
            price *= 1;
            if (price >= 10000000000) {
                return;
            }

            price = price.toFixed(nLenBelowDigitArray[0]).toString();
            this.distance = this.addComma(price);
        },
        ...mapActions(['initOrderAble', 'getOrderAble', 'getFee', 'getPriceLimit', 'fetchAssetProfitData', 'agreeAutoOrdTerms']),
        ...mapMutations(['setAutoOrdTerms'])
    },
    watch: {
        orderType: function(val, oldVal) {      // 자동감시주문 선택 시 이용동의 팝업  
            if(this.orderType >= 3) {
                this.orderTypeOld = oldVal;

                if(this.getAutoOrdTerms == null) {
                    this.getAutoOrderTerms(val, oldVal);
                } else if(this.getAutoOrdTerms == '0') {
                    this.autoOrderDialogVisible = true;
                } else {
                    this.orderTypeOld = null;
                    this.reset();
                }
            } else {
                this.orderTypeOld = null;
                this.reset();
            }
        },
        stopPrice: function(val, oldVal) {
            if(!this.isPC) {
                this.setChangedStopPrice(val);
            }
        },
        quantity: function(val, oldVal) {
            this.setTotalAmount();
        },
        price: function(val, oldVal) {
            this.setTotalAmount();
            if(!this.isPC) {
                this.setChangedPrice(val);
            }
        },
        distance: function(val, oldVal) {
            if(!this.isPC) {
                this.setChangedDistance(val);
            }
        },
        amount: function(val, oldVal) {
            if(!this.isPC) {
                this.setChangedAmount(val);   
            }
        }
    },
    created() {
        var self = this;
        var md = new MobileDetect(window.navigator.userAgent);
        if (md.phone()) {
            self.isPC = false;
        } else {
            self.isPC = true;
        }
    },
    mounted() {
        var self = this;

        self.$EventBus.$on('loadStockData', self.loadStockDataCallback);
        self.$EventBus.$on('changeCurrentSymbol', self.changeCurrentSymbolCallback);
        self.$EventBus.$on('resetLoadStockData', self.resetLoadStockDataCallback);

        if(self.coinList.length > 0 && !self.dataLoaded){
            self.$EventBus.$emit('loadStockData');
        }

        self.currentBtcKrPrice = self.$store.state.data.currentBtcKrPrice;
        self.currentEthKrPrice = self.$store.state.data.currentEthKrPrice;
        // 마켓한화현재가
        if(self.currentSymbol.indexOf('_BTC_') > -1) {
            self.krwchg = self.$store.state.data.currentBtcKrPrice;
        }
        if(self.currentSymbol.indexOf('_ETH_') > -1) {
            self.krwchg = self.$store.state.data.currentEthKrPrice;
        }
        
        self.$EventBus.$on("currentKrPrice", (data) => {
            self.currentBtcKrPrice = self.$store.state.data.currentBtcKrPrice;
            self.currentEthKrPrice = self.$store.state.data.currentEthKrPrice;
            // 마켓한화현재가
            if(self.currentSymbol.indexOf('_BTC_') > -1) {
                self.krwchg = self.$store.state.data.currentBtcKrPrice;
            }
            if(self.currentSymbol.indexOf('_ETH_') > -1) {
                self.krwchg = self.$store.state.data.currentEthKrPrice;
            }
        });

        self.$EventBus.$on('changeHoga', (hoga) => {
            self.buyInputChange(hoga);
            self.price = self.addComma(hoga);
        });
    },
    beforeDestroy() {
        var self = this;
        self.$socket.unregisterReal('KVS0', [self.currentSymbol], self.name);
        clearTimeout();

        self.$EventBus.$off('loadStockData', self.loadStockDataCallback);
        self.$EventBus.$off('resetLoadStockData', self.resetLoadStockDataCallback);
        self.$EventBus.$off('changeCurrentSymbol', self.changeCurrentSymbolCallback);
    }
};
</script>