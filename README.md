# atomilog

[![npm](https://badgen.net/npm/v/atomilog)](https://www.npmjs.com/package/atomilog)
[![Build Status](https://travis-ci.org/therockstorm/atomilog.svg?branch=master)](https://travis-ci.org/therockstorm/atomilog)
[![MIT License](https://badgen.net/github/license/therockstorm/atomilog)](https://github.com/therockstorm/atomilog/blob/master/LICENSE)
[![Package Size](https://badgen.net/bundlephobia/minzip/atomilog)](https://bundlephobia.com/result?p=atomilog)

Tiny typed logging library, optimized for AWS Lambda.

## Installing

```shell
npm install atomilog --save
```

## Usage

```javascript
import { Atomilog } from "atomilog"

// Create log
const log = new Atomilog({
  options: {
    prettify: true, // Pretty print logs for use in development
  },
  // Fields logged in each message
  fields: {
    some: "value",
  },
})

log.debug("Hello, debug.")

// Add new fields logged in each message
log.addFields({ requestId: "my-id" })

log.info("Hello, info.", { different: { nested: "value " } })
log.warn("Hello, warn.")
log.error("Hello, error.", new Error("boom"))
```

## Developing

- Run tests, `npm test`

## License

MIT © [Rocky Warren](https://www.rocky.dev)
