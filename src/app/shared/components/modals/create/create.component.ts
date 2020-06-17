import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Draft } from '@shared/interfaces/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CATEGORIES, TAGS, BADGES, LEVELS } from '@shared/shared.data';
import { ModalController } from '@ionic/angular';
import { DraftsService } from '@core/services/drafts/drafts.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '@core/services/user/user.service';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { EditComponent } from '../edit/edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})

export class CreateComponent implements OnInit, OnDestroy {

  draft: Draft = {};
  createForm: FormGroup;
  categories = CATEGORIES;
  tags = TAGS;
  badges = BADGES;
  levels = LEVELS;
  imagePattern = '^.+\.(([pP][nN][gG])|([jJ][pP][gG]))$';  // Png, Jpg
  private unsubscribe$ = new Subject<void>();

  constructor(
    private modalCtrl: ModalController,
    private draftSrv: DraftsService,
    private userSrv: UserService,
    private crafter: CrafterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createDraftForm()
    this.draft.links = [];
  }

  public close(): void {
    this.modalCtrl.dismiss();
  }

  private createDraftForm(): void {
    this.createForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(35)
      ]),
      category: new FormControl(null, [
        Validators.required
      ]),
      tags: new FormControl(null, [
        Validators.required,
        this.selectValidator(3).bind(this)
      ]),
      badges: new FormControl(null, [
        Validators.required,
        this.selectValidator(2).bind(this)
      ]),
      level: new FormControl(null, [
        Validators.required
      ]),
      summary: new FormControl(null, [
        Validators.required,
        Validators.minLength(100),
        Validators.maxLength(600)
      ]),
      cover: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(this.imagePattern)
      ]),
      link_name: new FormControl(null, []),
      link_url: new FormControl(null, [])
    });
  }

  private selectValidator(limit: number) {
    return (control: FormControl) => {
      const c = control.value;
      if (c && c.length > limit) {
        return { error: true };
      }
      return null;
    };
  }

  public addLink(): void {
    const { link_name, link_url } = this.createForm.value;
    if (!link_name || !link_url) { return; }
    this.draft.links.push({
      name: link_name,
      url: link_url
    });

    this.createForm.get('link_name').setValue('');
    this.createForm.get('link_url').setValue('');
  }

  public onSubmit(): void {
    if (this.createForm.invalid) { return; }

    const draft: Draft = this.createForm.value;
    draft.links = this.draft.links;
    draft.author = this.userSrv.getUser().name;
    draft.user = this.userSrv.getUser()._id;
    draft.message = 'Aquí va el mensaje';

    this.draftSrv.createDraft(draft)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(_ => {
      this.modalCtrl.dismiss();
      this.draftSrv.getDraftsByUser().toPromise().then();
      const confirm = this.crafter.confirm('¿Quieres editarlo ahora?', 'Artículo guardado');
      confirm.then(res => {
        if (!res.role) {
          this.router.navigateByUrl('detail/' + _.slug);
        }
      })
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
