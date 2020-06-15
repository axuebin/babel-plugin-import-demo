# babel-plugin-import-demo

## Example

#### `{ "libraryName": "antd", style: true }`

```javascript
import { Button } from 'antd';
ReactDOM.render(<Button>xxxx</Button>);

      ↓ ↓ ↓ ↓ ↓ ↓

var _button = require('antd/lib/button');
require('antd/lib/button/style');
ReactDOM.render(<_button>xxxx</_button>);
```

### options

`options` can be object.

```javascript
{
  "libraryName": "antd",
  "libraryDirectory": "lib",
  "style": true,
}
```

#### style

`["import", { "libraryName": "antd", "style": true }]`

import js and css modularly (LESS/Sass source files)
```