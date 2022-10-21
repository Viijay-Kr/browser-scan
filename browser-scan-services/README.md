# Browser Scan Services

Browser scan services are collection of API services that are used by browser scan applications

Currently Rest services are supported

Upcoming releases will include graphql , grpc services


# Rest APIs

## Browsers 

Get a list of supported browsers 

```ts
# RequestBody
interface BrowsersRequest {
  method: "GET",
  url: "/browsers",
  contentType: "application/json",
  name: "Browsers",
  path: "/browsers",
}
```

```ts
# ResponseBody 
interface BrowsersResponse{
    supported_browsers: Record<Browsers, keyof typeof Browsers>;
}

enum Browsers {
    "Android Chrome" = "and_chr",
    "Android Firefox" = "and_ff",
    "Android UC" = "and_uc",
    "iOS Safari" = "ios_saf",
    "Opera Mobile" = "op_mob",
    "Android" = "android",
    "Chrome" = "chrome",
    "Firefox" = "firefox",
    "Opera Mini" = "op_mini",
    "Opera" = "opera",
    "Safari" = "safari",
    "Edge" = "edge",
    "Samsung" = "samsung"
}
```

## Versions
Get a list of supported versions of a browser

```ts
# RequestBody
interface VersionsRequest 
{
  method: "GET",
  path: "/versions/:browser",
  url: "/versions/:browser",
  name: "Versions",
}
```
```ts
# ResponseBody
interface VersionsResponse {
    supported_versions: string[];
}
```

