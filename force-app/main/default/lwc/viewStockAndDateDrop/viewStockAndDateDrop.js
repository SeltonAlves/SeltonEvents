import getStock from '@salesforce/apex/Stock.getStock';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { LightningElement, api } from 'lwc';

export default class ViewStockAndDateDrop extends LightningElement {
    @api
    recordId;
    dataStock = [];
    dataDate = [];
    isLoading = false;

    stockColumns = [
        { label: 'Nome', fieldName: 'Name' },
        { label: 'Tamanho', fieldName: 'Size__c' },
        { label: 'Quantidade', fieldName: 'Quantity__c' }
    ]

    dateDropColumns = [
        { label: 'Data Inicial', fieldName: 'Date_Start__c' },
        { label: 'Data Final', fieldName: 'Date_Finish__c' },
        { label: 'Valor', fieldName: 'Value_Drop__c' }
    ]

    connectedCallback() {
        this.handleGetStockAndDate(this.recordId);
    }

    handleGetStockAndDate(recordId) {
        getStock({ RecordId: recordId }).then((result) => {
            this.dataStock = [JSON.parse(result.Stock)];
            this.dataDate = JSON.parse(result.Date_Drops).records;

            this.isLoading = true;

        }).catch((err) => {
            this.handleToast('Erro!', 'Tente Novamente Mais Tarde.', 'erro')
        });
    }

    handleToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: 'stick'
        }));
    }
}