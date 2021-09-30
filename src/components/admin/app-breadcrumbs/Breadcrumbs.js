export default {
  root: {
    path: '/',
    displayName: 'Home'
  },
  routes: [
    {
      path: 'dashboard',
      displayName: 'menu.dashboard'
    },
    {
      path: 'reservation',
      displayName: 'menu.reservation'
    },    
    {
      path: 'statistics',
      displayName: 'menu.statistics',
      disabled: true,
      children: [
        {
          path: 'charts',
          displayName: 'menu.charts',
        },
        {
          path: 'progress-bars',
          displayName: 'menu.progressBars'
        },
      ]
    },
    {
      path: 'forms',
      displayName: 'menu.forms',
      disabled: true,
      children: [
        {
          path: 'form-elements',
          displayName: 'menu.formElements'
        },
        {
          path: 'form-wizards',
          displayName: 'menu.formWizards'
        },
        {
          path: 'medium-editor',
          displayName: 'menu.mediumEditor'
        }
      ]
    },
    {
      path: 'tables',
      displayName: 'menu.tables'
    },
    {
      path: 'ui',
      displayName: 'menu.uiElements',
      disabled: true,
      children: [
        {
          path: 'typography',
          displayName: 'menu.typography'
        },
        {
          path: 'buttons',
          displayName: 'menu.buttons'
        },
        {
          path: 'color-pickers',
          displayName: 'menu.colorPickers'
        },
        {
          path: 'notifications',
          displayName: 'menu.notifications'
        },
        {
          path: 'icons',
          displayName: 'menu.icons'
        },
        {
          path: 'spinners',
          displayName: 'menu.spinners',
        },
        {
          path: 'grid',
          displayName: 'menu.grid',
        },
        {
          path: 'modals',
          displayName: 'menu.modals'
        },
        {
          path: 'file-upload',
          displayName: 'menu.fileUpload'
        },
        {
          path: 'tags',
          displayName: 'menu.tags'
        },
        {
          path: 'cards',
          displayName: 'menu.cards'
        },
        {
          path: 'tree-view',
          displayName: 'menu.treeView'
        }
      ]
    },
    {
      path: 'extra',
      displayName: 'menu.extra'
    },
    {
      path: 'maps',
      displayName: 'menu.maps',
      disabled: true,
      children: [
        {
          path: 'google-maps',
          displayName: 'Google Maps'
        },
        {
          path: 'yandex-maps',
          displayName: 'Yandex Maps'
        },
        {
          path: 'leaflet-maps',
          displayName: 'Leaflet Maps',
        },
        {
          path: 'bubble-maps',
          displayName: 'Bubble Maps',
        },
        {
          path: 'line-maps',
          displayName: 'Line Maps'
        }
      ]
    },
    {
      path: 'pages',
      displayName: 'menu.pages',
      disabled: true,
      children: [
        {
          path: '404-pages',
          displayName: '404 Pages'
        }
      ]
    }
  ]
}
