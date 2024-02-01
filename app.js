const { createApp } = Vue
const { createVuetify } = Vuetify

const vuetify = createVuetify()

const app = createApp({
    data(){
        return {
          forecast: [],
          city: 'Иркутск',
          now_forecast: [],
          temp_city: 'Иркутск'
        }
      },
      methods:{
        getWeather(){
          if(this.city==='')
            return;
          //по часам
          axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&cnt=8&lang=ru&appid=e9d39c471f77585128f6b7e3d566e76a`).then(
            res => this.forecast = res.data.list);
            this.temp_city = this.city;
            //текущее
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&lang=ru&appid=e9d39c471f77585128f6b7e3d566e76a`).then(res => {
              const temp = res.data;
              this.now_forecast = {
                temp: Math.round(temp.main.temp),
                feels_like: Math.round(temp.main.feels_like),
                description: temp.weather[0].description,
                icon: temp.weather[0].icon,
                wind: temp.wind.speed,
                humidity: temp.main.humidity,
                 //   grnd_level: Math.round(temp.main.grnd_level * 0.75),
              }
          });
        }
      },
      created(){
          this.getWeather();
      }
  })
app.use(vuetify).mount('#app')