@isTest
private class StockTest {

     @isTest
     static void testCreateStock() {
         List<Date_Drop__c> listDate = createListDrop();
         List<Stock__c> listStockItem = createListStockItem();
         Test.startTest();
         Boolean result =  Stock.createStock('a02Hs000017dZx2IAE', listDate, listStockItem);
         Test.stopTest();
         System.assertEquals(true, result);
     }

     private static List<Date_Drop__c> createListDrop (){
        List<Date_Drop__c> listDrop = new List<Date_Drop__c>();

         Date_Drop__c drop = new Date_Drop__c();
         drop.Date_Start__c = Date.valueOf('2024-02-27');
         drop.Date_Finish__c =Date.valueOf('2024-02-29');
         drop.Value_Drop__c = 2;

         Date_Drop__c dropr = new Date_Drop__c();
         dropr.Date_Start__c = Date.valueOf('2024-02-17');
         dropr.Date_Finish__c = Date.valueOf('2024-03-12');
         dropr.Value_Drop__c = 24;

         listDrop.add(drop);
         listDrop.add(dropr);

         return listDrop;
    }

    private static List<Stock__c> createListStockItem() {
         List<Stock__c> listItem = new List<Stock__c>();

         Stock__c itemr = new Stock__c();
         itemr.Name = 'as';
         itemr.Size__c = 'M';
         itemr.Quantity__c = 54;
    
         listItem.add(itemr);

         return listItem;
    }

}