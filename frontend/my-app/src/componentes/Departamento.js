import {variables} from '../Variables' 
import {Component} from 'react';

export class Departamento extends Component
{
    constructor(props)
    {
        super(props)
        this.state={
            departamentos:[],
            modalTitle:"",
            DepartamentoNombre:"",
            DepartamentoId:0
        }
    }
    
    refreshList() {
        fetch(variables.API_URL+'Departamento')
        .then(response=>response.json())
        .then(data=>{
           this.setState({
            departamentos:data
           });
        });
    // console.log("dep en" ,departamentos.data)
    }

    componentDidMount() {
      this.refreshList();
    
    }

   changeDepartamento = (e) =>
   {
    this.setState({
        DepartamentoNombre:e.target.value
    });
   }

     addClick()
   {

    this.setState({
        modalTitle:"Agregar Departamento",
        DepartamentoId:0,
        DepartamentoNombre:""
    });
   }

   
    editClick = (dep) =>
   {

    this.setState({
        modalTitle:"Editar Departamento",
        DepartamentoId:dep.DepartamentoId,
        DepartamentoNombre:dep.DepartamentoNombre 
    });
   
   }

     Create(){
       // console.log("antes de create", departamentos)
        fetch(variables.API_URL+'Departamento',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                 DepartamentoNombre:this.state.DepartamentoNombre  
            })
            
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result); //Added Successfull        
            this.refreshList();
        },(error)=>{
            alert('Fallo');
        }) 
    }

    update(){
        fetch(variables.API_URL+'Departamento',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DepartamentoId:this.state.DepartamentoId,
                DepartamentoNombre:this.state.DepartamentoNombre
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    delete(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Departamento/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

   render(){
    const {
        departamentos,
        modalTitle,
        DepartamentoId,
        DepartamentoNombre
    }=this.state;

    return(
        <div>
            <button type='button' className='btn btn-primary m-2 float-end'
            data-bs-toggle='modal' data-bs-target='#exampleModal'
            onClick={() => this.addClick()}>
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
                        {departamentos.map(dep =>
                                <tr key={dep.DepartamentoId}>
                                    <td>{dep.DepartamentoId}</td>
                                    <td>{dep.DepartamentoNombre}</td>
                                    <td>
                                        <button type='button'
                                        className='btn btn-light mr-1'
                                        data-bs-toggle='modal' data-bs-target='#exampleModal'
                                        onClick={() => this.editClick(dep)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                        </button>
                                        <button type='button'
                                        className='btn btn-light mr-1'
                                        data-bs-toggle='modal' data-bs-target='#exampleModal'
                                        onClick={() => this.delete(dep.DepartamentoId)}>
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
                            <h5 className="modal-title">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                               <span className="input-group-text">
                                DepartamentoNombre
                               </span>
                               <input type="text" className="form-control"
                               value={DepartamentoNombre}
                               onChange={this.changeDepartamento}/>                              
                            </div>

                            {DepartamentoId == 0?
                            <button type="button"
                            className="btn btn-primary float-start"
                            onClick={()=>this.Create()}> Crear </button>
                            : null}

                            {DepartamentoId !== 0?
                            <button type="button"
                            className="btn btn-primary float-start"
                            onClick={()=>this.update()}
                            > Modificar </button>
                            : null}
                        </div>
                  </div>
                </div>
            </div>    
        </div>
    ) 
}
}