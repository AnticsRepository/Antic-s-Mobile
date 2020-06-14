import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Draft } from '@shared/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CATEGORIES, TAGS, BADGES, LEVELS } from '@shared/shared.data';
import { DraftsService } from '@core/services/drafts/drafts.service';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})

export class EditComponent implements OnInit, OnDestroy {

  @Input() draft: Draft;
  editForm: FormGroup;
  categories = CATEGORIES;
  tags = TAGS;
  badges = BADGES;
  levels = LEVELS;
  imagePattern = '^.+\.(([pP][nN][gG])|([jJ][pP][gG]))$';  // Png, Jpg
  private unsubscribe$ = new Subject<void>();

  constructor(
    private modalCtrl: ModalController,
    private draftSrv: DraftsService,
    private crafter: CrafterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createArticleForm();
  }

  public close(): void {
    this.modalCtrl.dismiss();
  }

  private createArticleForm(): void {
    this.editForm = new FormGroup({
      title: new FormControl(this.draft.title || null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(35)
      ]),
      category: new FormControl(this.draft.category || null, [
        Validators.required
      ]),
      tags: new FormControl(this.draft.tags || null, [
        Validators.required,
        this.selectValidator(3).bind(this)
      ]),
      badges: new FormControl(this.draft.badges || null, [
        Validators.required,
        this.selectValidator(2).bind(this)
      ]),
      level: new FormControl(this.draft.level || null, [
        Validators.required
      ]),
      summary: new FormControl(this.draft.summary || null, [
        Validators.required,
        Validators.minLength(100),
        Validators.maxLength(600)
      ]),
      cover: new FormControl(this.draft.cover || null, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(this.imagePattern)
      ])
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

  public onSubmit(): void {
    const {
      title,
      cover,
      category,
      tags,
      badges,
      level,
      summary
    } = this.editForm.value;

    this.draft.title = title;
    this.draft.cover = cover;
    this.draft.category = category;
    this.draft.tags = tags;
    this.draft.badges = badges;
    this.draft.level = level,
    this.draft.summary = summary;

    this.draftSrv.updateDraft(this.draft)
    .pipe(
      switchMap(_ => {
      this.modalCtrl.dismiss();
      this.router.navigateByUrl('/tabs/home');
      this.crafter.alert('Artículo Actualizado');
      return this.draftSrv.getDraftsByUser()
    }), takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
