import { Component, OnInit, Input } from '@angular/core';
import { Draft } from '@shared/interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})

export class PreviewComponent implements OnInit {

  @Input() draft: Draft;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  public close(): void {
    this.modalCtrl.dismiss();
  }

}
