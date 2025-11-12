import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgxGalaxyComponent } from "@omnedia/ngx-galaxy";
import { NgxThreeGlobeComponent } from '@omnedia/ngx-three-globe';
    import { NgxHaloComponent } from '@omnedia/ngx-halo';




@Component({
  selector: 'app-aminmation',
  imports: [ ],
  templateUrl: './aminmation.html',
  styleUrl: './aminmation.css'
})
export class Aminmation implements OnInit {
  constructor(private router:Router){}
  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/main'],{
        skipLocationChange: true
      });
    }, 3000);
  }
}
