// 判断是否为空
export function isEmpty(value) {
	if(value === null || value === undefined || value === NaN|| value === "undefined" || value === "" || value.length === 0 || value === false) {
		return true;
	}
	if (typeof value === "object") {
		for(let key in value) {
			return false;
		}
		return true;
	}
	return false;
}
// 存取删 localStorage 的 key 值
export function getKeyValue(key) {
	let keyValue = localStorage.getItem(key);
	let myValue = keyValue === null || keyValue === undefined || keyValue === "undefined" || keyValue === "" || keyValue.length < 2 ? false : JSON.parse(keyValue);
	return myValue;
}
export function setKeyValue(key, value) {
	let myKey = isEmpty(key) ? false : key;
	let myValue = isEmpty(value) ? false : value;
	
	if(myKey && myValue) {
		localStorage.setItem(myKey, JSON.stringify(myValue));
	}
}
export function deleteKeyValue(key) {

	let myValue = getKeyValue(key);

	if(myValue) {
		localStorage.removeItem(key);
	}
}

//获取当前时间
export function getTimestamp() {
    return parseInt(new Date().getTime()) + '';
};
// 验证手机号
export function verifyPhone(phone) {

	if(isEmpty(phone)) { return true; }
	
	let reg = /^1[0123456789]\d{9}$/;
	let isPhone = reg.test(phone);

	return isPhone;
}

// 身份证号
export function isIdCard(id) {
	if(isEmpty(id)) { return false; }
	let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	
	if(reg.test(id) === true) {
		return true;
	} else {
		return false;
	}
}

// 判断是否有该角色
export function hasRole(roleName) {
	let arr = getKeyValue('roles') ? getKeyValue('roles') : [];
	for(let i in arr) {
		if (arr[i] === roleName) {
			return true;
		}
	}
	return false;
}

// 清除登陆缓存
export function clearLoginCache() {
	let loginConfig = ['accesstoken', 'userId','username', 'permissions', 'roles', 'crm-source'];

	for(let i in loginConfig) {
		localStorage.removeItem(loginConfig[i]);
	}
}

/** 列表分页 **/
export function	handlePageChange($event, argumentsObject, argumentsName, functionName) {
	this[argumentsObject][argumentsName] = $event;
	this[functionName]();
}