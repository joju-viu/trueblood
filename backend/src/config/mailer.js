const nodemailer = require("nodemailer");

 // https://support.google.com/accounts/answer/185833?hl=es-419
let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
	  user: 'juanmorenojorge@gmail.com', // generated ethereal user
	  pass: 'znglumgqgdvobezw', // generated ethereal password
	},
    tls: {
      rejectUnauthorized: false
    }
});

transporter.verify().then(() => {
	console.log('Servidor de Correos Activo.');
}).catch(function (e) {
     console.log(e);
});

module.exports = transporter;