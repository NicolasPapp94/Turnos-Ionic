import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GenerarPage } from './generar.page';
var routes = [
    {
        path: '',
        component: GenerarPage
    }
];
var GenerarPageModule = /** @class */ (function () {
    function GenerarPageModule() {
    }
    GenerarPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [GenerarPage]
        })
    ], GenerarPageModule);
    return GenerarPageModule;
}());
export { GenerarPageModule };
//# sourceMappingURL=generar.module.js.map