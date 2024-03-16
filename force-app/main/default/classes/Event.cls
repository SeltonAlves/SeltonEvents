public with sharing class Event {

    @AuraEnabled(cacheable=false)
    public static Id createEvent(String eventJson){

        Map<String, Object> result = new Map<String, Object>();

        try {
            Map<String, Object> eventMap = (Map<String, Object>) JSON.deserializeUntyped(eventJson);
            
            Party__c newEvent = new Party__c();
            newEvent.Name = (String) eventMap.get('Name');
            newEvent.Description__c = (String) eventMap.get('Description__c');
            newEvent.Phone__c = (String) eventMap.get('Phone__c');
            newEvent.address__City__s = (String) ((Map<String, Object>) eventMap.get('address__c')).get('address__City__s');
            newEvent.address__Street__s = (String) ((Map<String, Object>) eventMap.get('address__c')).get('address__Street__s');
            newEvent.address__PostalCode__s = (String)((Map<String, Object>) eventMap.get('address__c')).get('address__PostalCode__s');
            newEvent.address__CountryCode__s = (String) ((Map<String, Object>) eventMap.get('address__c')).get('address__Country__s');
            newEvent.address__StateCode__s = (String) ((Map<String, Object>) eventMap.get('address__c')).get('address__Province__s') ;
            newEvent.email__c = (String) eventMap.get('email__c');
            String startDateString = (String) eventMap.get('start_date__c');
            startDateString = startDateString.replace('T', ' ').substring(0,19);
            Datetime startDate = Datetime.valueOf(startDateString);
            newEvent.start_date__c = startDate;
            
            insert newEvent;

            String fileName = (String) ((Map<String,Object>) eventMap.get('Banner')).get('fileName');
            String base64Content = (String) ((Map<String,Object>) eventMap.get('Banner')).get('fileContent');


            saveFile(newEvent.Id, fileName, base64Content);
            return newEvent.Id;

        } catch (Exception e) {
            return null;
        }
    }

    private static Boolean saveFile(Id id, String fileName , String base64Content) {
        ContentVersion contentVersion = new ContentVersion();        
        base64Content = EncodingUtil.urlDecode(base64Content, 'UTF-8');
        contentVersion.VersionData = EncodingUtil.base64Decode(base64Content);
        contentVersion.Title = fileName;
        contentVersion.PathOnClient = fileName; 
    
        try {
            insert contentVersion;
        } catch (DmlException e) {
            return false;
        }
    
        ContentDocumentLink contentDocument = new ContentDocumentLink();
        contentDocument.ContentDocumentId = [
            SELECT ContentDocumentId
            FROM ContentVersion 
            WHERE Id =: contentVersion.Id
        ].ContentDocumentId;
        contentDocument.LinkedEntityId = id;
        contentDocument.ShareType = 'V';
    
        try {
            insert contentDocument;
        } catch (DmlException e) {
            return false;
        }
        return true;
    }
    
    @AuraEnabled(cacheable = false)
    public static Map<String,String> getImageIdEvent (Id recordId){
        try {

            ContentDocumentLink cdl = [SELECT Id, ContentDocumentId, LinkedEntityId FROM ContentDocumentLink WHERE LinkedEntityId = :recordId];
            Id contentDocumentId = cdl.ContentDocumentId;

            ContentVersion cv = [SELECT VersionData,FileType ,ContentDocumentId FROM ContentVersion WHERE ContentDocumentId = :contentDocumentId];
            String d = cv.FileType;
            String base64Data = EncodingUtil.base64Encode(cv.VersionData);

            Map<String, String> result = new Map<String, String>();
            result.put('fileType', d);
            result.put('Base64', base64Data);

            return result;
        } catch(Exception e) {
            Map<String, String> error = new Map<String, String>();
            error.put('error', e.getMessage());
            return error;
        }
    }
}