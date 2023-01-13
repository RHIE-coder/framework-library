// users
//     username
//     passwordHash
//     salt
//     role
// ------
// roles
//     name
//     privileges<[{
//         permissions,
//         rights,
//     }]>
// ÷====+
// role = {
//     name: "SUBSCRIBER"
//     privileges: [
//         {
//             permissions:["GET","POST"],
//             rights:[
//                 "comments",
//                 "board:calendar"
//             ]
//         },
//         {
//             ....
//         }
//     ]
// }