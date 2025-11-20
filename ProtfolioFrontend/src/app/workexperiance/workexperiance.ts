import { Component, OnInit } from '@angular/core';
import { NgxNeonUnderlineComponent } from '@omnedia/ngx-neon-underline';
import { NgxFadeComponent } from "@omnedia/ngx-fade";
import { ActivatedRoute } from '@angular/router';
import { WorkexprenceService } from './Service/workexprence.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-workexperiance',
  imports: [NgxNeonUnderlineComponent, NgxFadeComponent, CommonModule],
  templateUrl: './workexperiance.html',
  styleUrl: './workexperiance.css'
})
export class Workexperiance implements OnInit {
  email: any;
  data: any;
  loading: boolean = false
  constructor(private route: ActivatedRoute, private workexpservice: WorkexprenceService) { }
  ngOnInit(): void {

    this.route.queryParams.subscribe(async params => {
      this.email = (params['email']);
      this.workexpservice.getByEmail(this.email).subscribe({
        next: (result: any) => {
          if (result?.status === 'success') {
            this.data = result.data;
            this.loading = true;
          }
        },

        error: (err) => {
          console.log("Error:", err);

         
          if (err.status === 401 && err.error?.message === "Email not exist") {
            console.log("Email not exist");
            this.loading = false;   // <-- YOUR REQUIREMENT
          }

          // You can handle other errors too:
          // else if (err.status === 500) { ... }
        },

        complete: () => {
          
        }
      });

    });

  }


}
