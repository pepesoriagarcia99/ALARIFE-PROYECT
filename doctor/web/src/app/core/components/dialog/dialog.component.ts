import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'nt-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogComponent {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  /**
   * Título del diálogo
   */
  @Input()
  dialogTitle?: string;

  /**
   * Muestra el botón de cerrar
   */
  @Input()
  showClose: boolean = true;

  /**
   * Indica si debe mostrar el footer
   */
  @Input()
  showFooter: boolean = true;

  /**
   * Texto del botón cancelar o undefined para no mostrar
   */
  @Input()
  cancelButton?: string;

  /**
   * Texto del botón aceptar o undefined para no mostrar
   */
  @Input()
  acceptButton?: string;

  /**
   * Si el botón de aceptar está habilitado
   */
  @Input()
  acceptButtonEnabled: boolean = true;

  @Input()
  acceptButtonClass?: string;

  /**
   * Ancho del diálogo
   */
  @Input()
  width: string = 'unset';

  /**
   * Alto del diálogo
   */
  @Input()
  height: string = 'unset';

  /**
   * Al pulsar el botón cancelar
   *
   * @memberof DialogComponent
   */
  @Output()
  onCancel = new EventEmitter<DialogComponent>();

  /**
   * Al pulsar aceptar
   */
  @Output()
  onAccept = new EventEmitter<DialogComponent>();

  /**
   * Al abrir el diálogo
   */
  opened = false;

  constructor() {}

  /**
   * Abre el dialogo
   */
  openDialog(): void {
    this.opened = true;
  }

  /**
   * Cierra el dialogo
   */
  closeDialog(): void {
    this.opened = false;
  }

  scrollToBottom(): void {
    this.scrollContainer.nativeElement.scrollTo({ top: this.scrollContainer.nativeElement.scrollHeight, behavior: 'smooth' });
  }
}
