(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$mdIconProvider', '$mdThemingProvider'];
    /* @ngInject */
    function config($mdIconProvider, $mdThemingProvider) {

        $mdIconProvider
            .icon('settings','https://raw.githubusercontent.com/google/material-design-icons/master/action/svg/production/ic_settings_48px.svg');
    }
})();