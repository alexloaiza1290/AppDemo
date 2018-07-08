using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public abstract class Conexion
    {
        protected MySqlConnection conexion;
        public Conexion()
        {
            conexion = ObtenerConexion();
        }
        public MySqlConnection ObtenerConexion()
        {
            MySqlConnection cn = new MySqlConnection();
            cn.ConnectionString = "Server= localhost;" + "Database=mvc;" + "Password=mysql;" + "User id=root";
            return cn;

        }
    }
}
