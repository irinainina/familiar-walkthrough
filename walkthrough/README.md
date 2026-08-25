# Familiar — описание приложения по экранам

Пять статических страниц со снимками с телефона. Ничего не собирается и не
устанавливается: открываются двойным щелчком по `index.html` и так же
выкладываются на GitHub Pages.

```
index.html      обзор, «чего в приложении нет», указатель всех экранов
signin.html     вход и первый запуск
home.html       главный экран и архив
meeting.html    встреча от начала до итога
settings.html   настройки, напоминания, аккаунт, документы
styles.css      оформление всех страниц
app.js          копирование имени экрана по нажатию
img/            снимки, 480 px по ширине, JPEG
```

## Как править

Текст лежит прямо в HTML — правится в любом редакторе, хоть в «Блокноте».
Один экран — один блок `<div class="step" id="имя">`: слева снимок, справа
заголовок, строка с копируемым именем, абзацы и врезка «Под капотом».

Чтобы добавить экран, скопируйте соседний блок и поменяйте в нём четыре вещи:
`id` у `div`, имя в `data-copy`, путь к картинке и текст. Новую строку стоит
добавить и в таблицу указателя в `index.html`.

Цвета, отступы и шрифты — в начале `styles.css`, переменными.

## Как выложить на GitHub Pages

Страницы не привязаны к репозиторию приложения — это отдельная папка, и
выкладывать её лучше отдельным публичным репозиторием (у приватного
репозитория Pages работают только на платном тарифе).

1. Создайте на GitHub пустой публичный репозиторий, например `familiar-walkthrough`.
2. В этой папке:

   ```
   git init
   git add .
   git commit -m "Familiar: описание приложения по экранам"
   git branch -M main
   git remote add origin https://github.com/<логин>/familiar-walkthrough.git
   git push -u origin main
   ```

3. На GitHub: **Settings → Pages → Source: Deploy from a branch**, ветка
   `main`, папка `/ (root)`, **Save**.
4. Через минуту-две страница живёт по адресу
   `https://<логин>.github.io/familiar-walkthrough/` — эту ссылку и можно
   давать другим.

Дальше любое изменение выкладывается тремя командами:

```
git add .
git commit -m "что поменялось"
git push
```

## Ссылки на конкретный экран

У каждого экрана свой якорь, совпадающий с его именем:

```
https://<логин>.github.io/familiar-walkthrough/settings.html#meeting_preferences
```

Имя под снимком копируется нажатием — им же удобно называть экран в переписке.

## Откуда снимки

* Сквозной проход встречи — `tools/demo_walk.py` в репозитории приложения.
* Остальные экраны — сверка вёрстки с Figma, `uicheck/run.py`.

Пересобрать картинки после нового прогона (из корня репозитория приложения,
нужен Python с Pillow):

```
python - <<'PY'
from PIL import Image
import os
W = 480
def conv(src, dst):
    im = Image.open(src).convert("RGB")
    im = im.resize((W, int(im.height * W / im.width)), Image.LANCZOS)
    im.save(dst, "JPEG", quality=82, optimize=True, progressive=True)
for d in sorted(os.listdir("uicheck/results")):
    p = f"uicheck/results/{d}/phone.png"
    if os.path.isfile(p):
        conv(p, f"walkthrough/img/{d}.jpg")
for f in sorted(os.listdir("tools/compare/demo")):
    if f.endswith(".png") and f != "demo_sheet.png":
        conv(f"tools/compare/demo/{f}", f"walkthrough/img/demo_{f[:-4]}.jpg")
PY
```
