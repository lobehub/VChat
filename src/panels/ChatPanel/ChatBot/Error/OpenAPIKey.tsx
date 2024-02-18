import { memo } from 'react';
import APIKeyForm from './ApiKeyForm';
import { ErrorActionContainer } from './style';

interface OpenAPIKeyProps {
  id: string;
}

const OpenAPIKey = ({ id }: OpenAPIKeyProps) => (
  <ErrorActionContainer>
    <APIKeyForm id={id} />
  </ErrorActionContainer>
);

export default memo(OpenAPIKey);
