import { LightningElement, track } from 'lwc';

export default class InputsDrop extends LightningElement {

    @track
    inputs = [{
        id: Date.now(),
        Date_Start__c: undefined,
        Date_Finish__c: undefined,
        Value_Drop__c: 0,
        canDelete: false
    }];

    handleInputsForEach(event) {
        const index = event.target.dataset.index;
        const name = event.target.name;
        let value = event.detail.value;
        this.inputs[index][name] = value;

        if (name === 'Value_Drop__c') {
            this.inputs[index][name] = Number(value);
        }

        if (this.inputs[index].Date_Start__c && this.inputs[index].Date_Finish__c && this.inputs[index].Value_Drop__c !== 0) {
            this.handleSend();
        }
    }

    createInputsDrop() {
        const newInputs = {
            id: Date.now(),
            dateStart__c: undefined,
            dateFinish__c: undefined,
            valueDrop__c: 0,
            canDelete: true
        };

        this.inputs = [...this.inputs, newInputs];
    }

    deleteInputs(event) {
        const index = parseInt(event.target.dataset.index, 10);
        this.inputs = this.inputs.filter((_, i) => i !== index);
        this.handleSend();
    }

    handleSend() {
        const value = new CustomEvent('valuedate', {
            detail: {
                date: this.inputs
            }
        });
        this.dispatchEvent(value);
    }
}