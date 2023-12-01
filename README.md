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

- `onMoveToRoot(handleMoveToRoot: Function)` - передать клиенту коллбэк для выполнения при получении команды `move_to_root`;

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

- ```
  closeSmartApp()
  ```

  закрыть текущий смартапп;

- `exitSmartAppToCatalog()` - выйти из смартапп на каталог;

- `useQuery()` - получить параметры `url` SmartApp;

- `openClientSettings()` - открыть настройки профиля пользователя Express;

- `getChats({ filter: string | null })` - запросить чаты;

- `requestLocation()` - запросить геолокацию;

- `searchCorporatePhonebook({ filter: string | null })` - запросить результаты поиска по корпоративной phonebook и результат трастового поиска ;

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

__Метод onMoveToRoot__

```
function handleMoveToRoot() {
  history.push('/') - home page
}

function* watchClientEvents() {
  yield onMoveToRoot(handleMoveToRoot)
}
```

__Редирект в другой смартапп__

```
bridge?.sendClientEvent({
    method: "open_smart_app",
    params: {
      appId: string // уникальный идентификатор SmartApp e.g. "017aade3-0f2d-5274-93f2-79607f564dc6",
    }
})
```

__Редирект в другой смартапп, передача поля `meta`__

```
openSmartApp({
    appId: string // уникальный идентификатор SmartApp e.g. "017aade3-0f2d-5274-93f2-79607f564dc6",
    meta: Object, // "meta" может содержать любую информацию
})
```

__Редирект в другой смартапп и передача информации в поле `meta`__

SmartApp 1 отправляет клиенту ивент:

```
openSmartApp({
    appId: "017aade3-0f2d-5274-93f2-79607f564dc6",
    meta: {
      route: "/route-in-feature-smartapp"
    }
})
```

Клиент получает ивент, сохраняет значение поля `meta`.

Клиент открывает SmartApp 2 с `appId === "017aade3-0f2d-5274-93f2-79607f564dc6"`.

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

__Запрос геолокации__

`const response = yield requestLocation()`

Метод отправляет клиенту запрос типа:

```
{
    "ref": <string>,
    "handler": "express",
    "type": "request_location",
    "payload": {},
    "files": []
}
```

И получает ответ типа:

```
{
    "ref": <string>,
    "status": "success",
    "data": {
      "latitude": <string|null>,
      "longitude": <string|null>,
      "timestamp": <"YYYY-MM-DDThh:mm:ss.fZZZZZ"|null>,
    }
}
```

Ответ клиента в случае ошибки:

```
  {
    "ref": <string>,
    "status": "error",
    "error_code": "permission_denied" | "location_undefined"
  }
```

Статус error_code отправляется в следующих случаях:

```
1. Ошибка разрешения на получение геолокации, error_code = "permission_denied"
2. Ошибка получения данных геолокации, error_code = "location_undefined"
```

__Запрос результатов поиска по корпоративной phonebook и результат трастового поиска__

`const response = yield searchCorporatePhonebook({ filter }: { filter: string | null })`

Метод отправляет клиенту запрос типа:

```
{
    "ref": <string>,
    "handler": "express",
    "type": "search_corporate_phonebook",
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
      "corp_phonebook_entries": [
        {
          "avatar": <string|null>,
          "name": <string>,
          "company": <string|null>,
          "company_position": <string|null>,
          "office": <string|null>,
          "department": <string|null>,
          "server_name": <string>,
          "contacts": [
            {
              "active": <bool>,
              "contact": <string>,
              "contact_type": <string>,
              "user_huid": <uuid>,
              "user_kind": <string>,
            }
          ],
        },
      ],
      "trust_search_entries": [
        {
          "avatar": <string|null>,
          "name": <string>,
          "company": <string|null>,
          "company_position": <string|null>,
          "office": <string|null>,
          "department": <string|null>,
          "server_name": <string>,
          "contacts": [
            {
              "active": <bool>,
              "contact": <string>,
              "contact_type": <string>,
              "user_huid": <uuid>,
              "user_kind": <string>,
            }
          ],
        },
      ],
    }
}
```

Ответ клиента в случае ошибки:

```
  {
    "ref": <string>,
    "status": "error",
    "error_code": <string>
  }
```

Статус error и error_code отправляются в следующих случаях:

```
1. Таймаут одного из REST API, error_code = timeout
2. Ошибка сервера 4xx, error_code = <reason из ответа сервера>
3. Запрос менее 3х символов, error_code = filter_too_short
```

__Открытие группового чата__

```
const response = yield openGroupChat({ groupChatId: <uuid> })
```

