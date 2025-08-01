// src/utils/withRouter.tsx
import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export function withRouter(Component: any) {
  return function ComponentWithRouterProp(props: any) {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    return (
      <Component
        {...props}
        match={{ params }}
        location={location}
        history={{ push: navigate }}
      />
    );
  };
}
