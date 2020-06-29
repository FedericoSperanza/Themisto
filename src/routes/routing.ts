const express = require('express');
const puppeteer = require('puppeteer');


class Router{
    app = express();

    constructor(){
        this.app.post('/scrapSearch',this.scrapSearch)
        
    }

    async scrapSearch(req:any,res:any){
        let search = req.body.searchString;
        console.log("Search:", req.body.searchString)
        await initPuppeteer(search).then((list) => {
          res.json(list)
         
        },(err:any) => {
          res.status(500).json({
            error:'Error Puppeter Searching'
          })
        });

    }

  
}

async function initPuppeteer(wordSearch: string){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.amazon.com/s/?field-keywords=${wordSearch}`);
    let CompleteProducts : string[];
    console.log("Metodo 1, ej silla por default")
    CompleteProducts = await page.evaluate (() =>
  Array.from(document.querySelectorAll("div.sg-col-4-of-12:nth-of-type(n+4) div.sg-col-inner"))
  .map((compact,index) =>({
    title: compact.querySelector('span.a-size-base-plus')?.innerHTML.trim(),
    category: document.querySelectorAll("span.a-size-base.a-color-base")[1].innerHTML.trim(),
    price: compact.querySelector('span.a-price-whole')?.innerHTML.trim().split('<')[0],
    antprecio: (compact.querySelector('.a-text-price span[aria-hidden]')?.innerHTML.trim())?.replace(/(^.+)(\w\d+\w)(.+$)/i,'$2'),
    sku:  document.querySelector( "div[data-index='"+index+"']")?.getAttribute("data-asin"),
    searchQuery: document.querySelector("title")?.innerHTML.trim().split(': ')[1]
  })
   )
  )
  if (!CompleteProducts.length){
    try{
    let index = 3;
    console.log(" es 0 voy por Metodo 2, ej impresora")
    CompleteProducts = await page.evaluate(() =>
    Array.from(document.querySelectorAll("div.s-result-item:nth-of-type(n+2) > div"))
    .map((products,index) =>({
      
      title: products.querySelector('span.a-size-medium')?.innerHTML.trim() , 
      category: document.querySelectorAll("span.a-size-base.a-color-base")[1].innerHTML.trim(),
      price: products.querySelector('span.a-price-whole')?.innerHTML.trim().split('<')[0] ,  
      //antprice: (products.querySelector('span.a-text-price')?.innerHTML.trim())?.replace(/(^.+)(\w\d+\w)(.+$)/i,'$2'),
      //antprice: (products.querySelector('span.a-offscreen')?.innerHTML.trim())?.replace(/(^.+)(\w\d+\w)(.+$)/i,'$2'),
      antprice: products.querySelector("span.a-price.a-text-price [aria-hidden]")?.innerHTML.trim(),
      sku:  document.querySelector( "div[data-index='"+index+"']")?.getAttribute("data-asin"),
      searchQuery: document.querySelector("title")?.innerHTML.trim().split(': ')[1]

      })
    )
    )
  }catch(e){
    console.log("error: ",e)
  }
  }
  console.log("Completo  ", CompleteProducts)
  console.log("Completo LENGTH ", CompleteProducts.length)

  await browser.close();
  
  return CompleteProducts;
  }

  module.exports = new Router().app

