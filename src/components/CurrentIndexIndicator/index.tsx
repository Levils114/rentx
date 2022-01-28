import React from 'react';

import {
   Container,
} from './styles';

interface CurrentIndexIndicatorProps{
   active?: boolean;
}

export function CurrentIndexIndicator({ active }: CurrentIndexIndicatorProps){
   return(
      <Container active={active} />
   );
}