<!DOCTYPE html>
<html ng-app="certApp" lang="en">
<head>
    <meta charset="utf-8">
    <title></title>

    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css"/>
    <link rel="stylesheet" href="<?php echo base_url(); ?>css/main.css"/>

    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
    <script src="bower_components/lodash/dist/lodash.compat.js"></script>
    <script src="bower_components/restangular/dist/restangular.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
    <script src="bower_components/angular-translate/angular-translate.js"></script>
    <script src="<?php echo base_url(); ?>js/app.js"></script>
</head>
<body>

<header class="navbar navbar-static-top">
    <div class="wrapper">
        <div class="navbar-header">
            <a class="navbar-brand" href>Логотип</a>
        </div>
        <nav class="collapse navbar-collapse">
            <ul class="menu nav navbar-nav navbar-right">
                <li>
                    <a ng-click="changeLang()" href>
                        <span>Как это работает</span>
                    </a>
                </li>
                <li>
                    <a ng-click="logout()" href>
                        <span>Как использовать</span>
                    </a>
                </li>
                <li>
                    <a ng-click="logout()" href>
                        <span>Как получить</span>
                    </a>
                </li>
            </ul>
        </nav>

        <div class="clearfix" ng-controller="CertOrderCtrl">

            <div class="order-form">
                <h4 class="text-center"><big>Хочу заказать</big> подарочный сертификат</h4>

                <form class="form-horizontal" name="form_order_1" ng-submit="sendCertOrder()">
                    <div class="form-group">
                        <div class="col-sm-12">
                            <input type="email" class="form-control email-input" placeholder="Ваш адрес эл. почты"
                                   ng-model="cert_order_form.email" required/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-12">
                            <button type="submit" class="btn col-sm-12 order-button"
                                    ng-disabled="form_order_1.$invalid">ЗАКАЗАТЬ
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div class="col-sm-9">Баннер</div>
        </div>
    </div>
</header>

<div class="bg-white">
    <h3>Как это работает</h3>

    <div class="col-sm-4">Заказ</div>
    <div class="col-sm-4">Подарок</div>
    <div class="col-sm-4">Активация</div>

</div>
<div>На что потратить сертификат</div>
<div class="container" ui-view="content" ng-show="loaded"></div>
<div class="clearfix">
    <h4>Где забрать</h4>

    <div class="col-sm-8">
        <script type="text/javascript" charset="utf-8"
                src="//api-maps.yandex.ru/services/constructor/1.0/js/?sid=gRYMM_lROqH6ob69NuJ1apcRcwqwmjlZ&height=240"></script>
    </div>
    <div class="col-sm-4">
        <h4>Как оплатить</h4>
    </div>
</div>
<div class="bg-white col-sm-12 clearfix" ng-controller="CertOrderCtrl">
    <form class="form-inline" name="form_order_1" ng-submit="sendCertOrder()">
        <div class="form-group">
            <label class="col-sm-4">Хочу заказать сертификат</label>

            <div class="col-sm-4">
                <input type="email" class="form-control" placeholder="Введите свой email"
                       ng-model="cert_order_form.email" required/>
            </div>
            <button type="submit" class="btn col-sm-4" ng-disabled="form_order_1.$invalid">ЗАКАЗАТЬ</button>
        </div>
    </form>
</div>
<div>Копирайт</div>

</body>
</html>