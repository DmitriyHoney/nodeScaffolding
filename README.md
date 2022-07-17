# Реализация Scaffolding
#### За основу взята лекция Тимура Шемсединова - [Скаффолдинг для API, UI и данных](https://www.youtube.com/watch?v=lipkLQVqDd8&ab_channel=TimurShemsedinov)
____
##### Мое понимание скаффолдинга и зачем это нужно:
1. Скаффолдинг - это метод метапрограммирования при котором разработчик создает в коде спецификацию, описывает какие-либо схемы, сущности, по котором в дальнейшем генерируется UI, со всеми CRUD операциями.
2. Как я понял это можно применить например для баз данных, условно у нас есть описание моделей, таблиц, в последствии можно сгенерить админку для доступа и просмотра БД. (например что-то наподобие pgadmin)

##### Что сделал я в этом приложении:
1. Человек заходит на сайт и может создать схему формочки. Пример:
2.  ```JSON
    {
      "Email": {
        "type": "text",
        "control": "input",
        "required": true,
        "unique": true
      },
      "UserName": {
        "type": "text",
        "control": "input"
      },
      //...
    }
3. Затем после создания шаблона, можно перейти на страницу объекты и на основе этого шаблона создать объект
4. При переходе на страницу объекты генерируется форма в соответствие о схемой что создали в шаге 2.

____
##### Проблемы и недостатки:
1. Данные записываются не в БД а в файловую систему
2. При изменении Схемы, необходимо проводить миграции со старыми объектами (сейчас этого нет)
    2.1 (Т.е если в схему добавили или удалили поле, в предыдущих файлах его необходимо тоже менять)
4. Повторяющийся код в шаблонах html (появилась необходимость использовать html шаблонизатор)
