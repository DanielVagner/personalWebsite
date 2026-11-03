import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  afterRenderEffect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';

import { LanguageService } from '../../../core/language.service';
import { PROJECTS_TEXT, Project } from '../../../i18n/projects.i18n';
import { ProjectPreview } from '../project-preview/project-preview';

export interface ProjectDialogClose {
  /** The visitor chose the "discuss your project" CTA. */
  toContact: boolean;
}

/** Case study detail in a native modal <dialog>. Opens whenever `project` is set. */
@Component({
  selector: 'app-project-dialog',
  imports: [ProjectPreview],
  templateUrl: './project-dialog.html',
  styleUrl: './project-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDialog {
  readonly project = input<Project | null>(null);
  readonly closed = output<ProjectDialogClose>();

  protected readonly t = inject(LanguageService).select(PROJECTS_TEXT);
  protected readonly titleId = 'project-dialog-title';

  private readonly doc = inject(DOCUMENT);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dlg');
  private readonly scroller = viewChild.required<ElementRef<HTMLElement>>('scroller');

  private toContact = false;
  private pressedBackdrop = false;
  private locked = false;

  constructor() {
    afterRenderEffect(() => {
      const isOpen = this.project() !== null;
      const dlg = this.dialog().nativeElement;
      if (isOpen && !dlg.open) {
        this.toContact = false;
        this.scroller().nativeElement.scrollTop = 0;
        this.lockScroll();
        dlg.showModal();
      } else if (!isOpen && dlg.open) {
        dlg.close();
      }
    });

    inject(DestroyRef).onDestroy(() => this.unlockScroll());
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }

  protected goToContact(event: Event): void {
    event.preventDefault();
    this.toContact = true;
    this.close();
  }

  /** Fired by the native dialog for every way of closing (button, Esc, backdrop). */
  protected onClose(): void {
    this.unlockScroll();
    const toContact = this.toContact;
    this.toContact = false;
    this.closed.emit({ toContact });
  }

  // Backdrop clicks land on the <dialog> itself; content fills it edge to edge.
  // Require the press to start there too, so a text selection drag doesn't close it.
  protected onPointerDown(event: PointerEvent): void {
    this.pressedBackdrop = event.target === this.dialog().nativeElement;
  }

  protected onClick(event: MouseEvent): void {
    if (this.pressedBackdrop && event.target === this.dialog().nativeElement) this.close();
    this.pressedBackdrop = false;
  }

  private lockScroll(): void {
    if (this.locked) return;
    this.locked = true;
    const root = this.doc.documentElement;
    const body = this.doc.body;
    const scrollbar = (this.doc.defaultView?.innerWidth ?? 0) - root.clientWidth;
    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
  }

  private unlockScroll(): void {
    if (!this.locked) return;
    this.locked = false;
    this.doc.documentElement.style.overflow = '';
    this.doc.body.style.overflow = '';
    this.doc.body.style.paddingRight = '';
  }
}
