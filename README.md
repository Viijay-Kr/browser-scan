# Browser Lint

Browser lint lets you lint your CSS and Javascript against a browser of your choice. The feature compatibility is obtained from Can I use databse

# Table of Contents

- [Apps](#apps)
  - [Browser Lint web](#browser-lint-web)
  - [Browser Lint CLI](#browser-lint-cli)
  - [Browser Lint API](#browser-lint-api)
    - [Scanner Stream](#scanner-stream)
    - [Scanner File](#scanner-file)
    - GraphQL APIS-TBD

## Apps

Browser lint can be used in three different ways

### Browser Lint Web

1. Browser lint web is a web application powered by React and Node
2. It lets you lint your project/file against a sepcific version of a browser and produces results per file on line basis
3. Currently browser lint web supports only style sheets

### Browser Lint CLI

1. browser-lint-cli can scan your project/file in cli environment
2. install it using the command

- `npm install @browser-lint/cli -g`
  or `yarn global add @browser-lint/cli`

### Browser Lint API

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
