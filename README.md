# Server side Пример карт с авторизацией
Используется библиотека: *rect-leaflet*
## Запуск
```
git clone https://github.com/gbaramidze/tz
cs tz
yarn install
yarn start
```
или
```
npm install
npm start
```

Затем откройте ссылку `http://localhost:3100/` 

### Сборка
После компанды `npm run build`, выполните
```
yarn serve
```
### Описание
Настроено `react-leaflet` `sass` `eslit` `babel` `react-bootstrap` и т.д.

После авторизации окошко пропадает. чтобы опять появилось сделайте log-out нажатием на почту в верхнем меню, или перезагрузите страницу

по умолчанию можно зайти под логином
```
admin@admin.com
1234
```
восстонавить этот акк тоже можно.

Аккаунты пропадают после `F5`

## Структура файлов
```
+---locale
+---pages
+---server
+---src
|   +---components
|   |   \---Navigation
|   +---containers
|   |   +---Forgot
|   |   +---Login
|   |   \---Register
|   +---map
|   |   \---images
|   +---reducers
|   \---store
\---static
    +---css
    \---flags
```
