import { LightningElement } from 'lwc';

export default class Stock extends LightningElement {

    stock = [];
    item = {};
    dateDrop =[];


    get sizeOptions() {
        return [
            { label: '(PP) Extra Pequeno', value: 'PP' },
            { label: '(P) Pequeno', value: 'P' },
            { label: '(M) Médio', value: 'M' },
            { label: '(G) Grande', value: 'G' },
            { label: '(GG) Extra Grande', value: 'GG' },
            { label: '(GGG) Extra Extra Grande', value: 'GGG' }
        ];

    }

    handleChange(event) {
        this.item[event.target.name] = event.target.value;
    }

    handleSize(event) {
        this.item[event.target.name] = event.detail.value;
    }

    handleClick() {
        const input = [...this.template.querySelectorAll('lightning-input, lightning-combobox')].reduce((validSoFar, inputField) => {
            inputField.reportValidity();
            return validSoFar && inputField.checkValidity();
        }, true);
        if (input) {
            const newItem = {
                id: this.stock.length,
                Name: this.item.Name,
                Size: this.item.Size,
                Quantity: this.item.Quantity
            };
            this.stock = [...this.stock, newItem];
            this.handleSendData();
            
        }

    }

    handleValueStock(event){
        this.stock = event.detail.data;
    }

    handleValueDrop(event){
        this.dateDrop = event.detail.date;
        this.handleSendData();
    }

    handleSendData(){
        if (this.stock && this.dateDrop) {
            const newEvent = new CustomEvent('passvalue',{
                detail:{
                    stock: this.stock,
                    dateDrop: this.dateDrop
                }
            });
            this.dispatchEvent(newEvent);
        }
    }
}