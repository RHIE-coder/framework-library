function regClick(id, callback) {
    document.getElementById(id).addEventListener("click", callback)
}

const baseURL = "http://localhost:5000"

regClick("index", ()=> {
    console.log("자바스크립트 정상 동작 확인");
    alert("자바스크립트 정상 동작 확인");
});

regClick("1", async ()=> {
    const res = await fetch(baseURL+"/1", {
        method: "GET",
        mode:"cors",
    })

    console.log(await res.text())
})

regClick("2", async()=> {
    const res = await fetch(baseURL+"/micro/2", {
        method: "GET",
        mode:"cors",
    })

    console.log(await res.text()) 
})

regClick("3", async()=> {
    const res = await fetch(baseURL+"/api/v1/3", {
        method: "GET",
        mode:"cors",
    })

    console.log(await res.text()) 
})

regClick("4", async()=> {
    const res = await fetch(baseURL+"/api/v1/4", {
        method: "GET",
        mode:"cors",
    })

    console.log(await res.text()) 
})

regClick("5", async()=> {
    const res = await fetch(baseURL+"/admin/5", {
        method: "GET",
        mode:"cors",
    })

    console.log(await res.text())  
})

regClick("6", async()=> {
    const res = await fetch(baseURL+"/admin/6/111", {
        method: "GET",
        mode:"cors",
    })

    console.log(await res.text()) 
})


regClick("7", async()=> {
    const res = await fetch("/7", {
        method: "GET",
        mode:"cors",
    })

    console.log(await res.json())  
})


regClick("8", async()=> {
    const res = await fetch(baseURL+"/8", {
                    method: "POST",
                    mode:"cors",
                })
    console.log(await res.text())
})


regClick("9", async()=> {
    const res = await fetch(baseURL+"/9", {
                    method: "OPTIONS",
                    mode:"cors",
                })
    console.log(await res.text()) 
})


regClick("10", async()=> {
    const res = await fetch(baseURL+"/10", {
                    method: "POST",
                    mode:"cors",
                })
    console.log(await res.text())  
})


regClick("11", async()=> {

    const cred = "john:doe";
    const base64 = btoa(cred)
    console.log(base64)

    const res = await fetch(baseURL+"/10", {
                    method: "POST",
                    mode:"cors",
                    headers: {
                        Realm: "member",
                        Authorization: "Basic "+base64,
                    },
                    body: JSON.stringify({
                        username:"admin",
                        password:"123456",
                    }),
                })
    console.log(await res.text())  
})


regClick("12", async()=> {
    const res = await fetch(baseURL+"/12", {
                method: "POST",
                mode:"cors",
                headers: {
                    Authorization: "Basic "+btoa("john:doe"),
                    // "Cache-Control": "no-cache"
                },
            }) 

    console.log(await res.text())  
})


regClick("13", async()=> {
    
})


regClick("14", async()=> {
    
})

regClick("15", async()=> {
    
})


regClick("16", async()=> {
    
})


regClick("17", async()=> {
    
})


regClick("18", async()=> {
    
})


regClick("19", async()=> {
    
})


regClick("20", async()=> {
    
})


regClick("21", async()=> {
    
})

regClick("22", async()=> {
    
})


regClick("23", async()=> {
    
})


regClick("24", async()=> {
    
})


regClick("25", async()=> {
    
})
