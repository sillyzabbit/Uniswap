import { UaEventOptions } from 'react-ga4/types/ga4'

export function sendEvent(event: string | UaEventOptions, params?: any) {
  console.log(`ga-event: ${JSON.stringify(event)}, params: ${JSON.stringify(params)}`)
}

export function outboundLink({ label }: { label: string }, hitCallback: () => unknown) {
  console.log('ga-event: OutboundLink')
  hitCallback()
}

export function sendTiming(timingCategory: any, timingVar: any, timingValue: any, timingLabel: any) {
  console.log(
    `ga-timing - timingCategory: ${timingCategory}, timingVar: ${timingVar}, timingValue: ${timingValue}, timingLabel: ${timingLabel}`
  )
}

export function useAnalyticsReporter() {
  console.log('failed to start analytics reporter.')
}
