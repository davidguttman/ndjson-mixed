# ndjson-mixed

CLI tool to format "mixed" ndjson streams.

I created this to help format server logs when they come from `dokku` and `deis`. These platforms helpfully prefix log lines with timestamps and server info, but in doing so they break ndjson-oriented tools. For example:

```
2018-06-16T15:48:21+00:00 app-name[web.v15.9tjwt]: {"pid":36,"hostname":"app-name-web-f4bb796f6-9tjwt","name":"app-name","level":20,"time":"2018-06-16T15:48:21.298Z","ip":"1.2.3.4","method":"GET","url":"/some-path","responseTime":95,"statusCode":200,"version":"1.1.2","requestId":"cjihktnwz5zev10w0efpto0j3","v":1}
```

Using `ndjson-mixed` it can be cleaned up:

```
⚡ deis logs | ndjson-mixed
{"pid":36,"hostname":"app-name-web-f4bb796f6-9tjwt","name":"app-name","level":20,"time":"2018-06-16T15:48:21.298Z","ip":"1.2.3.4","method":"GET","url":"/some-path","responseTime":95,"statusCode":200,"version":"1.1.2","requestId":"cjihktnwz5zev10w0efpto0j3","v":1}
```

or formatted:

```
⚡ deis logs | ndjson-mixed -i 2
{
  "pid": 36,
  "hostname": "app-name-web-f4bb796f6-9tjwt",
  "name": "app-name",
  "level": 20,
  "time": "2018-06-16T15:48:21.298Z",
  "ip": "1.2.3.4",
  "method": "GET",
  "url": "/some-path",
  "responseTime": 95,
  "statusCode": 200,
  "version": "1.1.2",
  "requestId": "cjihktnwz5zev10w0efpto0j3",
  "v": 1
}
```

or to omit keys:

```
⚡ deis logs | ndjson-mixed -o pid -o hostname
{"name":"app-name","level":20,"time":"2018-06-16T15:48:21.298Z","ip":"1.2.3.4","method":"GET","url":"/some-path","responseTime":95,"statusCode":200,"version":"1.1.2","requestId":"cjihktnwz5zev10w0efpto0j3","v":1}
```

### Options

```
⚡ ndjson-mixed --help
Options:
  --help        Show help                                              [boolean]
  --version     Show version number                                    [boolean]
  --indent, -i  json indent size                                    [default: 0]
  --clean, -c   filter non-json lines                           [default: false]
  --omit, -o    omit keys from objects                     [array] [default: []]
```
