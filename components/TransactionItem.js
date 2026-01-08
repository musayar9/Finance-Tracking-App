import styled from "styled-components/native";
import { COLORS } from "../utils/theme";

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-vertical: 10px;
`;

const Logo = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const Col = styled.View`
  flex: 1;
`;

const Merchant = styled.Text`
  color: ${COLORS.textPrimary};
  font-size: 15px;
  font-weight: 600;
`;

const Meta = styled.Text`
  color: ${COLORS.textSecondary};
  font-size: 12px;
  margin-top: 2px;
`;

const Amount = styled.Text`
  color: ${(props) =>
    props.positive ? COLORS.growthGreen : COLORS.textPrimary};
  font-weight: 700;
`;

export default function TransactionItem({ item }) {
  const positive = item.amount > 0;
  const initials = item.merchant
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <Row>
      <Logo>
        <Merchant style={{ color: COLORS.textPrimary }}>{initials}</Merchant>
      </Logo>
      <Col>
        <Merchant>{item.merchant}</Merchant>
        <Meta>
          {item.category ?? "Uncategorized"} •{" "}
          {new Date(item.date).toLocaleString()}
        </Meta>
      </Col>
      <Amount positive={positive}>
        {item.amount < 0
          ? `-${Math.abs(item.amount).toFixed(2)}`
          : `+${item.amount.toFixed(2)}`}
      </Amount>
    </Row>
  );
}
