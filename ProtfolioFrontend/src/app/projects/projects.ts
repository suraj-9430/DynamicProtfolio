import { Component, OnInit } from '@angular/core';
import { NgxNeonUnderlineComponent } from '@omnedia/ngx-neon-underline';
import { NgxTimelineComponent, TimelineEntry } from '@omnedia/ngx-timeline';
import { NgxFadeComponent } from '@omnedia/ngx-fade';
import { Projectservice } from './service/project.service';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
  selector: 'app-projects',
  imports: [NgxTimelineComponent, NgxNeonUnderlineComponent, NgxFadeComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit {
  email: any;
  data: any[] = [];
  timelineData: TimelineEntry[] = [];
  displaypro: boolean = true;
  constructor(private projectservice: Projectservice, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = (params['email']);
    });
    this.projectservice.getByEmail(this.email).subscribe(result => {
      if (result["data"].length == 0 && result['message'] == 'success') {
        this.displaypro = false;
      }
      else {
        this.data = result['data'] || [];
        console.log("Fetched projects:", this.data);
        this.timelineData = this.buildTimelineData(this.data);
      }

    })
  }
  buildTimelineData(projects: any[]): TimelineEntry[] {
    return projects.map((project) => ({
      title: `<h2 class="timeline-title">${project.year}</h2>`,
      content: `
        <div class="timeline-content">
          ${project.title}
          <ul>
            ${project.descriptions.map((desc: string) => `<li>${desc}</li>`).join('')}
          </ul>
          ${project.sitelink && project.sitelink !== "NA"
          ? `<button type="button" class="btn" 
                  style="background-color: #9ea9a5ff; border-radius: 2rem; width: 10rem; border-color: #693B93;">
                  <a href="${project.sitelink}" target="_blank" rel="noopener noreferrer" 
                    style="text-decoration: none; color: white; font-weight: 500;">Learn More</a>
                </button>`
          : ''
        }
        </div>
      `
    }));
  }



  // timelineData: TimelineEntry[] = [{
  //   title:`<h2 class="timeline-title">2025 <h2>`,
  //   content:`
  //      <div class="timeline-content">
  //     Portfolio Website.
  //     <ul >
  //       <li>Responsive Angular portfolio with NGX UI</li>
  //       <li>Modern UI, routing, and lazy loading</li>
  //       <li>Cross-device optimized and mobile-friendly</li>
  //     </ul>
  //     </div>
  //   `
  // },
  // {
  //   title:`<h2 class="timeline-title">2024 <h2>`,
  //   content:`
  //   <div class="timeline-content">
  //     Demo Company Website (MEAN).
  //     <ul >
  //       <li>Single Page Application with MEAN stack</li>
  //       <li>Optimized performance with lazy loading</li>
  //       <li>Tech Stack: MEAN Stack, Bootstrap, GitHub Pages</li>
  //     </ul>

  // <button type="button" class="btn" style="background-color: #9ea9a5ff;border-radius: 2rem; width: 10rem; border-color: #693B93;"><a href="https://suraj-9430.github.io/CompanySite/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: white; font-weight: 5rem;">Learn More </a></button>
  //     </div>
  //   `
  // },
  // {
  //   title:`<h2 class="timeline-title">2023 <h2>`,
  //   content:`
  //      <div class="timeline-content">
  //     Automated Brain Tumor Detection.
  //     <ul >
  //       <li>MRI analysis with deep learning.</li>
  //       <li>Published a research paper based on the project.</li>
  //       <li>Tech Stack: Python, Flask, Deep Learning, VGG-16, HTML, CSS</li>
  //     </ul>

  // <button type="button" class="btn" style="background-color: #9ea9a5ff;border-radius: 2rem; width: 10rem; border-color: #693B93;"><a href="https://github.com/suraj-9430/Brain-tumor-Detection-System-VGG-16" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: white; font-weight: 5rem;">Learn More </a></button>
  //     </div>
  //   `
  // },

  // {
  //   title:`<h2 class="timeline-title">2023 <h2>`,
  //   content:`
  //      <div class="timeline-content">
  //     Face Recognition Attendance System.
  //     <ul >
  //       <li>Real-time facial recognition attendance</li>
  //       <li>Firebase-based secure data management</li>
  //       <li>Tech Stack: Python, OpenCV, Firebase</li>
  //     </ul>


  //     </div>
  //   `
  // }];


  //  <button type="button" class="btn btn-primary" style="background-color: #9ea9a5ff;border-radius: 2rem; width: 10rem; border-color: #693B93;border"><a href="https://suraj-9430.github.io/CompanySite/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: white; font-weight: 5rem;">Learn More </a></button>
}
