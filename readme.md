# Petersen Parts

> Shopify theme development for [Petersen Parts](https://petersenparts.com)

### Shopify API

To set the Shopify API fields, create a file named `gulpfile.js/shopify.json`

```json
{
  "api_key": "",
  "api_password": "",
  "store_url": "domain.myshopify.com"
}
```

### Watch & auto-deploy

```bash
gulp watch
```

### Manually deploy

```bash
gulp deploy
```

### Options

#### --prod

```bash
gulp deploy --prod
```

Deploys to the production store. To use this, instead of `gulpfile.js/shopify.json`, you'll need `shopify-dev.json` and `shopify-prod.json` respectively
