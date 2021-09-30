<template>
  <section class="QnaWrite">
    <p class="top_info_txt">{{$t('m_mypage.j009')}}<!-- 상담분류를 선택하고 문의내용을 입력해주세요 --></p>

    <table class="tbody_table_sy">
      <colgroup>
        <col style="width:25%;">
        <col>
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">{{$t('m_mypage.j010')}}<!-- 상담분류 --></th>
          <td>
            <el-select v-model="form.inqTp" :placeholder="$t('m_mypage.k044')" class="sel_m" popper-class="m_style"><!-- 상담 분류를 선택해주세요. -->
              <el-option value="1" :label="$t('m_mypage.j11-1')"></el-option><!-- 매매 -->
              <el-option value="2" :label="$t('m_mypage.j11-2')"></el-option><!-- 코인입출금 -->
              <el-option value="3" :label="$t('m_mypage.j11-3')"></el-option><!-- 원화입출금 -->
              <el-option value="4" :label="$t('m_mypage.j11-4')"></el-option><!-- 계정관련 -->
              <el-option value="5" :label="$t('m_mypage.j11-5')"></el-option><!-- 해킹신고 -->
              <el-option value="6" :label="$t('m_mypage.j11-6')"></el-option><!-- 기타문의 -->
            </el-select>
          </td>
        </tr>
        <tr>
          <th scope="row">{{$t('m_mypage.j012')}}<!-- 제목 --></th>
          <td><el-input type="text" @keyup.native="titleCheck" :placeholder="$t('m_mypage.k045')" v-model="form.subj" class="inp_m"></el-input><!-- 상담 제목을 입력해 주세요. --></td>
        </tr>
        <tr>
          <th scope="row">{{$t('m_mypage.j013')}}<!-- 내용 --></th>
          <td><el-input type="textarea" @keyup.native="contsChenck" class="inp_text" :rows="13" :placeholder="$t('m_mypage.k046')" v-model="conts"><!-- 상담 내용을 입력해 주세요. --></el-input></td>
        </tr>
      </tbody>
    </table>

    <div class="btm_fix_btn">
      <el-button v-on:click="onSubmit" class="b_success_btn">{{ $t('m_mypage.j014') }}<!-- 문의등록 --></el-button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { inqRegister } from '@/api/customers'

export default {
  data() {
    return {
      form: {
        inqTp: '',
        subj: '',
        conts: '',
        regr: '',
        unitcode: '',
      },
      conts: '',
    };
  },
  computed: {
    ...mapGetters(['getUserId', 'getUnitcode']),
  },
  methods: {
    replaceStr(srt) {
      return srt.split('\n').join('<br>');
    },
    titleCheck() {
      var self = this;
      if (self.form.subj.length > 50) {
        self.form.subj = self.form.subj.substring(0, 50);
        //50자 이하로 입력해주세요
        self.$alert(self.$t('m_mypage.k042'), '', {
          confirmButtonText: 'OK',
        });
      }
      var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
      if (regExp.test(self.form.subj)) {
        self.form.subj = self.form.subj.replace(regExp, "");
        //특수문자는 입력하실 수 없습니다.
        self.$alert(self.$t('m_mypage.k049'), '', {
          confirmButtonText: 'OK',
        });
      }
    },
    contsChenck() {
      var self = this;
      if (self.conts.length > 2000) {
        self.conts = self.conts.substring(0, 2000);
        //2000자 이하로 입력해주세요
        self.$alert(self.$t('m_mypage.k043'), '', {
          confirmButtonText: 'OK',
        });
      }
    },
    onSubmit(event) {
      var self = this;
      if (!self.getUserId) {
        return;
      } else if (self.form.inqTp == '') {
        //상담분류를 선택해주세요.
        self.$alert(self.$t('m_mypage.k044'), '', {
          confirmButtonText: 'OK',
        });
        return;
      } else if (self.form.subj == '' || self.form.subj.length === 0) {
        //제목을 입력해주세요.
        self.$alert(self.$t('m_mypage.k045'), '', {
          confirmButtonText: 'OK',
        });
        return;
      } else if (self.conts == '' || self.conts.length === 0) {
        //내용을 입력해주세요.
        self.$alert(self.$t('m_mypage.k046'), '', {
          confirmButtonText: 'OK',
        });
        return;
      }

      self.form.conts = self.replaceStr(self.conts);

      self.form.regr = self.getUserId;
      self.form.unitcode = self.getUnitcode;
      inqRegister(self.form).then(res => {
        if (res.code == 20000) {
          //등록이 완료되었습니다.
          self.$alert(self.$t('m_mypage.k047'), '', {
            confirmButtonText: 'OK',
            callback: action => {
              self.$router.push({ name: 'mQna' });
            }
          });
        }
      }).catch(err => {
        console.log(err);
      })
    },
  },
  created() {
    this.$EventBus.$emit('mobile-nav-title', this.$t('m_mypage.a008'));
    this.$EventBus.$emit('mobile-nav-menus', ['noDefault', 'border', 'close']);
  },
};
</script>

<style scoped>
.QnaWrite .qnaBtns {
  text-align: center;
  margin-top: 20px;
}
</style>
