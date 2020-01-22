import { ISchedule, IScheduleHours } from '../interfaces/schedule.interface'
import { getHoursFromHourTimeString } from '../utils/date.util'
import {
    checkStartEndHours,
    checkDuration,
    checkScheduleListCollections,
    getFlattenedScheduleHourList
} from '../utils/algorithms/schedule.util'

export function getFreeTimeListFromSchedules(
    startTime: string,
    endTime: string,
    scheduleListCollections: ISchedule[][],
    duration: number
) {
    const start = getHoursFromHourTimeString(startTime)
    const end = getHoursFromHourTimeString(endTime)

    checkStartEndHours(start, end)
    checkDuration(duration)
    checkScheduleListCollections(scheduleListCollections)

    const flattenedScheduleHourList: IScheduleHours[] = getFlattenedScheduleHourList(
        scheduleListCollections, start, end
    )

    flattenedScheduleHourList.sort((a: IScheduleHours, b: IScheduleHours) => a.start - b.start)

    let currSchedule = flattenedScheduleHourList[0];
    const freeTimeList: IScheduleHours[] = []
    for (const schedule of flattenedScheduleHourList) {
        if (currSchedule.end < schedule.start) {
            freeTimeList.push({
                start: currSchedule.end,
                end: schedule.start
            });
            currSchedule = schedule;
        } else {
            currSchedule = (currSchedule.end < schedule.end) ? schedule : currSchedule
        }
    }
    return freeTimeList.filter(freeTime => {
        const difference = freeTime.end - freeTime.start
        return difference * 60 >= duration
    })
}
