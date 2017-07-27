import {Component, Input} from "@angular/core";

@Component({
    selector: 'fab-speed-dial',
    templateUrl: './fab-speed-dial.html',
    styleUrls: ['./fab-speed-dial.scss']
})
export class FabSpeedDial {

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