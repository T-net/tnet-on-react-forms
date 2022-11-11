import styled from 'styled-components';

interface Props {
  alignItems?: string;
  justifyContent?: string;
  wrap?: string;
  gap?: number;
}

const Flexbox = styled.div<Props>`
  display: flex;
  align-items: ${({ alignItems }) => alignItems || 'center'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  gap: ${({ gap }) => (gap ? `${gap}em` : '0')};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
`;

export default Flexbox;
