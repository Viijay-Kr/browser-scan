# Browser scan

Browser scan lets you scan your CSS and Javascript against a browser of your choice. The feature compatibility is obtained from Can I use databse

# Table of Contents

- [Apps](#apps)
  - [Browser scan web](#browser-scan-web)
  - [Browser scan CLI](#browser-scan-cli)
  - [Browser scan API](#browser-scan-api)
    - [Scanner Stream](#scanner-stream)
    - [Scanner File](#scanner-file)
    - GraphQL APIS-TBD

## Apps

Browser scan can be used in three different ways

### Browser scan Web

1. Browser scan web is a web application powered by React and Node
2. It lets you scan your project/file against a sepcific version of a browser and produces results per file on line basis
3. Currently browser scan web supports only style sheets

### Browser scan CLI

1. browser-scan-cli can scan your project/file in cli environment
2. install it using the command

- `npm install @browser-scan/cli -g`
  or `yarn global add @browser-scan/cli`

3. **_Sample input and output TBD_**

### Browser scan API

1. A Collection of Rest API's that can be integrated into your APPS
2. The Following APIs are supported

#### Scanner Stream

A POST Rest API that Streams the results of the given file for a specified version of a browser

```
METHOD: POST
PATH: '/scan/stream'
HEADERS:
  - Transfer-Encoding: chunked
  - Content-Type : application/json
RESPONSE: 200 OK
```

```ts
interface RequestBody {
  browser: Browsers;
  version: string;
  file: Blob;
}

interface Response {
  scanned_result: Record<file, [line, Compatibility_Message][]>;
}
```

#### Scanner File

A Post API that lets you scan style files and get the results on line basis without any streaming

```
METHOD: POST
PATH: '/scan/file'
HEADERS:
  - Content-Type: aplication/json
RESPONSE STATUS CODE: 200
```

The request body and response body are same as the stream scanner

#### GraphQL API

- TBD
