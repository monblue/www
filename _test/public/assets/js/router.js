//////************************************************************************
////// 이름:    router.js
////// 기능:    moonHani Chart Router Module
//////************************************************************************
define(function (require) {
  //"use strict";
////===========================================================================
//// requires
////===========================================================================
//-----------------------------------------------------------------------------
// requires: libraries
//-----------------------------------------------------------------------------
  var $       = require('jquery');
  //var _       = require('underscore');
  var Backbone  = require('backbone');
  //var MH      = require('MH_utils');
  //var GLOBAL    = require('share/Global');
//-----------------------------------------------------------------------------
// requires: models
//-----------------------------------------------------------------------------
  //var Patient   = require('chart/models/Patient');
//-----------------------------------------------------------------------------
// requires: views
//-----------------------------------------------------------------------------
  var ShellView   = require('share/Shell');
  //var TestView  = require('chart/views/Test');
  //var LoginView   = require('share/Login');
//-----------------------------------------------------------------------------
// requires: templates
//-----------------------------------------------------------------------------

////===========================================================================
//// private properties
////===========================================================================

////===========================================================================
//// private methods
////===========================================================================

////===========================================================================
//// OBJECTS
////===========================================================================
  return Backbone.Router.extend({
    //Routing
    routes:{
      '':'home',
      //"L": "chart",
      'login': "login",
      'logout': "logout",
      "S:section": "section",
    },

    initialize: function() {
      $('body .mH-ibtn').on('click', function(e) {  //작동이 되다 말다 함
        e.preventDefault();
        e.stopPropagation();
        console.log('iconButton clicked');
        $(e.target).children('i').trigger('click');
      });

      console.log('router initialized!!!');

    },

    home: function() {
      ShellView.render();
      ////console.log('testArea el: ', new TestView().render().el);
    },

    login: function() {
      //$('#testArea').html(new TestView().render().el);
      ////console.log('testArea el: ', new TestView().render().el);
    },

    chart: function(date, id, refDate) {
      console.log('chart initialize ', date);
      GLOBAL.set('_LISTDATE', date);
      if (id) {
        console.log('_CURPTID is changed', GLOBAL.previousAttributes());
        GLOBAL.set({_CURPTID:id,
            _REFDATE:refDate,
            _EDITDATE:date});

      } else {  //@@@id가 없는 경우 Rc, IX, TX에서 직접 처리하도록 수정요
        //@@@@@header부분 empty
        ShellView.fillHeaderInfo('');
        GLOBAL.set({_CURPTID:''});
        //chart부분 empty
        //ChartRcView.bodyView.();
        //ChartIxView.bodyView.blankIxs();
        //ChartTxView.bodyView.preRender();
      }

      console.log('mH-ibtn reactivate');
      $('body .mH-ibtn').on('click', function(e) {  //작동이 되다 말다 함(remove 후에는 off되어버림@@@@@@)

        e.preventDefault();
        e.stopPropagation();
        console.log('iconButton clicked');
        $(e.target).children('i').trigger('click');
      });

      //setInverval!!!!!!!
      //var reload = setInterval(function() {GLOBAL.trigger('change:_LISTDATE'); }, 60000);

    },


  });

});


/*
var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "wines" : "list",
        "wines/page/:page"  : "list",
        "wines/add"         : "addWine",
        "wines/:id"         : "wineDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

  list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var wineList = new WineCollection();
        wineList.fetch({success: function(){
            $("#content").html(new WineListView({model: wineList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    wineDetails: function (id) {
        var wine = new Wine({_id: id});
        wine.fetch({success: function(){
            $("#content").html(new WineView({model: wine}).el);
        }});
        this.headerView.selectMenuItem();
    },

  addWine: function() {
        var wine = new Wine();
        $('#content').html(new WineView({model: wine}).el);
        this.headerView.selectMenuItem('add-menu');
  },

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'WineView', 'WineListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
*/