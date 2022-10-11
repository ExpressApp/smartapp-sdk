# SmartApp SDK

__Библиотека предлагает__:

__Методы SmartApp Bridge__

- Отправка ивента клиенту:

  ```
  bridge?.sendClientEvent({
      method: string,
      params: object,
      timeout?: number
  })
  ```

- Отправка ивента боту:

  ```
  bridge?.sendBotEvent({
      method: string,
      params: object,
      timeout?: number
  })
  ```

- `bridge?.onReceive(callback: Function)` - передать клиенту коллбэк для выполнения при получении входящих ивентов;

- `bridge?.enableLogs()` - включить сбор логов SmartApp (выключено по умолчанию);

- `bridge?.disableLogs()` - выключить сбор логов SmartApp (выключено по умолчанию);

- `bridge?.disableRenameParams()` – выключить переименование полей ивентов SmartApp из `camelCase` в `snake_case` при отправке
  ивента боту или клиенту, и наоборот, при получении (включено по умолчанию);

- `bridge?.enableRenameParams()` – включить переименование полей ивентов SmartApp из `camelCase` в `snake_case` при отправке
  ивента боту или клиенту, и наоборот, при получении (включено по умолчанию);

__Реализации клиентских методов SmartApp Bridge__

- `ready({ timeout?: number })` - отправить клиенту команду `ready`;

- `routingChanged(isRoot: boolean)` - отправить клиенту команду `routing_changed`;

- `onBackPressed(handleBackPressed: Function)` - передать клиенту коллбэк для выполнения при получении команды `back_pressed`;

- `addContact({ phone: string, name: string })` - скачать `.csv` файл контакта;

- `getContact({ phone: string })` – получить контакт по номеру телефона;

- `createPersonalChat({ huid: string })` - создать чат с юзером или открыть существующий;

- `onNotification(handleNotification: Function)` - передать клиенту коллбэк для выполнения при получении ивента с `type === "notification"`;

- ```
    sendMessage({
      userHuid: string | null,
      groupChatId: string | null,
      messageBody: string,
      messageMeta? : Object
    })
    ```
  отправить сообщение юзеру, боту или в групповой чат;

- ```
    openSmartApp({
      appId: string,
      meta?: any,
    })
    ```
  открыть смартапп;

- `exitSmartAppToCatalog()` - выйти из смартапп на каталог;

- `useQuery()` - получить параметры `url` SmartApp;

- `openClientSettings()` - открыть настройки профиля пользователя Express;

- `getChats({ filter: string | null })` - запросить чаты;

__Метод onReceive__

```
import { EventChannel, eventChannel } from "redux-saga"

function subscribeClientEvents(): EventChannel<any> {
    return eventChannel(emit => {
        bridge?.onReceive((event) => emit(event as any))
        return () => {}
  })
}
```

__Метод routingChanged__

```
function routerChangedSaga(action: any) {
  const isRoot = action.payload.location.pathname === "/"

  routingChanged(isRoot)
}
```

__Метод onBackPressed__

```
function handleClientBackPressedEvent() {
  history.goBack()
}

function* watchClientEvents() {
  yield onBackPressed(handleClientBackPressedEvent)
}
```

__Редирект в другой смартапп__

```
bridge?.sendClientEvent({
    method: "open_smart_app",
    params: {
        appId: string // уникальный идентификатор SmartApp e.g. "feature-smartapp"
    }
})
```

__Редирект в другой смартапп, передача поля `meta`__

```
openSmartApp({
    appId: string // уникальный идентификатор SmartApp e.g. "feature-smartapp",
    meta: Object, // "meta" может содержать любую информацию
})
```

__Редирект в другой смартапп и передача информации в поле `meta`__

SmartApp 1 отправляет клиенту ивент:

```
openSmartApp({
    appId: "feature-smartapp",
    meta: {
      route: "/route-in-feature-smartapp"
    }
})
```

Клиент получает ивент, сохраняет значение поля `meta`.

Клиент открывает SmartApp 2 с `appId === "feature-smartapp"`.

SmartApp 2 шлет ивент `ready`:

`const response = yield ready()`

В ответе на `ready` SmartApp 2 проверяет наличие поля `openSmartAppMeta`:

```
if (response?.payload?.openSmartAppMeta) {
    const meta = response?.payload?.openSmartAppMeta
    history.push(`${openSmartAppMeta?.route}`)
}
```

SmartApp 2 выполняет необходимые действия с `meta`, которую SmartApp 1 отправляет клиенту, а клиент возвращает в ответе на
ивент `ready` SmartApp 2.

__Получение параметров `url` SmartApp__

`const urlParams = useQuery()`

Метод возвращает объект типа:

```
{
    platform: "web" | "ios" | "android",
    theme: "default" | "dark"
}
```

__Открытие настроек профиля__

`openClientSettings()`

Метод отправляет клиенту запрос типа:

```
{
    "ref": <string>,
    "handler": "express",
    "type": "open_client_settings",
    "payload": {},
    "files": []
}
```

Ответа от клиента не приходит. Происходит открытие Настроек профиля пользователя Express.

__Запрос чатов__

`const response = yield getChats({ filter }: { filter: string | null })`

Метод отправляет клиенту запрос типа:

```
{
    "ref": <string>,
    "handler": "express",
    "type": "get_chats",
    "payload": {
        "filter": <string|null>,
    },
    "files": []
}
```

И получает ответ типа:

```
{ 
    "ref": <string>,
    "status": "success",
    "data": {
      "chats": [
        {
          "group_chat_id": <uuid>,
          "name": <string>,
          "avatar": <string|null>,
          "members_type": "cts|rts|hybrid",
          "is_trusted": <bool>,
          "chat_type": "chat|group_chat|botx|channel",
        },
      ],
    }
}
```

__Кеширование статики с помощью WorkboxWebpackPlugin__

Если приложение было создано с помощью `create-react-app`, добавляем строчку в `package.json`:

```
"scripts": {
    "eject": "react-scripts eject",
}
```

В зависимости приложения добавляем `smartapp-sdk` версии `1.0.7` или выше:

```
"dependencies": {
    "@expressms/smartapp-sdk": "^1.0.7",
}
```

Устанавливаем пакет и выполняем команду `npm run eject`.

Далее, делаем следующие изменения в файлах:

Добавляем код в `index.tsx`:

```
if (module.hot) module.hot.accept()

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
    })
}
```

Добавляем код в файл `webpack.config.js`:

```
plugins: [
    new WorkboxWebpackPlugin.InjectManifest({
    swSrc: "@expressms/smartapp-sdk/workers/workbox.js", // path to worker
    swDest: "sw.js"
}),
```

Удаляем в файле `webpack.config.js` следующий код:

```
// Generate a service worker script that will precache, and keep up to date,
// the HTML & assets that are part of the webpack build.
isEnvProduction &&
fs.existsSync(swSrc) &&
new WorkboxWebpackPlugin.InjectManifest({
    swSrc,
    dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
    exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
    // Bump up the default maximum size (2mb) that"s precached,
    // to make lazy-loading failure scenarios less likely.
    // See <https://github.com/cra-template/pwa/issues/13#issuecomment-722667270>
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
}),
```

Запускаем приложение, проверяем регистрацию сервис-воркера.
