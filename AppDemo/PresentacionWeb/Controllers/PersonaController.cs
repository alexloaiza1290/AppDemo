using CapaEntidad;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PresentacionWeb.Controllers
{
    public class PersonaController : Controller
    {
        // GET: Persona
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ListarPersona()
        {
            NPersona nPersona = new NPersona();
            var personas = nPersona.ListarPersona();
            var data = new
            {
                succes = personas.Any(),
                personas = personas
            };
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult RegistrarPersona(Persona persona)
        {
            try
            {
                NPersona nPersona = new NPersona();
                bool success;
                string mensaje;
                nPersona.InsertarPersona(persona);
                success = true;
                mensaje = "Se registro correctamente";

                var data = new
                {
                    success = success,
                    mensaje = mensaje
                };
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message,JsonRequestBehavior.AllowGet);
            }
            
        }
        [HttpPost]
        public JsonResult ActualizarPersona(Persona persona)
        {
            try
            {
                NPersona nPersona = new NPersona();
                bool success;
                string mensaje;
                nPersona.InsertarPersona(persona);
                success = true;
                mensaje = "Se actualizo correctamente";

                var data = new
                {
                    success = success,
                    mensaje = mensaje
                };
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public JsonResult EliminarPersona(int codigo)
        {
            try
            {
                NPersona nPersona = new NPersona();
                bool success;
                string mensaje;
                nPersona.EliminarPersona(codigo);
                success = true;
                mensaje = "Se elimino correctamente";

                var data = new
                {
                    success = success,
                    mensaje = mensaje
                };
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }

        }
    }
}