import { createSandbox } from 'sinon'
import { expect } from 'chai'
import { SinonSandbox } from 'sinon'
import { getFreeTimeListFromSchedules } from '../../algorithms/schedule.algorithms'

describe('shedule algorithm', () => {
  let sandbox: SinonSandbox

  before(() => {
    sandbox = createSandbox()
  })

  beforeEach(() => {
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should return correct input', () => {
    const tests = [
      {
        inputs: [
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
        ],
        expected: {}
      }
    ]

    tests.forEach(test => {
      expect(getFreeTimeListFromSchedules(...test.inputs)).to.equal(test.expected)
    })
  })
})
