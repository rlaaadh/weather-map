<template>
  <div class="leftContainer">
    <div id="cityNameBox">
      <div class="cityName">
        <p>San Fransisco</p>
        <p>Jan 28</p>
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
          <p>10&deg;</p>
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
      <div class="timelyWeather">
        <div class="icon">
          <img src="~/assets/images/29.png" alt="">
        </div>
        <div class="data">
          <p class="time">2pm</p>
          <p class="currentDegree">32&deg;</p>
          <div>
            <img src="~/assets/images/drop.png" alt=""/>
            <p class="fall">15%</p>
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
export default {
  data(){
    return {
      // 임시 데이터
      TemporaryData:[
        {
          'title':'습도',
          'value':'88%'
        },
        {
          'title':'풍속',
          'value':'10m/s'
        },
        {
          'title':'풍향',
          'value':'WS'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

  .leftContainer{
    width:324px;
    height:700px;
    border-radius:50px;
    background:linear-gradient(#16455f), #0e1239;
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

        .timelyWeather{
          display:flex;
          width:126px;
          height:70px;
          background-color:#0989ff;
          border-radius:20px;

          .icon{
            @include center;
            width:45%;
            height:100%;

            img{
              width:100%;
            }
          }

          .data{
            @include c-center-se;
            width:55%;
            height:100%;

            p{
              color:whitesmoke;
              font-family:'Popins', sans-serif;
              text-align:center;

              &.time{
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
              width:100%;
              height:33.33%;

              img{
                height:55%;
              }

              .fall{
                font-size:0.9rem;
                margin-top:1.5px;
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
