<template>
  <div class="leftContainer">
    <div id="cityNameBox">
      <div class="cityName">
        <p>{{ cityName }}</p>
        <p>{{ currentTime }}</p>
      </div>
    </div>
    <div id="contentsBox">
      <div class="buttonBox">
        <div class="buttonBackground">
          <button class="forecast">Forecast</button>
          <button class="airquality">Air Quality</button>
        </div>
      </div>
      <div class="weatherBox">
        <div class="weatherDegree">
          <p>{{Math.round(currentTemp)}}&deg;</p>
        </div>
        <div class="weatherIcon">
          <img src="~/assets/images/43.png" alt="MainLogo"/>
        </div>
        <div class="weatherData">
          <div v-for="Temporary in TemporaryData" :key="Temporary.title" class="detailData">
            <p>{{ Temporary.title }}</p>
            <p>{{ Temporary.value }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="todayWeather">
      <div class="textBox">
        <p>시간대별 날씨 정보</p>
        <p>이번주 날씨 정보</p>
      </div>
      <div class="timelyWeatherBox">
      <div class="timelyWeather" v-for="(temp, index) in arrayTemps" :key="index">
        <div class="icon">
          <img src="~/assets/images/29.png" alt="">
        </div>
        <div class="data">
          <p class="time">{{ Unix_timestamp(temp.dt)}}</p>
          <p class="currentDegree">{{ temp.temp }}&deg;</p>
          <div>
            <img src="~/assets/images/drop.png" alt=""/>
            <p class="fall">{{ temp.humidity }}%</p>
          </div>
        </div>
      </div>
    </div>
    </div>

    <nav>
      <i class="fa-solid fa-house"></i>
      <i class="fa-solid fa-location-dot"></i>
      <i class="fa-solid fa-chart-line"></i>
      <i class="fa-solid fa-gear"></i>
    </nav>
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import "dayjs/locale/ko";
dayjs.locale("ko"); // global로 한국이 locale 사용

export default {
  data(){
    return {
      // 현재 시간을 나타내기 위한 Dayjs 플러그인 사용
      currentTime : dayjs().format("YYYY. MM. DD. ddd"),
      // 상세 날씨 데이터를 받아주는 데이터 할당
      currentTemp: [],
      arrayTemps: [],
      icons: [],
      cityName: "",
      

      // 임시 데이터
      TemporaryData:[
        {
          title:"습도",
          value:""
        },
        {
          title:"풍속",
          value:""
        },
        {
          title:"체감온도",
          value:""
        },
      ]
    }
  },
  created(){
    // 초기데이터 선언을 위한 코드 작성
    // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={API key}
    const API_KEY = "303b21dafb83e6b358335588ebd96514";
    let initialLat = 37.5683;
    let initialLon = 126.9778;

    axios
    .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${initialLat}&lon=${initialLon}&appid=${API_KEY}&units=metric`)
    .then(response => {
      // console.log(response);
      let initialCityName = response.data.timezone;
      this.cityName = initialCityName.split("/")[1]; // ['aisa', 'seoul']
      let initialCurrentWeatherData = response.data.current;

      this.currentTemp= initialCurrentWeatherData.temp; // 현재 시간에 따른 현재 온도
      
      this.TemporaryData[0].value = initialCurrentWeatherData.humidity + "%"; // 습도
      this.TemporaryData[1].value = initialCurrentWeatherData.wind_speed + "m/s"; // 풍속
      this.TemporaryData[2].value = Math.round(initialCurrentWeatherData.feels_like) + "도"; // 체감온도

      // 시간대별 날씨 데이터 (24시간 이내의 데이터만 활용할 것이기 때문에 for문을 활용)
      for(let i=0; i <24; i++){
        this.arrayTemps[i] = response.data.hourly[i];
      }
    })
    .catch(error => {
      // console.log(error);
    })
  },
  methods: {
    // 타임 스탬프로 변환
    Unix_timestamp(dt){
      let data = new Date(dt * 1000);
      let hour = "0" + data.getHours();
      return hour.substr(-2) + "시";
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

  .leftContainer{
    width:350px;
    height:700px;
    border-radius:50px;
    background:linear-gradient(#16455f, #0e1239);
    box-shadow:5px 5px 10px gray;

    #cityNameBox{
      width:100%;
      height:10%;

      .cityName{
        @include c-center;
        width:100%;
        height:100%;

        p{
          color:white;
          font-family:"Popins", sans-serif;
          line-height:2.5;
          text-align:center;

          &:first-child{
            width:241px;
            height:33px;
            font-size:1.35rem;
          }

          &:last-child{
            width:160px;
            height:19px;
            font-size:0.9rem;
            font-weight:100;
          }
        }
      }
    }

    #contentsBox{
      width:100%;
      height:62.5%;

      .buttonBox{
        @include center;
        width:100%;
        height:20%;

        .buttonBackground{
          display:flex;
          width:224px;
          height:35px;
          background-color:#052137;
          border-radius:10px;

          button{
            width:112px;
            height:35px;
            border:0;
            border-radius:7.5px;
            outline:0;
            cursor:pointer;

            &:first-child{
              background-color:#0889ff;
              color:white;
            }

            &.airquality{
              background:transparent;
              color:#467599;
            }
          }
        }
      }

      .weatherBox{
        width:100%;
        height:80%;

        .weatherDegree{
          @include center;
          width:100%;
          height:15%;

          p {
            font-size:3.5rem;
            font-weight:500;
            font-family:'Be Vietnam Pro', sans-serif;
            color:white;
          }
        }

        .weatherIcon{
          @include center;
          width:100%;
          height:60%;

          img{
            width:168px;
            height:160px;
          }
        }

        .weatherData{
            display:flex;
            width:100%;
            height:25%;

            .detailData{
              @include c-center;
              width:33.33%;
              height:100%;
              /* 레이아웃이 3개이기 때문에 동일한 레이아웃을 반복시킴을 알 수 있다. */

              &:nth-child(1){
                margin-left:10px;
              }
              &:nth-child(2){
                margin-left:0 -10px;
              }
              &:nth-child(3){
                margin-left:10px;
              }

              p{
                line-height:1.5;
                color:white;

                &:first-child{
                  font-size:1rem;
                  font-weight:300;
                  font-family:'Noto Sans KR', sans-serif;
                  color:#799ed8;
                }

                &:last-child{
                  font-size:1rem;
                  font-weight:200;
                  font-family:'Popins', sans-serif;
                }
              }
            }
          }
      }
    }

    #todayWeather{
      width:100%;
      height:17.5%;

      .textBox{
        @include center-sb;
        width:calc(100% - 70px);
        height:35%;
        margin:0 35px;
        font-family:'Noto Sans KR', sans-serif;

        p{
          font-size:0.8rem;
          font-weight:400;
          color:white;
          text-align:center;

          &:last-child{
            font-weight:400;
            font-size:0.8rem;
            color:#0085ff;
            cursor:pointer;
            margin-bottom:2px;
          }
        }
      }

      .timelyWeatherBox{
        display:flex;
        align-items:center;
        width:calc(100% - 70px);
        height:65%;
        padding:0 30px;
        overflow-x: scroll;

        -ms-overflow-style: none; // IE and Edge
        scrollbar-width: none; // Firefox
        &::-webkit-scrollbar{
          // Chrome, Safari, Opera
          display:none;
        }

        .timelyWeather{
          display:flex;
          min-width:126px;
          height:60px;
          background-color:#0989ff;
          border-radius:20px;
          margin-left:15px;

          &:first-child{
            margin-left:0;
          }

          .icon{
            @include center;
            width:40%;
            height:100%;
            padding-left:10%;

            img{
              width:100%;
            }
          }

          .data{
            @include c-start-c;
            width:55%;
            height:100%;
            padding-left: 5%;

            p{
              color:whitesmoke;
              font-family:'Popins', sans-serif;
              text-align:center;
              margin-top: 4px;

              &.time{
                margin-top:0;
                font-size:0.8rem;
                font-weight:200;

                &.currentDegree{
                  font-size:1.2rem;
                  margin-top:7.5px;
                }
              }
            }

            div{
              @include center;
              height:25%;

              img{
                height:100%;
              }

              .fall{
                font-size:0.9rem;
              }
            }
          }
        }
      }
    }

    nav{
      @include center-sb;
      width:calc(100% - 100px);
      height:10%;
      padding:0 50px;

      i{
        color:rgba(255,255,255);
        font-size:1.15rem;
        cursor:pointer;
        transition:all 0.2s ease;

        &:hover{
          color:#799ed0;
        }
      }
    }
  }
</style>
