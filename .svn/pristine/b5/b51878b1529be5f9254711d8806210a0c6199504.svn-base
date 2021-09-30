<template>
  <section class="QnaWrite">
    <h1 class="pageTitle">{{$t('cs.e009')}}<!-- 1:1 문의하기 --></h1>
    <el-form label-width="100px">
      <el-form-item :label="$t('cs.e015')"><!-- 상담분류 -->
        <el-select v-model="form.inqTp" :placeholder="$t('cs.e030')"><!-- 상담 분류를 선택해 주세요. -->
          <el-option value="1" :label="$t('cs.e016')"></el-option><!-- 매매 -->
          <el-option value="2" :label="$t('cs.e017')"></el-option><!-- 코인입출금 -->
          <el-option value="3" :label="$t('cs.e018')"></el-option><!-- 원화입출금 -->
          <el-option value="4" :label="$t('cs.e019')"></el-option><!-- 계정관련 -->
          <el-option value="5" :label="$t('cs.e020')"></el-option><!-- 해킹신고 -->
          <el-option value="6" :label="$t('cs.e021')"></el-option><!-- 기타문의 -->
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('cs.e022')"><!-- 제목 -->
        <el-input @keyup.native="titleCheck" :placeholder="$t('cs.e032')" v-model="form.subj"></el-input><!-- 상담 제목을 입력해 주세요. -->
      </el-form-item>
      <el-form-item :label="$t('cs.e023')"><!-- 내용 -->
        <vue-editor @keyup.native="contsChenck" ref="refEditor" id="editor" :placeholder="$t('cs.e034')" v-model="form.conts" :editorToolbar="customToolbar"></vue-editor><!-- 상담 내용을 입력해 주세요. -->
      </el-form-item>
      <el-form-item class="content-btn">
        <el-button v-on:click="cancel">{{$t('cs.e025')}}<!-- 취소 --></el-button>
        <el-button v-on:click="onSubmit" type="primary">{{$t('cs.e024')}}<!-- 문의등록 --></el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { VueEditor } from 'vue2-editor'
import { inqRegister } from '@/api/customers'

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [
          { 'align': '' },
          { 'align': 'center' },
          { 'align': 'right' },
          { 'align': 'justify' }
        ],
        ['blockquote', 'code-block'],
        [
          { 'list': 'ordered' },
          { 'list': 'bullet' },
          { 'list': 'check' }
        ],
        [
          { 'indent': '-1' },
          { 'indent': '+1' }
        ],
        [
          { 'color': [] },
          { 'background': [] }
        ],
      ],
      form: {
        inqTp: '',
        subj: '',
        conts: '',
        regr: '',
        unitcode: '',
      },
    };
  },
  computed: {
    ...mapGetters(['getUserId', 'getUnitcode']),
  },
  methods: {
    cancel() {
      var self = this;
      self.$confirm(self.$t('cs.e038'), '', {
        confirmButtonText: self.$t('cs.e039'),
        cancelButtonText: self.$t('cs.e040')
      }).then(() => {
        self.$router.go(-1);
      }).catch((err) => {});
    },
    titleCheck() {
      var self = this;
      if (self.form.subj.length > 50) {
        self.form.subj = self.form.subj.substring(0, 50);
        //50자 이하로 입력해주세요
        self.$alert(self.$t('cs.e026'), '', {
          confirmButtonText: self.$t('cs.e029'),
        });
      }

      var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
      if (regExp.test(self.form.subj)) {
        self.form.subj = self.form.subj.replace(regExp, "");
        //특수문자는 입력하실 수 없습니다.
        self.$alert(self.$t('cs.e041'), '', {
          confirmButtonText: self.$t('cs.e029'),
        });
      }
    },
    contsChenck() {
      var self = this;
      if (self.$refs.refEditor.$refs.quillContainer.innerText.length > 2000) {
        let subsConts = self.$refs.refEditor.$refs.quillContainer.innerText.substring(0, 2000);
        
        // 에디터 html
        self.$refs.refEditor.$refs.quillContainer.childNodes[0].innerHTML = subsConts;
        
        // 실제 데이터
        self.form.conts = subsConts;
        
        //2000자 이하로 입력해주세요
        self.$alert(self.$t('cs.e028'), '', {
          confirmButtonText: self.$t('cs.e029'),
        });
      }
    },
    onSubmit(event) {
      var self = this;
      if (!self.getUserId) {
        self.$router.push({ name: 'main' });
        return;
      } else if (self.form.inqTp === '') {
        //상담분류를 선택해주세요.
        self.$alert(self.$t('cs.e030'), '', {
          confirmButtonText: self.$t('cs.e029'),
        });
        return;
      } else if (self.form.subj === '') {
        //제목을 입력해주세요.
        self.$alert(self.$t('cs.e032'), '', {
          confirmButtonText: self.$t('cs.e029'),
        });
        return;
      } else if (self.$refs.refEditor.$refs.quillContainer.innerText.length <= 1) {
        //내용을 입력해주세요.
        self.$alert(self.$t('cs.e034'), '', {
          confirmButtonText: self.$t('cs.e029'),
        });
        return;
      }

      self.form.conts = self.$refs.refEditor.$refs.quillContainer.childNodes[0].innerHTML;

      self.form.regr = self.getUserId;
      self.form.unitcode = self.getUnitcode;
      inqRegister(self.form).then(res => {
        //console.log("inqRegister", res);
        if (res.code == 20000) {
          //등록이 완료되었습니다.
          self.$alert(self.$t('cs.e036'), '', {
            confirmButtonText: self.$t('cs.e029'),
            callback: action => {
              self.$router.push({ name: 'csQna' });
            }
          });
        }
      }).catch(err => {
        console.log(err);
      });
    },
    langChangeCallback() {
      let self = this;
      self.$EventBus.$emit('pc-navi', [
        { label: self.$t('header.cs'), target: 'csNotice' },
        { label: self.$t('cs.a004'), target: null }
      ]);
    }
  },
  mounted() {
    let self = this;
    self.$EventBus.$on('langChange', self.langChangeCallback);
  },
  beforeDestroy() {
    let self = this;
		self.$EventBus.$off('langChange', self.langChangeCallback);
  }
};
</script>
