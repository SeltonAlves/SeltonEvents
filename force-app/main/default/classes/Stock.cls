public with sharing class Stock {

   private static Set<Id> stockIds = new Set<Id>();
   
    @AuraEnabled(cacheable = false)
    public static Boolean createStock(Id id,List<Date_Drop__c> dateDrop, List<Stock__c> stockItem){
        try {

            Boolean stocks = createStockItems(stockItem,id);
            Boolean datedp = createDateDrop(dateDrop);
            
            return stocks && datedp;

        } catch (Exception e) {
            return false;
        }
    }

    private static Boolean createStockItems(List<Stock__c> stock, Id eventId){
        try {
            for (Stock__c stockItem : stock) {
                Stock__c stockNew = new Stock__c();
                stockNew.Party__c = eventId;
                stockNew.Quantity__c = stockItem.Quantity__c;
                stockNew.Size__c = stockItem.Size__c;
                stockNew.Name = stockItem.Name;
    
                insert stockNew;
                stockIds.add(stockNew.Id);
            }
 
            return true;

        } catch (DmlException e) {
            return null;
        }
    }

    private static Boolean createDateDrop(List<Date_Drop__c> dateDrop){
        try {
            List<Date_Drop__c> dateDropToInsert = new List<Date_Drop__c>();

            for (Id ids : stockIds) {
                for (Date_Drop__c datedrops : dateDrop) {

                    Date_Drop__c dateDropNew = new Date_Drop__c();
                    dateDropNew.Stock__c = ids;
                    dateDropNew.Date_Finish__c = datedrops.Date_Finish__c;
                    dateDropNew.Date_Start__c = datedrops.Date_Start__c;
                    dateDropNew.Value_Drop__c = datedrops.Value_Drop__c;

                    dateDropToInsert.add(dateDropNew);
                }
            } 
            insert dateDropToInsert;  
            return true;
        } catch (Exception e) {
            return null;
        }
    }
  
}