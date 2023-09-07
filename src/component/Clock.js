import React, { useState, useEffect } from 'react';
import clockImage from './clock.jpg';

export default function Clock() {
    const getInitialRotation = (hand) => {
        const now = new Date();
        let rotation = 0;
        // getting current time 
        // calculation of sec,min and hrs in the form of degreee  
        // -90 we subtract cause our handle is started from 270 degree
        switch (hand) {
            case 'second':
                rotation = (now.getSeconds() * 6) - 90;
                break;
            case 'minute':
                rotation = (now.getMinutes() * 6) - 90;
                break;
            case 'hour':
                //used %12 because the current time show in 24hrs format
                rotation = ((now.getHours() % 12) * 30) + (now.getMinutes() * 0.5) - 90;
                break;
            default:
                break;
        }

        return rotation;
    };

    const [second, setSecond] = useState(getInitialRotation('second'));
    const [minute, setMinute] = useState(getInitialRotation('minute'));
    const [hour, setHour] = useState(getInitialRotation('hour'));
    // I used the useEffect hook to update the value of degree because the css rotation was getting bugs
    //Per second the secondHandle moves 6degree and minuteHandle 0.1degree and hourHandle 0.1/60degree
    // the prevSecond used the previous values and increament the value
    useEffect(() => {
        const interval = setInterval(() => {
            setSecond((prevSecond) => prevSecond + 6);
            setMinute((prevMinute) => prevMinute + 0.1);
            setHour((prevHour) => prevHour + 0.1 / 60);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getRotationStyle = (value) => {
        return {
            transform: `rotate(${value}deg)`,
            transformOrigin: 'center',
        };
    };

    return (
        <div>
            <h1 className='text-center text-4xl my-6'>Analog Clock</h1>
            <div className="container flex justify-center align-middle my-8">
                <div className={`bg-[url(${clockImage})] bg-[length:192px_192px]  h-48 w-48  rounded-full absolute sm:h-96 sm:w-96 sm:bg-[length:384px_384px]  `}>
                    <div
                        className="second h-48 w-48  absolute origin-center-right sm:h-96 sm:w-96" style={getRotationStyle(second)}>
                        <div className="bg-yellow-500 h-1 w-20 absolute top-24 left-24 sm:top-48 sm:left-48 sm:w-36"></div>
                    </div>
                    <div
                        className="minute h-48 w-48  absolute sm:h-96 sm:w-96"
                        style={getRotationStyle(minute)}
                    >
                        <div className="bg-blue-800 h-1 w-14 absolute top-24 left-24 sm:top-48 sm:left-48 sm:w-28"></div>
                    </div>
                    <div className="hour h-48 w-48 absolute sm:h-96 sm:w-96 " style={getRotationStyle(hour)}>
                        <div className="bg-red-800 h-1 w-12 absolute top-24 left-24 sm:top-48 sm:left-48 sm:w-24"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
