import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Home } from "./home/home";
 import { NgxBorderBeamComponent } from '@omnedia/ngx-border-beam';
import { Workexperiance } from "./workexperiance/workexperiance";
import { Rays } from "./rays/rays";
import { Projects } from "./projects/projects";
import { Footer } from "./footer/footer";
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
// Home, NgxBorderBeamComponent, Workexperiance, Rays, Projects, Footer,RouterOutlet
 constructor(private router: Router,private activerouter:ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.urlAfterRedirects === '/') {
            document.body.style.background = "linear-gradient(135deg, rgba(12, 15, 26, 0.9), rgba(13, 51, 79, 0.9))";
        }
        else if (event.urlAfterRedirects.startsWith('/main')) {
          document.body.style.background = '#11081c'; // dark
        } else {
          document.body.style.background= '#ffffff'; // white
        }
      });
  }
}
