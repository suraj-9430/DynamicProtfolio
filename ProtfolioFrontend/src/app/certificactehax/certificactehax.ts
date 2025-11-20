import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxNeonUnderlineComponent } from "@omnedia/ngx-neon-underline";
import { NgxFadeComponent } from "@omnedia/ngx-fade";
import { ActivatedRoute } from '@angular/router';
import { CertiService } from './Service/certificate.service';


@Component({
  selector: 'app-certificactehax',
  imports: [CommonModule, NgxNeonUnderlineComponent, NgxFadeComponent],
  templateUrl: './certificactehax.html',
  styleUrls: ['./certificactehax.css']
})
export class Certificactehax implements OnInit {
  email: any;
   certificates: any[] = [];
  displaycer: boolean=true;
  constructor(private router: ActivatedRoute, private certiService: CertiService
  ) { }
  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.email = (params['email']);
      if (this.email) {
        this.loadCertificates();
      }
    });

  }
  loadCertificates(): void {
    this.certiService.getByUser(this.email).subscribe({
      next: (res: any) => {
        // Convert BLOB → base64 for preview/download
        if(res["data"].length==0){
          this.displaycer=false
        }
        else {
          this.displaycer=true
           this.certificates = res.data.map((cert: any) => {
          const base64String = this.arrayBufferToBase64(cert.fileData.data);
          const fileUrl = `data:${cert.fileType};base64,${base64String}`;
          return { ...cert, fileUrl };
        });
        

        }
       
      },
      error: (err) => {
        console.error('Error loading certificates:', err);
      },
    });
  }

  // ✅ Convert file buffer to Base64
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }


}
