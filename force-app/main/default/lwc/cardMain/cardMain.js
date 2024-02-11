import { LightningElement } from 'lwc';

export default class CardMain extends LightningElement {
    
    handleClick(){
        this.template.querySelector("c-event").saveEvent();
    }

    handleValue(event){
        console.log(event.detail.data);
    }
}