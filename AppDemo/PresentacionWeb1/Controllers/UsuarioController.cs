using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CapaEntidad;
using CapaNegocio;

namespace PresentacionWeb1.Controllers
{
    public class UsuarioController : Controller
    {
        NPersona usuario = new NPersona();
        // GET: Usuario
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(usuario.ListarPersona(),JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Persona persona)
        {
            return Json(usuario.InsertarPersona(persona),JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Persona persona)
        {
            return Json(usuario.ActualizarPersona(persona), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetById(int id)
        {
            var Employee = usuario.ListarPersona().Find(x => x.Id.Equals(id));
            return Json(Employee, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(usuario.EliminarPersona(id),JsonRequestBehavior.AllowGet);
        }
        
    }
}