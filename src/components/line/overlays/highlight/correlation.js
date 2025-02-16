import React from "react"
import styled from "styled-components"
import { Flex, TextNano } from "@khulnasoft/khulnasoft-ui"
import correlationsIcon from "@khulnasoft/khulnasoft-ui/dist/components/icon/assets/correlations.svg"
import Icon, { Button } from "@/components/icon"
import Tooltip from "@/components/tooltip"
import { useChart, useAttributeValue } from "@/components/provider"
import { getDateDiff } from "@/components/line/indicators"

const CorrelationButton = styled(Button)`
  pointer-events: all;
`

const minTimeframe = 15

const validatePeriodSelected = total => {
  if (total < minTimeframe) return "requires 15 secs minimum selection"
  return ""
}

export const Period = ({ id }) => {
  const overlays = useAttributeValue("overlays")
  const { range } = overlays[id]

  const [after, before] = range
  const dateDiff = getDateDiff(after, before)

  return <TextNano strong>{dateDiff}</TextNano>
}

const Correlation = ({ id }) => {
  const overlays = useAttributeValue("overlays")
  const { range } = overlays[id]

  const [after, before] = range

  const total = before - after
  const errorMessage = validatePeriodSelected(total)

  const chart = useChart()
  return (
    <Tooltip
      content={errorMessage ? `Metrics correlation: ${errorMessage}` : "Run metrics correlation"}
    >
      <Flex>
        <CorrelationButton
          data-track={chart.track("metrics-correlation")}
          icon={<Icon svg={correlationsIcon} size="20px" />}
          onClick={() => chart.sdk.trigger("correlation", chart, range)}
          data-testid="highlight-correlations"
          disabled={!!errorMessage}
        />
      </Flex>
    </Tooltip>
  )
}

export default Correlation
