import { Component, OnInit } from '@angular/core';
import { NgxGradientTextComponent } from '@omnedia/ngx-gradient-text';
// import { NgxOrbComponent } from '@omnedia/ngx-orb';
import { NgxHighlighterComponent } from "@omnedia/ngx-highlighter";
import { NgxShinyTextComponent } from '@omnedia/ngx-shiny-text';
import { NgxFadeComponent } from '@omnedia/ngx-fade';

import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';
import { ActivatedRoute, Router } from '@angular/router';
import { Homeservice } from './Service/home.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-home',
  imports: [NgxGradientTextComponent, NgxHighlighterComponent, NgxShinyTextComponent, NgxFadeComponent, NgxTypewriterComponent, TitleCasePipe, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  email!: string;
  data: any = {}
  profilePicUrl: SafeUrl | null = null; // ✅ holds image for display
  constructor(private route: ActivatedRoute, private homeservice: Homeservice, private sanitizer: DomSanitizer, private router: Router) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = (params['email']);

    });
    this.homeservice.getByUser(this.email).subscribe(result => {
      this.data = result["data"]
      this.homeservice.SetData(this.data.contact)
      this.homeservice.SetRole(this.data.role)
      this.fetchProfilePic(this.email);

    })
  }

  fetchProfilePic(email: string) {
    this.homeservice.getProfilePic(email).subscribe({
      next: (blob) => {
        if (blob && blob.size > 0) {
          const objectUrl = URL.createObjectURL(blob);
          this.profilePicUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
        } else {
          console.warn('No profile picture found for this user');
          this.profilePicUrl = null;
        }
      },
      error: (err) => {
        console.error('Error fetching profile picture:', err);
        this.profilePicUrl = null;
      }
    });
  }

  logout() {

    this.homeservice.logout().subscribe(payload => {
     if (payload["message"] === 'logout successfully')  {
        sessionStorage.clear()
        this.router.navigateByUrl("")
      }
    })
  }





}
