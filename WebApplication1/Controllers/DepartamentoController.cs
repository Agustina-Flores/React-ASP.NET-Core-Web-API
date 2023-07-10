using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using WebApplication1.NewFolder3;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentoController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public DepartamentoController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"  
                          select DepartamentoId, DepartamentoNombre
                          from dbo.Departamento";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ProyectoCon");
            SqlDataReader myReader;
            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using(SqlCommand myCommand = new SqlCommand(query,myCon))

                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post (Departamento departamento)
        {
            string query = @"  
                          insert into dbo.Departamento
                          values (@DepartamentoNombre)
                          ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ProyectoCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))

                {
                   SqlParameter unitParam= myCommand.Parameters.AddWithValue("@DepartamentoNombre", departamento.DepartamentoNombre);
                    if(departamento.DepartamentoNombre == null)
                    {
                        unitParam.Value = DBNull.Value; 
                    }
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Departamento departamento)
        {
            string query = @"  
                          update dbo.Departamento
                          set DepartamentoNombre= @DepartamentoNombre
                          where DepartamentoId=@DepartamentoId
                          ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ProyectoCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))

                {
                    myCommand.Parameters.AddWithValue("@DepartamentoId", departamento.DepartamentoId);
                    myCommand.Parameters.AddWithValue("@DepartamentoNombre", departamento.DepartamentoNombre);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"  
                          delete from dbo.Departamento                     
                           where DepartamentoId=@DepartamentoId
                          ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ProyectoCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))

                {
                    myCommand.Parameters.AddWithValue("@DepartamentoId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }
    }
}
