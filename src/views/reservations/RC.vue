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
      <el-table-column prop="reservationDate" :formatter="reservationFilter" label="예약요청일" min-width="180" sortable>
      </el-table-column>
      <el-table-column prop="customer.name" label="이름" width="120" sortable>
      </el-table-column>
      <el-table-column prop="customer.gender" :formatter="genderFormat" label="성별" width="100" sortable>
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
        <el-row>
          <el-col :span="12">
            <el-form-item label="이름" :label-width="formLabelWidth">
              {{selectedReservation.customer.name}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="전화번호" :label-width="formLabelWidth">
              {{selectedReservation.customer.phone}}
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="12">
            <el-form-item label="예약요청일" :label-width="formLabelWidth">
              {{selectedReservation.reservationDate | dateFotmatter}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="예약생성일" :label-width="formLabelWidth">
              {{selectedReservation.createDate | dateFotmatter}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="요청진료내용" :label-width="formLabelWidth">
          <el-tag v-for="preExam in selectedReservation.preExaminations" :key="preExam.id" type="info">{{$store.state.data.getPreExam(preExam.id)[0].name}}</el-tag>
        </el-form-item>
        <el-form-item label="추가입력사항" :label-width="formLabelWidth">
          {{selectedReservation.etc}}
        </el-form-item>
        <el-form-item label="진료내용 입력" :label-width="formLabelWidth">
          <el-checkbox-group v-for="(subExaminations, idx) in examinations" :key="idx" v-model="checkedExams">
            <el-checkbox v-for="exam in subExaminations" :label="exam.id" :key="exam.id">{{exam.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="재방문 선택" :label-width="formLabelWidth">
          <el-checkbox v-model="reReservation">선택</el-checkbox>
        </el-form-item>

        <el-form-item label="재방문일" :label-width="formLabelWidth" v-show="reReservation">
          <el-date-picker v-model="reReservationDate" type="date" placeholder="재방문일 선택">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="재방문시간" :label-width="formLabelWidth" v-show="reReservation">
          <el-time-select v-model="reReservationTime" :picker-options="{
                start: '08:00',
                step: '00:30',
                end: '20:30'
              }" placeholder="재방문시간 선택">
          </el-time-select>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="예약 상세 내용" :label-width="formLabelWidth" v-show="reReservation">
          <el-checkbox v-model="reReservationPreExam1">기본진료+구강유전자검사</el-checkbox>
          <el-checkbox v-model="reReservationPreExam2">그 외 검사 또는 치료</el-checkbox>


        </el-form-item>
        <el-form-item label="예약 상세 내용" :label-width="formLabelWidth" v-show="reReservation">
          <el-input type="textarea" :rows="2" placeholder="예약상세내용 입력" v-model="reReservationEtc">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">닫기</el-button>
        <el-button type="danger" @click="cancelReservation">예약 취소</el-button>
        <el-button type="primary" @click="confirmReservation">진료 완료</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
  import util from '../../common/js/util';
  import moment from 'moment';
  import {
    getReservation,
    editReservation,
    createReservation
  } from '../../api/api';
  import {
    _
  } from 'vue-underscore';

  export default {
    data() {
      return {
        name: '',
        listLoading: false,
        reReservation: false,
        reReservationDate: new Date(),
        reReservationTime: '08:00',
        reReservationPreExam1: false,
        reReservationPreExam2: false,
        reReservationEtc: '',
        reservations: [],
        formLabelWidth: '120px',
        dialogFormVisible: false,
        selectedReservation: {
          reservationDate: '',
          createDate: '',
          customer: {
            name: '',
            phone: ''

          },
          preExaminations: [],
        },
        examinations: [],
        checkedExams: []
      };
    },
    filters: {
      dateFotmatter(date) {
        return moment(date).format('YYYY년 MM월 DD일 HH:mm');
      }
    },
    methods: {
      reservationFilter(row, column, cellValue, index) {

        return moment(cellValue).format('YYYY년 MM월 DD일 HH:mm');
      },
      genderFormat(row, column, cellValue, index) {
        if (cellValue == 'M') {
          return '남자';
        } else if (cellValue == 'F') {
          return '여자';
        }
        return '';

      },
      statusFormat(row, column, cellValue, index) {
        switch (cellValue) {
          case 'RR':
            return '예약요청중';
          case 'RC':
            return '예약확정';
          case 'TC':
            return '진료완료';
          case 'CC':
            return '예약취소';


        }
      },
      getUsers() {},
      createExams() {
        var self = this;
        console.log(this.$store.state.data.examinations);
        var examinations = this.$store.state.data.examinations;
        var max = _.max(examinations, (exam) => {
          return exam.row;
        });
        max = parseInt(max.row);
        console.log(max);
        var min = _.min(examinations, (exam) => {
          return exam.row;
        });
        min = parseInt(min.row);
        var examContainers = [];
        var checkedExams = [];
        for (var i = min; i <= max; i++) {
          examContainers.push(new Array());
          //   checkedExams.push(new Array());
        }
        //   self.checkedExams = checkedExams;
        _.each(examinations, function (exam, index, list) {
          examContainers[parseInt(exam.row)].push(exam);
          if (examinations.length <= index + 1) {

            self.examinations = examContainers;
          }
        });

      },
      getReservation() {
        var self = this;
        var obj = {
          where: {
            status: "RC"

          },
          include: [{
            relation: "customer"

          }]
        };
        this.listLoading = true;

        getReservation(this.$http, obj).then((res) => {
          this.listLoading = false;
          if (res.ok) {
            self.reservations = res.body;
          }
          console.log(res);
        });
      },
      showReservation(scope) {
        console.log(scope);

        this.reReservation = false;
        this.reReservationDate = new Date(),
        this.reReservationTime = '08:00';
        this.reReservationEtc = '';
        this.reReservationPreExam1 = false;
        this.reReservationPreExam2 = false;
        this.selectedReservation = scope.row;
        this.dialogFormVisible = true;
      },
      cancelReservation() {
        console.log(this);
        var self = this;
        if (window.confirm('정말 예약을 취소하시겠습니까?')) {
          console.log('cancel');
          console.log(this);
          var params = {
            status: 'CC'
          };
          editReservation(this.$http, this.selectedReservation.id, params).then(res => {
            self.dialogFormVisible = false;
            console.log(res);

            if (res.ok) {
              console.log(this.selectedReservation);
              var reservation = _.findWhere(self.reservations, {
                id: this.selectedReservation.id
              });
              console.log(reservation);
              if (reservation != null) {
                reservation.status = 'CC';
              }
              window.alert('예약이 취소 되었습니다.');


            }



          });

        }

      },
      confirmReservation() {
        console.log(this);
        console.log(this.checkedExams);
        var self = this;

        if (window.confirm('진료을 진행 하시겠습니까?')) {

          console.log(this);
          var checkedExams = [];
          for (var i = 0; i < this.checkedExams.length; i++) {
            var obj = {
              id: this.checkedExams[i]
            };
            checkedExams.push(obj);
          }
          var params = {
            status: 'TC',
            examinations: checkedExams
          };
          editReservation(this.$http, this.selectedReservation.id, params).then(res => {
            self.dialogFormVisible = false;
            console.log(res);

            if (res.ok) {
              console.log(this.selectedReservation);
              var reservation = _.findWhere(self.reservations, {
                id: this.selectedReservation.id
              });
              console.log(reservation);
              if (reservation != null) {
                reservation.status = 'TC';
              }
              if(self.reReservation == true){
                var date = moment(this.reReservationDate);
                var time = this.reReservationTime;
                var newTime = time.split(':');
                date.set({
                    h: newTime[0],
                    m: newTime[1],
                    s: '00'
                });
                var rePreExams = [];
                if(self.reReservationPreExam1){
                    rePreExams.push({
                        id : 1
                    });
                }
                if(self.reReservationPreExam2){
                    rePreExams.push({
                        id : 2
                    });
                }
                  var obj = {
                      reservationDate : date.toDate(),
                      medicalType : 'D026',
                      originId : self.selectedReservation.id,
                      customerId : self.selectedReservation.customer.id,
                      preExaminations: rePreExams,
                      etc : self.reReservationEtc,
                      status: 'RC',
                      hospitalId: self.selectedReservation.hospitalId
                  };
                  createReservation(this.$http, obj).then( response => {
                      console.log(response);
                      window.alert('예약이 확정 되었습니다.');
                  });
              }else {
                  window.alert('예약이 확정 되었습니다.');
              }
              


            }



          });

        }
      }
    },
    mounted() {
      this.getReservation();
      var self = this;
      this.$store.watch(
        function (state) {
          //return state.my_state;
          console.log(state)
          if (state.data.examinations != null) {
            self.createExams();
          }
        },
        function () {
          //do something on data change
        }, {
          deep: true //add this if u need to watch object properties change etc.
        }
      );
      //
    }
  };
</script>

<style scoped>
</style>