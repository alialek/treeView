# TreeView

Компонент для отображения древовидной структуры.

### Для запуска

Выполнить `npm install` - для установки зависимостей;
Выполнить `npm start` - для запуска локальной версии проекта;

### Функции

- Выбор активного пункта по его идентификатору.
- Фильтрация по строке текста (debounce 500ms).
- Навигация с помощью клавиатуры (Tab, Space - для разворачивания ветки, Enter - для выбора активной страницы).
- Заглушка при загрузке данных и ошибке.

| Параметр       | Тип данных        | Значение                                                                                                      |
| -------------- | ----------------- | ------------------------------------------------------------------------------------------------------------- |
| topLevelIds    | array (required)  | Массив идентификаторов страниц верхнего уровня                                                                |
| pages          | object (required) | Страницы                                                                                                      |
| anchors        | object (required) | Якоря                                                                                                         |
| isLoading      | boolean           | Отображает индикатор загрузки                                                                                 |
| error          | boolean           | Ошибка                                                                                                        |
| initialID      | string            | Начальный идентификатор страницы. Раскроет дерево до нужной страницы                                          |
| initialSearch  | string            | Начальная строка поиска по страницам. Раскроет дерево до необходимого уровня, если найденная страница вложена |
| initialAcnhor  | string            | Начальный идентификатор якоря. Раскроет дерево до необходимого якоря                                          |
| `onPageSelect` | function          | Вызывается при нажатии на якорь или страницу. Возвращает: isAnchor, url, anchor                               |

### Использовано

- React.
- Sass.
- Webpack.
