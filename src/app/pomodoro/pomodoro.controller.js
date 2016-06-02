(function () {
    'use strict';

    angular
        .module('app.pomodoro')
        .controller('PomodoroController', PomodoroController);

    PomodoroController.$inject = ['$interval', '$timeout', '$window', '$mdBottomSheet', 'pomodoroService', '$mdDialog', '$scope'];
    function PomodoroController($interval, $timeout, $window, $mdBottomSheet, service, $mdDialog, $scope) {
        var vm = this;

        var activeTimer;
        var breakTimer;

        vm.isBreak = false;
        vm.start = start;
        vm.showSetting = showSetting;
        vm.time = secondsToHms(service.settings().active * 60);
        vm.completePomdoros = 0;
        vm.isActive = false;
        vm.interruptable = false;
        vm.interrupt = interrupt;

        activate();

        ////////////////

        function activate() {

        }

        function showSetting() {
            service.showPanel();
        }

        function interrupt() {

            if (angular.isDefined(activeTimer)) {
                $interval.cancel(activeTimer);
                activeTimer = undefined;
                vm.isActive = false;
            }

            if (angular.isDefined(breakTimer)) {
                $interval.cancel(breakTimer);
                breakTimer = undefined;
                vm.isBreak = false;
            }

            vm.interruptable = false;
            vm.time = secondsToHms(service.settings().active * 60);


            return;
        }

        function start() {

            if (angular.isDefined(activeTimer))
                return;

            vm.isBreak = false;
            vm.isActive = true;
            vm.interruptable = true;

            var countDownSecs = service.settings().active * 60;

            activeTimer = $interval(activeRunner, 1000);

            function activeRunner() {

                if (countDownSecs === 0) {
                    $interval.cancel(activeTimer);
                    activeTimer = undefined;

                    vm.interruptable = false;
                    vm.isActive = false;
                    confirmBreak();

                }
                else {
                    countDownSecs--;
                    vm.time = secondsToHms(countDownSecs);
                }
            }
        }

        function confirmBreak() {

            vm.isBreak = true;
            service.notify();

            var confirm = $mdDialog.confirm()
                .title('Take a break!')
                .ariaLabel('Break confirm dialog')
                .ok('Short Break')
                .cancel('Long Break');

            $mdDialog.show(confirm).then(function () {
                startBreak(service.settings().shortBreak);
            }, function () {
                startBreak(service.settings().longBreak);
            });

        }

        function startBreak(breakMinutes) {

            if (angular.isDefined(breakTimer))
                return;

            var countDownSecs = breakMinutes * 60;
            vm.time = secondsToHms(countDownSecs);
            breakTimer = $interval(breakRunner, 1000);
            vm.interruptable = true;

            function breakRunner() {

                if (countDownSecs === 0) {
                    $interval.cancel(breakTimer);
                    breakTimer = undefined;

                    vm.isBreak = false;
                    vm.interruptable = false;
                    vm.time = secondsToHms(service.settings().active * 60);
                    service.notify();
                }
                else {
                    countDownSecs--;
                    vm.time = secondsToHms(countDownSecs);
                }

            }
        }

        function secondsToHms(d) {
            d = Number(d);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            var s = Math.floor(d % 3600 % 60);
            return (
                (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
            );
        }

        $scope.$on('settings-changed', function (event, args) {
            if (!vm.interruptable)
                vm.time = secondsToHms(service.settings().active * 60);
        });

    }
})();