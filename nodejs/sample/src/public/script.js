

class API {

    /*
        Parameters:
            options {
                method: [String] HTTP Methods (Default: "GET") 
                    Ex) "GET", "POST", "PUT", "DELETE"
                route: [String] Route to Request (Default: "/")
                    Ex) "/api/v1/example"
                body: (Optional) [Object] Body To Send (Default: undefined)
                type: (Optional) [String] Body Form (Default: "application/json")
                    Ex) "application/json", "application/x-www-form-urlencoded", "multipart/form-data", "text/plain"
                header: (Optional) [Object] request header "key-value" set
                origin: (Optional) [String] Domain (Default is same origin)
                    Ex) "https://example.com"
                mode: (Optional) [String] Allow Access-Control-Allow-Origin Header (Default: "cors")
                    Ex) "no-cors", "cors", "same-origin"
                query: (Optional) [Object] query string "key-value" set
            }
        Returns: Promise<Fetch>

            arrayBuffer()
            blob()
            formData()
            json()
            text()
    */
    static requester(options) {

        const host = options?.origin ?? '';
        const route = options?.route ?? '/';
        const header = options?.header ?? {};
        const query = options?.query ?? {};
        const queryStrings = [];
        
        for (const item of Object.entries(query)) {
            queryStrings.push(item.join("="));
        }

        const queryString = queryStrings.length === 0 
                            ? ''  
                            : '?' + queryStrings.join("&");

        return fetch(host + route + queryString, {

            method: options?.method ?? 'GET',
            mode: options?.mode ?? 'cors',
            headers: {
                ...header,
                'Content-Type': options?.type ?? "application/json",
            },
            body: options?.body ?  JSON.stringify(options.body) : null,
        })

    }

}

document.getElementById('one').addEventListener('click', async (event)=>{
    const result = await API.requester({
        method: "POST",
        route: "/one",
        header: {
            ['X-api-token']: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        },
        body: {
            a: 10,
            b: 20,
            c: 30,
        },
    })
    console.log(await result.json());
})
document.getElementById('two').addEventListener('click', async (event)=>{
    const result = await API.requester({
        method: "GET",
        route: "/two",
        query: {
            query: "what is fetch API",
            page: 3,
            v: "1.0",
        },
    })
    console.log(await result.json());

})
document.getElementById('three').addEventListener('click', async (event)=>{
    const result = await API.requester({
        method: "PUT",
        route: "/three",
        header: {
            accessKey: '80f61ae4-8038-11ed-a1eb-0242ac120002',
            secretKey: '644bcc7e564373040999aac89e7622f3ca71fba1d972fd94a31c3bfbf24e3938',
        },
        body: {
            name: 'rhie',
            age: 18,
            role: 'user',
        },
    })
    console.log(await result.json());
})
document.getElementById('four').addEventListener('click', async (event)=>{
    const result = await API.requester({
        method: "POST",
        route: "/four",
        body: {
            id: 'abcd',
            pw: '1234',
        },
    });
    console.log(await result.json());

})

document.getElementById('pro').addEventListener('click', async (event)=>{
    const result = await API.requester({
        method: "GET",
        route: "/pro",
    });
    console.log(await result.text());

})