import html from './index.html';
import {mapActions} from 'vuex';

export default {
	template: html,
	data() {
		return {
			loginData: {
				username: '',
				password: '',
				grant_type: 'password',
				client_id: 'agent'
			},
			loginDataRules: {
				username: [{
					required: true, message: '请输入用户名', trigger: 'blur'
				}],
				password: [{
					required: true, message: '请输入密码', trigger: 'blur'
				}]
			},
			time: 30,
			loading: false
		}
	},
	methods: {
		...mapActions(['LOGIN']),
		submit(form) {
			this.$refs[form].validate(valid => {
				/** 调用登陆接口 **/
				if (valid) {
					this.loading = true;

					this.LOGIN({body: this.loginData, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
						this.loading = false;
						if (res === 'Success') {
				      		this.$router.replace({name: 'home'});
						}
					});
				} else {}
			});
		},
	}
}