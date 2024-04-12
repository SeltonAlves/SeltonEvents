@isTest
private class EventBatchTest {

    @isTest
    static void check() {
        List<Party__c> partyObjTest = new List<Party__c>();
        for (Integer i = 0; i < 2; i++) {
            Party__c  party = new Party__c();  
            party.Name = 'teste homi' +  i ;
            party.email__c = 'selton569@gmail.com';
            party.start_date__c = Date.today();
            partyObjTest.add(party);
        } 

        insert partyObjTest;

        Test.startTest();
        EventBatch bat = new EventBatch();
        Database.executeBatch(bat);
        Test.stopTest();
    }
}