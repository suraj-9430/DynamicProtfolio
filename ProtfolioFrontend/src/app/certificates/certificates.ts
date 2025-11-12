import { Component } from '@angular/core';
import { NgxNeonUnderlineComponent } from "@omnedia/ngx-neon-underline";
import { NgxMarqueeComponent } from '@omnedia/ngx-marquee';

import { NgxFadeComponent } from '@omnedia/ngx-fade';


@Component({
  selector: 'app-certificates',
  imports: [NgxNeonUnderlineComponent, NgxMarqueeComponent, NgxFadeComponent],
  templateUrl: './certificates.html',
  styleUrl: './certificates.css'
})
export class Certificates {

}
