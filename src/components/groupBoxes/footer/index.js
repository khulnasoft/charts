import React from "react"
import { Flex } from "@khulnasoft/khulnasoft-ui"
import Indicators from "@/components/line/indicators"
import Legend from "./legend"

export const Container = props => (
  <Flex
    border={{ side: "top", color: "borderSecondary" }}
    data-testid="chartLegend"
    column
    position="relative"
    {...props}
  />
)

const Footer = () => (
  <Container>
    <Indicators />
    <Flex alignItems="center" padding={[2]}>
      <Legend />
    </Flex>
  </Container>
)

export default Footer
