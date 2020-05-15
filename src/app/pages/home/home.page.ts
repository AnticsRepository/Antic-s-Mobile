import { Component, OnInit, OnDestroy } from '@angular/core';
import { DraftsService } from '@core/services/drafts/drafts.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { CreateComponent } from '@shared/components/modals/create/create.component';
import { CrafterService } from '@core/services/crafter/crafter.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  constructor(
    public draftSrv: DraftsService,
    private router: Router,
    private modalCtrl: ModalController,
    private crafter: CrafterService
  ) {}

  ngOnInit() {
    this.getDrafts();
  }

  public navigate(slug: string): void {
    this.router.navigateByUrl('detail/' + slug);
  }

  private getDrafts(): void {
    if (!this.draftSrv.get()) {
      this.draftSrv.getDraftsByUser()
       .pipe(takeUntil(this.unsubscribe$))
       .subscribe();
    }
  }

  public async create(): Promise<void> {
    let exist = false;
    this.draftSrv.drafts.forEach(d => {
      if (d.status === 'Draft') {
        exist = true;
      }
    });

    if (exist) {
      const confirm = this.crafter.confirm('¿Quieres sobreescribirlo?', 'Ya existe un Artículo');
      confirm.then(async res => {
        if (!res.role) {
          const modal = await this.modalCtrl.create({
            component: CreateComponent
          });
          modal.present();
        }
      })
    } else {
      const modal = await this.modalCtrl.create({
        component: CreateComponent
      });
      modal.present();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
