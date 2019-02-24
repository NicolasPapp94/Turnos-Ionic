import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Http } from '@angular/http';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
@Component({
  selector: 'app-generar',
  templateUrl: './generar.page.html',
  styleUrls: ['./generar.page.scss'],
})
export class GenerarPage implements OnInit {
  data = {
    "nombre":'',
    "apellido":'',
    "telefono":'',
    "fecha_inicio":'',
    "hora_inicio":'',
    "ID":'' }
  session_iniciada;
  server:any;
  ID;
  logForm() {
    var link = 'http://barberia.ironhide.com.ar/API_BARBERIA.php';
    if (this.data.nombre != '' && this.data.apellido != ''&& this.data.telefono!='' && this.data.fecha_inicio != '' && this.data.hora_inicio!=''){
      this.storage.get('id').then((val) => {
          this.ID = val;
          this.data.ID=this.ID;
          var datos = JSON.stringify({
            nombre: this.data.nombre,
            apellido:this.data.apellido,
            telefono:this.data.telefono,
            hora_inicio:this.data.hora_inicio,
            fecha_inicio:this.data.fecha_inicio,
            ID: this.ID,
            opcion:'AltaTurno'});
            console.log(JSON.parse(datos));
            this.http.post(link, datos)
              .subscribe(response => {
                this.server = JSON.parse(response["_body"]);
                console.log(this.server);
                if (this.server.estado){
                  this.ToastExito();
                  this.navCtrl.navigateForward('/list');
                  var IDFormulario = 'FormularioTurno';
                  var resetForm = <HTMLFormElement>document.getElementById(IDFormulario);
                  resetForm.reset();
                } else {
                  this.ToastError();
                }     
            }, error => {
            });
        }); 
    } else {
      this.CamposSinCompletar();
    }
  }
  constructor(public Toast: ToastController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public http: Http,
    public alertController: AlertController,
    public storage: Storage,
    public evento : Events) { 
      evento.subscribe('InicioSesion', () => {
          this.session_iniciada=true; 
      });
      evento.subscribe('CierreSesion', () => {
        this.session_iniciada=false;
      });

    }

  ngOnInit() {
    this.data.fecha_inicio = new Date().toISOString();
  }
  async ToastExito() {
    const toast = await this.Toast.create({
      message: 'Se ha generado el turno.',
      duration: 2000
    });
    toast.present();
  }
  async ToastError() {
    const toast = await this.Toast.create({
      message: 'Se ha producido un error al generar el turno.',
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

  async CamposSinCompletar() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Hay campos sin completar',
      buttons: ['OK']
    });
    await alert.present();
  }

}
