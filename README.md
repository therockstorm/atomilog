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
import { addFields, debug, error, info, warn } from "atomilog"
import { name } from "./package.json"

// Add fields logged in each message
addFields({ project: name, prettify: true })

debug("Hello, debug.")
info("Hello, info.", { some: { nested: "value " } })
warn("Hello, warn.", { different: "value" })
error("Hello, error.", new Error("boom"))
```

## Developing

- Run tests, `npm test`

## License

MIT © [Rocky Warren](https://www.rocky.dev)
