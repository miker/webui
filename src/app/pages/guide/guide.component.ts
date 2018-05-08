import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TooltipsService } from '../../services/tooltips.service'

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css'],
  providers: [TooltipsService]
})

export class GuideComponent implements OnInit{
  
    public safeUrl: SafeUrl;
    public targetAnchor: string = "//docs/freenas.html";
  
    constructor(public sanitizer: DomSanitizer,
                private tooltipsService: TooltipsService) {
                  this.tooltipsService.guideRoute.subscribe(
                    (message: string) => alert(message)
                  );
                }
  
    ngOnInit() {
    this.safeUrl = this.sanitizer
      .bypassSecurityTrustResourceUrl("http://" + environment.remote + this.targetAnchor);
    }
  }
