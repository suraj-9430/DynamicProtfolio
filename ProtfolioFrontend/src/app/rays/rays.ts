import { Component, OnInit } from '@angular/core';
import { NgxConnectionBeamComponent } from '@omnedia/ngx-connection-beam';
import { NgxFadeComponent } from "@omnedia/ngx-fade";
import { Homeservice } from '../home/Service/home.service';
    // import { NgxThreeGlobeComponent } from '@omnedia/ngx-three-globe';
    // import { NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-rays',
  imports: [NgxConnectionBeamComponent, NgxFadeComponent],
  templateUrl: './rays.html',
  styleUrl: './rays.css'
})
export class Rays implements OnInit {
  role: any;
  constructor(private roleservice:Homeservice){}
  ngOnInit(): void {
    this.roleservice.getRole().subscribe(role=>{
      if(role){
        this.role=role
      }
    })
    
  }

}
