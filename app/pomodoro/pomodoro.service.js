(function () {
    'use strict';

    angular.module('app.pomodoro').factory('pomodoroService', pomodoroService);

    pomodoroService.$inject = ['InitSettings', '$mdBottomSheet', '$rootScope', 'Howl'];
    function pomodoroService(init, $mdBottomSheet, $rootScope, Howl) {

        var settingStore = angular.copy(init);
        var audio = new Howl({
            urls: ['https://raw.githubusercontent.com/Purush0th/pomodoro/gh-pages/assets/audio/alarm.mp3'],
            volume: 1.0
        });

        var api = {
            settings: settings,
            showPanel: showPanel,
            notify: notify
        }
        return api;

        function notify(opt) {
            if (settingStore.audio)
                audio.play();

            return;
        }

        function settings(data) {
            if (data)
                settingStore = data;

            return angular.copy(settingStore);
        }

        function showPanel() {
            $mdBottomSheet.show({
                templateUrl: 'setting.html',
                controller: settingsController,
                controllerAs: 'vm'
            });
        }

        function settingsController() {
            var vm = this;
            var config = {
                active: {
                    min: 25,
                    max: 40
                },
                shortBreak: {
                    min: 1,
                    max: 5
                },
                longBreak: {
                    min: 5,
                    max: 20
                },
            };


            vm.config = config;
            vm.settings = {};
            vm.apply = apply;
            vm.reset = reset;

            vm.settings = settings();

            function apply() {
                settings(vm.settings);
                $rootScope.$broadcast('settings-changed');
            }

            function reset() {

                var defaults = angular.copy(init);
                vm.settings = defaults;
                settings(defaults);

                $rootScope.$broadcast('settings-changed');
            }

        }

    };


})();
