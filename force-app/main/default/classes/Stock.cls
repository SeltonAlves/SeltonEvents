public with sharing class Stock {

    @AuraEnabled(cacheable = false)
    public static Boolean createStock(Id id,List<Date_Drop__c> dateDrop, List<Stock_Item__c> stockItem){
        try {
            
            Stock__c stockNew = new Stock__c();
            stockNew.Party__c = id;
            insert stockNew;

            createDateDrop(dateDrop, stockNew.Id);
            createStockItems(stockItem, stockNew.Id);
            
            return true;

        } catch (Exception e) {
            return false;
        }
    }

    private static void createDateDrop (List<Date_Drop__c> dateDrop, Id stockId){
        try {
            for (Date_Drop__c obj : dateDrop) {
                Date_Drop__c dateDropNew = new Date_Drop__c();

                dateDropNew.Value_Drop__c = obj.Value_Drop__c;
                dateDropNew.Date_Start__c = obj.date_Start__c;
                dateDropNew.Date_Finish__c = obj.date_Finish__c;
                dateDropNew.Stock__c = stockId;

                insert dateDropNew;
            }
        } catch (DmlException e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    private static void createStockItems(List<Stock_Item__c> stockItems, Id stockId){
        try {
            for (Stock_Item__c obj : stockItems) {
                Stock_item__c  stockItemNew = new Stock_item__c ();

                stockItemNew.Quantity__c = obj.Quantity__c;
                stockItemNew.Size__c = obj.Size__c;
                stockItemNew.Name = obj.Name;
                stockItemNew.Stock__c = stockId;

                insert stockItemNew;
            }
        } catch(DmlException e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}