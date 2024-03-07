List<Date_Drop__c> listDrop = new List<Date_Drop__c>();
List<Stock__c> listItem = new List<Stock__c>();


Stock__c item = new Stock__c();
item.Name = 'as';
item.Size__c = 'P';
item.Quantity__c = 31;

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

listItem.add(item);

Stock.createStock('a02Hs000017dZx2IAE', listDrop, listItem);