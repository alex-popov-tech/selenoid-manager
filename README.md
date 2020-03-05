[![NPM Version](https://badge.fury.io/js/selenoid.svg)](https://badge.fury.io/js/selenoid)
![NPM Downloads Per Month](https://img.shields.io/npm/dm/selenoid.svg)
[![Join the chat at https://t.me/js_for_testing](https://img.shields.io/badge/join%20chat-telegram-blue.svg)](https://t.me/js_for_testing)

# Selenoid

Selenoid and browser drivers for your Selenium tests.

## Getting Started

`npm install -g selenoid`

## Downloading latest binaries

`selenoid update`

## Start selenoid

`selenoid start`

## FAQ

#### What is Selenoid ?

[Selenoid](https://aerokube.com/selenoid/) is a much better replacement for [Selenium server](https://www.selenium.dev/documentation/en/grid/).

#### So this is Selenoid in NodeJS ?

No. This is more like selenoid manager, which helps you to setup and run your local Selenoid in ~15s having just NodeJS installed.

#### I'm using [webdriver-manager](https://www.npmjs.com/package/webdriver-manager) and pretty happy with it, why do I need this package?

1. This package using [Selenoid](https://aerokube.com/selenoid/) instead of [Selenium server](https://www.selenium.dev/documentation/en/grid/) - so all the performance and feature
benefits of Selenoid are only here.
2. You *do not* need Java installed.
3. This project is ~10x time smaller (actually if count only ts/js files ~20x) than [webdriver-manager](https://www.npmjs.com/package/webdriver-manager) (it's about ~200 lines of plain js code).

#### Okay, what exactly this 'manager' is doing ?

1. Downloads latest browser binaries for your platform and arch.
2. Downloads latest Selenoid binary for your platform and arch.
3. Generate Selenoid config for these ^.

And all of that is just as simple as

```
selenoid update
```


## Versioning

We use [npm](https://www.npmjs.com/) for versioning. for the versions available, see the [npm](https://www.npmjs.com/package/selenoid#versions) or github [releases](https://github.com/alex-popov-tech/selenoid/releases).

See the [CHANGELOG](CHANGELOG.md) for details of all further development details and changes.


## License

This project is licensed under the MIT - see the [LICENSE](LICENSE.md) file for details.

