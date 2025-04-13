# Тест-кейсы API сервиса объявлений

## Содержание
1. [POST /api/1/item](#post-api1item)
2. [GET /api/1/item](#get-api1item)
3. [GET /api/2/statistic](#get-api2statistic)
4. [DELETE /api/2/item](#delete-api2item)

---

## POST /api/1/item  

### TC-POST-001: Успешное создание объявления  
- Запрос: POST /api/1/item   
- Тело (application/json):  
```json
{
  "sellerId": 345624,
  "name": "Blue Pen",
  "price": 1500,
  "statistics": {
    "likes": 20,
    "viewCount": 300,
    "contacts": 5
  }
}
```
- Ожидаемый результат:  
1. Status Code: 200 OK
2. Тело ответа содержит поле status с ID созданного объявления
3. Все поля объявления соответствуют отправленным данным


### TC-POST-002: Ошибка валидации (отрицательная цена)  
- Запрос: POST /api/1/item   
- Тело (application/json):  
```json
{
  "sellerId": 567289,
  "name": "Next Pen",
  "price": -1500,
  "statistics": {
    "likes": 20,
    "viewCount": 300,
    "contacts": 5
  }
}
```
- Ожидаемый результат:  
1. Status Code: 400 Bad Request
2. Сообщение об ошибке валидации цены


### TC-POST-003: Ошибка валидации (недопустимый sellerID)  
- Запрос: POST /api/1/item   
- Тело (application/json):  
```json
{
  "sellerId": 0,
  "name": "Next Pen",
  "price": 100,
  "statistics": {
    "likes": 20,
    "viewCount": 300,
    "contacts": 5
  }
}
```
- Ожидаемый результат:  
1. Status Code: 400 Bad Request
2. Сообщение об ошибке валидации sellerID

