import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WebSocketService } from './ws.service';
import { RestService } from './rest.service';
import { FreeNASCoreService, CoreEvent } from './freenascore.service';

interface ApiCall {
  namespace: string;
  args?: any;
  response ?: any;
}

@Injectable()
export class ApiService {

  private apiDefinitions = {
    VmProfilesRequest:{
      protocol:"websocket",
      version:"1",
      namespace: "vm.query",
      args: []
    },
    VmProfileRequest:{
      protocol:"websocket",
      version:"1",
      namespace:"vm.query",
      args:[]
    }
  } 

  private apiCallBuffer: ApiCall[] = [];
  constructor(protected core: FreeNASCoreService, protected ws: WebSocketService,protected     rest: RestService) {
    console.log("*** New Instance of API Service ***");
    this.core.coreEvents.subscribe(
      (evt:CoreEvent) => {
	//Process Event if CoreEvent is in the api definitions list
	if(this.apiDefinitions[evt.name]){
	  let call = this.parseCoreEvent(evt);
	  if(call.args){
	    this.ws.call(call.namespace, call.args).subscribe((res) => {
	      this.core.coreEvents.next({name:"VmList",data:res.data})
	    });
	  } else {
	    this.ws.call(call.namespace).subscribe((res) => {
	      console.log("*** API Response:");
	      console.log(res);
	      this.core.coreEvents.next({name:"VmList",data:res})
	    });
	  }
	}
      },
      (err) => {
	console.log(err)
      });
  }

  parseCoreEvent(evt:CoreEvent){
    let call: ApiCall = {
      namespace: this.apiDefinitions[evt.name].namespace
    }

    if(evt.args){
      call.args = evt.args;
    } 
    return call;
  }
}
