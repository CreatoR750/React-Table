import './App.css';
import React from 'react';

class GetTable extends React.Component {
  constructor(props) {
      super(props);
    
      this.state = {
        data:[],
        loading:true,
      };

      this.getHeaders = this.getHeaders.bind(this);
      this.getData = this.getData.bind(this);
  }

  componentDidMount() {
     
      fetch('https://jsonplaceholder.typicode.com/users')
       .then(response => response.json())
       .then(data => this.setState({data: data, loading:false}));
  }

  getHeaders(){
    var keys = Object.entries(this.state.data[1]);
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

  getData() {

    var data = this.state.data;
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
 
  render() {
         
      return (
        <div>
        {this.state.loading ? <div>loading *** </div> : <div> 
            <table border="1">
              <tbody>
            <tr>
                {this.getHeaders()}
            </tr>
                {this.getData()}
            </tbody>
          </table>
        </div>}
        </div>
  
      );
  }
}
 
export default GetTable; 


