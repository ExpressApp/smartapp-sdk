# Smartapp Sdk

__Библиотека предлагает__:

- Использование методов SmartAppBridge:

```
bridge.sendClientEvent({
    method: string,
    params: object,
    timeout?: number
})
```

```
bridge.sendBotEvent({
    method: string,
    params: object,
    timeout?: number
})
```

`bridge.enableLogs()` - включить сбор логов SmartApp

`bridge.disableLogs()` - выключить сбор логов SmartApp

- Реализации клиентских методов Bridge:

`ready({ timeout?: number })` - отправить клиенту команду 'ready'

`routingChanged(isRoot: boolean)`

`onBackPressed(handleBackPressed: Function)`

`addContact({ phone, name }: { phone: string, name: string })`

`getContact({ phone }: { phone: string })`

`createPersonalChat(  { huid }: { huid: string })` - создать чат с юзером или открыть существующий

`onNotification(handleNotification: Function)` - метод подписки на нотификации

`sendMessage({ userHuid: string  | null, groupChatId: string | null, messageBody: string,    messageMeta? : Object})` - отправить юзеру или в групповой чат сообщение

`openSmartApp` - открыть смартапп

`exitSmartAppToCatalog` -  выйти из смартапп на каталог

__Редирект в другой смартапп__

```
bridge?.sendClientEvent({
    method: 'open_smart_app',
    params: {
    appId: string // уникальный идентификатор SmartApp из админки e.g. "feature-smartapp"
  }
})
```
Редирект в другой смартапп, передача роута, либо другой информации для обработки вторым смартапом
```
openSmartApp({
    appId: string // уникальный идентификатор SmartApp из админки e.g. "feature-smartapp",
    meta: Object, // "meta" может содержать любую информацию, которую необходимо передать
})
```

__Пример редиректа в другой смартапп и передачи информации из поля meta__

SmartApp 1 отправляет ивент экспрессу
```
openSmartApp({
    appId: "feature-smartapp",
    meta: {
    route: '/route-in-feature-smartapp'
    }  
})
```

Экспресс получает ивент, сохраняет значение поля meta.

Экспресс открывает SmartApp 2 с appId 'feature-smartapp'

SmartApp 2 шлет ивент `ready()` из SDK, либо напрямую из библиотеки SmartApp Bridge:

```
const response = yield bridge?.sendClientEvent({
    method: 'ready',
    params: {},
})
```

в ответе на ready SmartApp 2 проверяет наличие поля openSmartAppMeta :

```
if (response?.payload?.openSmartAppMeta) {
    const meta = response?.payload?.openSmartAppMeta
    history.push(`${openSmartAppMeta?.route}`)
}
```
SmartApp 2 выполняет необходимые действия с meta, которую SmartApp 1 отправляет клиенту, а клиент возвращает в ответе на ивент ready SmartApp 2
