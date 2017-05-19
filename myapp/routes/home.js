var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(){

    var contatoSchema= mongoose.Schema({

        tipo:{type:String, required:true, trim:true},
        telefone:{type:String, required:true, trim:true}
    });


    var amigosSchema = mongoose.Schema({
        nome     : {type: String, trim: true, required:true, unique:true},
        email    : {type: String, unique:true, index:true, trim:true},
        data_cad : {type: Date, default: Date.now},
        contato : [contatoSchema]
    });

    return mongoose.model('Amigos',amigosSchema);
}