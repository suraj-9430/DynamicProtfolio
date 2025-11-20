import { Component, OnInit } from '@angular/core';
import { Page1 } from './Modelfile/login';
import { page2 } from './Modelfile/regester';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Loginservice } from './Service/loginservice';
import { Router } from '@angular/router';
import { page3 } from './Modelfile/workexp';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { NgxShineBorderComponent } from '@omnedia/ngx-shine-border';



@Component({
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule, NgxShineBorderComponent],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage implements OnInit {
  loginpageloading = true
  newregistration: any = false;
  selectedLogin: Page1 = new Page1;
  selectedReg: page2 = new page2;
  selectedWork: page3 = new page3
  passwordmatched: boolean = false;
  passwordlength: boolean = false;
  otpsent: boolean = false
  email!: string
  inceaserow: number = 1;
  otp!: string;
  projects = [
    { year: '', title: '', descriptions: ['', '', ''], sitelink: '' },
    { year: '', title: '', descriptions: ['', '', ''], sitelink: '' },
  ];

  constructor(private loginservice: Loginservice, private router: Router) { }
  ngOnInit(): void {
    sessionStorage.setItem("islog", "false")

  }

  newreg() {
    if (this.newregistration) {
      this.newregistration = false
      this.loginpageloading = true
      this.closeManual();
    }
    else {
      this.newregistration = true;
      this.loginpageloading = false;
    }
  }
  addnewrow() {
    this.inceaserow += 1;
  }

  closeManual() {
    this.newregistration = false;
    this.selectedReg.name = '';
    this.selectedReg.role = '';
    this.selectedReg.company = '';
    this.selectedReg.currposition = '';
    this.selectedReg.email = '';
    this.selectedReg.password = '';
    this.selectedReg.cofirmpassword = '';
    this.selectedReg.about = '';
    this.selectedReg.contact = '';
    this.selectedReg.address = '';
    this.selectedLogin.email = '';
    this.selectedLogin.password = '';
    this.selectedWork.cabout1 = '';
    this.selectedWork.cabout2 = "";
    this.selectedWork.cabout3 = '';
    this.selectedWork.cabout4 = "";
    this.selectedWork.currcompany4 = '';
    this.selectedWork.currcompany3 = "";
    this.selectedWork.currcompany2 = '';
    this.selectedWork.currcompany1 = '';
    this.selectedWork.duration4 = "";
    this.selectedWork.duration3 = "";
    this.selectedWork.duration1 = "";
    this.selectedWork.duration2 = "";
    this.loginpageloading = true;
    this.newregistration = false;
  }
  

Otp() {
  if (!this.selectedLogin?.email) {
    alert('Please enter your email first.');
    return;
  }

  // add this boolean to your component
  this.loginservice.OtpReq(this.selectedLogin).subscribe({
    next: (payload: any) => {
      const msg = payload?.message ?? payload;
      
      if (msg === 'OTP sent to email') {
        
        this.otpsent = true;
        alert('✅ OTP sent to your registered email. Please check your inbox (and spam).');
      } else {
        
        alert(String(msg));
      }
    },
    error: (err: any) => {
      console.error('Error requesting OTP:', err);
      sessionStorage.setItem('islog', 'false');

      const errorMessage =
        err?.error?.message ||
        err?.error?.error ||
        err?.message ||
        '❌ Something went wrong while requesting OTP.';
      alert(errorMessage);
    }
  });
}


login() {
  const data = { ...this.selectedLogin, otp: this.otp }
  console.log(data)
  this.loginservice.Login(data).subscribe({
    next: (payload) => {
      console.log('Response:', payload);
      const res = payload
      if (res.message === "Login successfully") {
        this.email = this.selectedLogin.email;
        if (res.user) {
          sessionStorage.setItem("islog", "true")
          this.router.navigate(["/main"], {
            queryParams: { email: this.email },
            skipLocationChange: true
          });
          this.selectedLogin.email = ''
          this.selectedLogin.password = ''
        }
      }
      else {
        sessionStorage.setItem("islog", "false")

      }
    },
    error: (err) => {
      console.error('Error:', err);
      sessionStorage.setItem("islog", "false");

      const errorMessage =
        err.error?.message ||
        err.error?.error ||
        "❌ Something went wrong";

      alert(errorMessage);
    }
  });

}


otpBoxes = Array(6).fill(0);
otpValues: string[] = ["", "", "", "", "", ""];

moveToNext(index: number) {
  if (this.otpValues[index].length === 1 && index < 5) {
    const next = document.querySelectorAll('.otp-box')[index + 1] as HTMLElement;
    next.focus();
  }

  // Build final OTP string
  this.otp = this.otpValues.join('');
  console.log(this.otp)
}

handleBackspace(event: any, index: number) {
  if (event.key === "Backspace" && index > 0 && !this.otpValues[index]) {
    const prev = document.querySelectorAll('.otp-box')[index - 1] as HTMLElement;
    prev.focus();
  }
}

deleterow() {
  this.inceaserow = this.inceaserow - 1;
  // console.log(this.inceaserow)
  if (this.inceaserow == 3) {
    this.selectedWork.cabout4 = null
    this.selectedWork.currcompany4 = null
    this.selectedWork.duration4 = null
  }
  else if (this.inceaserow == 2) {
    this.selectedWork.cabout3 = null
    this.selectedWork.currcompany3 = null
    this.selectedWork.duration3 = null
  }
  else if (this.inceaserow == 1) {
    this.selectedWork.cabout2 = null
    this.selectedWork.currcompany2 = null
    this.selectedWork.duration2 = null
  }
}


  async _handleworkexp(): Promise < boolean > {
  this.selectedWork.email = this.selectedReg.email;
  try {
    const result: any = await this.loginservice.createworkExp(this.selectedWork).toPromise();
    if(result['status'] === 'success') {
  // Clear work experience fields
  this.selectedWork.cabout1 = '';
  this.selectedWork.cabout2 = "";
  this.selectedWork.cabout3 = '';
  this.selectedWork.cabout4 = "";
  this.selectedWork.currcompany4 = '';
  this.selectedWork.currcompany3 = "";
  this.selectedWork.currcompany2 = '';
  this.selectedWork.currcompany1 = '';
  this.selectedWork.duration4 = "";
  this.selectedWork.duration3 = "";
  this.selectedWork.duration1 = "";
  this.selectedWork.duration2 = "";
  console.log("✅ Work experience saved successfully!");
  return true;
} else {
  return false;
}
    } catch (err) {
  console.error("❌ Error saving work experience:", err);
  return false;
}
  }



  async _handlecert() {
  const formData = new FormData();
  formData.append('email', this.selectedReg.email);

  this.certificates.forEach(cert => {
    formData.append('files', cert.file);
    formData.append(`name_${cert.file.name}`, cert.name);
    formData.append(`organization_${cert.file.name}`, cert.organization);
  });

  try {
    const payload = await lastValueFrom(this.loginservice.createCertificate(formData));

    if (payload['status'] === 'success') {
      console.log("✅ Certificate saved successfully!");
      return true;
    } else {
      return false;
    }

  } catch (err) {
    console.error("❌ Error saving certificate:", err);
    return false;
  }
}



  private hasWork(): boolean {
  // consider work present if any of these fields are non-empty
  const w = this.selectedWork;
  return !!(
    (w?.currcompany1 && w.currcompany1.trim()) ||
    (w?.currcompany2 && w.currcompany2.trim()) ||
    (w?.currcompany3 && w.currcompany3.trim()) ||
    (w?.currcompany4 && w.currcompany4.trim()) ||
    (w?.cabout1 && w.cabout1.trim()) ||
    (w?.cabout2 && w.cabout2.trim()) ||
    (w?.cabout3 && w.cabout3.trim()) ||
    (w?.cabout4 && w.cabout4.trim())
  );
}

  private hasProjects(): boolean {
  if (!Array.isArray(this.projects)) return false;
  // project considered present if at least one project has a non-empty title/year/description/site link
  return this.projects.some(p =>
    (p?.title && String(p.title).trim()) ||
    (p?.year && String(p.year).trim()) ||
    (p?.sitelink && String(p.sitelink).trim()) ||
    (Array.isArray(p.descriptions) && p.descriptions.some(d => d && String(d).trim()))
  );
}

  private hasCertificates(): boolean {
  if (!Array.isArray(this.certificates)) return false;
  // certificate present if any certificate has a file or non-empty name/org
  return this.certificates.some(c =>
    (c?.file) ||
    (c?.name && String(c.name).trim()) ||
    (c?.organization && String(c.organization).trim())
  );
}

  private hasSocial(): boolean {
  // social present if any profile field or uploaded file exists
  const p = this.profile;
  return !!(
    (p?.github && String(p.github).trim()) ||
    (p?.linkedin && String(p.linkedin).trim()) ||
    (p?.twitter && String(p.twitter).trim()) ||
    this.profilePic ||
    this.resumeFile
  );
}



  async _handlesubmit() {
  if (this.selectedReg.password !== this.selectedReg.cofirmpassword) {
    alert("⚠️ Password and Confirm Password do not match.");
    return;
  }

  try {
    const payload: any = await this.loginservice.createUser(this.selectedReg).toPromise();
    if (payload?.status === 'success') {
      console.log("✅ User saved successfully!");

      // Run only the handlers that have data, isolate their errors
      // Collect results if you want to show more granular messages
      const results: { work?: boolean; projects?: boolean; certs?: boolean; social?: boolean } = {};

      if (this.hasWork()) {
        try {
          results.work = await this._handleworkexp();
          console.log('Work save result:', results.work);
        } catch (e) {
          console.error('Work save failed (unexpected):', e);
          results.work = false;
        }
      }

      if (this.hasProjects()) {
        try {
          results.projects = await this._handlepro();
          console.log('Projects save result:', results.projects);
        } catch (e) {
          console.error('Project save failed (unexpected):', e);
          results.projects = false;
        }
      }

      if (this.hasCertificates()) {
        try {
          results.certs = await this._handlecert();
          console.log('Certificates save result:', results.certs);
        } catch (e) {
          console.error('Certificate save failed (unexpected):', e);
          results.certs = false;
        }
      }

      // social: call only if user provided any social fields or files
      if (this.hasSocial()) {
        try {
          results.social = await this._handlsocial();
          console.log('Social save result:', results.social);
        } catch (e) {
          console.error('Social save failed (unexpected):', e);
          results.social = false;
        }
      } else {
        // If there's no social data, treat as "not attempted" (you can set true if you prefer)
        results.social = undefined;
      }

      // Decide what to show to user
      const savedEmail = this.selectedReg.email;
      // Clear registration only when user creation succeeded (we did)
      this.selectedReg = {
        name: '',
        role: '',
        company: '',
        currposition: '',
        email: '',
        password: '',
        cofirmpassword: '',
        about: '',
        contact: '',
        address: ''
      };
      this.newregistration = false;
      this.loginpageloading = true;

      // Build friendly feedback message
      let msg = `✅ Your account ${savedEmail} is saved successfully!`;
      const problems: string[] = [];
      if (results.work === false) problems.push('work experience');
      if (results.projects === false) problems.push('projects');
      if (results.certs === false) problems.push('certificates');
      if (results.social === false) problems.push('social links/resume');

      if (problems.length) {
        msg += `\n⚠️ But these parts failed to save: ${problems.join(', ')}. You can retry them later.`;
      }

      alert(msg);
    } else {
      // if createUser returned not-success status
      alert('⚠️ User not saved. Please try again.');
    }
  } catch (err: any) {
    console.error("❌ Error creating user:", err);
    if (err.status === 402) {
      alert("⚠️ Sorry, data not saved — email already exists.");
    } else {
      alert("❌ Server error. Try again later.");
    }
  }
}

_checkpassword() {
  if (this.selectedReg.password.length >= 8) {
    this.passwordlength = true

    if (this.selectedReg.password == this.selectedReg.cofirmpassword) {
      this.passwordmatched = true
    }
    else {
      this.passwordmatched = false
    }
  }
  else {
    this.passwordlength = false
  }
}



submitted = false;

addProject() {
  if (this.projects.length < 4) {
    this.projects.push({
      title: '', descriptions: ['', '', ''],
      year: '',
      sitelink: ''
    });
  }
}

removeProject(index: number) {
  if (this.projects.length > 2) {
    this.projects.splice(index, 1);
  }
}

  async _handlepro() {
  this.submitted = true;
  const payload = {
    email: this.selectedReg.email,
    projects: this.projects
  };


  try {
    const proresult = await this.loginservice.createProject(payload).toPromise();
    if (proresult["status"] == 'success') {
      this.projects = [];
      console.log("Project savedd succesfully!")
      return true;

    }
    else {
      return false
    }

  } catch (err) {
    console.error("❌ Error saving work experience:", err);
    return false;

  }


}


certificates: any[] = [
  { name: '', organization: '', file: null }
];

addCertificate() {
  this.certificates.push({ name: '', organization: '', file: null });
}

removeCertificate(index: number) {
  this.certificates.splice(index, 1);
}

onFileChange(event: any, index: number) {
  const file = event.target.files[0];
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (file && allowedTypes.includes(file.type)) {
    this.certificates[index].file = file;
  } else {
    alert('Only PDF or DOC/DOCX files are allowed!');
    event.target.value = ''; // reset input
  }
}




profile = {
  github: '',
  linkedin: '',
  twitter: '',
  resumeUrl: ''
};

profilePic: File | null = null;
resumeFile: File | null = null;
profilePreview: any;
resumeFileName: string | null = null;



// ✅ Handle profile picture upload
onProfilePicSelected(event: any): void {
  const file = event.target.files[0];
  if(file) {
    this.profilePic = file;
    const reader = new FileReader();
    reader.onload = (e) => (this.profilePreview = e.target?.result);
    reader.readAsDataURL(file);
  }
}

// ✅ Handle resume upload
onResumeSelected(event: any): void {
  const file = event.target.files[0];
  if(file) {
    this.resumeFile = file;
    this.resumeFileName = file.name;
  }
}

  // ✅ Submit form data
  // onSubmit(): void {
  //   const formData = new FormData();

  //   // append text fields
  //   Object.entries(this.profile).forEach(([key, value]) => {
  //     formData.append(key, value);
  //   });

  //   // append files if available
  //   if (this.profilePic) formData.append('profilePic', this.profilePic);
  //   if (this.resumeFile) formData.append('resumeFile', this.resumeFile);
  //   for (const pair of formData.entries()) {
  //     console.log(`${pair[0]}:`, pair[1]);
  //   }

  //   // this.http.post('http://localhost:8080/api/profile/save', formData).subscribe({
  //   //   next: (res) => console.log('Profile saved successfully', res),
  //   //   error: (err) => console.error('Error saving profile', err)
  //   // });
  // }
  async _handlsocial() {
  const formData = new FormData();
  formData.append('email', this.selectedReg.email);

  Object.entries(this.profile).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // append files if available
  if (this.profilePic) formData.append('profilePic', this.profilePic);
  if (this.resumeFile) formData.append('resumeFile', this.resumeFile);
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }

  try {
    const payload = await lastValueFrom(this.loginservice.createsocial(formData));

    if (payload['status'] === 'success') {
      console.log("✅ Certificate saved successfully!");
      return true;
    } else {
      return false;
    }

  } catch (err) {
    console.error("❌ Error saving certificate:", err);
    return false;
  }
}





}


