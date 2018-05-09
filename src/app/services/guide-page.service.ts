import { EventEmitter } from "@angular/core";

export class GuidePageService {
  guideRoute = new EventEmitter<string>();

  logMessage(message) {
    console.log("From guide-page-service - " + message)
  }
}

