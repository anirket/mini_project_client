import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
const Loading = () => {
    const [networkerror, setnetworkerror] = useState(false);

    useEffect(() => {
        let timeout;
        setnetworkerror(false);
        setTimeout(() => {
             timeout = setnetworkerror(true)
        }, 6000);
        return () => {
            clearTimeout(timeout);
        }
    }, [])

    if (networkerror) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl">Please check your network Connection and try again :-)</h1>
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <ReactLoading type="bars" color="#000000" height={'3rem'} width={'3rem'} />
        </div>
    )
}

export default Loading