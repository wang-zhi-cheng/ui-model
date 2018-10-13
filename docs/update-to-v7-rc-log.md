## Background

from v6.1.9 update to next(v7 rc).

This project was created at Dec 31, 2016 and there are 535 commits till now.

## 17:13 try to update

`ng update @angular/core @angular/cli —next`

> Package "tsickle" has an incompatible peer dependency to "typescript" (requires "git://github.com/mprobst/TypeScript.git#5456479a4a", would install "3.1.3").

## Remove dependency `tsickle`

`npm run build`

Size

```
-rw-r--r--  1 twcn  staff   238K Oct 13 17:17 dist/ui-model/4.7a32026073940d376728.js
-rw-r--r--  1 twcn  staff   1.7M Oct 13 17:17 dist/ui-model/main.ce98372aa6c3ff41e154.js
-rw-r--r--  1 twcn  staff    58K Oct 13 17:17 dist/ui-model/polyfills.490b157ce793f8037537.js
-rw-r--r--  1 twcn  staff   2.2K Oct 13 17:17 dist/ui-model/runtime.a8b0741caafa76a303b9.js
```

## 17:20 try to update 

`ng update @angular/core @angular/cli —next`

> Package "ng-packagr" has an incompatible peer dependency to "typescript" (requires "^2.7.0 || ~3.0.1", would install "3.1.3").
> Incompatible peer dependencies found. See above.

`npm i -D typescript@~3.1.3`

## 17:23 try to update

`ng update @angular/core @angular/cli —next`

`npm run build`

There was an error that was not related to Angular, probably due to a more stringent check due to the TypeScript upgrade. Fix it.

`npm run build`

## 17:25 success

Size

-rw-r--r--  1 twcn  staff   239K Oct 13 17:25 dist/ui-model/4.05145f97e6f5ebaa2e3d.js
-rw-r--r--  1 twcn  staff   1.7M Oct 13 17:25 dist/ui-model/main.0e54b578cc11aa0cfc94.js
-rw-r--r--  1 twcn  staff    37K Oct 13 17:25 dist/ui-model/polyfills.d8592e32ebd437373604.js
-rw-r--r--  1 twcn  staff   2.2K Oct 13 17:25 dist/ui-model/runtime.54761ce729c82f1d395b.js

Conclusion: There were no significant changes other than polyfills.

## Review

There is a code that references the Renderer, but no DEPRECATED hints are found at compile time. It works fine after manual correction.

## 17:33 Test It

Automated testing is one-off (but the test coverage associated with component DOM in this project is not high).

Manual sampling verification passed.

## Write this Document

