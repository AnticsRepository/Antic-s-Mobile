import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Draft } from '@shared/interfaces/interfaces';
import { Subject } from 'rxjs';
import { DraftsService } from '@core/services/drafts/drafts.service';
import { ModalController } from '@ionic/angular';
import { EditComponent } from '@shared/components/modals/edit/edit.component';
import { PreviewComponent } from '@shared/components/modals/preview/preview.component';
import { takeUntil } from 'rxjs/operators';
import { CrafterService } from '@core/services/crafter/crafter.service';

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss']
})

export class DetailPage implements OnInit, OnDestroy {

  draft: Draft;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private draftSrv: DraftsService,
    private modalCtrl: ModalController,
    private crafter: CrafterService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.getDraftBySlug(slug);
  }

  private getDraftBySlug(slug: string): void {
    this.draftSrv.getDraftBySlug(slug)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((res: Draft) => {
      this.draft = res;
    });
  }

  public async open(page: string): Promise<void> {
    if (page === 'edit') {
      const modal = await this.modalCtrl.create({
        component: EditComponent,
        componentProps: { draft: this.draft}
      });

      modal.present();
    } else if (page === 'preview') {
      const modal = await this.modalCtrl.create({
        component: PreviewComponent,
        componentProps: { draft: this.draft}
      });

      modal.present();
    }
  }

  public update(): void {
    const confirm = this.crafter.confirm('¿Quieres guardar el mensaje?', 'Guardar Artículo');
    confirm.then(res => {
      if (!res.role) {
        this.draftSrv.updateDraftMessage(
          this.draft.message, this.draft._id
        ).pipe(takeUntil(this.unsubscribe$))
         .subscribe(_ => {
           this.draftSrv.getDraftsByUser().toPromise().then();
           this.crafter.alert('Mensaje Actualizado');
          });
      }
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
