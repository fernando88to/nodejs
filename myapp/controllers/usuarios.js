module.exports = function(app) {

    var Usuario = app.models.usuarios;
      var UsuarioController = {
          index : function (req, res) {
            //faz uma consulta na base de dados
            Usuario.find(function (err, dados) {
                if(err){
                    req.flash("erro","Erro ao buscar usuários"+ err);
                    res.redirect("/usuarios");
                }else{
                    res.render('usuarios/index',{lista:dados});
                }
            });
          },
          create : function (req, res) {
            res.render("usuarios/create");
          }


      }
  return UsuarioController;
}
