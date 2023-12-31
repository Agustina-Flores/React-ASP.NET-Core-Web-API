﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using WebApplication1.NewFolder3;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {


        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public EmpleadoController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"  
                          select EmpleadoId, EmpleadoNombre,Departamento,
                          convert(varchar(10),FechaInscripcion,120) as FechaInscripcion,FotoNombre
                          from dbo.Empleado";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ProyectoCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))

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
        public JsonResult Post(Empleado empleado)
        {
            string query = @"  
                          insert into dbo.Empleado
                          (EmpleadoNombre,Departamento,FechaInscripcion,FotoNombre)
                          values (@EmpleadoNombre,@Departamento,@FechaInscripcion,@FotoNombre)
                          ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ProyectoCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))

                {
                    myCommand.Parameters.AddWithValue("@EmpleadoNombre", empleado.EmpleadoNombre);
                    myCommand.Parameters.AddWithValue("@Departamento", empleado.Departamento);
                    myCommand.Parameters.AddWithValue("@FechaInscripcion", empleado.FechaInscripcion);
                    myCommand.Parameters.AddWithValue("@FotoNombre", empleado.FotoNombre);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Empleado empleado)
        {
            string query = @"  
                          update dbo.Empleado
                          set EmpleadoNombre= @EmpleadoNombre,
                          Departamento=@Departamento,
                          FechaInscripcion=@FechaInscripcion,
                          FotoNombre=@FotoNombre
                          where EmpleadoId=@EmpleadoId
                          ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ProyectoCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))

                {
                    myCommand.Parameters.AddWithValue("@EmpleadoId", empleado.EmpleadoId);
                    myCommand.Parameters.AddWithValue("@EmpleadoNombre", empleado.EmpleadoNombre);
                    myCommand.Parameters.AddWithValue("@Departamento", empleado.Departamento);
                    myCommand.Parameters.AddWithValue("@FechaInscripcion", empleado.FechaInscripcion);
                    myCommand.Parameters.AddWithValue("@FotoNombre", empleado.FotoNombre);
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
                          delete from dbo.Empleado                     
                           where EmpleadoId=@EmpleadoId
                          ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ProyectoCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))

                {
                    myCommand.Parameters.AddWithValue("@EmpleadoId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }

        [Route("SaveFile")]
        [HttpPost]

        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using(var stream = new FileStream(physicalPath,FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(filename);
            }
            catch(Exception)
            {
                return new JsonResult("photo.png");
            }
        }
    }
}
