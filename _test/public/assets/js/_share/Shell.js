//////************************************************************************
////// 이름:    router.js
////// 기능:    moonHani Shell(index.html layout) Module
//////************************************************************************
define(function (require) {
  "use strict";
////===========================================================================
//// requires
////===========================================================================
//-----------------------------------------------------------------------------
// requires: libraries
//-----------------------------------------------------------------------------
  var $           = require('jquery');
  var _           = require('underscore');
  var Backbone    = require('backbone');
  //var GLOBAL      = require('share/Global');
  //var MH          = require('MH_utils');
//-----------------------------------------------------------------------------
// requires: models
//-----------------------------------------------------------------------------
  //var Patient     = require('list/models/Patient');
//-----------------------------------------------------------------------------
// requires: views
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// requires: templates
//-----------------------------------------------------------------------------
  var tpl         = require('text!share_tpl/shell.html');
  var srhTpl      = require('text!share_tpl/shell-searchPatient.html');

////===========================================================================
//// private properties
////===========================================================================
  var template = _.template(tpl);
  var $menuItems;
  var $modal;
  //var $iBtn   = $('.mH-ibtn');

////===========================================================================
//// private methods
////===========================================================================

////===========================================================================
//// OBJECTS
////===========================================================================
  var ShellView = Backbone.View.extend({

    initialize: function () {
      //this.employeeList = new models.EmployeeCollection();
      //this.listenTo(GLOBAL, 'change:_CURPTID', this.changeChart);
    },

    render: function () {
      this.$el.html(template());
      $menuItems = $('.navbar .nav li', this.el);
      return this;
    },

    events: {
      'keypress #np-srhPatient': 'searchPatientKey',
      'click #js-srhPatient': 'searchPatient',
      'click .js-saveAll': 'saveAll',
    },

    selectMenuItem: function (menuItem) {
      $menuItems.removeClass('active');
      if (menuItem) {
        $('.' + menuItem).addClass('active');
      }
    },

  });

//-----------------------------------------------------------------------------
// INSTANCE & RETURN
//-----------------------------------------------------------------------------
  return new ShellView({el:'body'});
});