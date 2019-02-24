import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ToastController } from '@ionic/angular';
import { Http } from '@angular/http';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  server:any;
  count:any;
  session_iniciada=false;
  constructor(public Sharing:SocialSharing,
    public Toast: ToastController,
    public http: Http,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public evento : Events){
      evento.subscribe('InicioSesion', (val) => {
        var link = 'http://barberia.ironhide.com.ar/API_BARBERIA.php';
        var datos = JSON.stringify({opcion:'VerTurnosHoy', ID:val});
        this.http.post(link, datos)
        .subscribe(respuesta => {
          this.server = JSON.parse(respuesta["_body"]);
          this.count = Object.keys(this.server).length;
          this.session_iniciada=true;
        }, error => {
          console.log(error);
        });
      });
      evento.subscribe('CierreSesion', () => {
        this.session_iniciada=false;
      });
      


    }

  ngOnInit() {
    this.storage.get('id').then((val) => {
      if (val != null){
        var link = 'http://barberia.ironhide.com.ar/API_BARBERIA.php';
        var datos = JSON.stringify({opcion:'VerTurnosHoy',ID:val});
        this.http.post(link, datos)
        .subscribe(respuesta => {
          this.server = JSON.parse(respuesta["_body"]);
          this.count = Object.keys(this.server).length;
          this.session_iniciada=true;
        }, error => {
          console.log(error);
        });
      } 
    });
  }





  Compartir(Hora,Fecha,Nombre){
    this.Sharing.share('Hola '+Nombre+' tenes un turno el dia '+Fecha+' a las '+Hora+' hs. con el peluquero.', '', [],'').then(() => {
        this.ToastExito();
    }).catch(() => {
        this.ToastError();
    });
  }

  async ToastExito() {
    const toast = await this.Toast.create({
      message: 'Se ha compartido con éxito.',
      duration: 2000
    });
    toast.present();
  }
  async ToastError() {
    const toast = await this.Toast.create({
      message: 'Ha ocurrido un error.',
      duration: 2000
    });
    toast.present();
  }

  async PonerLoading() {
    return await this.loadingCtrl.create({message:'Cargando...'}).then(a => {
      a.present().then(() => {});});
  }
  async SacarLoading() {
    return await this.loadingCtrl.dismiss();
  }
}
