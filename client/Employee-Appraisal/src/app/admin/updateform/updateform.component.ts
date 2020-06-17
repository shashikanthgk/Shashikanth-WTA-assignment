import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminserviceService} from "../Adminservice/adminservice.service"
import { Router,ActivatedRoute } from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment"

@Component({
  selector: 'app-updateform',
  templateUrl: './updateform.component.html',
  styleUrls: ['./updateform.component.css']
})
export class UpdateformComponent implements OnInit {
  form: FormGroup;
  employee_name:string;
  appform;
  err:boolean=false;
  rating: string[] = ['Outstanding','Very Good', 'Good','Below Average','unsatisfactory'];
  review: string[] =         ['Six Month Review','Annual Review', 'Other']  ;
  position:string[] = ['Permanent','Casual','trainees','staff','Contractors','Developer','Manager']
  department :string[] = ['Human Resources','IT','Accounting and Finance','Marketing','Research and Development','Production']
  eid:any;
email:any;
user:any;
  constructor( private httpClient: HttpClient,private _snackBar: MatSnackBar,private router:Router,public fb: FormBuilder,public aser:AdminserviceService,private routeractivated: ActivatedRoute) { 
    this.eid =  this.routeractivated.snapshot.paramMap.get('eid');
  }

   async ngOnInit() {
     this.aser.getemployeename(this.eid).subscribe(data=>{
       this.email = data['email'];
       this.user = data;
     })
    await this.aser.getappraisal(this.eid).subscribe(data=>{
      console.log(data)
      if(data['error']==null)
      {
        this.appform = data;
        this.form = this.fb.group({
          employee_name: [{value:this.appform.employee_name,disabled:true, },[Validators.required]],
          position:[this.appform.position, [Validators.required]],
          department:[this.appform.department, [Validators.required]],
          date_of_last_review:[Date.now()],
          type_of_review:[this.appform['type_of_review'], [Validators.required]],
          
          quality_of_work:[this.appform['quality_of_work'],[Validators.required]],
          comment_on_quality_of_service:[this.appform.comment_on_quality_of_service,Validators.required],
          productivity:[this.appform['productivity'],[Validators.required]],
          comment_on_productivity:[this.appform.comment_on_productivity,Validators.required],
          knowledge_of_job:[this.appform['knowledge_of_job'],[Validators.required]],
          comment_on_knowledge_of_job:[this.appform.comment_on_knowledge_of_job,Validators.required],
          reliability_and_dependebility:[this.appform.reliability_and_dependebility,[Validators.required]],
          comment_on_reliability_and_dependebility:[this.appform.comment_on_reliability_and_dependebility,Validators.required],
          attendence:[this.appform.attendence,[Validators.required]],
          comment_on_attendence:[this.appform.comment_on_attendence,Validators.required],
    
          initiative:[this.appform.initiative,[Validators.required]],
          comment_on_initiative:[this.appform.comment_on_initiative,Validators.required],
          creativity:[this.appform.creativity,[Validators.required]],
          comment_on_creativity:[this.appform.comment_on_creativity,Validators.required],
          working_relationship:[this.appform.working_relationship,[Validators.required]],
          comment_on_working_relationship:[this.appform.comment_on_working_relationship,Validators.required],
          adherence_to_compony_policy:[this.appform.adherence_to_compony_policy,[Validators.required]],
          comment_on_adherence_to_compony_policy:[this.appform.comment_on_adherence_to_compony_policy,Validators.required],
          other:[this.appform.other,[Validators.required]],
          comment_on_other:[this.appform.comment_on_other,Validators.required],
          overall_performence_rating:[this.appform.overall_performence_rating,[Validators.required]],
          supervisior_comment_on_overall_performence:[this.appform.supervisior_comment_on_overall_performence,Validators.required],
          action_by_employee_infuture:[this.appform.action_by_employee_infuture,[Validators.required]],
          date_reviewed_with_employee:[this.appform.date_reviewed_with_employee,[Validators.required]],

        });

      }
      else if(data['error']=="document not found for that employee id"){
        this.router.navigateByUrl(`/admin/submit/${this.eid}`);
        this.err = true;
      }



    })
  }

  openSnackBar( meesage1,msg2) {
    this._snackBar.open(meesage1,msg2 , {
      duration: 2000,
    });
    }
    

  onSubmit()
  {

  console.log(this.form.value)

    this.aser.submitform(this.form.value,this.eid).subscribe(data=>{
      console.log("user",data)
      if(data['error']==null)
      {
        let url = 'http://localhost:3000/sendmail'
    let info = `<h3>From your company admin!!</h3><p> Your appraisal from for the employee id ${this.user['employeeid']} is updated check it now!!!!!</h3>`
    let  post = {email:this.email,subject:"Employee appraisal form updated ",info:info,token:environment.token};
    this.sendemail(url,post).subscribe(data=>{
      console.log("email",data)
    })
        this.openSnackBar("Successfully","Updated")
        this.router.navigateByUrl('/admin/employees');
      }
      else{
        this.openSnackBar("Updation","Failed")
        this.router.navigateByUrl('/admin/employees')

      }
    })
  }
  delete()
  {
    this.aser.delete(this.eid).subscribe(data=>{
      console.log(data);
      if(data['error']==null)
      {
        this.openSnackBar("Successfully","Deleted")

        this.router.navigateByUrl('/admin/employees');
      }
      else{
        //open snackbar
        this.openSnackBar("Deletion","Failed")
        this.router.navigateByUrl('/admin/employees');
      }
    })
  }


  sendemail(url,post)
  {
    
    return this.httpClient.post<any>(url, post);
  }
}
