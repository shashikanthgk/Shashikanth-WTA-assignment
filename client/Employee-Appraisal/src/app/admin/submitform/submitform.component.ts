import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminserviceService} from "../Adminservice/adminservice.service"
import { Router,ActivatedRoute } from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment"
@Component({
  selector: 'app-submitform',
  templateUrl: './submitform.component.html',
  styleUrls: ['./submitform.component.css']
})
export class SubmitformComponent implements OnInit {
  form: FormGroup;
  employee_name:string;
  appform;
  err:boolean=false;
  rating: string[] = ['Outstanding','Very Good', 'Good','Below Average','unsatisfactory'];
  review: string[] =         ['Six Month Review','Annual Review', 'Other']  ;
  position:string[] = ['Permanent','Casual','trainees','staff','Contractors','Developer','Manager']
  department :string[] = ['Human Resources','IT','Accounting and Finance','Marketing','Research and Development','Production']
  eid:any;
user:any;
  constructor(   private httpClient: HttpClient,
    private _snackBar: MatSnackBar,public router: Router,public fb: FormBuilder,public aser:AdminserviceService,private routeractivated: ActivatedRoute) { 
    this.eid =  this.routeractivated.snapshot.paramMap.get('eid');
  }

   async ngOnInit() {
    await this.aser.getemployeename(this.eid).subscribe(data=>{
      console.log("data",data)
      this.user = data;
      if(data['error']==null)
      {
        this.appform = data;
        this.form = this.fb.group({
          employee_name: [{value:this.appform.firstname+" "+this.appform.lastname,disabled:true, },[Validators.required]],
          position:["", [Validators.required]],
          department:["", [Validators.required]],
          date_of_last_review:[Date.now()],
          type_of_review:["", [Validators.required]],
          
          quality_of_work:["",[Validators.required]],
          comment_on_quality_of_service:["",Validators.required],
          productivity:["",[Validators.required]],
          comment_on_productivity:["",Validators.required],
          knowledge_of_job:["",[Validators.required]],
          comment_on_knowledge_of_job:["",Validators.required],
          reliability_and_dependebility:["",[Validators.required]],
          comment_on_reliability_and_dependebility:["",Validators.required],
          attendence:["",[Validators.required]],
          comment_on_attendence:["",Validators.required],
    
          initiative:["",[Validators.required]],
          comment_on_initiative:["",Validators.required],
          creativity:["",[Validators.required]],
          comment_on_creativity:["",Validators.required],
          working_relationship:["",[Validators.required]],
          comment_on_working_relationship:["",[Validators.required]],
          adherence_to_compony_policy:["",[Validators.required]],
          comment_on_adherence_to_compony_policy:["",[Validators.required]],
          other:["",[Validators.required]],
          comment_on_other:["",[Validators.required]],
          overall_performence_rating:["",[Validators.required]],
          supervisior_comment_on_overall_performence:["",[Validators.required]],
          action_by_employee_infuture:["",[Validators.required]],
          date_reviewed_with_employee:[null,[Validators.required]],

        });

      }
      else{
        this.err = true;
      }



    })

    

  }


  openSnackBar( meesage1,msg2) {
    this._snackBar.open(meesage1,msg2 , {
      duration: 2000,
    });
    }
    

  submit()
  {
    this.form.value['employee_name'] = this.appform.firstname+" "+this.appform.lastname;
    console.log(this.form.value)
    this.aser.submitformpost(this.form.value,this.eid).subscribe(data=>{
      console.log("errror",data)
      if(data['error']==null)
      {
        let url = 'http://localhost:3000/sendmail'
        let info = `<h3>From your company admin!!</h3><p> Your appraisal from for the employee id ${this.user['employeeid']} is submitted check it now!!!!!</h3>`
        let  post = {email:this.user['email'],subject:"Employee appraisal form submitted ",info:info,token:environment.token};
        this.sendemail(url,post).subscribe(data=>{
          console.log(data);
        })
        this.openSnackBar("Successfully","Submitted")
        this.router.navigateByUrl('/admin/employees');
      }
      else
      {
        this.openSnackBar("Updation","Failed")
        this.router.navigateByUrl('/admin/employees');
      }
    })
  }

  sendemail(url,post)
  {
    return this.httpClient.post<any>(url, post);
  }
  
}


// employee_name: req.body.employee_name,
// position: req.body.position,
// department: req.body.department,
// employeeid:eid,
// date_of_last_review: req.body.date_of_last_review,
// type_of_review: req.body.type_of_review,



// quality_of_work: req.body.quality_of_work,
// comment_on_quality_of_service:req.body.comment_on_quality_of_service,
// productivity: req.body.productivity,
// comment_on_productivity:req.body.comment_on_productivity,
// knowledge_of_job: req.body.knowledge_of_job,
// comment_on_knowledge_of_job: req.body.comment_on_knowledge_of_job,
// reliability_and_dependebility: req.body.reliability_and_dependebility,
// comment_on_reliability_and_dependebility: req.body.comment_on_reliability_and_dependebility,
// attendence:req.body.attendence,
// comment_on_attendence: req.body.comment_on_attendence,



// initiative:req.body.initiative,
// comment_on_intiative: req.body.comment_on_intiative,
// creativity:req.body.creativity,
// comment_on_creativity: req.body.comment_on_creativity,
// working_relationship: req.body.working_relationship,
// comment_on_working_relationship: req.body.comment_on_working_relationship,
// adherence_to_compony_policy: req.body.adherence_to_compony_policy,
// comment_on_adherence_to_compony_policy:req.body.comment_on_adherence_to_compony_policy,


// other: req.body.other,
// comment_on_other: req.body.comment_on_intiative,
// overall_performence_rating:req.body.overall_performence_rating,
// supervisior_comment_on_overall_performence: req.body.supervisior_comment_on_overall_performence,
// action_by_employee_infuture: req.body.action_by_employee_infuture,
// date_reviewed_with_employee: req.body.date_reviewed_with_employee,
