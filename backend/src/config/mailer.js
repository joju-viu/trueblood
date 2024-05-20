const nodemailer = require("nodemailer");

 // create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
	  user: 'jojugol@gmail.com', // generated ethereal user
	  pass: 'ttsqnsnxgsqrdziu', // generated ethereal password
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