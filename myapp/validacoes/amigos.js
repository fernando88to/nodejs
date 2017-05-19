/**
 * Created by fernando on 19/05/17.
 */

module.exports = function (req, res) {

    req.assert("nome","Informe seu nome").notEmpty();
    if(!req.body.email){
        req.assert("email","E-mail  inválido").isEmail();

    }

    var validacoesErros = req.validationErros() || []
    if(validacoesErros.length > 0 ){
        validacoesErros.forEach(function (e) {
            req.flash("erro", e.msg);

        });
        return false;
    }


    return true;
    
}