import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Http } from '@angular/http';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  server:any;
  server2:any;
  allContacts:any;
  rta:any;
  session_iniciada;
  constructor(public Toast: ToastController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public http: Http,
    public alertController: AlertController,
    public evento : Events,
    public storage: Storage) {
      this.evento.subscribe('InicioSesion', (val) => {
        console.log(val);
        var link = 'http://barberia.ironhide.com.ar/API_BARBERIA.php';
        var datos = JSON.stringify({opcion:'VerTurnos', ID:val});
        this.http.post(link, datos)
        .subscribe(respuesta => {
          this.server = JSON.parse(respuesta["_body"]);
          var count = Object.keys(this.server).length;
          this.session_iniciada=true;
          if (count == 0){
            this.ToastAccion('No existen turnos registrados');
          }
        }, error => {
          this.session_iniciada=false;
        });
      });
      evento.subscribe('CierreSesion', () => {
        this.session_iniciada=false;
      });
    }

  ngOnInit() {
    this.storage.get('id').then((val) => {
      if (val != null){
        this.ActualizarLista();
        this.session_iniciada=true;
      } else {
        this.session_iniciada=false;
      }
    });

  }

  ActualizarLista(){
    this.storage.get('id').then((val) => {
      var link = 'http://barberia.ironhide.com.ar/API_BARBERIA.php';
      var datos = JSON.stringify({opcion:'VerTurnos', ID:val});
      this.http.post(link, datos)
      .subscribe(respuesta => {
        this.server = JSON.parse(respuesta["_body"]);
        var count = Object.keys(this.server).length;
        if (count == 0){
          this.ToastAccion('No existen turnos registrados');
        }
      }, error => {
        console.log(error);
      });
    });
  }
  EliminarTurno(pkturno){
    console.log('Eliminar turno...');
    this.PreguntaEliminar(pkturno);
  }
  
  
  async PonerLoading() {
    return await this.loadingCtrl.create({message:'Cargando...'}).then(a => {
      a.present().then(() => {});});
  }
  async SacarLoading() {
    return await this.loadingCtrl.dismiss();
  }


  async PreguntaEliminar(IDTurno) {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: '¿Deseas <strong>eliminar</strong> el turno?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Aceptar',
          handler: () => {
            var link = 'http://barberia.ironhide.com.ar/API_BARBERIA.php';
            var datos = JSON.stringify({opcion:'EliminarTurnos',pkturno:IDTurno});
            this.http.post(link, datos)
            .subscribe(respuesta => {
              this.server2 = JSON.parse(respuesta["_body"]);
              console.log(this.server2.length);
              this.ToastAccion(this.server2.descripcion);
              this.ActualizarLista();
            }, error => {
              console.log(error);
            });
          }
        }
      ]
    });

    await alert.present();
  }
  async ToastAccion(Texto) {
    const toast = await this.Toast.create({
      message: Texto,
      duration: 2000
    });
    toast.present();
  }


}
