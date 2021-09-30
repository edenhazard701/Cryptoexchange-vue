import Observer from './Observer'

export default {
  install (Vue, connection, opts = {}) {
    if (!connection) { 
      throw new Error('[vue-native-socket] cannot locate connection');
    }

    let observer = new Observer(connection, opts);
    Vue.prototype.$socket = observer.queryManager;
  }
}
