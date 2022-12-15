module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controllers/matakuliah.controller.js');
    router.get('/', controller.getAll);
    router.post('/', controller.save);
    router.get('/get/:matakuliahId', controller.get);
    router.put('/update/:matakuliahId', controller.update);
    router.delete('/delete/:matakuliahId', controller.delete);
  
    app.use('/api/matakuliah/', router);
  }