import {createRouter, createWebHashHistory} from 'vue-router';
import Home from '~/pages/Home';

export default createRouter({
  // hash 모드 : 특정 페이지에서 새고로침을 했을 때, '페이지를 찾을 수 없음'과 같은 메세지 알림을 방지
  history: createWebHashHistory(),

  // pages: page를 구분하는 개념
  routes: [
    {
      // 페이지 경로
      path: '/',
      name: Home,
      component: Home,
    }
  ]
})
