import {variables} from '../Variables'
import {useEffect, useState} from 'react'

const Departamento = () =>
{

    const [departamentos,setDepartamentos] = useState([]);
    const [modal,setModal] = useState('');
    const [DepartamentoNombre,setDepNombre]= useState('');
    const [DepartamentoId,setDepId]= useState(0);

    useEffect(() =>{
      
        fetch(variables.API_URL+'Departamento')
        .then(response=>response.json())
        .then(data=>{
            setDepartamentos({
               data
            })

            console.log("departamentos" , departamentos)
        })
    
    })

    const changeDepartamento = (e) =>
   {
    
    setDepNombre(e.target.value);

  //console.log('change' , DepartamentoNombre)
   }

   const addClick = () =>
   {
     setModal('Agregar Departamento');
     setDepId(0);
    setDepNombre('');
   }

   
   const editClick = (dep) =>
   {
    setModal('Editar Departamento');
     setDepId(dep.DepartamentoId);
    setDepNombre(dep.DepartamentoNombre);
   }

    const Create  = () =>{
        fetch(variables.API_URL+'Departamento',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DepartamentoNombre:setDepNombre(DepartamentoNombre) //ver
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result); //Added Successfully
            //this.loadList();
        },(error)=>{
            alert('Fallo');
        })
    }
   const deleteClick = () =>
   {
   // setModal('Eliminar Departamento');
   /// setDepId(0);
   // setDepNombre('');
   }


    return(
        <div>
            <button type='button' className='btn btn-primary m-2 float-end'
            data-bs-toggle='modal' data-bs-target='#exampleModal'
            onClick={() => addClick()}>
                    Agregar Departamento
            </button>
            <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>
                                DepartamentoId
                            </th>
                            <th>
                                DepartamentoNombre
                            </th>
                            <th>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {departamentos.data?.map(dep =>
                                <tr key={dep.DepartamentoId}>
                                    <td>{dep.DepartamentoId}</td>
                                    <td>{dep.DepartamentoNombre}</td>
                                    <td>
                                        <button type='button'
                                        className='btn btn-light mr-1'
                                        data-bs-toggle='modal' data-bs-target='#exampleModal'
                                        onClick={() => editClick(dep)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                        </button>
                                        <button type='button'
                                        className='btn btn-light mr-1'
                                        data-bs-toggle='modal' data-bs-target='#exampleModal'
                                        onClick={() => deleteClick(dep.DepartamentoId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                        </svg>
                                        </button>
                                    </td>
                                </tr>
                            )}
                    </tbody>
            </table>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                  <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modal}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                               <span className="input-group-text">
                                DepartamentoNombre
                               </span>
                               <input type="text" className="form-control"
                               value={DepartamentoNombre}
                               onChange={changeDepartamento}/>                              
                            </div>

                            {DepartamentoId == 0?
                            <button type="button"
                            className="btn btn-primary float-start"
                            onClick={()=>Create()}> Crear </button>
                            : null}

                            {DepartamentoId !== 0?
                            <button type="button"
                            className="btn btn-primary float-start"
                            > Modificar </button>
                            : null}
                        </div>
                  </div>
                </div>
            </div>    
        </div>
    );
}
export default Departamento;