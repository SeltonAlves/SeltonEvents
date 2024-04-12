import { LightningElement, track } from 'lwc';

export default class CardMain extends LightningElement {

    @track
    stage = true;
    idEvent;
    @track
    labelButton =  'Próximo';

    renderedCallback(){
        this.updateButtonLabel();
    }

    updateButtonLabel() {
        this.labelButton = this.stage ? 'Próximo' : 'Finalizar';
    }

    handleClick() {
        if (this.stage) {
           this.labelButton = 'Próximo';
            this.template.querySelector("c-event").saveEvent();
        } else {
            this.labelButton = 'Finalizar';
            this.template.querySelector("c-stock").handleSaveStock();
        }
    }

    handleValueId(event) {
        this.stage = false;
        this.idEvent = event.detail.data
    }

    handleValueStage(event){
        this.stage = event.detail.stage;
    }

}