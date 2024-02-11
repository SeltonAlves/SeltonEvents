
string tempvar = 'Enter_your_name_here';
System.debug('Hello World!');
System.debug('My name is ' + tempvar);

Map<String, Object> jsonData = new Map<String, Object>{
    'Name' => 'selton',
    'email__c' => 'selton56@gmail.com',
    'Phone__c' => '(81) 9 8574-8574',
    'start_date__c' => '2024-02-09T02:57:00.000Z',
    'Description__c' => 'sdsf',
    'address__c' => new Map<String, Object>{
        'address__City__s' => 'Itapissuma',
        'address__Country__s' => 'BR',
        'address__PostalCode__s' => '53700-000',
        'address__Province__s' => 'PE',
        'address__Street__s' => 'sdfsf'
    }
};

String jsonString = JSON.serialize(jsonData);


Event.createEvent(jsonString);