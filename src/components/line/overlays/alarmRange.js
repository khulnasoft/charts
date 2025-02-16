import React, { memo } from "react"
import { TextSmall } from "@khulnasoft/khulnasoft-ui"
import { useAttributeValue } from "@/components/provider"
import Badge, { getColors } from "@/components/line/badge"

const badgeByStatus = {
  critical: "error",
  clear: "success",
}

const AlarmRange = ({ id }) => {
  const overlays = useAttributeValue("overlays")
  const { status, valueTriggered } = overlays[id]
  const badgeType = badgeByStatus[status] || status
  const { color } = getColors(badgeType)

  return (
    <Badge type={badgeType} noBorder>
      <TextSmall color={color}>
        Triggered value:{" "}
        <TextSmall strong color={color}>
          {valueTriggered}
        </TextSmall>
      </TextSmall>
    </Badge>
  )
}

export default memo(AlarmRange)
