import { useState, useEffect, useMemo } from 'react'
import './App.css'
import logo from './assets/logo.png';

function App() {
  const [rssFetched, setRssFetched] = useState(false);
  const [rowData, setRowData] = useState([{mp3: "#", title:"Loading..."}]);

  function slugify(str) {
    return String(str)
      .normalize('NFKD') // split accented characters into their base characters and diacritical marks
      .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-'); // remove consecutive hyphens
  }
  
  useEffect(()=>{
    if( !rssFetched ) {
      setRssFetched(true);
      fetch("https://anchor.fm/s/e741494c/podcast/rss")
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
        .then(data => {            
            const itemList = data.querySelectorAll('item');

            const items=[];
            itemList.forEach(el => {
                items.push({
                pubDate: new Date(el.querySelector('pubDate').textContent),
                title: el.querySelector('title').textContent,
                mp3: el.querySelector('enclosure').getAttribute('url')
                });
            });

            setRowData(items)
        });
    }
  },[]);

  return (
    <>
<div className="relative overflow-hidden before:absolute before:top-0 before:left-1/2 before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2">
    
  <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 justify-center">

    <div className="flex justify-center">
      <a className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 pl-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-200" href={"#"+slugify(rowData.at(0).title)}>
        <b>New!</b> {rowData.length > 0 && rowData.at(0).title}
        <span className="py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-400">
          <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      </a>

    </div>  

    <div className="mt-5 max-w-2xl text-center mx-auto">
          {rowData.length > 0 && rowData.map((item) =>
        <div key={slugify(rowData.at(0).title)} id={slugify(rowData.at(0).title)} className="inline-flex items-center gap-x-2">
          <h2>{item.title}</h2>
          <audio controls preload="none"
            style={{height:"2em", verticalAlign: "middle"}}>
              <source src={item.mp3} type="audio/mpeg" />
          </audio>
        </div>
      )}
    </div>
{/* 
    <div className="mt-5 flex justify-center items-center gap-x-1 sm:gap-x-3">
        {rowData.length>0 && rowData.map((item) => { console.log(item.title) &&
          <>
          <h1>{item.title}</h1>
          <audio controls preload="none"
            style="height:2em; vertical-align: middle;">
              <source src={item.mp3} type="audio/mpeg" />
          </audio>
          </>
        })}
    </div> */}

  </div>
</div>
    </>
  )
}

export default App
