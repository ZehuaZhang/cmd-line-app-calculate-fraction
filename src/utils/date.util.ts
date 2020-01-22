import { getTrimmedString } from './string.util'

export function getHoursFromHourTimeString(timeText: string): number {
    const trimmedTimeText = getTrimmedString(timeText)
    
    const timeSegmentList = trimmedTimeText.split(':')
        .map(timeSegment => parseInt(getTrimmedString(timeSegment)))
    
    if (timeSegmentList.some(timeSegment => 
        ( 
            Math.sign(timeSegment) < 0 ||
            isNaN(timeSegment)
        ))) {
            throw "invalid hour format, should be hh:mm"
        }

    const hours = timeSegmentList[0] + timeSegmentList[1] / 60
    
    console.log(timeText, hours)

    checkHourValid(hours)

    return hours
}

export function checkHourValid(hours: number): void {
    if (hours < 0 && hours > 24) {
        throw "hours exceed range, should be from [0, 24]"
    }
}