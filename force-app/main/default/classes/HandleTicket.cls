public with sharing class HandleTicket {

    private Set<Id> ids = new Set<Id>();

    @AuraEnabled(cacheable = false)
    public static Boolean createContact (Contact obj){
        try {
            Contact contact = new Contact();
            contact = obj;
            insert contact;
            return true;
        } catch(Exception e) {
          return  false;
        }
    }
}