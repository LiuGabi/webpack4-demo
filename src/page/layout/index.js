import html from './index.html';
import {mapActions, mapState} from 'vuex';

export default {
	template: html,
	data() {
		return {
			activeIndex: this.$route.name,

			username: JSON.parse(localStorage.username)
		}
	},
	methods: {
		...mapActions(['LOGOUT']),
		select(index, indexPath) {
			this.activeIndex = index;
		},
		skip(name) {
			this.activeIndex = name;
			this.$router.push({name: name});
		},
		logout() {
			this.$confirm('确定退出吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            	this.LOGOUT();
            	this.$router.replace({name: 'login'});
            }).catch(() => {});
		}
	}
}