import { Injectable } from '@angular/core';
import {
  AlertController,
  ToastController,
  PopoverController,
  ModalController,
  LoadingController
} from '@ionic/angular';

import { TranslateService } from '@ngx-translate/core';
import { ComponentRef } from '@ionic/core';

@Injectable({providedIn: 'root'})

export class CrafterService {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private popCtrl: PopoverController,
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private loading: LoadingController
  ) { }

  public async alert(message: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Antic\'s Code Mobile',
      mode: 'ios',
      message: this.translateMessage(message),
      buttons: ['OK']
    });
    return alert.present();
  }

  public async confirm(message: string, header: string): Promise<any> {
    const alert = await this.alertCtrl.create({
      header,
      message,
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        { text: 'OK' }
      ]
    });

    alert.present();
    return alert.onDidDismiss();
  }

  public async toast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      color: 'light',
      position: 'top',
      cssClass: 'toast-sheet'
    });
    return toast.present();
  }

  public async modal(component: ComponentRef, data?: any): Promise<void> {
    if (this.modalCtrl.getTop()) { return; }
    const modal = await this.modalCtrl.create({
      component,
      componentProps: data
    });
    return modal.present();
  }

  public async loader(): Promise<void> {
    const loading = await this.loading.create({
      message: `Cargando...`});
    await loading.present();
  }

  public async loaderOff(): Promise<void> {
    await this.loading.dismiss();
  }

  public async pop<T>(component: ComponentRef, data?: any): Promise<void> {
    const popover = await this.popCtrl.create({
      component,
      componentProps: data
    });
    return popover.present();
  }

  private translateMessage(msg: string): string {
    return this.translate.instant(msg);
  }

  public close(): void {
    this.popCtrl.dismiss();
  }

}