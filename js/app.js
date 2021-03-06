var myApp = angular.module('certApp', ['ui.router', 'restangular', 'ui.bootstrap']);

myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state('showcase', {
        url: '/?utm_source',
        views: {
            'content': {
                templateUrl: 'templates/showcase.html',
                controller: 'ShowcaseCtrl'
            }
        }
    });
}).config(function (RestangularProvider) {
    RestangularProvider.setBaseUrl('http://umasterov.org/didar-api');
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
}).controller('ShowcaseCtrl', ['$rootScope', '$scope', '$timeout', '$anchorScroll', '$modal', 'Restangular', function ($rootScope, $scope, $timeout, $anchorScroll, $modal, Restangular) {
    $timeout(function () {
        $anchorScroll();
    });
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

    $scope.open = function () {
        $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg'
        });
    };

}]).controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
    $scope.ok = function () {
        $modalInstance.close();
    };
}).controller('CertOrderCtrl', ['$rootScope', '$scope', '$stateParams', 'Restangular', function ($rootScope, $scope, $stateParams, Restangular) {
    var EndPoint = Restangular.all('certapi');
    $scope.cert_order_form = {};
    $scope.sendCertOrder = function () {
        var source = 'unknown';
        if ($stateParams.utm_source == 'vk') {
            var source = 'vk_adv_iter1';
        }
        EndPoint.customPOST({
            email: $scope.cert_order_form.email,
            source: source
        }, 'cert_order').then(function (response) {
            if (response.status == 'ok') {
                alert('Адрес электронной почты успешно отправлен');
            } else {
                alert('Ошибка. Адрес электронной почты не отправлен.');
            }
        }, function () {
            alert('Ошибка. Адрес электронной почты не отправлен.');
        })
    };
}]);