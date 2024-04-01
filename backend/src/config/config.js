// ===========================
// Puerto
// ===========================

process.env.PORT = process.env.PORT || 3000;

// ===========================
// Entorno
// ===========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===========================
// BASE DE DATOS
// ===========================

let urlDB = "mongodb://127.0.0.1:27017/bancosangre";

if (process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb://127.0.0.1:27017/bancosangre";
} else {
    urlDB = process.env.MONGODB_URI;
};

process.env.URLDB = urlDB;

console.log(process.env.URLDB)
// ===========================
// Vencimiento de token
// ===========================

process.env.CADUCIDAD_TOKEN = '48h';

// ===========================
// SEED de autenticación
// ===========================

process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION || 'este-es-el-seed-desarrollo';
