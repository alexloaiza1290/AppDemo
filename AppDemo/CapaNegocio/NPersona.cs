using CapaDatos;
using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
    public class NPersona
    {
        DPersona dPersona = new DPersona();
        public List<Persona> ListarPersona()
        {
           return dPersona.ListarPersona();
        }
        public Persona Autenticar()
        {
            return dPersona.Autenticar();
        }
        public int InsertarPersona(Persona persona)
        {
            return dPersona.InsertarPersona(persona);
        }
        public int ActualizarPersona(Persona persona)
        {
            return dPersona.ActualizarPersona(persona);
        }
        public int EliminarPersona(int id)
        {
            return dPersona.EliminarPersona(id);
        }
        public int GenerarCodigoPersona()
        {
            return dPersona.GenerarCodigoPersona();
        }

        public object BuscarUsuarioCodigo(int id)
        {
            throw new NotImplementedException();
        }
    }
}
