import getImageIdEvent from '@salesforce/apex/Event.getImageIdEvent';
import staticImage from '@salesforce/resourceUrl/imagenotfound';
import { LightningElement, api, track } from 'lwc';


export default class DisplayImage extends LightningElement {
    @api
    recordId
    @track
    imageSrc = staticImage;
    isLoading = true;

    connectedCallback(){
        this.handleGetImage(this.recordId);
    }

    handleGetImage(recordId){
        getImageIdEvent({recordId: recordId}).then((result) => {
            if (result) {
                this.imageSrc = "data:" + result.fileType  + ";base64," + result.Base64;
                console.log(this.imageSrc);
            }
            this.isLoading = false;
        }).catch((err) => {
            this.isLoading = false;
        });
    }
}