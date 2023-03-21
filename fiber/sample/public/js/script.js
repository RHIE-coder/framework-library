function regClick(id, callback) {
    document.getElementById(id).addEventListener("click", callback)
}

regClick("index", ()=> {
    console.log("자바스크립트 정상 동작 확인");
    alert("자바스크립트 정상 동작 확인");
});

regClick("1", async ()=> {
    const res = await fetch("/1", {
        method: "GET",
        mode:"cors",
    })

    console.log(await res.text())
})

regClick("2", async()=> {
    const res = await fetch("/micro/2", {
        method: "GET",
        mode:"cors",
    })

    console.log(await res.text()) 
})

regClick("3", async()=> {
    const res = await fetch("/api/v1/3", {
        method: "GET",
        mode:"cors",
    })

    console.log(await res.text()) 
})

regClick("4", async()=> {
    const res = await fetch("/api/v1/4", {
        method: "GET",
        mode:"cors",
    })

    console.log(await res.text()) 
})

regClick("5", async()=> {
    const res = await fetch("/admin/5", {
        method: "GET",
        mode:"cors",
    })

    console.log(await res.text())  
})

regClick("6", async()=> {
    const res = await fetch("/admin/6/111", {
        method: "GET",
        mode:"cors",
    })

    console.log(await res.text()) 
})


regClick("7", async()=> {
    const res = await fetch("/7", {
        method: "POST",
        mode:"cors",
    })

    console.log(await res.json())  
})

function getRequest() {
    return fetch("/8", {
                method: "GET",
                mode:"cors",
            })
}

regClick("8", async()=> {
    console.log("request")
    const result = Promise.all(
        getRequest(),
        getRequest(),
        getRequest(),
        getRequest(),
        getRequest(),
        getRequest(),
        getRequest(),
    )

    console.log(result)
})


regClick("9", async()=> {
    
})


regClick("10", async()=> {
    
})


regClick("11", async()=> {
    
})


regClick("12", async()=> {
    
})


regClick("13", async()=> {
    
})


regClick("14", async()=> {
    
})


regClick("15", async()=> {
    
})