import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Http } from '@angular/http';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
var ListPage = /** @class */ (function () {
    function ListPage(Toast, loadingCtrl, navCtrl, http, alertController) {
        this.Toast = Toast;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.http = http;
        this.alertController = alertController;
    }
    ListPage.prototype.VerDatos = function () {
        var _this = this;
        var link = 'http://barberia.ironhide.com.ar/API_BARBERIA.php';
        //this.PonerLoading();
        var datos = JSON.stringify({ opcion: 'VerTurnos' });
        this.http.post(link, datos)
            .subscribe(function (respuesta) {
            _this.server = JSON.parse(respuesta["_body"]);
            console.log(_this.server);
        }, function (error) {
            console.log(error);
        });
    };
    ListPage.prototype.ngOnInit = function () { };
    ListPage = tslib_1.__decorate([
        Component({
            selector: 'app-list',
            templateUrl: 'list.page.html',
            styleUrls: ['list.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ToastController,
            LoadingController,
            NavController,
            Http,
            AlertController])
    ], ListPage);
    return ListPage;
}());
export { ListPage };
//# sourceMappingURL=list.page.js.map