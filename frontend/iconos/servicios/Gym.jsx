import {useState,useEffect} from 'react';
function Gym({setNombreServicio,className}) {
  useEffect(()=>{
    setNombreServicio && setNombreServicio("Gimnasio");
  },[])
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 256 256" className={className}>
      <path d="M69.5 57.5c-4.4.9-8.7 4.3-10.8 8.5-1 2.1-1.1 3-1.2 9.6-.1 4-.2 7.3-.3 7.3 0 0-1.1-.5-2.4-1-3-1.3-7.7-1.3-11.4.1-3.7 1.4-7.3 4.9-8.7 8.6-.9 2.4-1.1 3.7-1.2 12.2l-.2 9.5-6.1.2c-5.1.1-6.4.3-8.2 1.2-3.4 1.7-5.8 4-7.4 7.3-1.3 2.7-1.5 3.5-1.5 6.8 0 4.6 1.3 7.9 4.4 11 3.5 3.5 5.6 4.3 12.7 4.4l6.1.2.2 9.5c.2 8.5.3 9.8 1.2 12.2 1.4 3.7 5 7.3 8.7 8.6 3.7 1.4 8.3 1.4 11.4.1 1.2-.6 2.3-1 2.4-1 .1 0 .2 3.3.3 7.3.1 6.6.2 7.5 1.2 9.6 1.5 3.1 4.6 6.1 7.8 7.5 3.7 1.7 8.9 1.7 12.7 0 3.2-1.5 6.3-4.4 7.8-7.5l1.1-2.3.2-21.9.2-21.9h79l.2 21.9c.2 21.2.3 22 1.2 24 1.6 3.3 4.1 5.8 7.4 7.4 2.5 1.2 3.5 1.5 6.3 1.5 1.8 0 4.2-.2 5.2-.5 2.7-.8 6.1-3.2 7.8-5.5 2.5-3.6 3-5.6 3-13 0-3.6.1-6.6.2-6.6s1.2.5 2.4 1c3.1 1.3 7.8 1.3 11.4-.1 3.7-1.4 7.3-5 8.7-8.6.9-2.4 1.1-3.7 1.2-12.2l.2-9.5 6.1-.2c7-.2 9.1-.9 12.7-4.4 3.1-3 4.4-6.4 4.4-11 0-4.5-1.3-7.9-4.4-11-3.5-3.5-5.6-4.3-12.7-4.4l-6.1-.2-.2-9.5c-.2-8.5-.3-9.8-1.2-12.2-1.4-3.6-5-7.3-8.7-8.6-3.6-1.4-8.3-1.4-11.4-.1-1.2.6-2.3 1-2.4 1-.1 0-.2-3.3-.3-7.3-.1-6.6-.3-7.5-1.3-9.6-1.5-3.1-4.6-6.1-7.8-7.5-2.1-1-3.3-1.2-6.3-1.2-3.3 0-4.1.2-6.8 1.5-3.4 1.7-5.9 4.2-7.5 7.5-.9 2-1 2.9-1.2 24l-.2 21.9H88.5l-.2-21.9-.3-21.8-1.1-2.3c-1.5-3-4.6-6.1-7.6-7.4-2.7-1.3-7-1.8-9.8-1.2zm6.2 7.9c1.8.7 3.4 2.2 4.3 4.3.8 1.8.9 4.4.9 58.2 0 53.8 0 56.5-.9 58.2-3 6.6-11.4 6.6-14.4 0-.8-1.8-.9-4.4-.9-58.1 0-61-.1-58 2.4-60.8 2-2.1 5.7-2.9 8.6-1.8zm110.4 0c1.8.7 3.4 2.2 4.3 4.3.8 1.8.9 4.4.9 58.2 0 53.8 0 56.5-.9 58.2-3 6.6-11.4 6.6-14.4 0-.8-1.8-.9-4.4-.9-58 0-35.3.2-56.7.5-57.7 1.2-4.1 6.3-6.6 10.5-5zm-133.6 24c2.2 1 3.7 2.8 4.3 5.2.3 1.2.5 13.1.4 34.5-.1 32.1-.1 32.8-1.1 34.3-2.5 4.4-8.4 5.5-12.1 2.2-3-2.7-2.9-1.1-2.9-37.5 0-22.2.1-33.5.5-34.3 1.7-4.4 6.6-6.4 10.9-4.4zm157.1-.4c1.8.6 3.8 2.6 4.6 4.4.5 1.2.6 7.5.6 34.6 0 36.4.1 34.8-2.9 37.5-3.7 3.3-9.5 2.2-12.1-2.2-1-1.6-1-2.3-1.1-34.3-.1-21.4 0-33.3.4-34.5 1.2-4.5 6.2-7.2 10.5-5.5zM33.3 128v8.1h-4.5c-6.2 0-9.3-1.6-10.7-5.2-1.1-2.7-.4-6 1.5-8.1 1.9-2.1 4.3-2.8 9.2-2.8h4.5v8zm134.2 0v7.9h-79l-.1-7.4c0-4 0-7.6.1-7.9.2-.5 7.7-.6 39.6-.5l39.4.1v7.8zm66.1-7.2c3.1 1.4 4.8 4 4.8 7.2s-1.7 5.8-4.8 7.2c-1.4.6-3 .9-6.3.9h-4.5v-16.2h4.5c3.3 0 4.9.2 6.3.9z"></path>
    </svg>
  );
}

export default Gym;