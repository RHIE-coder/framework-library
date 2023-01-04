 - GET base64 First

```js
const image = fs.readFileSync('./winter.jpg');
const base64Image = new Buffer.from(image).toString('base64');
const dataURI = 'data:image/jpeg;base64,' + base64Image
console.log(dataURI);
```

 - Make Text-wrapped Image

```js
route.get("/img/:name/:price", async (req, res) => {

    const name = req.params.name;
    const price = req.params.price;

    const bufHTML = fs.readFileSync("./index.html");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
        width: 427,
        height: 640,
        deviceScaleFactor: 1,
    });            
    let htmlString = bufHTML.toString('utf-8');
    htmlString = htmlString.replace('{{{ NAME }}}', name).replace('{{{ PRICE }}}', price)
    await page.setContent(htmlString);
    const img = await page.screenshot({path: "example.png"});
    await browser.close();
    res.end(img, 'binary');
}) 
```