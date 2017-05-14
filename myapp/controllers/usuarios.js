module.exports = function(app) {

    var Usuario = app.models.usuarios;


    var UsuarioController = {
          index : function (req, res) {
              req.flash("info","sdfsdf");
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
          },
          post:function (req, res) {
            var model = new Usuario();
            model.nome = req.body.nome;
            model.email = req.body.email;
            model.site = req.body.site;
            model.password = model.generateHash(req.body.password);


          model.save(function (err) {
            if(err){
                req.flash("erro","Erro ao cadastrar");
                res.render("usuarios/create",{user:req.body});
            }else{
                req.flash("info", "Registro cadastrado com sucesso");
                res.redirect("/usuarios");
            }
            });



          }


      }
  return UsuarioController;
}
