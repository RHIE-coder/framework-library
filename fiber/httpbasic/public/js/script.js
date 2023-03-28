const baseURL = "http://localhost:5000"

function regClick(id, callback) {
    document.getElementById(id).addEventListener("click", callback)
}

function getReq(url, headers) {
    headers = headers ?? {}
    return [baseURL+url, {
        method: "GET",
        mode: "cors",
        headers: {
            ...headers
        },
    }]
}

function postReq(url, headers, body) {
    headers = headers ?? {}
    body = body ?? {}
    return [baseURL+url, {
        method: "GET",
        mode: "cors",
        headers: {
            Authorization: "Basic "+btoa("john:doe"),
            ...headers,
        },
        body: {
            ...body,
        }
    }]
}


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
    const res = await fetch(baseURL+"/7", {
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
                },
            }) 

    console.log(await res.text())  
})


regClick("13", async()=> {
    const res = await fetch(baseURL+"/13", {
            method: "POST",
            mode:"cors",
            headers: {
                Authorization: "Basic "+btoa("john:doe"),
                "X-Idempotency-Key": "9acc2f14-8844-4a59-9b11-04d1ce4f8665",
            },
        }) 

    console.log(await res.text())   
})


regClick("14", async()=> {
    const res = await fetch(baseURL+"/14", {
            method: "POST",
            mode:"cors",
            headers: {
                Authorization: "Basic "+btoa("john:doe"),
            },
        }) 

    console.log(await res.text())   
})

regClick("15", async()=> {
    const res = await fetch(baseURL+"/15", {
        method: "POST",
        mode:"cors",
        headers: {
            Authorization: "Basic "+btoa("john:doe"),
        },
    }) 

    console.log(await res.text())   
})


regClick("16", async()=> {
    const res = await fetch(baseURL+"/16", {
        method: "POST",
        mode:"cors",
        headers: {
            Authorization: "Basic "+btoa("john:doe"),
        },
    }) 

    console.log(await res.text())    
})


regClick("17", async()=> {
    const res = await fetch(baseURL+"/17", {
        method: "POST",
        mode:"cors",
        headers: {
            Authorization: "Basic "+btoa("john:doe"),
        },
    }) 

    console.log(await res.text())   
})


regClick("18", async()=> {
    const res = await fetch("/hi", {
        method: "POST",
    }) 

    console.log(await res.text())    
})


regClick("19", async()=> {
    const res = await fetch("/old", {
        method: "POST",
    }) 

    console.log(await res.text())    
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
