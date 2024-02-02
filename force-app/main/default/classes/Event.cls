public with sharing class Event {

    @AuraEnabled
    public static Boolean createEvent(Party__c Event){
        try {
            Party__c newEvent = new Party__c();
            newEvent = Event;
            insert newEvent;
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}