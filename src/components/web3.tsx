import Web3 from 'web3';
import { useState, useEffect } from 'react';

declare global {
    interface Window {
      web3LoadTime: any;
    }
  }
  

export default function Web3Component() {
    const [loadTime, setLoadTime ] = useState<number>(0);
    useEffect(() => {
        if (typeof window !== "undefined") {

            const startTime = performance.now();
            const web3 = new Web3("");
            const endTime = performance.now();
            const loadTime = endTime - startTime;
            window.web3LoadTime = loadTime
            setLoadTime(loadTime);
          }
    })
    
    return (<div> 
        <div>
            Web3 package
        </div>
        <p>
            Load time to create Web3 instance: {loadTime}ms
        </p>
        
        </div>);
};

