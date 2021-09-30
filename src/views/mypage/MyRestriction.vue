<template>
  <div class="MyRestriction">
    <h2>{{ $t('mypage.l001') }}<!-- 거래제한 등록/해지 신청 --></h2>

    <div class="table">
      <table>
        <colgroup>
          <col style="width: 150px;">
          <col>
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ $t('mypage.l002') }}<!-- 거래제한 구분 --></th>
            <td>
              <el-select v-model="form.cnst_tp">
                <el-option v-for="item in restictionGb" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <th scope="row">{{ $t('mypage.l003') }}<!-- 등록/해지 구분 --></th>
            <td>
              <el-radio v-model="form.regi_tp" label="1">{{ $t('mypage.l004') }}<!-- 등록 --></el-radio>
              <el-radio v-model="form.regi_tp" label="2">{{ $t('mypage.l005') }}<!-- 해지 --></el-radio>
            </td>
          </tr>
          <tr>
            <th scope="row">{{ $t('mypage.l006') }}<!-- 사유 --></th>
            <td>
              <input v-model="form.resn_nm" class="input" style="width: 100%;">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="btns alignR">
      <el-button @click="register" class="button bg01" style="width: 120px;">{{ $t('mypage.l007') }}<!-- 신청 --></el-button>
    </div>
  
    <el-table :data="list" border class="table table-list">
			<el-table-column :label="$t('mypage.l002')" width="200"><!-- 거래제한 구분 -->
				<template slot-scope="scope">{{ toRestriction(scope.row.cnst_tp) }}</template>
			</el-table-column>
			<el-table-column :label="$t('mypage.l008')" width="200"><!-- 거래제한 일자 -->
				<template slot-scope="scope">{{ scope.row.regi_dt | toMoment }}</template>
			</el-table-column>
      <el-table-column :label="$t('mypage.l006')"><!-- 사유 -->
				<template slot-scope="scope">{{ scope.row.resn_nm }}</template>
			</el-table-column>
		</el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      list: [],
      form: {},
    };
  },
  computed: {
    ...mapGetters(['getUserId', 'isSocketConnected']),
    restictionGb() {
      const self = this;
      return [
        { label: self.$t('mypage.l009'), value: '1' }, // 원화출금제한
        { label: self.$t('mypage.l010'), value: '2' }, // COIN출금제한
        { label: self.$t('mypage.l011'), value: '4' }, // 매매제한
      ];
    },
  },
  filters: {
    toMoment(dt) {
      if (dt) {
        return moment(dt).format("YYYY.MM.DD");
      }
      return "-";
    },
  },
  methods: {
    toRestriction(val) {
      const self = this;
      if (val == "1") {
        return self.$t('mypage.l009'); // 원화출금제한
      } else if (val == "2") {
        return self.$t('mypage.l010'); // COIN출금제한
      } else if (val == "4") {
        return self.$t('mypage.l011'); // 매매제한
      }
      return "-";      
    },
    resetForm() {
      const self = this;
      self.form = {
        cnst_tp: '1',
        regi_tp: '1',
        resn_nm: '',
      };
    },
    getData() {
      const self = this;
      self.$socket.sendProcessByName('ea229',
        function (queryData) {
          var block = queryData.getBlockData('InBlock1')[0];
          block['user_id'] = self.getUserId;
          block['req_cnt'] = 5;
        },
        function (queryData) {
          if (queryData) {
            self.list = queryData.getBlockData('OutBlock2');
          }
        }
      );
    },
    register() {
      const self = this;
      // 신청하시겠습니까?
      self.$confirm(self.$t('mypage.l012'), '', {
        confirmButtonText: self.$t('mypage.l007'), // 신청
        cancelButtonText: self.$t('mypage.l013') // 취소
      }).then(() => {
        self.$socket.sendProcessByName('ea129',
          function (queryData) {
            var block = queryData.getBlockData('InBlock1')[0];
            block['proc_tp'] = self.form.regi_tp == '1'?'I':'U';
            block['user_id'] = self.getUserId;
            block['cnst_tp'] = self.form.cnst_tp;
            block['regi_tp'] = self.form.regi_tp;
            block['resn_nm'] = self.form.resn_nm;
          },
          function (queryData) {
            if (queryData) {
              // 신청되었습니다
              self.$alert(self.$t('mypage.l014'), '', {
                confirmButtonText: self.$t('mypage.l015'), // 확인
                callback: action => {
                  self.resetForm();
                  self.getData();
                }
              });
            } else {
              const errorData = JSON.parse(window.sessionStorage.getItem('lastErrorData'));
              if (errorData.trName == "ea129") {
                self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                  confirmButtonText: self.$t('sys_err.a001')
                });
              }
            }
          }
        );
      }).catch(err => {});
    },
  },
  created() {
    const self = this;
    self.resetForm();
  },
  mounted() {
    let self = this;
    if (self.isSocketConnected) {
      self.getData();
    } else {
      self.$EventBus.$on("socketConnected", () => {
        self.getData();
      });
    }

    self.$EventBus.$emit("pc-navi", [
      { label: self.$t("header.me"), target: "mypageInfo" },
      { label: self.$t("mypage.a008"), target: null }
    ]);

    self.$EventBus.$on("langChange", () => {
      self.$EventBus.$emit("pc-navi", [
        { label: self.$t("header.me"), target: "mypageInfo" },
        { label: self.$t("mypage.a008"), target: null }
      ]);
    });
  }
};
</script>
