# elysia-file-router

File router for Elysia.js inspired by Next.js, Remix, Astro...

## Install

```bash
bun install elysia-file-router
```

## Usage

Import and use the plugin ```fileRouter``` in the Elysia app.

By default the value for ```fileRouter``` is "./routes/".

```js
// src/index.ts
import { Elysia } from "elysia";
import fileRouter from 'elysia-file-router'

const app = new Elysia()
  .use(fileRouter('./routes/'))
  .listen(3000);
```

A simple ```GET``` route:

```js
// src/routes/get.ts
export default function () {
    return {
        hello: 'World'
    }
}
```

Using params (path value):

```js
// src/routes/user/[id]/get.ts
export default function ({params: { id }}) {
    return {
        user_id: id
    }
}
```

The file name specifies the request method
for example a simple POST endpoint:

```js
// src/routes/user/post.ts
export default function () {
    return {
        message: "Creating User"
    }
}
```

## License

MIT