
//홍보용 사이트
import PmtMain from './views/promotion/PmtMain.vue'
import PmtNoticeDetail from './views/promotion/PmtNoticeDetail.vue'
import PmtNoticeList from './views/promotion/PmtNoticeList.vue'
import PmtJoin from './views/promotion/PmtJoin.vue'
import PmtJoinSuccess from './views/promotion/PmtJoinSuccess.vue'
import PmtTerms from './views/promotion/PmtTerms.vue'
import PmtCertifySuccess from './views/promotion/PmtCertifySuccess.vue'
import PmtCertifyFail from './views/promotion/PmtCertifyFail.vue'
import PmtJoinConfirm from './views/promotion/PmtJoinConfirm.vue'
import NotFound from './views/404.vue'


    export default [
        {
            path: '/',
            component: PmtMain,
            name: 'pmtMain',
            hidden: true
        },
        {
            path: '/pmtNoticeDetail',
            component: PmtNoticeDetail,
            name: 'pmtNoticeDetail',
            hidden: true
        },
        {
            path: '/pmtNoticeList',
            component: PmtNoticeList,
            name: 'pmtNoticeList',
            hidden: true
        },
        {
            path: '/pmtCertifySuccess',
            component: PmtCertifySuccess,
            name: 'pmtCertifySuccess',
            hidden: true
        },
        {
            path: '/pmtCertifyFail',
            component: PmtCertifyFail,
            name: 'pmtCertifyFail',
            hidden: true
        },
        {
            path: '/pmtJoin',
            component: PmtJoin,
            name: 'pmtJoin',
            hidden: true
        },
        {
            path: '/pmtJoinSuccess',
            component: PmtJoinSuccess,
            name: 'pmtJoinSuccess',
            hidden: true
        },
        {
            path: '/pmtTerms',
            component: PmtTerms,
            name: 'pmtTerms',
            hidden: true
        },
        {
            path: '/pmtJoinConfirm',
            component: PmtJoinConfirm,
            name: 'pmtJoinConfirm',
            hidden: true
        },
        {
            path: '*',
            component: NotFound,
            name: 'notFound',
            hidden: true
            // redirect: { path: '/404' }
        },
    ];
