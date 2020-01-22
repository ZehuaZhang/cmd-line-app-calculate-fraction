import { isNumber, isArray, isObject } from '../object.util'
import { ISchedule, IScheduleHours } from '../../interfaces/schedule.interface'
import { getHoursFromHourTimeString } from '../date.util'

export function checkStartEndHours(start: number, end: number) {
    if (!isNumber(start) || !isNumber(end)) {
        throw "start or end should be number"
    }

    if (end < start) {
        throw "start time should be greater than end time"
    }
}

export function checkDuration(duration: number) {
    if (!isNumber(duration) || duration <= 0) {
        throw "duration should be a positive number"
    }
}

export function checkScheduleListCollections(scheduleListCollections: ISchedule[][]) {
    if (!isArray(scheduleListCollections) ||
        scheduleListCollections.length !== 2 ||
        scheduleListCollections.some(scheduleList => (
            !isArray(scheduleList) ||
            scheduleList.some(schedule => (
                !isObject(schedule) ||
                !schedule.hasOwnProperty('startTime') ||
                !schedule.hasOwnProperty('endTime')
            ))
        )
        )
    ) {
        throw (
            "invalid format of schedule list collections, should be length of 2, \n" +
            "each consists of schedule items i.e. {startTime: 'hh:mm', endTime: 'hh:mm'}"
        )
    }
}

export function getFlattenedScheduleHourList(
    scheduleListCollections: ISchedule[][],
    start: number,
    end: number
): IScheduleHours[] {
    return scheduleListCollections[0].concat(scheduleListCollections[1])
        .map(schedule => {
            const start = getHoursFromHourTimeString(schedule.startTime)
            const end = getHoursFromHourTimeString(schedule.endTime)

            checkStartEndHours(start, end)

            return { start, end }
        })
        .concat([
            { start: 0, end: start },
            { start: end, end: 24 }
        ])
}