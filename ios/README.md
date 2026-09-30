# Familiar для iOS — описание по экранам

Шесть статических страниц со снимками из симулятора iPhone. Открываются двойным
щелчком по `index.html`, выкладываются на GitHub Pages как есть.

```
index.html      обзор, весь путь лентой, разделы, указатель всех экранов
signin.html     вход и знакомство (имена, темы, согласие, уведомления)
home.html       главный экран и архив
meeting.html    встреча от начала до итога
settings.html   настройки, напоминания, аккаунт, документы
ios.html        установка сборки, отличия от Android, что нового в 0.5
styles.css      оформление; цвета и шрифты — переменными в начале
app.js          копирование имени экрана и просмотр снимка крупно
build.py        тексты всех страниц; из него собираются *.html
img/            снимки, 600 px по ширине, JPEG
```

## Как править текст

Все тексты лежат в `build.py`: одна функция на страницу, один вызов `step(...)`
на экран. После правки:

```
python3 build.py
```

— и все шесть HTML пересоберутся. Разметка в текстах: `[[Continue]]` — подпись
кнопки из приложения, `**жирный**`, `` `код` ``, `{home.html#summary|ссылка}`.

HTML можно править и руками, но следующий запуск `build.py` правку затрёт.

## Как переснять снимки

Снимки делает UI-тест `FamiliarUITests/WalkthroughShotsUITests.swift`:

```
TEST_RUNNER_SHOTS="$PWD/.sim/walkthrough" xcodebuild -project Familiar.xcodeproj \
  -scheme Familiar -destination "platform=iOS Simulator,name=iPhone 18 Pro" \
  -derivedDataPath .build/sim -only-testing:FamiliarUITests/WalkthroughShotsUITests test
```

Вход, знакомство и встреча идут в песочнице (`-sandbox YES`), история и
настройки — рабочий аккаунт, только просмотр. Потом PNG из `.sim/walkthrough`
уменьшаются до 600 px в `img/` (скрипт — в истории сессии 30.09, или Pillow:
`resize((600, h))`, `quality=84`).

## Как выложить на GitHub Pages

Android-описание лежит в github.com/irinainina/familiar-walkthrough, в папке
`walkthrough/`. iOS-описание можно положить туда же рядом, папкой `ios/`:

```
cp -R docs/walkthrough-ios <клон familiar-walkthrough>/ios
cd <клон familiar-walkthrough>
git add ios && git commit -m "Add the iOS walkthrough" && git push
```

Страница откроется по адресу `https://irinainina.github.io/familiar-walkthrough/ios/`.

