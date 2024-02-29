import { LightningElement, track } from 'lwc';

export default class CardMain extends LightningElement {

    @track
    stage = false;
    idEvent;
    part = this.stage === true ? "P/1" : "P/2";

    handleClick() {
        if (this.stage) {
            this.template.querySelector("c-event").saveEvent();
        } else {
            this.template.querySelector("c-stock").handleSaveStock();
        }
    }

    handleValueId(event) {
        this.idEvent = event.detail.data
        this.stage = false;
    }

}