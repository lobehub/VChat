import { RenderErrorMessage } from '@lobehub/ui';
import { memo } from 'react';
import APIKeyForm from './ApiKeyForm';
import { ErrorActionContainer } from './style';

const OpenAPIKey: RenderErrorMessage['Render'] = ({ id }) => (
  <ErrorActionContainer>
    <APIKeyForm id={id} />
  </ErrorActionContainer>
);

export default memo(OpenAPIKey);
