(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$mdIconProvider', '$mdThemingProvider'];
    /* @ngInject */
    function config($mdIconProvider, $mdThemingProvider) {

        $mdIconProvider
            .icon('avatar', 'https://raw.githubusercontent.com/angular/material-start/master/app/assets/svg/avatar-1.svg', 48)
            .icon('restore','https://raw.githubusercontent.com/google/material-design-icons/master/action/svg/production/ic_settings_backup_restore_48px.svg')
    }
})();