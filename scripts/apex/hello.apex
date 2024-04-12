
System.debug(Date.today());





// ID batchprocessid = Database.executeBatch(new EventBatch());

// AsyncApexJob aaj = [SELECT Id, Status, JobItemsProcessed, TotalJobItems, NumberOfErrors
//                     FROM AsyncApexJob 
//                     WHERE ID =: batchprocessid];
// System.debug(aaj);