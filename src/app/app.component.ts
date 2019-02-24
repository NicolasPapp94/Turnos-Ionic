import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Http } from '@angular/http';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Turnos',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Generar',
      url: '/generar',
      icon: 'filing'
    }
  ];
  session_iniciada;
  data:any = {};
  session = {
    "nombre": '',
    "imagen" : 'assets/avatar.png'
  };
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public alertController: AlertController,
    public http: Http,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private storage: Storage,
    public evento : Events
  ) {
    this.initializeApp();
  }


  async CamposSinCompletar() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Hay campos sin completar',
      buttons: ['OK']
    });
    await alert.present();
  }

  async ErrorInicioSesion() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Usuario o contraseña incorrectos',
      buttons: ['OK']
    });
    await alert.present();
  }

  TraerUsuario(Usuario,Contraseña){
    var link = 'http://barberia.ironhide.com.ar/API_BARBERIA.php';
      var datos = JSON.stringify({usuario: Usuario, password:Contraseña, opcion:'TraerUsuario'});
      this.http.post(link, datos)
      .subscribe(data => {
        this.data.response = JSON.parse(data["_body"]);
        console.log(this.data.response);
        if (this.data.response.estado){
          this.storage.set('id', this.data.response.Datos[0].pknegocio);
          this.storage.set('nombre', this.data.response.Datos[0].nombre_negocio);
          console.log(this.data.response.Datos[0].pknegocio);
          this.session.nombre = this.data.response.Datos[0].nombre_negocio;
          this.session_iniciada=true;
          this.storage.get('id').then((val) => {
            this.evento.publish('InicioSesion',val);
          });
        } else {
          this.ErrorInicioSesion();
          this.session_iniciada=false;
        }     
      }, error => {
      });
  }

  CerrarSesion(){
    this.session_iniciada=false;
    this.session = {
      "nombre": '',
      "imagen" : 'assets/avatar.png'
    };
    this.evento.publish('CierreSesion');
  }

  async IniciarSesionManual() {
    const alert = await this.alertController.create({
      header: 'Iniciar sesion',
      inputs: [
        {
          name: 'Usuario',
          type: 'text',
          placeholder: 'Usuario'
        },
        {
          name: 'Contraseña',
          type: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [{
          text: 'Ok',
          handler: (data) => {
            if (data.Contraseña == '' || data.Usuario ==''){
              this.CamposSinCompletar();
            } else {
              this.TraerUsuario(data.Usuario,data.Contraseña);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async PonerLoading() {
    return await this.loadingCtrl.create({message:'Cargando...'}).then(a => {
      a.present().then(() => {});});
  }
  async SacarLoading() {
    return await this.loadingCtrl.dismiss();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.storage.get('id').then((val) => {
      if (val==null){
        this.session_iniciada=false;
      } else {
        this.session_iniciada=true;
        this.storage.get('nombre').then((nombre) => {
          this.session = {
            "nombre": nombre,
            "imagen" : 'assets/avatar.png'
          };
        });
      }
    });
  }
}
