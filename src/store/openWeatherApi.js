import axios from "axios";

export default {
  // namespaced : 하나씩 store에서 모듈화하여 사용될 수 있음을 명시적으로 나타내는 개념
  namespaced: true,
  // state : 실제로 취급해야하는 데이터
  state: {
    cityName: "Seoul",
    currentWeather: {
      // MainView.vue에서 사용
      currentTemp: 0,
      currentHumidity: 0,
      currentWindSpped: 0,
      currentFeelsLike: 0,

      // Subview.vue에서 사용
      currentSunrise: 0,
      currentSunset: 0,
      currentVisibility: 0,
    },
    hourlyWeather: [],
    images: [],
  },
  // getters: 계산된 상태의 데이터를 만들어내는 속성이다.
  // computed와 유사한 기능을 한다.
  getters: {},
  // mutations, actions: methods와 유사한 기능을 가지고 있다.
  // 1. mutations : 변이 메서드 , 우리가 관리하는 데이터(state)를 변경시켜줄 수 있다.
  // 즉, state 안의 데이터는 오로지 mutations에서만 데이터를 변경시킬 수 있다.
  mutations: {},

  // 2. actions : 특정한 데이터를 직접적으로 수정하는 것이 허용되지 않는다.
  // 위 사항이 가장 주의해야 할 사항이고, 비동기로 동작한다는 점도 유의하자.
  actions: {
    // context라는 객체 데이터를 호출하여, context를 참조하여 데이터를 불러온다.
    //  context 안에는 state, getters, mutations를 활용할 수 있는 내용이 들어있다.
    // mutations를 호출하기 위해서는 context.mutations가 아니라 context.commit("뮤테이션 이름", payload) 형식으로 호출해야한다.
    //  객체 구조분해하여 불러올 수도 있다.

    // OPENWEATHERAPI 데이터 호출
    async FETCH_OPENWEATHER_API(context) {
      // context : 매개변수 전달 

      // 초기데이터 선언을 위한 코드 작성
      // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={API key}
      const API_KEY = "303b21dafb83e6b358335588ebd96514";
      let initialLat = 37.5683;
      let initialLon = 126.9778;

      try{
        const res = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${initialLat}&lon=${initialLon}&appid=${API_KEY}&units=metric`
        );
        const images = new Array();
        for(let i = 0; i < 48; i++){
          const weatherIcon = res.data.hourly[i].weather[0].icon;
          images[i] = `src/images/${weatherIcon}.png`;
        }
      } catch(error){
        console.log(error);
      }
    },
  },
}
