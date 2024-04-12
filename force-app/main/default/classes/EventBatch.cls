global class EventBatch implements Database.Batchable<sObject> {

    private static Map<String,String> mensage = new Map<String,String>();

    global Database.querylocator start(Database.BatchableContext BC) {
        Datetime nowGtm = System.now();
        String tz = UserInfo.getTimeZone().getID();
        Datetime nowUserTime = nowGtm.addSeconds(TimeZone.getTimeZone(tz).getOffset(nowGtm) / 1000);
        return Database.getQueryLocator([SELECT Id,Name,email__c,start_date__c FROM Party__c WHERE start_date__c <= :nowUserTime]);
    }
 
    global void execute(Database.BatchableContext BC, List<sObject> scope) {
        for(Party__c obj: (List<Party__c>) scope){
            mensage.put(obj.Name, obj.email__c);
        }
        delete scope;
    }
 
    global void finish(Database.BatchableContext BC) {
        List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage>();

        for(String name : mensage.keySet()){
            Messaging.SingleEmailMessage createEmail = new Messaging.SingleEmailMessage();
            createEmail.setToAddresses(new List<String>{mensage.get(name)});
            createEmail.setSubject('Evento Excluído: ' + name);
            createEmail.setPlainTextBody('Este Evento Foi Excluído');       
            emails.add(createEmail);
        }
        Messaging.sendEmail(emails);
    }
 }