<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-md-12">
        <vuestic-widget :headerText="$t('tables.basic')">
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
              <tr>
                <td>{{'tables.headings.name' | translate}}</td>
                <td>{{'tables.headings.email' | translate}}</td>
                <td>{{'tables.headings.city' | translate}}</td>
                <td align="right">{{'tables.headings.score' | translate}}</td>
                <td></td>
              </tr>
              </thead>
              <tbody>
              <!-- <tr>
                <td>Matthew McCormick</td>
                <td>matthew30@mail.ol</td>
                <td>Vancouver</td>
                <td align="right">93</td>
                <td></td>
              </tr>
              <tr>
                <td>Nancy Bo</td>
                <td>nancy@boonweb.com</td>
                <td>Washington</td>
                <td align="right">280</td>
                <td></td>
              </tr>
              <tr>
                <td>Frederiko Lopez</td>
                <td>fr.lopez@webmail.sp</td>
                <td>Barcelona</td>
                <td align="right">16</td>
                <td></td>
              </tr>
              <tr>
                <td>Stanley Hummer</td>
                <td>mr_winner_2999@gmail.cb</td>
                <td>Manchester</td>
                <td align="right">57</td>
                <td></td>
              </tr>
              <tr>
                <td>Lendley Wintz</td>
                <td>9938198146@mailster.io</td>
                <td>Wien</td>
                <td align="right">113</td>
                <td></td>
              </tr>
              <tr>
                <td>Barbara Noz</td>
                <td>barbaranoz@mailster.io</td>
                <td>Brussels</td>
                <td align="right">68</td>
                <td></td>
              </tr>
              <tr>
                <td>Matthew McCormick</td>
                <td>matthew30@mail.ol</td>
                <td>Vancouver</td>
                <td align="right">93</td>
                <td></td>
              </tr> -->
              <tr v-for="(reservation, index) in reservations" :key="reservation.id">
                <td>{{reservation.customer.name}}</td>
                <td>{{new Date(reservation.reservationDate) | moment("dddd, MMMM Do YYYY")}}</td>
                <td>{{reservation.customer.phone}}</td>
                <td align="right">{{reservation.status | statusFilter}}</td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
        </vuestic-widget>
      </div>
    </div>

    <!-- <div class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="$t('tables.styled')">
          <div class="table-responsive">
            <table class="table table-striped table-sm color-icon-label-table">
              <thead>
              <tr>
                <td></td>
                <td>{{'tables.headings.name' | translate}}</td>
                <td>{{'tables.headings.email' | translate}}</td>
                <td>{{'tables.headings.city' | translate}}</td>
                <td align="right">{{'tables.headings.score' | translate}}</td>
                <td align="middle"></td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td></td>
                <td>Matthew McCormick</td>
                <td>matthew30@mail.ol</td>
                <td>Vancouver</td>
                <td align="right">93</td>
                <td align="middle"></td>
              </tr>
              <tr>
                <td></td>
                <td>Nancy Bo</td>
                <td>nancy@boonweb.com</td>
                <td>Washington</td>
                <td align="right">280</td>
                <td align="middle"></td>
              </tr>
              <tr>
                <td></td>
                <td>Frederiko Lopez</td>
                <td>fr.lopez@webmail.sp</td>
                <td>Barcelona</td>
                <td align="right">16</td>
                <td align="middle"></td>
              </tr>
              <tr class="table-danger">
                <td>
                  <span class="badge badge-pill badge-danger">DANGER</span>
                </td>
                <td>Stanley Hummer</td>
                <td>mr_winner_2999@gmail.cb</td>
                <td>Manchester</td>
                <td align="right">57</td>
                <td align="middle">
                  <i class="fa fa-exclamation-triangle icon-right input-icon error-icon"></i>
                </td>
              </tr>
              <tr class="table-success">
                <td>
                  <span class="badge badge-pill badge-primary">SUCCESS</span>
                </td>
                <td>Lendley Wintz</td>
                <td>9938198146@mailster.io</td>
                <td>Wien</td>
                <td align="right">113</td>
                <td align="middle" class="valid">
                  <i class="fa fa-check success-icon icon-right input-icon"></i>
                </td>
              </tr>
              <tr class="table-warning">
                <td>
                  <span class="badge badge-pill badge-warning">WARNING</span>
                </td>
                <td>Barbara Noz</td>
                <td>barbaranoz@mailster.io</td>
                <td>Brussels</td>
                <td align="right">68</td>
                <td align="middle"></td>
              </tr>
              <tr>
                <td></td>
                <td>Matthew McCormick</td>
                <td>matthew30@mail.ol</td>
                <td>Vancouver</td>
                <td align="right">93</td>
                <td align="middle"></td>
              </tr>
              <tr class="table-info">
                <td>
                  <span class="badge badge-pill badge-info">INFO</span>
                </td>
                <td>Nancy Bo</td>
                <td>nancy@boonweb.com</td>
                <td>Washington</td>
                <td align="right">280</td>
                <td align="middle"></td>
              </tr>
              </tbody>
            </table>
          </div>
        </vuestic-widget>
      </div>
    </div> -->

    <!-- <div class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="$t('tables.advanced')">
          <vuestic-data-table
            :apiUrl="apiUrl"
            :tableFields="tableFields"
            :itemsPerPage="itemsPerPage"
            :defaultPerPage="defaultTablePerPage"
            :sortFunctions="sortFunctions"
            :apiMode="apiMode"
            :paginationPath="paginationPath"
            :queryParams="queryParams"
          >
            <spring-spinner
              slot="loading"
              :animation-duration="2500"
              :size="70"
              color="#4ae387"
            />
          </vuestic-data-table>
        </vuestic-widget>
      </div>
    </div> -->

  </div>
</template>

<script>
  import Vue from 'vue';
  import BadgeColumn from './BadgeColumn.vue';
  import FieldsDef from 'vuestic-components/vuestic-datatable/data/fields-definition';
  import ItemsPerPageDef from 'vuestic-components/vuestic-datatable/data/items-per-page-definition';
  import QueryParams from 'vuestic-components/vuestic-datatable/data/query-params';
  import {SpringSpinner} from 'epic-spinners'

  Vue.component('badge-column', BadgeColumn);

  export default {
    name: 'Table',
    components: {
      SpringSpinner
    },
    filters: {
      statusFilter(status){
        switch(status){
          case 'AL':
          return '예약목록';
          case 'RR':
          return '예약요청중';
          case 'RC':
          return '예약확인';
          case 'TC':
          return '방문완료';
          case 'CC':
          return '취소된 예약'; 
        }
      }
    },
    data () {
      return {
        reservations : []
        // apiUrl: 'https://vuetable.ratiw.net/api/users',
        // apiMode: true,
        // tableFields: FieldsDef.tableFields,
        // itemsPerPage: ItemsPerPageDef.itemsPerPage,
        // sortFunctions: FieldsDef.sortFunctions,
        // paginationPath: '',
        // defaultTablePerPage: 6,
        // queryParams: QueryParams
      };
    },
    mounted(){
      var self = this;
      const userData = this.$store.state.userData();
      console.log(userData);
      var query = {
        include : {
          relation : 'customer'
        }
      };
      var url = 'Hospitals/' + userData.userId + '/reservations?filter=' + encodeURI(JSON.stringify(query));
      this.$http.get(url).then(response => {
        console.log(response);
        if(response.ok){
          self.reservations = response.body;
        }
      });
    }
  }
</script>

<style lang="scss">

  .color-icon-label-table {
    td:first-child {
      width: 1rem;
    }
  }
</style>
