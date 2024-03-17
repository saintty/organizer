api event

Доступные строки для поля "priority": 'HIGH', 
                                      'MEDIUM',
                                      'LOWER'
                                      
По запросу api/v1/event/ ответ в виде json:

[
    {
        "id": <id_event>,
        "title": "qdq",
        "description": "qdqdwd",
        "start_time": "2024-03-17T18:41:00Z",
        "end_time": "2024-03-17T18:41:00Z",
        "priority": "HIGH",
        "user": <id_user>
    },
    {
        {
        "id": <id_event>,
        "title": "qdq",
        "description": "qdqdwd",
        "start_time": "2024-03-17T18:41:00Z",
        "end_time": "2024-03-17T18:41:00Z",
        "priority": "HIGH",
        "user": <id_user>
    },
    }
]

Доступные методы: GET, POST(title, description, start_time, end_time, priority)

По запросу api/v1/event/<id>/ ответ отельной записи в виде json:

{
    "id": <event_id>,
    "title": "qdq",
    "description": "qdqdwd",
    "start_time": "2024-03-17T18:41:00Z",
    "end_time": "2024-03-17T18:41:00Z",
    "priority": "HIGH",
    "user": <user_id>
}

Доступные методы: GET, PUT, DELETE (Передается в Headers Token)


