import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import { createChart } from 'lightweight-charts';
import original from 'react95/dist/themes/original';

const TradingSimulator = ({ title, imageSrc, initialPrice }) => {
    const [price, setPrice] = useState(initialPrice || (Math.random() * 0.0001 + 0.00005).toFixed(8));
    const [priceHistory, setPriceHistory] = useState(() => [{
      time: Math.floor(Date.now() / 1000),
      open: price,
      high: price,
      low: price,
      close: price,
    }]);
    const chartContainerRef = useRef();
    const chartRef = useRef();
  
    useEffect(() => {
      if (chartContainerRef.current) {
        const chart = createChart(chartContainerRef.current, {
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
          layout: {
            backgroundColor: '#ffffff',
            textColor: '#000000',
          },
          grid: {
            vertLines: {
              color: '#e1e1e1',
            },
            horzLines: {
              color: '#e1e1e1',
            },
          },
          priceScale: {
            borderColor: '#cccccc',
          },
          timeScale: {
            borderColor: '#cccccc',
          },
        });
  
        const candlestickSeries = chart.addCandlestickSeries({
          upColor: '#4caf50',
          downColor: '#f44336',
          borderDownColor: '#f44336',
          borderUpColor: '#4caf50',
          wickDownColor: '#f44336',
          wickUpColor: '#4caf50',
        });
  
        chartRef.current = candlestickSeries;
  
        return () => chart.remove();
      }
    }, []);
  
    useEffect(() => {
      if (chartRef.current) {
        const sortedHistory = [...priceHistory].sort((a, b) => a.time - b.time);
        chartRef.current.setData(sortedHistory);
      }
    }, [priceHistory]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setPrice(prevPrice => {
          const change = (Math.random() - 0.5) * 2; // Random price change between -1 and 1
          const newPrice = Math.max(0, prevPrice + change); // Ensure price doesn't go below 0
          const lastEntry = priceHistory[priceHistory.length - 1];
          const newTime = lastEntry.time + 60; // New entry every 60 seconds
          const newEntry = {
            time: newTime,
            open: lastEntry.close,
            high: Math.max(lastEntry.close, newPrice),
            low: Math.min(lastEntry.close, newPrice),
            close: newPrice,
          };
          setPriceHistory(prev => {
            const updatedHistory = [
              ...prev.filter(entry => entry.time < newTime),
              newEntry,
            ].sort((a, b) => a.time - b.time);
            return updatedHistory;
          });
          return newPrice;
        });
      }, 1000);
  
      return () => clearInterval(interval);
    }, [priceHistory]);
  
    const handleBuy = () => {
        setPrice(prev => {
            const newPrice = (prev * 10); // Increase price by 5%
            // Update the price history with the new price
            const lastEntry = priceHistory[priceHistory.length - 1];
            const newTime = (lastEntry.time + 60) + Math.random() * 0.001; // Unique timestamp with a slight random increment
            const newEntry = {
                time: newTime,
                open: lastEntry.close,
                high: Math.max(lastEntry.close, newPrice),
                low: Math.min(lastEntry.close, newPrice),
                close: newPrice, // Keep it as a number
            };
            // Directly add the new entry to priceHistory
            setPriceHistory(prevHistory => [...prevHistory, newEntry]);
            return newPrice; // Return new price (keep it as a number)
        });
    };
    
    const handleSell = () => {
        setPrice(prev => {
            const newPrice = (prev * 0.10); // Decrease price by 5%
            // Update the price history with the new price
            const lastEntry = priceHistory[priceHistory.length - 1];
            const newTime = (lastEntry.time + 60) + Math.random() * 0.001; // Unique timestamp with a slight random increment
            const newEntry = {
                time: newTime,
                open: lastEntry.close,
                high: Math.max(lastEntry.close, newPrice),
                low: Math.min(lastEntry.close, newPrice),
                close: newPrice, // Keep it as a number
            };
            // Directly add the new entry to priceHistory
            setPriceHistory(prevHistory => [...prevHistory, newEntry]);
            return newPrice; // Return new price (keep it as a number)
        });
    };         
  
    return (
      <ThemeProvider theme={original}>
        <Window className="w-full max-w-xl p-4">
            <WindowHeader style={{ backgroundColor: 'black' }} className="font-custom">
                <span className='text-zinc-300'>{title}</span>
            </WindowHeader>
            <WindowContent className="bg-gray-600 p-4 flex flex-col items-center">
                <div className="flex items-center">
                    <img src={imageSrc} alt="Chart Image" className="size-16 md:size-20 mr-4" />
                    <div className="flex flex-col space-y-2">
                    <Button 
                        onClick={handleBuy} 
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Pump
                    </Button>
                    <Button 
                        onClick={handleSell} 
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Dump
                    </Button>
                    </div>
                </div>
                <div ref={chartContainerRef} className="w-[250px] md:w-[300px] h-[200px] md:h-[200px] mt-4"></div>
            </WindowContent>
        </Window>
      </ThemeProvider>
    );
};

function Second() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-zinc-800">
            <div className="flex justify-center items-center h-full py-[15%] md:py-[5%]">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 content-center">
                    <TradingSimulator title="TECH" imageSrc="tech.png" initialPrice={0.00012}/>
                    <TradingSimulator title="GOAT" imageSrc="GOAT.jpeg" initialPrice={0.00012}/>
                    <TradingSimulator title="michi" imageSrc="michi.jpeg" initialPrice={0.00012}/>
                    <TradingSimulator title="FWOG" imageSrc="FWOG.jpeg" initialPrice={0.00012}/>
                    <TradingSimulator title="MOODENG" imageSrc="MOO.jpeg" initialPrice={0.00012}/>
                    <TradingSimulator title="SIGMA" imageSrc="SIGMA.png" initialPrice={0.00012}/>
                </div>
            </div>
        </div>
    );
}

export default Second;