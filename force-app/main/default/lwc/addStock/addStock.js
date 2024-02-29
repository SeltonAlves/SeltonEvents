import { LightningElement, api } from 'lwc';

export default class AddStock extends LightningElement {

    @api
    stock;

    get data() {
        return [...this.stock];
    }

    columns = [
        { label: 'Nome', fieldName: 'Name' },
        { label: 'Tamanho', fieldName: 'Size__c' },
        { label: 'Quantidade', fieldName: 'Quantity__c' },
        { type: 'action', typeAttributes: { rowActions: this.getRowActions, menuAlignment: 'auto' } }
    ];

    getRowActions(row, doneCallback) {
        const actions = [
            { label: 'Apagar', name: 'delete', iconName: 'utility:delete' }
        ];
        doneCallback(actions);
    }


    handleRowAction(event) {
        const name = event.detail.action.name;
        const rowId = event.detail.row.id;


        switch (name) {
            case 'delete':
                this.stock = this.stock.filter(item => item.id !== rowId);
                this.handleSendData();
                break;
            default:
                break;
        }
    }


    handleSendData() {
        const dataValue = new CustomEvent('valuesotck', {
            detail: {
                data: this.stock
            }
        });

        this.dispatchEvent(dataValue);
    }
}