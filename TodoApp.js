import React, { useState, useEffect } from 'react'
import todo from '../image/todo.svg'



//to get local storage

const getls = () => {

    let list = localStorage.getItem('lists');

    if (list) {

        return JSON.parse(localStorage.getItem('lists'));

    } else {

        return [];

    }

}

const TodoApp = () => {

    const [inputdata, setInputdata] = useState("");
    const [item, setitem] = useState(getls());
    const [tooglesub, settooglesub] = useState(true);
    const [edit, setedit] = useState(null)
    
    const additem = () => {
        
        if (!inputdata) {
            alert("Please input the todo item ")
        }
        else if(inputdata && !tooglesub  ){
            
            setitem(
                item.map((e)=>{
                    if(e.id === edit){
                        return{...e ,name :inputdata}
                    }
                    return e;
                    
                })
                )
                settooglesub(true)
                setInputdata("")
                setedit(null)
            }
            else {
                
                const allinput ={id: new Date().getTime().toString()  ,name :inputdata}
                setitem([...item, allinput]);
                setInputdata("")
                
                
            }
        }

    const edititem = (id) => {

        let newEdit = item.find((e)=>{
            return e.id ===id
        })
        settooglesub(false);
        setInputdata(newEdit.name)
        setedit(id);
    }


    const deleteitem = (id) => {

        const rem = item.filter((ele) => {
            return id !== ele.id;
        });
        setitem(rem);

    }

    const remeoall = () => {
        setitem([]);
    }



    //add data to local storage
    useEffect(() => {

        localStorage.setItem('lists', JSON.stringify(item))
    }, [item]);

    return (
        <>
            <div className="main-div">

                <div className="child-div">
                    <figure>
                        <img src={todo} alt="error" />
                        <figcaption> Add you list Here 🧾</figcaption>
                    </figure>

                    <div className="add-item">
                        <input className="inputva" type="text" placeholder="✍  Add Items.." size="50" value={inputdata} onChange={(e) => setInputdata(e.target.value)} maxLength="45" />
                        {
                            tooglesub ?<i className="fa fa-plus add-btn" title="Add item" onClick={additem}></i>:
                            <i className="fa fa-edit add-btn" title="update item" onClick={additem}></i>
                 
                        }
                        
                    </div>

                    <div className="showitem">

                        {item.map((e) => {


                            return (
                                <div className="eachitem" key={e.id}>
                                   
                                    <h4>{e.name}</h4>
                                    <i className="fa fa-edit add-btn2" title="Edit item" onClick={() => edititem(e.id)}></i>
                                    <i className="fa fa-trash add-btn1" title="Delete item" onClick={() => deleteitem(e.id)}></i>

                                </div>
                            )



                        })}
                    </div>

                    {/* clear div */}


                    <div className="showitem  btn-rem">
                        <button className="btn btn-primary effect04  " onClick={remeoall}  ><span>Check List / Remove all</span></button>
                    </div>

                </div>
            </div>

        </>
    )
}

export default TodoApp
