var CryptoJS = require("crypto-js"),
	request = require('request'),
	toQueryString = require('../utils/toQueryString');

var ACM = {
	API_KEY:'',
	API_SEC:'',
	API_ENTRYPOINT:'https://openapi.zaoshu.io/v2',
	setAppKey:function(key,secret) {
		ACM.API_KEY = key;
		ACM.API_SEC = secret;
	},
	sign:function(HTTP_METHOD,ContentType,DateString,SortedQueryString,Body){
		var StringToSign =
			    HTTP_METHOD + "\n" +
			    ContentType + "\n" +
			    DateString + "\n" +
			    SortedQueryString + "\n" +
			    Body;
		return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(StringToSign,ACM.API_SEC));
	},
	getSortedQueryString:function(object){
		// Query Stringify
		var querys = [],
			sortedQueryString = [];
		for( var key in object){
			querys.push({
				key:key,
				val:object[key] || ''
			})
		}

		// sort
		querys.sort(function(a,b){
			return a.key > b.key
		})
		querys.forEach(function(query){
			sortedQueryString.push(query.key+'='+query.val)
		})
		return sortedQueryString.join('\n')
	},
	request:function(API,method,queryObject,body,callback){
		var date = new Date().toUTCString(),
			queryString = toQueryString(queryObject),
			option = {
				url: ACM.API_ENTRYPOINT + API + (queryString?('?'+queryString):''),
				headers: {
					'Content-Type':'application/json; charset=utf-8',
					'Date':date,
					Authorization:'ZAOSHU '+ ACM.API_KEY+':'+ACM.sign(
							method.toUpperCase(),
							'application/json; charset=utf-8',
							date,
							ACM.getSortedQueryString(queryObject),
							body
					)
				},
				method:method,
				body:body
			}
		request(option,function (err,res,resBody){
			if(err){
				ACM.errorHandler(err,res,resBody,callback);
				return;
			}
			try{
				resBody = JSON.parse(resBody)
			}catch(e){}
			callback(err,resBody)
		});
	},
	errorHandler:function(err,res,body,callback){
		callback(true,body)
	}
}


module.exports = ACM;