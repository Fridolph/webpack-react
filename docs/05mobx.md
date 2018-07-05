flux实现的后起之秀，其以更简单的使用和更少地概念，让flux使用起来变得更加简单。

相比redux有mutation、action、dispatch等概念，mobx则更符合一个store增删改查的操作概念。

```js
/* mobx */
import {observable, action} from 'mobx'

const mobxStore = observable({
  count: 0,
  add: action(function(num) {
    this.count += num
  })
})
// use
mobxStore.add(1)
```
