import {Component, Input} from "@angular/core";
import {FabSpeedDialComponent, FabSpeedDialTrigger, FabSpeedDialActions} from "./components/FabSpeedDial";

@Component({
    selector: 'fab-speed-dial-container',
    templateUrl: './fab-speed-dial-container.html',
    styleUrls: ['./fab-speed-dial-container.scss']
})
export class FabSpeedDialContainer {

    private _fixed: boolean = false;

    open: boolean = false;
    spin: boolean = false;
    direction: string = 'up';
    animationMode: string = 'fling';

    get fixed() { return this._fixed; }
    set fixed(fixed: boolean) {
        this._fixed = fixed;
        if (this._fixed) {
            this.open = true;
        }
    }

    _click(event: any) {
        console.log(event);
    }
}