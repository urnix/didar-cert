var myApp = angular.module('certApp', ['ui.router', 'restangular', 'pascalprecht.translate']);

myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state('showcase', {
        url: '/',
        views: {
            'content': {
                templateUrl: 'templates/showcase.html',
                controller: 'ShowcaseCtrl'
            }
        }
    });
}).config(function (RestangularProvider, $translateProvider) {
    RestangularProvider.setBaseUrl('/didar-api');

    $translateProvider.translations('en', {
        'products': 'Products:',
        'measures': 'Measures:'
    });
    $translateProvider.translations('ru', {
        'products': 'На что потратить сертификат',
        'measures': 'Когда потратить'
    });
    $translateProvider.preferredLanguage('ru');
}).filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max || value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
}).controller('ShowcaseCtrl', ['$rootScope', '$scope', 'Restangular', function ($rootScope, $scope, Restangular) {
    var EndPoint = Restangular.all('certapi');

    var loadedCheckCount = 2;
    var loadedCheck = function () {
        loadedCheckCount--;
        $rootScope.loaded = !loadedCheckCount;
    };

    EndPoint.customGET('products').then(function (response) {
        $scope.products = response.products;
        loadedCheck();
    }, function () {
        alert('err');
        loadedCheck();
    });

    EndPoint.customGET('measures').then(function (response) {
        $scope.measures = response.measures;
        loadedCheck();
    }, function () {
        alert('err');
        loadedCheck();
    });
}]).controller('CertOrderCtrl', ['$rootScope', '$scope', 'Restangular', function ($rootScope, $scope, Restangular) {
    var EndPoint = Restangular.all('certapi');
    $scope.cert_order_form = {};
    $scope.sendCertOrder = function () {
        EndPoint.customPOST({
            email: $scope.cert_order_form.email,
            source: 'vk_adv_iter1'
        }, 'cert_order').then(function (response) {
            if (response.status == 'ok') {
                alert('Адрес электронной почты успешно отправлен');
            } else {
                alert('err');
            }
        }, function () {
            alert('err');
        })
    };
}]);