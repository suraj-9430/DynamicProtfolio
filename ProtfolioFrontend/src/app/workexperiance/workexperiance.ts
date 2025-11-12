import { Component, OnInit } from '@angular/core';
    import { NgxNeonUnderlineComponent } from '@omnedia/ngx-neon-underline';
import { NgxFadeComponent } from "@omnedia/ngx-fade";
import { ActivatedRoute } from '@angular/router';
import { WorkexprenceService } from './Service/workexprence.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-workexperiance',
  imports: [NgxNeonUnderlineComponent, NgxFadeComponent,CommonModule],
  templateUrl: './workexperiance.html',
  styleUrl: './workexperiance.css'
})
export class Workexperiance  implements OnInit {
  email: any;
  data: any;
  loading:boolean=false
  constructor(private route:ActivatedRoute,private workexpservice:WorkexprenceService){}
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(async params => {
      this.email = (params['email']);
       const result: any = await this.workexpservice.getByEmail(this.email).toPromise();
        if (result['status'] === 'success') {
          this.data=result["data"]
          this.loading=true;
          console.log(this.data)

        }
    });
  
  }


}
