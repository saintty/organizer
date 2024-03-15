api event

Доступные строки для поля "priority": 'HIGH', 
                                      'MEDIUM',
                                      'LOWER'
                                      
По запросу api/v1/event ответ в виде json:

[
    {
        "id": <id>,
        "user": {
            "id": <id>,
            "name": <name>,
            "email": <email>
        },
        "title": "acasca",
        "description": "acascasca",
        "start_time": "2024-03-15T15:59:28Z",
        "end_time": "2024-03-15T16:59:30Z",
        "priority": "HIGH"
    },
    {
        "id": <id>,
        "user": {
            "id": <id>,
            "name": <name>,
            "email": <email>
        },
        "title": "ртоотт",
        "description": "ог99оо",
        "start_time": "2024-03-15T19:01:00Z",
        "end_time": "2024-03-15T23:01:00Z",
        "priority": "HIGH"
    }
]

Доступные методы: GET, POST(ttile, description, start_time, end_time, priority)

По запросу api/v1/event/<id> ответ отельной записи в виде json:

{
    "id": <id>,
    "user": {
        "id": <id>,
        "name": <name>,
        "email": <email>
    },
    "title": "acasca",
    "description": "acascasca",
    "start_time": "2024-03-15T15:59:28Z",
    "end_time": "2024-03-15T16:59:30Z",
    "priority": "HIGH"
}

Доступные методы: GET, PUT, DELETE


