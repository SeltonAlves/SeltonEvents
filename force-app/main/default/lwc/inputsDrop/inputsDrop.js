import { LightningElement, track } from 'lwc';

export default class InputsDrop extends LightningElement {

    @track
    inputs = [{
        id: Date.now(),
        date: undefined,
        valueDrop: 0,
        canDelete: false
    }];

    handleInputsForEach(event) {
        const index = event.target.dataset.index;
        const name = event.target.name;
        this.inputs[index][name] = event.detail.value;
        if (this.inputs[index].dateStart && this.inputs[index].dateFinish && this.inputs[index].valueDrop !== 0) {
            this.handleSend();
        }
    }

    createInputsDrop() {
        const newInputs = {
            id: Date.now(),
            date: undefined,
            valueDrop: 0,
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