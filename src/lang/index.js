import VueI18n from 'vue-i18n';
import en from './json/en.json';
import ko from './json/ko.json';
import Vue from 'vue';
import enLocale from 'element-ui/lib/locale/lang/en'
import koLocale from 'element-ui/lib/locale/lang/ko'
import { _ } from "vue-underscore";
Vue.use(VueI18n)

const koMerge = _.extend(ko, koLocale)
const enMerge = _.extend(en, enLocale)

const locale = 'ko'

const messages = {
  ko: koMerge,
  en: enMerge
}

const i18n = new VueI18n({
  locale,
  messages,
})

//sys_err 없는 경우 default message 출력
i18n.missing = (locale, key, vm, value) => {
  if (key.indexOf('sys_err') > -1) {
    var code = key.replace('sys_err.','');
    return vm.$t('sys_err.default', [code]);
  }
  return null;
}

export default i18n
