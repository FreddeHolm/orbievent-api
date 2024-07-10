/*

import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';

export const Config = { 
    domain: "https://apis.orbiapp.io/v1",
}

export const useRequest = (url, useToken = true, method = "GET") => {
    
    let options = {}
    
    options.method = method
    options.headers = { 
        'x-api-key': 'efe04a0c-77dd-4d8e-8ce2-3107b1e64c8d', 
        'Content-Type': 'application/json'
    }

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const [error, setError] = useState(null)

    const doRequest = (body = null, queryParams = []) => {

        let queryString = ''

        queryParams.map((param) => {
            queryString += (param == queryParams[0] ? '?' : '&') + param
        })

        if (method != 'POST' && body != null) {
            throw Error("You can't place a body on a non POST request")
        }

        setIsPending(true)

        specialFetch(Config.domain + url + queryString, options, (data) => {
            setData(data)
            setIsPending(false)
            setError(null)
        }, (err) => {
            setData(null)
            setIsPending(false)
            setError(err)
        })
    }

    return [data, isPending, error, doRequest] 
}

async function specialFetch(url, options, onSuccess, onError) {
    if (url == null) {
        return
    }

    options.headers['Content-Type'] = 'application/json' 

    await fetch(url, options)
            .then(res => {
                return res.json()
            })
            .then(data => {
                if(data.status_code && data["status_code"] >= 400) {
                    throw Error(data.message)
                }

                onSuccess(data)
            })
            .catch(err => {
                console.log(err)
                onError(err)
            })
}
            
*/