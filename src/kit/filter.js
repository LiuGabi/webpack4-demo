// 过滤器

Date.prototype.format = function(format) {
	var date = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S+": this.getMilliseconds()
	};

	if (/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}

	for (var k in date) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
		}
	}
	
	return format;
}

let filter = {}

filter.install = function (Vue) {
	/** 时间格式化 **/
	Vue.filter('dateFormat01', function(value) {
		if(!value) { return ''; }

	    let time = new Date(parseInt(value))	    
	    return time.format('yyyy-MM-dd hh:mm')

	});

	Vue.filter('dateFormat02', function(value) {
		if(!value) { return ''; }
		
	    let time = new Date(parseInt(value))	    
	    return time.format('yyyy-MM-dd')

	});

	Vue.filter('dateFormat03', function(value) {
		if(!value) { return ''; }
		
	    let time = new Date(parseInt(value))	    
	    return time.format('yyyy.MM.dd')

	});

    Vue.filter('dateFormat04', function(value) {
        if(!value) { return ''; }

        let time = new Date(parseInt(value))
        return time.format('yyyy-MM')

    });
}

export default filter;