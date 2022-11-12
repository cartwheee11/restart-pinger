const pinger = require("mcpinger");
const fauna = require("faunadb");

const db = require("../getDb.js");

const q = fauna.query;

// function ping() {
//   pinger
//     .java({
//       host: "mc.restartcraft.ru",
//       posrt: 25565,
//     })
//     .then((result) => {
//       console.log(result);
//       try {
//         const { onlinePlayerCount, maxPlayerCount } = result;
//         db.query(
//           q.Create(q.Collection("online"), {
//             data: {
//               current: onlinePlayerCount,
//               max: maxPlayerCount,
//               date: Date.now(),
//             },
//           })
//         );
//       } catch (err) {
//         console.log(err);
//       }
//     });
// }

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  pinger
    .java({
      host: "mc.restartcraft.ru",
      posrt: 25565,
    })
    .then((result) => {
      console.log(result);

      try {
        const { onlinePlayerCount, maxPlayerCount } = result;
        db.query(
          q.Create(q.Collection("online"), {
            data: {
              current: onlinePlayerCount,
              max: maxPlayerCount,
              date: Date.now(),
            },
          })
        )
          .then((response) => {
            req.json("Ok");
          })
          .catch((err) => {
            req.json("Error");
          });
      } catch (err) {
        req.json("Error");
      }
    });
}
