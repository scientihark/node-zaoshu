var func = function (obj){
    return obj instanceof Array || toString.call(obj) == "[object Array]";
}

module.exports = func;
