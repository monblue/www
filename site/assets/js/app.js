//////************************************************************************
////// 이름:    list.js
////// 기능:    moonHani list require config & chart start
//////************************************************************************
require(['jquery', 'backbone', 'bootstrap', 'MH_utils', 'share/Global', 'list/router'], function ($, Backbone, bootstrap, MH, GLOBAL, Router) {

    var date = '';
    var arrUrl = document.location.href.split("#");
    if (arrUrl[1]) {
      date = arrUrl[1].substr(1);
    }
    //var date = arrUrl[1].substr(1);
    //var date = Backbone.history.fragment.substr(1);
    //console.log('date is', date.substr(1));
    if (!date || !date.length) {
      date = MH.getToday();
      document.location.replace(arrUrl[0] + '#L' + date);
      //Backbone.history.navigate('L' + date);
    }
    console.log('date is', date);

    //GLOBAL.setListDate('20140515');
    GLOBAL.setListDate(date);
    var app = new Router(date);
    Backbone.history.start();
});