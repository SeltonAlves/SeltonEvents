import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createStock from '@salesforce/apex/Stock.createStock';

export default class CardMain extends LightningElement {

    @track
    stage = true;
    idEvent;
    dateDrop;
    itemStock;

    handleClick() {
        if (this.stage) {
            this.template.querySelector("c-event").saveEvent();
        } else {
            this.handleSaveStock(this.dateDrop, this.itemStock);
        }
    }

    handleValueId(event) {
        this.idEvent = event.detail.data
        this.stage = false;
    }

    handleValueStockAndDateDrop(event) {
        this.itemStock = event.detail.stock
        this.dateDrop = event.detail.dateDrop
    }
    handleSaveStock(dateDrop, itemStock) {
        if (dateDrop && itemStock) {
            const stockJson = JSON.stringify({ dateDrop, itemStock })
            console.log(stockJson)

            createStock({ idEvent: this.idEvent, stockJson: stockJson }).then((result) => {
                if (result) {
                    console.log(result);
                }
            }).catch((err) => {
                console.log('ed' + err)
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

}