import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-github-repos',
  templateUrl: './github-repos.component.html',
  styleUrls: ['./github-repos.component.css']
})
export class GithubReposComponent implements OnInit {
  @Input()parentSubject:Subject<any>;
  public githubRepos:any[];
  public errorMessage: string;
  
  tableArray:any;
  filterArray:any;
  totalArray:any;  
  language: string;
  searchText: string;
  filterLang;
  selected: boolean = false;
  selectedVal:string;
  colName=[
    {h:'Name'},
    {h:'Link'},
    {h:'private/public'},
    {h:'programming language '},
    {h:'No of branches'},]


    modes : any =[
      'public',
      'private',
      'both'
     ];


  //dtOptions: any = {};
  constructor(private githubService:GithubService) { }

  ngOnInit(): void {




    this.parentSubject.subscribe(event => {
         console.log(event);
         this.githubService.getRepos(event).subscribe((res)=>
         {
           this.githubRepos = res;
           this.tableArray=[];
           if(this.githubRepos){
            for(var i=0;i<this.githubRepos.length;i++)
            {                  
                 if(this.githubRepos[i].private == false)
                 {
                   this.githubRepos[i].private = "public";
                 }
                 else{
                   this.githubRepos[i].private = "private";
                 }
                  this.tableArray.push({'repo_name': this.githubRepos[i].name, 
                                        'repo_language':this.githubRepos[i].language,
                                        'pr':this.githubRepos[i].private,
                                        'repo_link':this.githubRepos[i].html_url});
            }
              this.totalArray = this.tableArray;
              this.filterLanguage(this.tableArray);   
           }       
 
         },(error)=>
         {
               this.errorMessage = error;
         })
    })
           
  }

  //filterLanguage
  public filterLanguage(tableArray)
  {
    this.filterLang = tableArray.reduce(
      (results, current) => results.some(c => c === current.repo_language) ? results : [...results, current.repo_language],
       []
       );      
    this.filterLang =  this.filterLang.filter(function(el)
   {
     return el != null;
   })
   
   console.log(this.filterLang)

  }

  //privatePublicToggle
  radioChangeHandler(event :any)
  {
      this.selectedVal = event.target.value;
      
      if(this.selectedVal == 'public')
      {
        this.tableArray =[];
      for(var i =0;i<this.totalArray.length;i++)
      {
          if(this.totalArray[i].pr == 'public')
          {
              this.tableArray.push(this.totalArray[i])
          }
      }
    
    }
    
    if(this.selectedVal == 'private')
    {
      this.tableArray =[];
    for(var i =0;i<this.totalArray.length;i++)
    {
        if(this.totalArray[i].pr == 'private')
        {
            this.tableArray.push(this.totalArray[i])
        }
    }
    
    }
    if(this.selectedVal == 'both')
    {
      this.tableArray = this.totalArray;
    }
}


}
