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
import { CREATE_GAME_DIALOG_DATA } from 'app/constants/tokens'

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
    config: OverlayConfig,
    injectionToken: InjectionToken<any>
  ): void {
    const positionStrategy = new GlobalPositionStrategy()
      .centerHorizontally()
      .top('90px')

    const scrollStrategy = this.overlay.scrollStrategies.block()

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      ...config,
      backdropClass: config.hasBackdrop
        ? ['bg-gray-700/[0.5]', 'duration-300', 'backdrop-blur-sm']
        : ''
    })

    const injector = this.createInjector(injectionToken, {
      outsidePointerEvents: this.overlayRef.outsidePointerEvents()
    })

    const componentPortal = new ComponentPortal(component, null, injector)

    this.overlayRef.attach(componentPortal)
  }

  close() {
    setTimeout(() => {
      this.overlayRef.dispose()
      this.overlayOutsideClickDispatcher.remove(this.overlayRef)
    }, modalExpireDuration)
  }

  createInjector(
    injectionToken: InjectionToken<any>,
    data: any
  ): Injector | null {
    if (!injectionToken) {
      return null
    }
    return Injector.create({
      parent: this.injector,
      providers: [{ provide: injectionToken, useValue: data }]
    })
  }
}
