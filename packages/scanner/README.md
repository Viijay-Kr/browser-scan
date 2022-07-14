# Browser Scan Scanner

Brwoser Scan scanner package is a collection of utility API's for integrating browser scan into your Apps

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Entities](#entities)
    - [Browsers](#browsers)
    - [Versions](#versions)
  - [Web](#web)
    - [Hooks](#hooks)
      - [useBrowsers](#usebrowsers)
      - [useVersions](#useversions)
      - [useScanner](#usescanner)
    - [Providers](#providers)

## Installation

`yarn add @browser-scan/scanner`

_or if you are using npm_

`npm i @browser-scan/scanner`

```tsx
import {<your_imports>} from "@browser-scan/scanner";
```

## Usage

The scanner package offers essential utilities and entites for your app to run browser scan

Utilities are offered in the form react hooks which consumes the entities using Rest API's

> _NOTE: Browser Scan is a React based application so only React apps can add browser scan to their applications_

Scanner uses `react-query` to query data from the API.

The underlying logic of the scanner package is flavoured by [`browserslist`](https://www.npmjs.com/package/browserslist) and [`doiuse`](https://www.npmjs.com/package/doiuse) which are third party tools which themselves uses 'can i use database' to produce the desired results

### Entities

Several data points needed in your apps are organised in entities

#### Browsers

List of supported browsers by this package

```json
{
  "and_chr": "Android Chrome",
  "and_ff": "Android Firefox",
  "and_uc": "Android UC",
  "ios_saf": "iOS Safari",
  "op_mob": "Opera Mobile",
  "android": "Android",
  "chrome": "Chrome",
  "firefox": "Firefox",
  "op_mini": "Opera Mini",
  "opera": "Opera",
  "safari": "Safari",
  "edge": "Edge",
  "samsung": "Samsung"
}
```

```ts
import { getAvailableBrowsers } from "@browser-scan/scanner";
```

The keys in the above Map is used as query for browserlist to be enable to support versionings and can I use

#### Versions

Represents the list of supported browser versions

for instance Chrome supports the following versions

```ts
const versions_of_chrome = [ "103", "102", "101", "100", "99", "98", "97", "96", "95", "94", ....upto "4", ];
```

### Web

Utilities needed in your web app is organised inside the web folder

This folder mainly consists of hooks fetching data from the `scanner/api`

#### `useBrowsers`

Gives the list of supported browsers with a loading and fetched state

```ts
export const YourComponent = () => {
  const { data, isLoading, isFetched } = useBrowsers();
};
```

> _NOTE: The result is cached in your react-query environment. So once after fetched the `useBrowsers` can be used anywhere in your application without having to fetch again from server_

> **NOTE: Make Sure your app is wrapped inside the `<ScannerProvider />`**

#### `useVersions`

This hooks gives the list of supported versions of a browser.

```ts
export const YourComponent = () => {
  const { data, isLoading, isFetched } = useVersions("and_chr");
};
```

The entire `useQuery` return value is exposed by this hook to support refetching capablities

example

```ts
export const YourComponent = ({ browser }, { browser: Browsers }) => {
  const { data, isLoading, isFetched, refetch } = useVersions(browser);

  useEffect(() => {
    // This will refetch the versions when the browser changes
    refetch();
  }, [browser]);
};
```

> NOTE: For cleaner API purposes the refetching logic is not part of the hook but rather an available feature

#### `useScanner`

This module consists of two hooks

1. `useStreamScanner`
2. `useFileScanner`

##### `useStreamScnnaer`

This hooks fetches the results of a the scan in chunks from the streaming API.

This is useful for scanning a project which has more than usual number of style files

The hooks exposes a `startStreaming` function which can be invoked on demand

```ts
const { data, startStreaming } = useStreamScanner();

const onScan = () => {
  startStreaming(body:StreamScannerRequest);
};
```

##### `useFileScanner`

This hook scans a single style file and produces the result in a single pass

This is useful for scanning files individually

This hook also exposes a 'scanFile' function which can be invoked on demand

```ts
const { data, scanFile } = useFileScanner();
const onScanFile = () => {
  scanFile(body:NonStreamScannerRequest)
};
```

> NOTE: Both the scanner hooks fetches data on Demand i.e on explicitly calling the scanning functions

#### Providers

Scanner Provider is wrapping provider component which provides the `react-query` query client to your app

```tsx
<ScannerProvider>
  <YourApp />
</ScannerProvider>
```
