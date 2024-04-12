import { LightningElement, api } from 'lwc';
import createStock from '@salesforce/apex/Stock.createStock';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Stock extends LightningElement {

    @api
    id;
    stockItemList = [];
    item = {};
    dateDropList = [];
    isLoading = false;

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
                id: this.stockItemList.length,
                Name: this.item.Name,
                Size__c: this.item.Size__c,
                Quantity__c: Number(this.item.Quantity__c)
            };
            this.stockItemList = [...this.stockItemList, newItem];

        }

    }

    handleValueStock(event) {
        this.stockItemList = event.detail.data;
    }

    handleValueDrop(event) {
        this.dateDropList = event.detail.date;
    }

    @api
    handleSaveStock() {
        if (this.dateDropList.length > 0 && this.stockItemList.length > 0) {

            window.scrollTo(0,0);
            this.isLoading = true;

            const stockItem = this.stockItemList.map(item => {
                const { id, ...newStock } = item;
                return newStock;
            });

            const dateDrop = this.dateDropList.map(item => {
                const { id, canDelete, ...newDate } = item;
                return newDate;
            });


            this.id = this.id.split("-")[0]


            createStock({ id: this.id, dateDrop: dateDrop, stockItem: stockItem }).then((result) => {
                console.log(result);
                if (result) {
                    this.isLoading = false;
                    this.handleToast('FINALIZADO!','Parabéns você concluiu o cadastramento do evento e estoque','success');
                    this.handleSendStage(result);
                }
            }).catch((err) => {
                this.isLoading = false;
                this.handleToast('ERROR', 'Tente Novamente mais tarde! ', 'error');
            });
        } else {
            this.handleToast('Aviso!', 'Preencha todos os campos, antes de finalizar!', 'warning')
        }
    }

    handleToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        }));
    }

    handleSendStage(value) {
        const newEvent = CustomEvent('sendvalue', {
            detail: {
                stage: value
            }
        });
        this.dispatchEvent(newEvent);
    }
}