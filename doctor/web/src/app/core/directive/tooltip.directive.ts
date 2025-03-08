import {ConnectedPosition, Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

/**
 * Tooltip
 */
@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnInit {

  /** Contenido que se va a renderizar dentro del tooltip */
  @Input('tooltip') tooltipContent?: TemplateRef<any>;

  /**
   * Si se debe cerrar al apartar el ratón
   */
  @Input('tooltip-manual-close')
  closeManually: boolean = false;

  /**
   * Tiempo que tarda en cerrarse el tooltip
   */
  @Input('tooltip-close-delay')
  closeDelay: number = 200;

  /**
   * Tiempo que tarda en abrirse el tooltip
   *
   * @type {number}
   * @memberof TooltipDirective
   */
  @Input('tooltip-open-delay')
  openDelay: number = 1500;

  /**
   * Margen en Y
   *
   * @type {number}
   * @memberof TooltipDirective
   */
  @Input('tooltip-margin-y')
  marginY: number = 8;

  /**
   * Margen en X
   *
   * @type {number}
   * @memberof TooltipDirective
   */
  @Input('tooltip-margin-x')
  marginX: number = 40;

  /**
   * Posición del tooltip
   *
   * @type {('top' | 'bottom' | 'left' | 'right')}
   * @memberof TooltipDirective
   */
  @Input('tooltip-position') tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  /**
   * Indica si el tooltip está abierto
   */
  #opened = false;

  /**
   * Timeout de apertura
   */
  #openTimeout: any;

  /**
   * Timeout de cierre
   */
  #closeTimeout: any;

  /**
   * Indica si el ratón está sobre el tooltip
   */
  #isOver = false;

  /** Overlay que simula ser un tooltip */
  #overlayRef?: OverlayRef;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private render: Renderer2
  ) {
  }

  ngOnInit(): void {
    // Si se recibe el contenido a mostrar
    if (this.tooltipContent) {
      // Se crea la configuración de posicionamiento para el tooltip
      let positions: ConnectedPosition[] = [
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetX: 0,
          offsetY: this.marginY,
        },
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetX: 0,
          offsetY: -this.marginY,
        },
        {
          originX: 'start',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: this.marginX,
          offsetY: 0,
        },
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
          offsetX: -this.marginX,
          offsetY: 0,
        }
      ];

      switch (this.tooltipPosition) {
        case 'top':
          positions = [positions[1], positions[0], positions[2], positions[3]];
          break;
        case 'left':
          positions = [positions[2], positions[0], positions[1], positions[3]];
          break;
        case 'right':
          positions = [positions[3], positions[0], positions[1], positions[2]];
          break;
      }

      const position = this.overlayPositionBuilder
        .flexibleConnectedTo(this.elementRef)
        .withPositions(positions);

      // Se crea el overlay y se guarda su referencia
      this.#overlayRef = this.overlay.create({
        // Configuración para la posición del overlay
        positionStrategy: position,
        // Comportamiento del overlay cuando se haga scroll y se esté mostrando
        scrollStrategy: this.overlay.scrollStrategies.close(),
        // Clase para darle estilo al overlay
        panelClass: 'tooltip'
      });

      this.#overlayRef.overlayElement.addEventListener('mouseover', () => {
        this.#isOver = true;
        this._show();
      });
      this.#overlayRef.overlayElement.addEventListener('mouseout', () => {
        this.#isOver = false;
        this._hide();
      });
      this.#overlayRef.overlayElement.addEventListener('click', () => {
        this.forceHide();
      });
    }
    // Se muestra un error si la directiva no recibe contenido para mostrar
    else {
      console.error('[ERROR] La directiva tiene que recibir el contenido a mostrar...');
    }
  }

  @HostListener('mouseover')
  private _show(): void {
    clearTimeout(this.#openTimeout);
    clearTimeout(this.#closeTimeout);

    this.#openTimeout = setTimeout(() => {
      if (!this.#opened) {
        // Si existe overlay se enlaza con el contenido
        if (this.#overlayRef && this.tooltipContent) {
          this.#overlayRef.removePanelClass("closing");
          let containerPortal: TemplatePortal<any>;

          containerPortal = new TemplatePortal(this.tooltipContent, this.viewContainerRef);

          // Enlazamos el portal con el overlay creado al iniciar la directiva
          this.#overlayRef.attach(containerPortal);
          this.#opened = true;

          const closeButton = this.#overlayRef.overlayElement.querySelector("a.close-button");
          if (closeButton) {
            this.render.listen(closeButton, "click", () => {
              this.hideTooltip();
            });
          }
        }
      }
    }, this.openDelay);
  }


  @HostListener('mouseout')
  private _hide(): void {
    clearTimeout(this.#openTimeout);
    clearTimeout(this.#closeTimeout);

    setTimeout(() => {
      if (this.#opened && !this.closeManually) {
        this.hideTooltip();
      }
    }, this.closeDelay);
  }


  @HostListener('click')
  private forceHide(): void {
    if (this.#openTimeout) {
      clearTimeout(this.#openTimeout);
    }

    this.#overlayRef?.addPanelClass("closing");
    this.#overlayRef?.detach();
    this.#opened = false;
  }

  /**
   * Cierra el tooltip
   */
  hideTooltip() {
    // Si existe un overlay se desenlaza del contenido
    if (this.#overlayRef && !this.#isOver) {
      this.#overlayRef.addPanelClass("closing");

      // Cerrar tras la transición
      setTimeout(() => {
        this.#overlayRef?.detach();
        this.#opened = false;
      }, 200);
    }
  }

}
