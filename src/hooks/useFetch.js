import React, { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    useEffect(() =>{
        const fetchFn = async () =>{
            try{
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                const loadedData = [];
                if(data)
                for( const k in data){
                    loadedData.push({
                        id: k,
                        to: data[k].to,
                        from: data[k].from,
                        subject: data[k].subject,
                        body: data[k].body,
                        bodyHtml: data[k].bodyHtml,
                        unread: data[k].unread,
                    });
                };
                setData(loadedData);
            } catch (err) {
                console.log(err);
            }
        }
        fetchFn();
    },[url]);
    return data;
};

export default useFetch;