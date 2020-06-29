const Express = require('express')
class App{

  app = Express();
  port: number = 4000;
 
  constructor(){
      this.app.use(require('body-parser').json())
      this.app.use(require('body-parser').urlencoded({ extended: true }));
      this.routes()
      this.app.listen(process.env.PORT || this.port,() => {
          console.log(`Listening Port ${this.port || process.env.PORT } *Themisto*`)
      })
  }
  routes(){
    this.app.use(require('./routes/routing'))
}

}

new App();































