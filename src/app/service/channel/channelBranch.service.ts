import { Injectable } from '@angular/core' ;
import {HttpClient, HttpHeaders} from '@angular/common/http' ;
import { ObjToQuery } from '../ObjToQuery';
import { ObjToQueryString } from '../ObjToQueryString' ;
import { GLOBAL } from '../../global/global_settion';

@Injectable({
  providedIn : "root"
})
export class ChannelBranchService{
  constructor(
    private http : HttpClient
  ){} ;
  update( data : Object){
    let url = GLOBAL.API.channel.channelBranch.update;
    let header = new HttpHeaders()
      .set("Content-type" , 'application/json') ;
    console.log(data);
    return this.http.put(url,data,{
      headers : header
    });
  }
  getChannelBranch(obj : Object){
    let url = GLOBAL.API.channel.channelBranch.getChannelBranch ;
    let para = ObjToQuery(obj) ;
    return this.http.get(url , {
      params : para
    });
  }
  invitationCode(data : Object){
    let url = GLOBAL.API.channel.channelBranch.invitationCode;
    console.log(data);
    return this.http.get(url+"/"+data);
  }
  addChannelBranch(data : Object){
    let url = GLOBAL.API.channel.channelBranch.addChannelBranch;
    let header = new HttpHeaders()
      .set("Content-type" , 'application/json') ;
    return this.http.post(url , data , {
      headers : header
    });
  }
  unUsedQuantity(data : Object){
    let url = GLOBAL.API.channel.channelBranch.unUsedQuantity;
    console.log(data);
    return this.http.get(url+"/"+data);
  }
  exChannelBranch(data : Object){
    console.log(data["channelId"])
    let url = GLOBAL.API.channel.channelBranch.export+"/" + data["channelId"];
    console.log(url);
    window.location.href = url;
    console.log(data["channelId"]);
    return ;
    // return this.http.get(url , {
    //   params : para
    // });
  }
  imChannelBranch(data){
    let url = GLOBAL.API.channel.channelBranch.import;
    console.log(data.get("channelId"),data.get('file'));
    let header = new HttpHeaders()
      .set("Content-type" , 'application/json') ;
    return this.http.post(url+"/"+ data.get("channelId"), data , {
      headers : header
    });
  }
  generate(data : Object){
    let url = GLOBAL.API.channel.channelBranch.generate+"/"+data['channelId']+"?channelId="+data["channelId"]+"&count="+data["count"];
    console.log(data['channelId']);
    console.log(url);
    // let para = ObjToQuery(data) ;
    window.location.href = url;
    // return this.http.get(url+"/"+data['channelId'],{
    //   params : para
    // });
  }
}
