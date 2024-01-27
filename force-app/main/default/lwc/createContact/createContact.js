import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createContact from '@salesforce/apex/HandleTicket.createContact';
export default class CreateContact extends LightningElement {

    isFormValid = false;
    save = false;

    contact = {};

    get options() {
        return [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Nonlinear', value: 'Nonlinear' },
            { label: 'Not Listed', value: 'Not Listed' }
        ];
    }

    handleValue(e) {
        const name = e.target.name;
        const value = e.target.value;

        switch (name) {
            case 'Phone':
                this.contact[name] = this.handleTel(e);
                break;
            case 'HomePhone':
                value != '' ? this.contact[name] = value : '';
                break;
            default:
                this.contact[name] = value;
                break;
        }
        this.validateForm();
    }

    handleTel(e) {
        const x = e.target.value.replace(/\D+/g, "").match(/(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/);
        return e.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]} ${x[3]}` + (x[4] ? `-${x[4]}` : ``);
    }

    handleAddressChange(addressValue) {
        this.contact['MailingStreet'] = addressValue.detail.street;
        this.contact['MailingCity'] = addressValue.detail.city;
        this.contact['MailingCountry'] = addressValue.detail.country;
        this.contact['MailingState'] = addressValue.detail.province;
        this.contact['MailingPostalCode'] = addressValue.detail.postalCode;

        this.validateForm();
    }

    validateForm() {
        const requiredFields = ['FirstName', 'LastName', 'Email', 'Phone', 'MailingStreet', 'MailingCity', 'MailingState', 'MailingPostalCode'];
      this.isFormValid = requiredFields.every(field => !!this.contact[field]);
    }

    create() {
        if (this.isFormValid) {
            createContact({obj:this.contact})
            .then(result =>{
               this.save = true;
            })
            .catch(error =>{
                this.save = false;
            });
        } else {
            const event = new ShowToastEvent({
                title: 'Atenção!',
                message: 'Só será possível criar se todos os campos marcados como requisitos estiverem preenchido corretamente.',
                variant: 'warning',
                mode: 'dismissible'
            });

            this.dispatchEvent(event);

        }
    }
}