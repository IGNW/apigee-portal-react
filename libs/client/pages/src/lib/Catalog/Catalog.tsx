import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface CatalogProps {}

const StyledCatalog = styled.div`
  color: pink;
`;

export function Catalog(props: CatalogProps) {
  return (
    <StyledCatalog>
      <h1>Welcome to Catalog!</h1>
    </StyledCatalog>
  );
}

export default Catalog;
