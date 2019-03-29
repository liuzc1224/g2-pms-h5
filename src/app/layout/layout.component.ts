import { Component, OnInit } from '@angular/core' ;
import { fixZero } from '../share/tool'
import { SessionStorageService } from '../service/storage';
import { Router } from '@angular/router'
let __this ;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'] ,
})
export class LayoutComponent implements OnInit {

    constructor(
      private sgo : SessionStorageService , 
      private router : Router
    ){}
    
    ngOnInit(){
      const now = new Date() ;

      this.currentDate = now.getFullYear() + "-" + fixZero( ( now.getMonth() + 1 ) )+ "-" + fixZero( now.getDate() );
      
      this.currentTime = fixZero(now.getHours()) +" : " + fixZero(now.getMinutes()) + " : " + fixZero(now.getSeconds()) ;
      

      setInterval( () => {

        const date = new Date() ; 

        this.currentTime = fixZero(date.getHours()) +" : " + fixZero(date.getMinutes()) + " : " + fixZero(date.getSeconds()) ;

      } , 1000 );

      this.role = this.sgo.get("loginInfo")['description'] ;
      
    };

    currentDate : string ; 

    currentTime : string ;
    
    logout(){
      
      this.sgo.clear() ; 
      
      window.location.href = "/" ;
    };

    backToIndex(){
      this.router.navigate(['/default']) ;
    }

    role :string ;
};