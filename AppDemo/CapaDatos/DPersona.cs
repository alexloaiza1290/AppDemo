using CapaEntidad;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class DPersona:Conexion
    {
        public List<Persona> ListarPersona()
        {
            List<Persona> lstPersonas = new List<Persona>();
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand("sp_listar_persona",conexion);
            cmd.CommandType = CommandType.StoredProcedure;

            MySqlDataReader dataReader = cmd.ExecuteReader();

            if (dataReader.HasRows)
            {
                while (dataReader.Read())
                {
                    Persona persona = new Persona();
                    persona.Id = Convert.ToInt32( dataReader["id"]);
                    persona.Nombre = dataReader["nombre"].ToString();
                    persona.Apellido = dataReader["apellido"].ToString();
                    persona.Usuario = dataReader["usuario"].ToString();
                    persona.Contrasena = dataReader["contrasena"].ToString();
                    lstPersonas.Add(persona);
                }
            }
            conexion.Close();
            return lstPersonas;
        }
        public Persona Autenticar()
        {
            Persona persona = new Persona();
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand("sp_autenticar_usuario", conexion);
            cmd.CommandType = CommandType.StoredProcedure;

            MySqlDataReader dataReader = cmd.ExecuteReader();

            if (dataReader.HasRows)
            {
                while (dataReader.Read())
                {
                    persona.Nombre = dataReader["nombre"].ToString();
                    persona.Apellido = dataReader["apellido"].ToString();
                    persona.Usuario = dataReader["usuario"].ToString();
                    persona.Contrasena = dataReader["contrasena"].ToString();

                }
            }
            conexion.Close();
            return persona;
        }
        public int InsertarPersona(Persona persona)
        {
            int result;
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand("sp_insertar_persona",conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("p_id",persona.Id);
            cmd.Parameters.AddWithValue("p_nombre", persona.Nombre);
            cmd.Parameters.AddWithValue("p_apellido", persona.Apellido);
            cmd.Parameters.AddWithValue("p_usuario", persona.Usuario);
            cmd.Parameters.AddWithValue("p_contrasena", persona.Contrasena);
            result= cmd.ExecuteNonQuery();
            conexion.Close();
            return result;
        }
        public int ActualizarPersona(Persona persona)
        {
            int result;
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand("sp_actualizar_persona", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("p_id", persona.Id);
            cmd.Parameters.AddWithValue("p_nombre", persona.Nombre);
            cmd.Parameters.AddWithValue("p_apellido", persona.Apellido);
            cmd.Parameters.AddWithValue("p_usuario", persona.Usuario);
            cmd.Parameters.AddWithValue("p_contrasena", persona.Contrasena);
            result = cmd.ExecuteNonQuery();
            conexion.Close();
            return result;

        }
        public int EliminarPersona(int id)
        {
            int result;
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand("sp_eliminar_persona", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("p_id", id);
            result = cmd.ExecuteNonQuery();
            conexion.Close();
            return result;

        }
        public int GenerarCodigoPersona()
        {
            int codigo;
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand("sp_generar_codigo_persona", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("p_id", MySqlDbType.Int32).Direction = ParameterDirection.Output;
            codigo = cmd.ExecuteNonQuery();
            conexion.Close();
            return codigo;

        }

    }
}
