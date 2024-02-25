
string tempvar = 'Enter_your_name_here';
System.debug('Hello World!');
System.debug('My name is ' + tempvar);

Map<String, Object> data = new Map<String, Object>{
    'dateDrop' => new List<Map<String, Object>>{
        new Map<String, Object>{
            'id' => '1708736349435',
            'valueDrop' => '43',
            'canDelete' => false,
            'dateStart' => '2024-02-22',
            'dateFinish' => '2024-02-28'
        }
    },
    'itemStock' => new List<Map<String, Object>>{
        new Map<String, Object>{
            'id' => 0,
            'Name' => 'se',
            'Size' => 'P',
            'Quantity' => '1'
        },
        new Map<String, Object>{
            'id' => 1,
            'Name' => 'se',
            'Size' => 'G',
            'Quantity' => '13'
        }
    }
};

