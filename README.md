# Тестовое задание 
Данный репозиторий с решениями тестовых заданий для QA-стажировки в Avito.
Ниже инструкция с описанием решения 2 заданий.

---
## Задание 1
В задании требуется перечислить все имеющиеся баги со скриншота, и указать их приоритет (high, medium, low).   

Подробнее с выполнением задания можно ознакомиться в файле [Task1/BUGS.md](Task1/BUGS.md) .

---

## Задание 2.1 
**В ходе выполнения задания 2.1 я:**  
- анализировала структуру ответов с помощью предоставленной Postman-коллекции,  
- использовала язык JavaScript,  
- инструмент для тестирования Mocha,  
- запускала тесты в командной строке (cmd).  

Структура моего решения состоит из следующих файлов:
[QA-trainee-assignment-spring-2025-skarlygina\Task2](Task2/)
```
├── .gitignore
├── package.json
├── package-lock.json
├── TESTCASE.md
├── BUGS.md
└── test/
    ├── config.js
    ├── DELETE.js
    ├── GET.js
    └── POST.js
```
### Инструкция по запуску тестов:
Склонируйте репозиторий и перейдите в папку `Task2`:
```
git clone https://github.com/maryskar/QA-trainee-assignment-spring-2025-skarlygina.git
cd QA-trainee-assignment-spring-2025-skarlygina/Task2
```
Установите зависимости:
```
npm install
```
Запустите тесты:
```
npm test
```

### Подробнее с выполнением задания можно ознакомиться в файлах [Task2/TESTCASE.md](Task2/TESTCASE.md) и [Task2/BUGS.md](Task2/BUGS.md).
