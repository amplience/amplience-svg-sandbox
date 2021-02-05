# amp-svg-dev-sandbox
> Example sandbox environment for previewing SVG's using the Amplience preview service

## Sandbox Setup

First thing to do is clone the repo locally and then run `npm install`.

Before running the sandbox you will need to provide a valid `credentials.json`.  See below for details.

In the `preview` task the `companyName` option needs changing to your Amplience company name.

### Authentication credentials

The sandbox requires an authentication token so it can access the preview API.  Run the following commands to setup your Amplience credentials:
* `cd ~/` or for windows `cd %userprofile%`
* `mkdir .amplience`
* `cd .amplience`
* `cp /path/to/credentials.json.example credentials.json` or for windows `copy c:\path\to\credentials.json.example credentials.json`

Edit `credentials.json` replacing the placeholders with valid auth details.

**Note: To get a valid client_id please contact Amplience support**

## Usage

Watch for SVG changes and output preview URL (without running a local web service):
```bash
$ gulp
```
Run a local web app to display a preview of SVG changes:
```bash
$ gulp serve
```

## Merge options

The merge task can be configured using the tasks options object e.g.

```js
  var mergeOptions = {
    svgDirectory: './src',
    subsFileExt: '.metadata'
    headerFileExt: '.headers'
  };
```

Both options are required.

## Preview options

The preview task can be configured using the tasks options object e.g.

```js
var previewOpts = {
  di: {
    protocol: "https",
    host: "cdn.media.amplience.net",
    companyName: '<company_name_here>',
    namespace: 'pv'
  },
  preview: {
    protocol: "https",
    host: "dm-preview-service.adis.ws",
    pathname: "/preview"
  },
  auth: {
    protocol: "https",
    host: "auth.amplience.net",
    pathname: "/oauth/token"
  }
};
```

*Note: companyName is your Amplience company name*

## Query String Parameters

Query string parameters can be applied to the preview SVG by adding the parameters to the browser address bar e.g.

```
http://localhost:9000/?param1=doof&param2=boof&param3=woof
```

You can clear browser params using the following:

```
http://localhost:9000/?clear
```

## License

Apache-2.0 © [Amplience](http://amplience.com/)
