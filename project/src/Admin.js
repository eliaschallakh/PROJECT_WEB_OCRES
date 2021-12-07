import PointsTable from "./PointsTable";
import React, {useState, useEffect} from "react";
import "./App.css";
import  {Table,Form} from 'react-bootstrap';
import Axios from 'axios';

export default function Admin() {

    const [data, setData] = useState([]);

     const [matchs, setMatchs] = useState([]);
    const [description, setDescription] = useState([]);
    const [date, setDate] = useState([]);
    
    
    function inputUpdate(event) 
    {
        setMatchs({[event.target.name]: event.target.value});
        setDescription({[event.target.name]: event.target.value});
        setDate({[event.target.name]: event.target.value});


      };

    useEffect(() => {

        const fetchData = async () => {

            const response = await Axios.get('http://localhost:5000/comments/', {  
            });
             setData(response.data);
             console.log(response.data);
            
             var matchess=[];
             var descriptionss=[];
             var datess=[];
          
            for (var i=0; i<response.data.length; i++)
            {
                matchess.push((response.data[i].matchs));
                descriptionss.push((response.data[i].description));

                var today = new Date(response.data[i].date);
                datess.push(today.toISOString().substring(0, 10));
            }
            
                setMatchs(matchess);
                setDescription(descriptionss);
                setDate(datess);

          };
          fetchData();
        }, []);

       function updateComment(_id)
       {
        
    
        
        const commentUpdate = async (_id,matchs,description,date) => {
        
            const response = await Axios.put('http://localhost:5000/comments/update', {  
                matchs :matchs,
                description : description,
                date : date,
            }

            )
          };

        var matchs = document.getElementsByClassName("matchs"+_id)[0].value;
        var description = document.getElementsByClassName("description"+_id)[0].value;
        var date = document.getElementsByClassName("date"+_id)[0].value;
      
        commentUpdate(_id,matchs,description,date);
 
         window.location.reload(false);  


       }

       function deleteComment(_id)
       {

            const commentdelete = async (_id) => {
            
                const response = await Axios.delete(`http://localhost:5000/comments/delete/${_id}`)  
                };
                commentdelete(_id);
                window.location.reload(false);  
       }

       function addComment()
       {
        var matchs = document.getElementsByClassName("matchs")[0].value;
        var description = document.getElementsByClassName("description")[0].value;
        var date = document.getElementsByClassName("date")[0].value;

        const commentAdd = async (matchs,description,date) => {
        
            const response = await Axios.post('http://localhost:5000/comments/add', {  
                matchs : matchs,
                description : description,
                date : date,
            }
            )
          };
          commentAdd(matchs,description,date);
          window.location.reload(false);  

       }



    if (data===undefined ||data.length===0)
    {
        
        return (
            <div className="livescore">
                             <div>
                    <h3 style={{textAlign: "center"}} >Live comments !</h3>
                  
                  <div style={{textAlign: "center"}} style={{marginBottom: "100%"}}className="commentWrapper">
                        
                        <div  class="flex messages">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Matchs</th>
                                        <th>Description</th>
                                        <th>Date</th>
                                        <th>Edit</th>
    
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </Table>
                       
    
                        </div>
                  </div>
                  
                  </div>
            </div>
        );

    }
else{
    return (
        <div className="livescore">
                         <div>
                <h3 style={{textAlign: "center"}} >Live comments !</h3>
              
              <div style={{textAlign: "center"}} style={{marginBottom: "100%"}}className="commentWrapper">
                    
                    <div  class="flex messages">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Matchs</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Edit</th>

                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>  <Form.Control onChange={inputUpdate} className={"matchs"} type="text"/></td>
                                <td> <Form.Control onChange={inputUpdate}  className={"description"} type="text" /></td>
                                <td>  <Form.Control onChange={inputUpdate} className={"date"} type="date" /></td>
                                    <td>
                                        <button onClick={() => addComment()} >add</button>
                                    </td>
                                </tr>                             
                                {  
                        data.map((comment, i) => (

                               <tr>
                                <td>  <Form.Control onChange={inputUpdate} value={matchs[i]}  name={"matchs"+i} className={"matchs"+comment._id} type="text"/></td>
                                <td> <Form.Control onChange={inputUpdate} value={description[i]} className={"description"+comment._id} type="text" name={"description"+i} /></td>
                                <td>  <Form.Control onChange={inputUpdate} value={date[i]} className={"date"+comment._id} type="date" name={"date"+i} /></td>
                                    <td>
                                        <button  onClick={() => updateComment(comment._id)} >Update</button>
                                        <button onClick={() => deleteComment(comment._id)}>Delete</button>

                                    </td>
                                </tr>
                                       ))

                               
                               }
                            </tbody>
                        </Table>
                   

                    </div>
              </div>
              
              </div>
        </div>
    );
                            }
}



