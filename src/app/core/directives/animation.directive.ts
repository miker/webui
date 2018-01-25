import { Directive, ElementRef, Renderer2, AfterViewInit, Input } from '@angular/core';
import { tween, styler } from 'popmotion';
import { TweenProps } from 'popmotion/src/animations/tween/types';
import { Value } from 'popmotion/src/reactions/value';
import { Subject } from 'rxjs/Subject';

@Directive({selector: '[animate]'})
export class AnimationDirective implements AfterViewInit{

  parent: any;
  //@Input() target:ElementRef; //May have to implement this later
  @Input() animation: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2){ 
  }

  ngAfterViewInit(){
    this.parent = this.elRef.nativeElement.parentNode;
    this.animate();
  }

  // HELLO WORLD!
  animate(){
    switch(this.animation){
      case 'shake':
        this.shake();
        alert("Shake it baby!");
      break;
      default:
        const shaker = this.shake();
        //This is how you would stop the animation
        //shaker.stop();
      break;
    }
  }

  shake(){
    const elStyler = styler(this.parent);

    const s = tween({
      from: { rotate: -1.25, scale:1},
      to: { rotate: 1.25, scale: 1 },
      //ease: easing.easeInOut,
      flip: Infinity,
      duration: 100
    }).start(elStyler.set);
     return s;
  }
}

