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
    <el-table :data="customers" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <!-- <el-table-column type="selection" width="55">
      </el-table-column> -->
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="username" label="아이디" width="160" sortable>
      </el-table-column>
      <el-table-column prop="name" label="이름" width="120" sortable>
      </el-table-column>
      <el-table-column prop="gender" :formatter="genderFormat" label="성별" width="100" sortable>
      </el-table-column>
      <el-table-column prop="phone" label="전화번호" min-width="180" sortable>
      </el-table-column>
      <el-table-column prop="userEmail" label="이메일" min-width="180" sortable>
      </el-table-column>
      <el-table-column label="상세보기" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="showCustomer(scope)">상세보기</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="예약상세" :visible.sync="dialogFormVisible">
      <el-form :model="selectedCustomer">
        <el-form-item label="이름" :label-width="formLabelWidth">
          <el-input @input="changeCustomer['name'] = $event" :value="selectedCustomer.name"></el-input>
        </el-form-item>
        <el-form-item label="전화번호" :label-width="formLabelWidth">
          <el-input @input="changeCustomer['phone'] = $event" :value="selectedCustomer.phone"></el-input>
        </el-form-item>
        <el-form-item label="이메일" :label-width="formLabelWidth">
          <el-input v-model="selectedCustomer.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="가입일" :label-width="formLabelWidth">
          {{selectedCustomer.createDate | dateFotmatter}}
          <!-- <el-input v-model="selectedCustomer.userEmail"></el-input> -->
        </el-form-item>
        <el-form-item label="성별" :label-width="formLabelWidth">
          <!-- {{selectedCustomer.gender | genderFilter}} -->
          <!-- <el-input v-model="selectedCustomer.userEmail"></el-input> -->
          <el-radio v-model="selectedCustomer.gender" @change="changeCustomer['gender'] = $event" label="M">남자</el-radio>
          <el-radio v-model="selectedCustomer.gender" @change="changeCustomer['gender'] = $event" label="F">여자</el-radio>
        </el-form-item>
        <el-form-item label="로그인타입" :label-width="formLabelWidth">
          {{selectedCustomer.loginType | loginTypeFilter}}
          <!-- <el-input v-model="selectedCustomer.userEmail"></el-input> -->
        </el-form-item>
        <el-form-item label="그룹코드" :label-width="formLabelWidth">
          <el-input @input="changeCustomer['groupCode'] = $event" :value="selectedCustomer.groupCode"></el-input>
          <!-- <el-input v-model="selectedCustomer.userEmail"></el-input> -->
        </el-form-item>
        <el-form-item label="디바이스" :label-width="formLabelWidth">
          {{selectedCustomer.osType}}
          <!-- <el-input v-model="selectedCustomer.userEmail"></el-input> -->
        </el-form-item>
        <el-form-item label="푸시토큰" :label-width="formLabelWidth">
          <el-input v-model="selectedCustomer.pushToken"></el-input>
        </el-form-item>
        <el-form-item label="탈퇴 여부" :label-width="formLabelWidth">
          <el-radio v-model="selectedCustomer.active" @change="changeCustomer['active'] = $event" :label="true">사용중</el-radio>
          <el-radio v-model="selectedCustomer.active" @change="changeCustomer['active'] = $event" :label="false">탈퇴</el-radio>
        </el-form-item>
        <el-form-item v-show="selectedCustomer.active == false" label="탈퇴일" :label-width="formLabelWidth">
          {{selectedCustomer.deleteDate | dateFotmatter}}
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">닫기</el-button>
        <el-button type="primary" @click="editCustomer">고객정보 수정</el-button>
        <!-- <el-button type="danger" @click="cancelReservation">예약 취소</el-button>
        <el-button type="primary" @click="confirmReservation">예약 확정</el-button> -->
      </span>
    </el-dialog>
  </section>
</template>

<script>
  import util from '../../common/js/util';
  import moment from 'moment';
  import {
    getCustomers,
    editCustomers
  } from '../../api/api';
  import {
    _
  } from 'vue-underscore';

  export default {
    data() {
      return {
        name: '',
        customers: [],
        listLoading: false,
        dialogFormVisible: false,
        selectedCustomer: {
          name: '',
          genger: '',
          phone: '',
          email: '',
          active: '',
          birthday: '',
          createDate: '',
          deleteDate: '',
          email: '',
          groupCode: '',
          id: '',
          loginType: '',
          newsletter: '',
          osType: '',
          profileImage: '',
          pushAgree: '',
          pushToken: '',
          username: ''
        },
        changeCustomer: {},
        formLabelWidth: '120px'
      };
    },
    filters: {
      dateFotmatter(date) {
        if (date == null || date.length == 0) {
          return '';
        }
        return moment(date).format('YYYY년 MM월 DD일 HH:mm');
      },
      genderFilter(gender) {
        if (gender == 'M') {
          return '남자';
        } else if (gender == 'F') {
          return '여자';
        }
        return '';
      },
      loginTypeFilter(type) {
        if (type == 'K') {
          return '카카오';
        } else if (type == 'N') {
          return '네이버';
        } else if (type == 'E') {
          return '이메일';
        }
        return '';
      },
      activeFilter(active) {
        console.log(active);
        return '1';
      }
    },
    methods: {
      getUsers() {},
      requestCustomers() {
        var obj = {};
        var self = this;
        this.listLoading = true;
        getCustomers(this.$http, obj).then((res) => {
          this.listLoading = false;
          if (res.ok) {
            self.customers = res.body;
          }
          console.log(res);
        });
      },
      showCustomer(scope) {
        console.log(scope);
        this.selectedCustomer = scope.row;
        this.dialogFormVisible = true;
      },
      genderFormat(row, column, cellValue, index) {
        if (cellValue == 'M') {
          return '남자';
        } else if (cellValue == 'F') {
          return '여자';
        }
        return '';

      },
      editCustomer() {
        console.log(this.changeCustomer);
        var self = this;
        
        if (window.confirm('고객 정보를 수정 하시겠습니까?')) {
          self.listLoading = true;
          var active = self.changeCustomer['active'];
          if(active != null && active == false ){
            self.changeCustomer['deleteDate'] = new Date();
          }else {
            // self.changeCustomer['deleteDate'] = '';
          }
          editCustomers(self.$http, self.selectedCustomer.id, self.changeCustomer).then((res) => {
            self.listLoading = false;
            if (res.ok) {
              // self.customers = res.body;
              window.alert('고객 정보를 수정 되었습니다.');
              self.dialogFormVisible = false;
            }
            console.log(res);
            self.changeCustomer = {};
          });
        }


      }
    },
    mounted() {
      // this.getReservation();
      this.requestCustomers();
    }
  };
</script>

<style scoped>
</style>