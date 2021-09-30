<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="name" placeholder="이름"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">검색</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="reservations" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <!-- <el-table-column type="selection" width="55">
      </el-table-column> -->
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="hospital.hospitalName" label="병원명" min-width="100" sortable >
      </el-table-column>
      <el-table-column prop="reservationDate" :formatter="reservationFilter" label="예약요청일" min-width="180" sortable >
      </el-table-column>
      <el-table-column prop="customer.name" label="이름" width="120" sortable>
      </el-table-column>
      <el-table-column prop="customer.gender" :formatter="genderFormat" label="성별" width="100"  sortable>
      </el-table-column>
      <el-table-column prop="customer.phone" label="전화번호" min-width="180" sortable>
      </el-table-column>
      <el-table-column prop="status" :formatter="statusFormat" label="상태" min-width="100" sortable>
      </el-table-column>
      <el-table-column label="상세보기" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="showReservation(scope)">예약보기</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="예약상세" :visible.sync="dialogFormVisible">
      <el-form :model="selectedReservation">
        <el-form-item label="이름" :label-width="formLabelWidth">
          {{selectedReservation.customer.name}}
        </el-form-item>
        <el-form-item label="전화번호" :label-width="formLabelWidth">
          {{selectedReservation.customer.phone}}
        </el-form-item>
        <el-form-item label="예약요청일" :label-width="formLabelWidth">
          {{selectedReservation.reservationDate | dateFotmatter}}
        </el-form-item>
        <el-form-item label="예약생성일" :label-width="formLabelWidth">
          {{selectedReservation.createDate | dateFotmatter}}
        </el-form-item>
        <el-form-item label="요청진료내용" :label-width="formLabelWidth">
          <el-tag v-for="preExam in selectedReservation.preExaminations" :key="preExam.id" type="info">{{$store.state.data.getPreExam(preExam.id)[0].name}}</el-tag>
        </el-form-item>
        <el-form-item label="추가입력사항" :label-width="formLabelWidth">
          {{selectedReservation.etc}}
        </el-form-item>
        <el-form-item label="예약일 변경" :label-width="formLabelWidth">
          <el-checkbox v-model="changeReservation">변경</el-checkbox>
        </el-form-item>
        
        <el-form-item label="예약변경일" :label-width="formLabelWidth" v-show="changeReservation">
          <el-date-picker
            v-model="changeReservationDate"
            type="date"
            placeholder="예약일 선택">
          </el-date-picker>
        </el-form-item>
        
        <el-form-item label="예약변경시간" :label-width="formLabelWidth" v-show="changeReservation">
          <el-time-select
              v-model="changeReservationTime"
              :picker-options="{
                start: '08:00',
                step: '00:30',
                end: '20:30'
              }"
              placeholder="Select time">
            </el-time-select>
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">닫기</el-button>
        <el-button type="danger" @click="cancelReservation">예약 취소</el-button>
        <el-button type="primary" @click="confirmReservation">예약 확정</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
  import util from '../../common/js/util';
  import moment from 'moment';
  import { getReservation,editReservation} from '../../api/api';
  import {_} from 'vue-underscore';

  export default {
    data() {
      return {
        name: '',
        listLoading: false,
        changeReservation: false,
        changeReservationDate : new Date(),
        changeReservationTime : '08:00',
        reservations : [],
        formLabelWidth: '120px',
        dialogFormVisible: false,
        selectedReservation: {
          reservationDate: '',
          createDate: '',
          customer : {
            name: '',
            phone: ''
            
          },
          preExaminations: []
        }
      };
    },
    filters : {
      dateFotmatter(date){
        return moment(date).format('YYYY년 MM월 DD일 HH:mm');
      }
    },
    methods: {
      reservationFilter(row, column, cellValue, index){
        
        return moment(cellValue).format('YYYY년 MM월 DD일 HH:mm');
      },
      genderFormat(row, column, cellValue, index){
        if(cellValue == 'M'){
          return '남자';
        }else if(cellValue == 'F'){
          return '여자';
        }
        return '';
        
      },
      statusFormat(row, column, cellValue, index){
        switch(cellValue){
          case 'RR':
          return '예약요청중';
          case 'RC':
          return '예약확정';
          case 'TC':
          return '방문완료';
          case 'CC':
          return '예약취소';
          
          
        }
      },
      getUsers(){

      },
      getReservation() {
        var self = this;
        var obj = {
          where: {
            status: "RR"
            
          },
          include: [{
              relation: "customer"
            },
            {
              relation: "hospital"
            },
          ],
          order: 'createDate DESC',
        };
        this.listLoading = true;

        getReservation(this.$http, obj).then((res) => {
          this.listLoading = false;
          if(res.ok){
            self.reservations = res.body;
          }
          console.log(res);
        });
      },
      showReservation(scope){
        console.log(scope);

        this.changeReservation = false;
        this.changeReservationDate = new Date();
        this.changeReservationTime = '08:00';
        this.selectedReservation = scope.row;
        this.dialogFormVisible = true;
      },
      cancelReservation(){
        console.log(this);
        var self = this;
        if(window.confirm('정말 예약을 취소하시겠습니까?')){
          console.log('cancel');
          console.log(this);
          var params = {
            status : 'CC'
          };
          editReservation(this.$http, this.selectedReservation.id, params).then(res => {
            self.dialogFormVisible = false;
            console.log(res);
            
            if(res.ok){
              console.log(this.selectedReservation);
              var reservation = _.findWhere(self.reservations, {id: this.selectedReservation.id});
              console.log(reservation);
              if(reservation != null){
                reservation.status = 'CC';
              }
              window.alert('예약이 취소 되었습니다.');
              
              
            }
            
            
            
          });

        }
        
      },
      confirmReservation(){
        console.log(this);
        var self = this;
        if(window.confirm('예약확정을 진행 하시겠습니까?')){
          
          console.log(this);
          var params = {
            status : 'RC'
          };
          if(this.changeReservation){
            var date = moment(this.changeReservationDate);
            var time = this.changeReservationTime;
            var newTime = time.split(':');
              date.set({
                h: newTime[0],
                m: newTime[1],
                s: '00'
              });
              params['reservationDate'] = date.toDate();
          }
          editReservation(this.$http, this.selectedReservation.id, params).then(res => {
            self.dialogFormVisible = false;
            console.log(res);
            
            if(res.ok){
              console.log(this.selectedReservation);
              var reservation = _.findWhere(self.reservations, {id: this.selectedReservation.id});
              console.log(reservation);
              if(reservation != null){
                reservation.status = 'RC';
              }
              window.alert('예약이 확정 되었습니다.');
              
              
            }
            
            
            
          });

        }
      }
    },
    mounted() {
      this.getReservation();
    }
  };
</script>

<style scoped>
</style>