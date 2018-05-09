import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TooltipsService } from '../../services/tooltips.service';
import { GuidePageService } from '../../services/guide-page.service'

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css'],
  providers: [GuidePageService]
})

export class GuideComponent implements OnInit{
  
    public safeUrl: SafeUrl;
    public targetAnchor: string = "//docs/freenas.html";
  
    constructor(public sanitizer: DomSanitizer,
                private guidePageService: GuidePageService) {
      this.guidePageService.guideRoute.subscribe(
        (message: string) => alert('Listen up ' + message)
      );
    }
  
    ngOnInit() {
    this.safeUrl = this.sanitizer
      .bypassSecurityTrustResourceUrl("http://" + environment.remote + this.targetAnchor);
    }
  }
