import './App.css';
import React, { useEffect, useState } from 'react';

function GetTable () {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 
 
  useEffect(()=> {
      loadData()
      }, []);

   const loadData = async () => {
       const responce = await fetch ('https://jsonplaceholder.typicode.com/users')
       const data = await responce.json();
       setData(data);
       setLoading(false);
   }

  function getHeaders(){
    
    var keys = Object.entries(data[1]);
    return keys.map((key,index) => {
      if (typeof key[1]==='object'){
      return [
      <th key= {index}>{key[0].toUpperCase()}:</th>, 
        Object.entries(key[1]).map((key,index) => {
        if (typeof key[1]==='object') {
          return[<th key={index}>{key[0].toUpperCase()}:</th>,
          Object.entries(key[1]).map((key, index) => {
            return <th key={index}>{key[0].toUpperCase()}</th>;
          })]
        }
        else { return <th key ={index}>{key[0].toUpperCase()}</th>
        }
      })
      ]
      }
      else {
        return <th key={index}>{key[0].toUpperCase()}</th>
      }
    });
  }

  function getData() {
    return data.map(data =>{
      return (
       <tr>
         {Object.values(data).map((item,index)=> {
           if (typeof item ==='object') {
           return [ <td key={index}></td>, 
             Object.values(item).map((item,index) => {
             if(typeof item ==='object') {
               return [<td key={index}></td>,
                 Object.values(item).map((item,index) => {
                 return <td key = {index}>
                   {item}
                 </td>
               })
             ]
             }
             return <td key={index}>
               {item}
             </td>
           })]
           } else {
             return <td key = {index}>
               {item}
             </td>
           }
         })}
       </tr>
      )
    })
  }
      
      return (
        <div>
        {loading ? <div> loading *** </div> : <div> 
            <table key = "table" border="1">
              <tbody>
            <tr key = "headers">
                {getHeaders()}
            </tr>
                {getData()}
            </tbody>
          </table>
          
        </div>}
        </div>
  
      );
  
        }
 
export default GetTable;
