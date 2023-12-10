import { useState, useLayoutEffect } from 'react'
import './Leaderboard.css'
import Data  from './TestData.json?raw';
export function Leaderboard() {
  let gameboardData = null;
  if (import.meta.env.DEV){
    gameboardData = JSON.parse(Data);// Replace with rest api call
  }
  else
  {
    gameboardData = undefined;
  }
  const listItems = gameboardData.map(leaderboardEntry => <tr key={leaderboardEntry.position}><td><b>{(leaderboardEntry.position + 1)  + '.'}</b></td><td><b>{leaderboardEntry.username}</b></td><td><b>{new Date(leaderboardEntry.time).getHours() + ':' + new Date(leaderboardEntry.time).getMinutes()}</b></td><td><b>{new Date(leaderboardEntry.date).getMonth() + '/' + new Date(leaderboardEntry.date).getDate() + '/' + new Date(leaderboardEntry.date).getFullYear()}</b></td></tr>);
  const [boardData, setBoardData] = useState( Data );

  return (
    <table className='Leaderboard' cellPadding='5' cellSpacing='0'> 
    <thead>
    <tr>
      <th colSpan='4'><b>Leaderboard</b><br></br></th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td><b>Rank</b></td>
    <td><b>Username</b></td>
    <td><b>Time to 11 Points</b></td>
    <td><b>Date</b></td>
  </tr>
  {listItems}
  </tbody>
    </table>
  )
}
