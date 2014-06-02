//////************************************************************************
////// 이름:    chart.js
////// 기능:    moonHani chart require config & chart start
//////************************************************************************
require.config({

    baseUrl: './assets/js/_lib',

    paths: {
        //chart: '../chart',
        //list: '../list',
        share: '../_share',
        //chart_tpl: '../../tpl/chart',
        //list_tpl: '../../tpl/list',
        share_tpl: '../../tpl/_share',
        UI_tpl: '../../tpl/_UI'
    },
/*
    map: {
        '*': {
            //'app/models/employee': 'app/models/memory/employee'
        }
    },
*/
    shim: {
      /*
        'backbone.collectionsubset': {
            deps: ['underscore', 'jquery', 'backbone'],
            exports: 'Subset'
        },
        */
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery'],
            //exports: 'Backbone'
        },
        /*
        'bootstrap-modal': {
            deps: ['jquery'],
            //exports: 'Backbone'
        },
        */
    }
});

require(['jquery', 'backbone', 'bootstrap', '../router'], function ($, Backbone, bootstrap, Router) {
    var app = new Router();
    Backbone.history.start();

});