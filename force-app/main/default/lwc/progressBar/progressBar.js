import { LightningElement } from 'lwc';

export default class progressBar extends LightningElement {

    currentStep = 1;

    handleClick(event){
        if(this.currentStep != event.target.value ){
            this.currentStep = event.target.value;
        }
    }

}