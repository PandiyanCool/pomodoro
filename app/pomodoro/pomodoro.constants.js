(function () {
    'use strict';

    angular.module('app.pomodoro').constant('InitSettings', {
        active: 25,
        shortBreak: 5,
        longBreak: 15,
        audio: true,
        popup: true
    });
})();