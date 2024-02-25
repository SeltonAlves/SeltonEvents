public with sharing class Stock {

    @AuraEnabled(cacheable = false)
    public static Boolean createStock(Id idEvent,String stockJson){
        try {
            
            Map<String, Object> mapJson = (Map<String,Object>) JSON.deserializeUntyped(stockJson);
            List<Date_Drop__c> dateDrops = (List<Date_Drop__c>) mapJson.get('dateDrop');
            List<Stock_item__c> stockItems = (List<Stock_item__c>) mapJson.get('itemStock');

            Stock__c stockNew = new Stock__c();
            stockNew.Party__c = idEvent;
            insert stockNew;

            createDateDrop(dateDrops, stockNew.Id);
            createStockItems(stockItems, stockNew.Id);
            
            return true;

        } catch (Exception e) {
            return false;
        }
    }

    private static void createDateDrop (List<Date_Drop__c> dateDrop, Id stockId){
        try {
            for (Object obj : dateDrop) {
                Map<String, Object> dateDrops = (Map<String, Object>) obj;
                Date_Drop__c dateDropNew = new Date_Drop__c();

                dateDropNew.Value_Drop__c = (Decimal) dateDrops.get('valueDrop');
                dateDropNew.Date_Start__c = Date.valueOf((String) dateDrops.get('dateStart'));
                dateDropNew.Date_Finish__c = Date.valueOf((String) dateDrops.get('dateFinish'));
                dateDropNew.Stock__c = stockId;

                insert dateDropNew;
            }
        } catch (DmlException e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    private static void createStockItems(List<Stock_item__c> stockItems, Id stockId){
        try {
            for (Object obj : stockItems) {

                Map<String, Object> stockItem = (Map<String,Object>) obj;
                Stock_item__c  stockItemNew = new Stock_item__c ();

                stockItemNew.Quantity__c = (Decimal) stockItem.get('Quantity');
                stockItemNew.Size__c = (String) stockItem.get('Size__c');
                stockItemNew.Stock__c = stockId;

                insert stockItemNew;
            }
        } catch(DmlException e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}