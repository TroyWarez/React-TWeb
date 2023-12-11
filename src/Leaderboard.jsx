import { useState, useEffect } from 'react'
import Login from './Login';
import { ApiUrl } from './ApiUrl'
import './Leaderboard.css'
export function Leaderboard() {
  const [boardData, setBoardData] = useState( new Array([<tr key='LoadingRow'><td><b> Loading Leaderboard...</b></td></tr>]));
  useEffect(() =>
  {
    const fetchData = async () => {
      try{
        const result = await fetch(ApiUrl,{method: 'GET', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }});
        let listItems = await result.json();
          listItems = listItems.map(leaderboardEntry => <tr key={leaderboardEntry.id}><td><b>{(leaderboardEntry.id + 1)  + '.'}</b></td><td><b>{leaderboardEntry.username}</b></td><td><b>{new Date(leaderboardEntry.time).getHours() + ':' + new Date(leaderboardEntry.time).getMinutes()}</b></td><td><b>{new Date(leaderboardEntry.date).getMonth() + '/' + new Date(leaderboardEntry.date).getDate() + '/' + new Date(leaderboardEntry.date).getFullYear()}</b></td></tr>);
          setBoardData(listItems);
      }
      catch(e)
      {
        setBoardData(new Array([<tr key='LoadingRow'><td><b> Failed to fetch the leaderboard</b></td></tr>]));
      }
    }
    fetchData();
  }, []);

  


  return (
    <>
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
  {boardData}
  </tbody>
  </table>
  <Login/>
  </>
  )
}
