import {
  GlobalPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayOutsideClickDispatcher,
  OverlayRef
} from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal'
import { Injectable, InjectionToken, Injector } from '@angular/core'
import { modalExpireDuration } from 'app/constants/animations.constants'
import { DialogRef } from './dialog-ref'

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  overlayRef!: OverlayRef
  constructor(
    private overlay: Overlay,
    private overlayOutsideClickDispatcher: OverlayOutsideClickDispatcher,
    private injector: Injector
  ) {}

  open(
    component: any,
    options: {
      config: OverlayConfig
      dialogLevel?: number
    },
    injectionToken: InjectionToken<any>,
    data?: any
  ): void {
    const positionStrategy = new GlobalPositionStrategy()
      .centerHorizontally()
      .top('90px')

    const scrollStrategy = this.overlay.scrollStrategies.block()

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      ...options.config,
      backdropClass: options.config.hasBackdrop
        ? ['bg-gray-700/[0.5]', 'duration-300', 'backdrop-blur-sm']
        : ''
    })

    const dialogRef = new DialogRef(this.overlayRef)

    const injector = this.createInjector(
      injectionToken,
      {
        outsidePointerEvents: this.overlayRef.outsidePointerEvents(),
        ...data
      },
      dialogRef
    )

    const componentPortal = new ComponentPortal(component, null, injector)

    this.overlayRef.attach(componentPortal)

    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.dispose())
  }

  close() {
    // this.closeInstantly()
    // TODO Implement animation
    // setTimeout(() => {
    //   this.closeInstantly()
    // }, modalExpireDuration)
  }

  closeInstantly() {
    this.overlayRef.dispose()
    this.overlayOutsideClickDispatcher.remove(this.overlayRef)
    this.overlayRef.detach()
  }

  createInjector(
    injectionToken: InjectionToken<any>,
    data: any,
    dialogRef: any
  ): Injector | null {
    if (!injectionToken) {
      return null
    }
    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: injectionToken, useValue: data }
      ]
    })
  }
}
