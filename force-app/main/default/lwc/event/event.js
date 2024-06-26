import { LightningElement, api } from 'lwc';
import createEvent from '@salesforce/apex/Event.createEvent';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Event extends LightningElement {


    event = {};
    valueProvince = this.provinceOptions.find(option => option.label === 'Pernambuco').value;
    valueCountry = this.countryOptions.find(option => option.label === 'Brasil').value;
    fileName;
    isLoading = false;

    get provinceOptions() {
        return [
            { label: 'Acre', value: 'AC' },
            { label: 'Alagoas', value: 'AL' },
            { label: 'Amapá', value: 'AP' },
            { label: 'Amazonas', value: 'AM' },
            { label: 'Bahia', value: 'BA' },
            { label: 'Ceará', value: 'CE' },
            { label: 'Distrito Federal', value: 'DF' },
            { label: 'Espírito Santo', value: 'ES' },
            { label: 'Goiás', value: 'GO' },
            { label: 'Maranhão', value: 'MA' },
            { label: 'Mato Grosso', value: 'MT' },
            { label: 'Mato Grosso do Sul', value: 'MS' },
            { label: 'Minas Gerais', value: 'MG' },
            { label: 'Pará', value: 'PA' },
            { label: 'Paraíba', value: 'PB' },
            { label: 'Paraná', value: 'PR' },
            { label: 'Pernambuco', value: 'PE' },
            { label: 'Piauí', value: 'PI' },
            { label: 'Rio de Janeiro', value: 'RJ' },
            { label: 'Rio Grande do Norte', value: 'RN' },
            { label: 'Rio Grande do Sul', value: 'RS' },
            { label: 'Rondônia', value: 'RO' },
            { label: 'Roraima', value: 'RR' },
            { label: 'Santa Catarina', value: 'SC' },
            { label: 'São Paulo', value: 'SP' },
            { label: 'Sergipe', value: 'SE' },
            { label: 'Tocantins', value: 'TO' }
        ];
    }

    get countryOptions() {
        return [
            { label: 'Brasil', value: 'BR' }
        ]
    }

    handleValue(event) {
        this.event[event.target.name] = event.target.value;
    }

    handleValueDate(event) {
        this.event[event.target.name] = event.detail.value;
    }

    handleMaskPhone(event) {
        const x = event.target.value.replace(/\D+/g, "").match(/(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/);
        this.event[event.target.name] = event.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]} ${x[3]}` + (x[4] ? `-${x[4]}` : ``);
    }

    handleAddress(event) {
        this.event['address__c'] = {
            address__City__s: event.detail.city,
            address__Country__s: event.detail.country,
            address__PostalCode__s: event.detail.postalCode,
            address__Province__s: event.detail.province,
            address__Street__s: event.detail.street
        }
    }

    handleAddFiles(event) {
        let selectedFile = event.target.files[0];
        this.fileName = selectedFile.name;
        let fileSize = selectedFile.size / (1024 * 1024);
        if (fileSize < 5) {
            let reader = new FileReader();
            reader.onload = () => {
                let fileContent = reader.result.split(',')[1];
                this.event['Banner'] = {
                    'fileName': this.fileName,
                    'fileContent': encodeURIComponent(fileContent)
                }
            }
            reader.readAsDataURL(selectedFile);

        }
        else {
            this.handleToast('Error Imagem', 'O Tamanho da Sua Imagem é maior que 5 MB, Tente novamente com tamanho menor.', 'erro');
        }
    }

    @api
    saveEvent() {
        const inputs = [...this.template.querySelectorAll('lightning-input, lightning-textarea, lightning-input-address')]
            .reduce((validSoFar, inputField) => {
                inputField.reportValidity();
                return validSoFar && inputField.checkValidity();
            }, true);
        if (inputs) {
            window.scrollTo(0, 0);
            this.isLoading = true;
            let json = JSON.stringify(this.event);
            createEvent({ eventJson: json }
            ).then((result) => {
                if (result) {
                    this.isLoading = false;
                    this.handleSendData(result);
                }
                else {
                    this.isLoading = false;
                    this.handleToast('Error', 'Tente Novamente, em outro período.', 'error');
                }
            }).catch((error) => {
                this.isLoading = false;
                this.handleToast('Aviso!', error, 'info');
            })
        }else{
            this.handleToast('Oops...','Preencha todos os campos, por favor!', 'warning')
        }
    }

    handleToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: 'stick'
        }));
    }

    handleSendData(value) {
        const dataValue = new CustomEvent('sendvalue', {
            detail: {
                data: value
            }
        });
        this.dispatchEvent(dataValue);
    }

}