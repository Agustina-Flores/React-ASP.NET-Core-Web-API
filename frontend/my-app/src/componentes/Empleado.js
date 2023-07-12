import {Component} from 'react';
import {variables} from '../Variables' 

export class Empleado extends Component
{
    constructor(props)
    {
        super(props)
        this.state={
            empleados:[],
            departamentos:[],
            modalTitle:"",
            EmpleadoId:"",
            EmpleadoNombre:0,
            Departamento:"",
            FechaInscripcion:"",
            FotoNombre:"photo.png",
            PhotoPath:variables.PHOTO,
            
        }
    }


    refreshList() {
        fetch(variables.API_URL+'Empleado')
        .then(response=>response.json())
        .then(data=>{
           this.setState({
            empleados:data
           });
        });
    // console.log("dep en" ,departamentos.data)
    fetch(variables.API_URL+'Departamento')
    .then(response=>response.json())
    .then(data=>{
       this.setState({
        departamentos:data
       });
    });
    }

    componentDidMount() {
        this.refreshList();
      
      }
  
      changeEmpleado = (e) =>
     {
      this.setState({
        EmpleadoNombre:e.target.value
      });
     }
  
     changeFechaInscripcion = (e) =>
     {
      this.setState({
        FechaInscripcion:e.target.value
      });
     }
     changeDepartamento = (e) =>
     {
      this.setState({
        Departamento:e.target.value
      });
     }
       
}
 