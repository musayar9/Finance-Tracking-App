import styled from "styled-components/native";
import { COLORS } from "../utils/theme";

const Container = styled.View`
  background: ${COLORS.surfaceGlass};
  border: 1px solid ${COLORS.borderGlass};
  padding: 14px;
  border-radius: 14px;
  margin-vertical: 8px;
`;

export default function Card({ children, style }) {
  return <Container style={style}>{children}</Container>;
}
