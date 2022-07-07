## Can I use CSS

### Problem Statement

Check your css for support against a browser of your choice. The non compatibility table gives the results per line per file.

### Steps to run

1. Checkout the repository
   - `yarn` or `npm install`
2. Run `yarn dev` to start the dev server
   - This run the server and client concurrently

### Server

The server package contains a a simple resitify node server serving the following apis

1.  `GET: /browsers`

    - Gives key/value pairs of supported browsers

      ```json
      #  Supported Browsers
      {
         and_chr: "Android Chrome",
         and_ff: "Android Firefox",
         and_uc: "Android UC",
         ios_saf: "iOS Safari",
         op_mob: "Opera Mobile",
         android: "Android",
         chrome: "Chrome",
         firefox: "Firefox",
         op_mini: "Opera Mini",
         opera: "Opera",
         safari: "Safari",
         edge: "Edge",
         samsung: "Samsung",
      }
      ```

2.  `GET: /:browser/versions`

    - Gives a list of supported versions of the browser in latest to oldest order

      ```json
        # Request
        GET /chrome/versions

        # Response
         ["104","103","102".....,"4"]
      ```

3.  `POST: /scan/file`

    - Scans a give single file and gives the result per file in the following format

      ```ts
      type Line = string;
      type Column = string;
      type NonCompatibleProperty = string;
      type CompatibilityTuple = [`${Line}:${Column}`, NonCompatibleProperty];
      interface ScannerResponse {
        [file]: [Line, NonCompatibleProperty[]];
      }
      ```

      ```json
      # Content-Type: application/json
      # Request Body
         {
            "project_path":"<path_to_file>.less|css|scss",
            "browser":"chrome",
            "version":"102",
         }

      # Response
         {
            [full_file_path.css]:[
               ["12:3","object-fit is only partically,multi-column is not supported in chrome"],
               ["111:2","position is not supported"],
               ]
         }
      ```

4.  `POST: /scan/stream`
    - This is an asynchrous streaming API useful for scanning more than single style file in a project
    - It uses transfer encoding chunked header to stream chunks of messages to the client
    - Chunking is usually per file basis. However the whole scanning process is asynchronous
    - `Request` and `Response` strucure is same as in non streaming service `/scan/file`

#### Client

The client package is a single page React application. The client uses the following lib/tools

1. **Chakra UI** for the UI
2. **React Query** for API access
