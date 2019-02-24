import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Http } from '@angular/http';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
var GenerarPage = /** @class */ (function () {
    function GenerarPage(Toast, loadingCtrl, navCtrl, http, alertController) {
        this.Toast = Toast;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.http = http;
        this.alertController = alertController;
        this.data = {
            "nombre": '',
            "apellido": '',
            "telefono": '',
            "fecha_inicio": '',
            "hora_inicio": ''
        };
    }
    GenerarPage.prototype.logForm = function () {
        var _this = this;
        var link = 'http://barberia.ironhide.com.ar/API_BARBERIA.php';
        if (this.data.nombre != '' && this.data.apellido != '' && this.data.telefono != '' && this.data.fecha_inicio != '' && this.data.hora_inicio != '') {
            this.PonerLoading();
            var datos = JSON.stringify({
                nombre: this.data.nombre,
                apellido: this.data.apellido,
                telefono: this.data.telefono,
                hora_inicio: this.data.hora_inicio,
                fecha_inicio: this.data.fecha_inicio,
                opcion: 'AltaTurno'
            });
            this.http.post(link, datos)
                .subscribe(function (response) {
                _this.server = JSON.parse(response["_body"]);
                if (_this.server.estado) {
                    _this.SacarLoading();
                    _this.ToastExito();
                    var IDFormulario = 'FormularioTurno';
                    var resetForm = document.getElementById(IDFormulario);
                    resetForm.reset();
                }
                else {
                    _this.SacarLoading();
                }
            }, function (error) {
            });
        }
        else {
            this.CamposSinCompletar();
        }
    };
    GenerarPage.prototype.ngOnInit = function () {
        this.data.fecha_inicio = new Date().toISOString();
    };
    GenerarPage.prototype.ToastExito = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Toast.create({
                            message: 'Se ha generado el turno.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    GenerarPage.prototype.PonerLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.create({ message: 'Cargando...' }).then(function (a) {
                            a.present().then(function () { });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GenerarPage.prototype.SacarLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.dismiss()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GenerarPage.prototype.CamposSinCompletar = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Error',
                            message: 'Hay campos sin completar',
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GenerarPage = tslib_1.__decorate([
        Component({
            selector: 'app-generar',
            templateUrl: './generar.page.html',
            styleUrls: ['./generar.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ToastController,
            LoadingController,
            NavController,
            Http,
            AlertController])
    ], GenerarPage);
    return GenerarPage;
}());
export { GenerarPage };
//# sourceMappingURL=generar.page.js.map