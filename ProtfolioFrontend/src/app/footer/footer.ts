import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Homeservice } from '../home/Service/home.service';
import { Footerservice } from './Service/footerservice';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { NgxVortexComponent } from '@omnedia/ngx-vortex';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer implements OnInit {
  contact!: string;
  email!: string;
  github!: string;
  linkedin!: string;
  twitter: any;
  resume: any;

  constructor(private contactno: Homeservice, private router: ActivatedRoute, private socialservice: Footerservice,) { }
  ngOnInit(): void {
    this.contactno.getData().subscribe(data => {
      if (data) {
        this.contact = data
      }
    });
    this.router.queryParams.subscribe(params => {
      this.email = (params['email']);
      this.socialservice.getByUser(this.email).subscribe(payload => {
       
        this.github = payload["github"]
        this.linkedin = payload["linkedin"]
        this.twitter = payload["twitter"]

      });
    })
  }





  openResumeInNewTab() {
    if (!this.email) { alert('Email not provided'); return; }
    const url = this.socialservice.resumeUrl(this.email, false);
    window.open(url, '_blank');
  }

  // Force server-side download (opens new tab with ?download=true)
  // openResumeForceDownload() {
  //   if (!this.email) { alert('Email not provided'); return; }
  //   const url = this.socialservice.resumeUrl(this.email, true);
  //   window.open(url, '_blank');
  // }

  // Client-side download: fetch blob + extract filename from headers if available
  downloadResumeClientSide() {
    if (!this.email) { alert('Email not provided'); return; }

    this.socialservice.downloadResumeWithHeaders(this.email).subscribe({
      next: (resp) => {
        const blob = resp.body!;
        if (!blob || blob.size === 0) {
          alert('No resume file found');
          return;
        }

        // Try to get filename from Content-Disposition header
        const cd = resp.headers.get('content-disposition') || '';
        const filename = this.extractFilenameFromContentDisposition(cd) || 'resume.pdf';

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('download error', err);
        alert('Could not download resume. Check console for details.');
      }
    });
  }

  // Utility: parse filename from content-disposition header
  private extractFilenameFromContentDisposition(cd: string): string | null {
    // Example: Content-Disposition: inline; filename="Resume (1).pdf"
    const match = /filename\*?=(?:UTF-8'')?["']?([^;"']+)["']?/.exec(cd);
    if (match && match[1]) {
      try {
        // decode if percent-encoded
        return decodeURIComponent(match[1]);
      } catch {
        return match[1];
      }
    }
    return null;
  }



}
