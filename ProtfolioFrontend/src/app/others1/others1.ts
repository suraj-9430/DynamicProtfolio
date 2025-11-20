import { Component, AfterViewInit, OnDestroy } from '@angular/core';

import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import MorphSVGPlugin from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(Draggable, MorphSVGPlugin);

@Component({
  selector: 'app-others1',
  templateUrl: './others1.html',
  styleUrls: ['./others1.css']
})
export class Others1 implements AfterViewInit, OnDestroy {
  private audioClick: HTMLAudioElement | null = null;
  private destroyed = false;

  ngAfterViewInit(): void {
    // prepare audio and start animation setup
    this.audioClick = new Audio('https://assets.codepen.io/605876/click.mp3');
    this.initAnimation();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.audioClick) {
      try {
        this.audioClick.pause();
        this.audioClick.currentTime = 0;
      } catch (e) {
        // ignore
      }
    }
    // (Optional) Remove event listeners if you add any DOM listeners later
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const username = (document.getElementById('username') as HTMLInputElement | null)?.value;
    const password = (document.getElementById('password') as HTMLInputElement | null)?.value;

    // TODO: wire up to Reactive Forms / Auth service as needed
  }

  private initAnimation() {
    if (this.destroyed) return;

    // Query and type critical DOM nodes
    const ON = document.querySelector('#on') as HTMLInputElement | null;
    const OFF = document.querySelector('#off') as HTMLInputElement | null;
    const LOGIN_FORM = document.querySelector('.login-form') as HTMLElement | null;

    let startX = 0;
    let startY = 0;

    const PROXY = document.createElement('div');

    // Typed array to avoid `unknown` issues
    const CORDS = gsap.utils.toArray<SVGPathElement>('.cords path') as SVGPathElement[];

    const DUMMY_CORD = document.querySelector('.cord--dummy') as SVGLineElement | null;
    const HIT = document.querySelector('.lamp__hit') as HTMLElement | null;

    // Guards: ensure required elements exist
    if (!DUMMY_CORD || !HIT || CORDS.length === 0) {
      console.warn('Required SVG elements not found: cord or hit area missing or no cords found');
      // still try to set lamp visible (graceful fallback)
      try {
        gsap.set('.lamp', { display: 'block' });
      } catch {}
      return;
    }

    const ENDX = DUMMY_CORD.getAttribute('x2') ?? '124';
    const ENDY = DUMMY_CORD.getAttribute('y2') ?? '348';

    const RESET = () => {
      // PROXY is a div; we can position it for Draggable initial state
      gsap.set(PROXY, { x: ENDX, y: ENDY });
    };
    RESET();

    const STATE: { ON: boolean } = { ON: false };

    // initial visual setup
    gsap.set(['.cords', HIT], { x: -10 });
    gsap.set('.lamp__eye', { rotate: 180, transformOrigin: '50% 50%', yPercent: 50 });

    const CORD_DURATION = 0.1;
    const CORD_TL = gsap.timeline({
      paused: true,
      onStart: () => {
        STATE.ON = !STATE.ON;
        // set CSS var to control appearance
        gsap.set(document.documentElement, { '--on': STATE.ON ? 1 : 0 });

        const hue = gsap.utils.random(0, 359);
        gsap.set(document.documentElement, { '--shade-hue': hue });
        gsap.set(document.documentElement, { '--glow-color': `hsl(${hue},40%,45%)` });
        gsap.set(document.documentElement, { '--glow-color-dark': `hsl(${hue},40%,35%)` });

        gsap.set('.lamp__eye', { rotate: STATE.ON ? 0 : 180 });

        // hide dummy cord + hit while morphing, show morphing path
        gsap.set([DUMMY_CORD, HIT], { display: 'none' });
        gsap.set(CORDS[0], { display: 'block' });

        this.audioClick?.play();

        if (STATE.ON) {
          ON?.setAttribute('checked', 'true');
          OFF?.removeAttribute('checked');
          LOGIN_FORM?.classList.add('active');
        } else {
          ON?.removeAttribute('checked');
          OFF?.setAttribute('checked', 'true');
          LOGIN_FORM?.classList.remove('active');
        }
      },
      onComplete: () => {
        // restore visuals after morph
        gsap.set([DUMMY_CORD, HIT], { display: 'block' });
        gsap.set(CORDS[0], { display: 'none' });
        RESET();
      }
    });

    // Add morph steps - CORDS array is typed so GSAP accepts elements
    for (let i = 1; i < CORDS.length; i++) {
      CORD_TL.add(
        gsap.to(CORDS[0] as SVGPathElement, {
          // morphSVG plugin accepts element targets
          // we pass CORDS[i] directly (typed)
          // TS will accept this because CORDS is typed as SVGPathElement[]
          // @ts-ignore-next-line: morphSVG plugin typings might be missing in some setups
          morphSVG: CORDS[i],
          duration: CORD_DURATION,
          repeat: 1,
          yoyo: true
        })
      );
    }

    // Draggable usage (Guard Draggable exists)
    try {
      if ((Draggable as any) && typeof (Draggable as any).create === 'function') {
        (Draggable as any).create(PROXY, {
          trigger: HIT,
          type: 'x,y',
          onPress: (e: any) => {
            startX = e.x;
            startY = e.y;
          },
          onDrag: function (this: any) {
            // DUMMY_CORD is non-null (guarded earlier)
            gsap.set(DUMMY_CORD, {
              attr: {
                x2: String(this.x),
                y2: String(Math.max(400, this.y))
              }
            });
          },
          onRelease: (e: any) => {
            const dx = Math.abs(e.x - startX);
            const dy = Math.abs(e.y - startY);
            const distance = Math.sqrt(dx * dx + dy * dy);

            gsap.to(DUMMY_CORD, {
              attr: { x2: ENDX, y2: ENDY },
              duration: CORD_DURATION,
              onComplete: () => {
                if (distance > 50) {
                  CORD_TL.restart();
                } else {
                  RESET();
                }
              }
            });
          }
        });
      } else {
        // fallback: if Draggable not available, clicking the hit area toggles
        HIT.addEventListener('click', () => CORD_TL.restart());
      }
    } catch (err) {
      console.warn('Draggable setup failed, falling back to click toggle', err);
      HIT.addEventListener('click', () => CORD_TL.restart());
    }

    // finally ensure lamp becomes visible
    gsap.set('.lamp', { display: 'block' });
  }
}
