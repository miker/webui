import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { tween, styler } from 'popmotion';
import { Subject } from 'rxjs/Subject';

@Directive({selector: '[animation]'})
export class AnimationDirective implements AfterViewInit{

  constructor(private elRef: ElementRef, private renderer: Renderer2){ 
  }

  ngAfterViewInit(){
    this.animate();
  }

  // HELLO WORLD!
  animate(){
    const el = this.elRef.nativeElement.parentNode;
    //console.log(el);
    const elStyler = styler(el);

    tween({
      from: { rotate: -3, background: '00c' },
      to: { rotate: 3, background: '#c00' },
      //ease: easing.easeInOut,
      flip: Infinity,
      duration: 80
    }).start(elStyler.set);
  }
}
