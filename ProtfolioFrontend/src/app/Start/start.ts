import { Component } from '@angular/core';
import { NgxBorderBeamComponent } from "@omnedia/ngx-border-beam";
import { Home } from "../home/home";
import { Workexperiance } from "../workexperiance/workexperiance";
import { Rays } from "../rays/rays";
import { Projects } from "../projects/projects";
import { Footer } from "../footer/footer";
// import { Certificates } from "../certificates/certificates";
import { Certificactehax } from "../certificactehax/certificactehax";

@Component({
  selector: 'app-main',
  imports: [NgxBorderBeamComponent, Home, Workexperiance, Rays, Projects, Footer, Certificactehax],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

}