Метод отправляет клиенту запрос типа:
```
{
  "ref": <string>,
  "handler": "express",
  "type": "smartapp_rpc",
  "method": "open_group_chat",
  "payload": {
    "group_chat_id": <uuid>,
  },
  "files": []
}
```

И получает ответ типа:

```
{
  "ref": <string>,
  "status": "success|error",
  "error_code"?: <string>
}
```

__Открытие файла__

Метод отправляет клиенту запрос типа:

```
const response = yield openFile(file: {
     "type": <string> | null
     "file": <string>
     "fileMimeType": <string> | null
     "fileName": <string> | null
     "filePreview": <string> | null
     "filePreviewHeight": <number> | null
     "filePreviewWidth": <number> | null
     "fileSize": <number>
     "fileHash": <string> | null
     "fileEncryptionAlgo": <string> | null
     "chunkSize": <number> | null
     "fileId": <string> | null
     "key": {} | null
    }
)
```

И получает ответ типа:

```
{
  "ref": <string>,
  "status": "success|error",
  "error_code"?: <string>
}
```

__Отправка скрытой команды боту__

Команда позволяет только передать боту информацию. Обработка информации должна быть реализована на стороне бота.

```
await sendBotCommand({ userHuid, body, data}: {
    userHuid: <string>
    body: <string>
    data: { command: <string> } | null
  }
)
```

Метод отправляет клиенту ивент типа:

```
{
  "ref": <string>,
  "type": "smartapp_rpc",
  "handler": "express",
  "payload": {
    "userHuid": <string>,
    "message": {
       "body": "hello",
       "data": {
          "command": "/test"
        }
     }
  },
  "method": "send_bot_command"
}
```

В чат с ботом придет значение параметра `{ "body": "hello" }`, бот получит объект `{ "command": "/test" }`.

__Запрос профиля текущего пользователя__

```
const response = yield requestSelfProfile()
```

Метод отправляет клиенту запрос типа:
```
{
  "ref": <string>,
  "handler": "express",
  "type": "smartapp_rpc",
  "method": "request_self_profile",
  "payload": {},
  "files": []
}
```

И получает ответ:

```
{
  "ref": <string>,
  "status": "success|error",
  "data": {
    "userHuid": string,
    "name": string,
    "avatar": string | null,
    "avatarPreview": string | null,
    "company": string | null,
    "department": string | null,
    "office": string | null,
    "manager": string | null,
    "managerHuid": string | null,
    "email": string | null,
    "phone": string | null,
    "description": string | null,
    "otherPhone": string | null,
    "ip_phone": string | null,
    "otherIpPhone": string | null,
  }
}
```

__Открытие карточки контакта__

```
yield openContactCard({ userHuid: "123e4567-e89b-12d3-a456-426655440000" })
```

Метод отправляет клиенту запрос на открытие карточки контакта с указанным huid.


__Статус подключения клиента к серверу__

```
const response = yield getConnectionStatus()
```

Метод отправляет клиенту запрос типа:
```
{
  "ref": <string>,
  "handler": "express",
  "type": "smartapp_rpc",
  "method": "get_connection_status",
  "payload": {},
  "files": []
}
```

И получает ответ:
```
{
  "ref": <string>,
  "status": "success|error",
  "data": {
    "connectionStatus": "connected" | "disconnected",
  }
}
```

__Создание ссылки (deeplink)__

```
const response = yield createDeeplink({
  appId: "email-app",
  meta: [
    {
      key: "route",
      value: "/send-email",
    },
    {
      key: "email",
      value: "test@mail.ru",
    },
  ]
})
```

Метод отправляет клиенту запрос типа:
```
{
  "ref": <string>,
  "handler": "express",
  "type": "smartapp_rpc",
  "method": "create_deeplink",
  "payload": {
    "app_id": "email-app",
    "meta": [
    {
      "key": "route",
      "value": "/send-email",
    },
    {
      "key": "email",
      "value": "test@mail.ru",
    },
  ]
  },
  "files": []
}
```

И получает ответ:
```
{
  "ref": <string>,
  "status": "success|error",
  "data": {
    "deeplink": "https://xlnk.ms/open/smartapp/email-app?route=%2Fsend-email&email=test%40mail.ru",
  }
}
```

Также можно подписаться на изменение статуса подключения:
```
yield subscribeClientEvents('connection_status', (event) => {
  // TODO: обработать event.data.connectionStatus
})
```

Отписаться от изменения статуса подключения:
```
yield unsubscribeClientEvents('connection_status', functionName)
```

