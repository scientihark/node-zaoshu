# simple node SDK for zaoshu.io

###

simple usage

```

var zaoshu = require('zaoshu');

zaoshu.user.auth('YOUR APP KEY','YOUR APP SECRET');

zaoshu.instances.list('all',function(err,data){
	
	// console.log(data)

})


zaoshu.instances.list(status,callback)
zaoshu.instances.detail(id,callback)
zaoshu.instances.updateTitle(id,newTitle,callback)
zaoshu.instances.setHook(id,hookUrl,callback)
zaoshu.instances.run(id,config,hookUrl,callback)

zaoshu.task.list(instanceId,callback)
zaoshu.task.detail(instanceId,taskId,callback)

zaoshu.user.account(callback)
zaoshu.user.usage(callback)
zaoshu.user.auth(key,secret)


```
