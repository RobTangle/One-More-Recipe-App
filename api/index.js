//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Diet } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  //! modifico el force! Estaba en force: true originalmente
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    const diets = [
      "dairyFree",
      "gluten free",
      "ketogenic",
      "lacto ovo vegetarian",
      "lowFodmap",
      "paleo",
      "pescetarian",
      "primal",
      "vegan",
      "vegetarian",
      "whole 30",
    ];
    diets.forEach(async (element) => await Diet.create({ name: element }));
    console.log(`${diets.length} dietas se han precargado`);
  });
});
