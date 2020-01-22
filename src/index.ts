import { getFreeTimeListFromSchedules } from './algorithms/schedule.algorithms'

// const result = getFreeTimeListFromSchedules(
//     "00:00", "24:00",
//     [
//         [
//             {
//                 startTime: "01:00",
//                 endTime: "02:00"
//             },
//             {
//                 startTime: "05:00",
//                 endTime: "06:00"
//             },

//         ],
//         [
//             {
//                 startTime: "01:00",
//                 endTime: "03:00"
//             },
//             {
//                 startTime: "04:00",
//                 endTime: "10:00"
//             },
//         ]
//     ],
//     1
// )

const result = getFreeTimeListFromSchedules(
    "00:00", "24:00",
    [
        [
            {
                startTime: "01:00",
                endTime: "03:00"
            },
            {
                startTime: "06:00",
                endTime: "07:00"
            },
            {
                startTime: "02:00",
                endTime: "04:00"
            }

        ],
        [
            {
                startTime: "02:00",
                endTime: "05:00"
            },
            {
                startTime: "09:00",
                endTime: "12:00"
            },
        ]
    ],
    1
)

console.log(result)