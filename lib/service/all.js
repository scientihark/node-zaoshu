var ACM = require('./ACM');

module.exports = {
	ACM:ACM,
	instances:{
		list:function(status,callback) {
			ACM.request('/instances','GET',{
				status:status||'all'
			},'',callback)
		},
		detail:function(id,callback) {
			if(!id){
				callback(true,{code:-1,message:'empty instance id'});
				return;
			}
			ACM.request('/instances/'+id,'GET',{
				status:status
			},'',callback)
		},
		updateTitle:function(id,newTitle,callback){
			if(!id){
				callback(true,{code:-1,message:'empty instance id'});
				return;
			}
			if(!newTitle){
				callback(true,{code:-1,message:'empty new title'});
				return;
			}
			ACM.request('/instances/'+id,'PATCH',{
				title:newTitle
			},'',callback)
		},
		setHook:function(id,hookUrl,callback){
			if(!id){
				callback(true,{code:-1,message:'empty instance id'});
				return;
			}
			if(!hookUrl){
				callback(true,{code:-1,message:'empty hookUrl'});
				return;
			}
			ACM.request('/instances/'+id,'PATCH',{
				result_notify_uri:hookUrl
			},'',callback)
		},
		run:function(id,config,hookUrl,callback){
			var option = {};
			if(hookUrl){
				option.result_notify_uri = hookUrl;
			}
			if(config){
				var configs = [];
				for(var key in config){
					var obj = {};
					obj[key] = config[key];
					configs.push(obj)
				}
				option.target_sources = JSON.stringify(configs);
			}
			ACM.request('/instances/'+id,'POST',option,'',callback)
		}
	},
	task:{
		list:function(instanceId,callback) {
			ACM.request('/instances/'+instanceId+'/tasks','GET',{},'',callback)
		},
		detail:function(instanceId,taskId,callback) {
			ACM.request('/instances/'+instanceId+'/task/'+taskId,'GET',{},'',callback)
		}
	},
	user:{
		account:function(callback) {
			ACM.request('/user/account','GET',{},'',callback)
		},
		usage:function(callback) {
			ACM.request('/user/wallet','GET',{},'',callback)
		},
		auth:function(key,secret){
			ACM.setAppKey(key,secret);
		}
	}
}