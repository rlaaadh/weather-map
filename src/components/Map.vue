<template>
  <div id="mapContainer">
    <div id="map"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    // const API_KEY = '303b21dafb83e6b358335588ebd96514';

    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}`;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const mapContainer = document.getElementById('map'); // 지도를 표시할 div
      const mapOption = {
        center: new kakao.maps.LatLng(36.73035, 127.967487), // 지도의 중심좌표
        level: 13, // 지도의 확대 레벨
      };
      const map = new kakao.maps.Map(mapContainer, mapOption);
      const positions = [
        {
          "label": "서울",
          "latlng": [37.5683, 126.9778],
          "cityName": "Seoul"
        },
        {
          "label": "인천",
          "latlng": [37.40864282648822, 126.65071862847725],
          "cityName": "Incheon"
        },
        {
          "label": "수원",
          "latlng": [37.2911, 127.0089],
          "cityName": "Suwon"
        },
        {
          "label": "대전",
          "latlng": [36.3519957815787, 127.39131469478555],
          "cityName": "Daejeon"
        },
        {
          "label": "태백",
          "latlng": [37.15818414766273, 128.928560966107],
          "cityName": "Taebaek"
        },
        {
          "label": "강릉",
          "latlng": [37.791688035246636, 128.82867301427635],
          "cityName": "Gangneung"
        },
        {
          "label": "대구",
          "latlng": [35.871148697228875, 128.61345034272617],
          "cityName": "Daegu"
        },
        {
          "label": "울산",
          "latlng": [35.5372, 129.3167],
          "cityName": "Ulsan"
        },
        {
          "label": "부산",
          "latlng": [35.185997613083536, 129.0662809358643],
          "cityName": "Busan"
        },
        {
          "label": "전주",
          "latlng": [35.90493196781132, 127.17357575637105],
          "cityName": "Jeonju"
        },
        {
          "label": "광주",
          "latlng": [35.166611792579545, 126.84603104436039],
          "cityName": "Gwangju"
        },
        {
          "label": "목포",
          "latlng": [34.823630139082525, 126.39766650967137],
          "cityName": "Mokpo"
        },
        {
          "label": "제주도",
          "latlng": [33.5097, 126.5219],
          "cityName": "Jeju"
        }
      ];

      // 마커를 생성합니다.
      positions.forEach((pos) => {
        const marker = new kakao.maps.Marker({
          position: pos.latlng, // 마커의 위치
        });
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
        kakao.maps.event.addListener(marker, 'click', () => {
          // 클릭한 위도, 경도 정보를 가져옵니다
          // watch로 따로 빼지 않고, 직접 할당
          this.$store.commit('openWeatherApi/SET_CITYNAME', pos.cityName);
          this.$store.commit('openWeatherApi/SET_LATLON', marker.getPosition());
          this.$store.dispatch('openWeatherApi/FETCH_OPENWEATHER_API');
        });
        // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
        // marker.setMap(null);
      });
    },
  },
  create(){
    // 초기 데이터 선언을 위한 코드 작성
    const API_KEY = "303b21dafb83e6b358335588ebd96514";
    let initialLat = 36.5683;
    let initialLon = 126.9778;

    // get() 메서드를 통해서 우리가 필요로하는 API 데이터를 호출한다.
    axios.get( `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}`)
    .then(response => {
      console.log(response);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

#mapContainer{
  @include center;
  width: 100%;
  height: 35%;

  #map{
    width: 80%;
    height: 90%;
    border-radius:10px;
  }
}
</style>
