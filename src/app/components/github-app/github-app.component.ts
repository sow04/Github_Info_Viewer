import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-github-app',
  templateUrl: './github-app.component.html',
  styleUrls: ['./github-app.component.css']
})
export class GithubAppComponent implements OnInit {
  
  public githubUserQuery: string;
  public githubProfile:any;
  public errorMessage: string;
  parentSubject:Subject<any> = new Subject();

  constructor(private githubService:GithubService) { }
  
  public searchUser()

  {    

    if(this.githubUserQuery == ' ')
    {
      alert("Enter a Valid name!");
    }
    else
    {    
        //githubProfile
        this.githubService.getProfile(this.githubUserQuery).subscribe((res)=>
        {
            this.githubProfile = res;    
            console.log(this.githubProfile);
        }, (error)=>{
            this.errorMessage = error;
        });
        
        //githubRepository
        this.parentSubject.next(this.githubUserQuery);
       
      }
  }
  ngOnInit(): void {
    
  }

}
