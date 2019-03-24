import {Directive, ElementRef, EventEmitter, OnDestroy, Output} from '@angular/core';

@Directive({
  selector: '[appDomChange]'
})
export class DomChangeDirective implements OnDestroy {

  private changes: MutationObserver;

  @Output()
  domChange: EventEmitter<MutationRecord> = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    const element = this.elementRef.nativeElement;
    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach((mutation: MutationRecord) => this.domChange.emit(mutation));
      }
    );
    this.changes.observe(element, {
      subtree: true,
      childList: true
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

}
