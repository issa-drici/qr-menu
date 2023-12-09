'use client'

import { useEffect, useState } from "react"

export default function Phone({ children }) {
    const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))

    useEffect(() => {
        setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
        }, 1000);
    }, [])
    return (
        <div className="device device-iphone-14-pro">
            <div className="device-frame">
                {/* <img className="device-screen" src="..." /> */}
                <div className="w-full h-full bg-white rounded-[25px] overflow-hidden">
                    <div className="flex w-full h-[1.6rem] bg-slate-100 items-center justify-between">
                        <p className="text-[9px] pl-5">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <div className="flex items-center pr-3 gap-x-1">
                            <img src="/assets/images/network.png" alt="network" className="w-[0.6rem] h-[0.6rem] object-cover" />
                            <img src="/assets/images/wifi.png" alt="wifi" className="w-[0.6rem] h-[0.6rem] object-cover" />
                            <img src="/assets/images/battery.png" alt="battery" className="w-[0.9rem] h-[0.9rem] object-cover" />

                        </div>
                    </div>
                    {children}
                </div>
            </div>
            <div className="device-stripe"></div>
            <div className="device-header"></div>
            <div className="device-sensors"></div>
            <div className="device-btns"></div>
            <div className="device-power"></div>
        </div>
    )
}
