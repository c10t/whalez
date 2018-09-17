# Angular Universal

## Why Universal?

- Facilitate web crawlers (SEO)
- Support low-bandwidth or low-power devices
- Fast first page load


## installing tools

```
npm install --save ts-loader \
@angular/platform-server \
@nguniversal/module-map-ngfactory-loader \
@nguniversal/express-engine
```

## build

`npm run build:ssr`

## Serve

`npm run serve:ssr`
