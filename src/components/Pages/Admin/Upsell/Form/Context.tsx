import React from 'react';
import { IUpsell } from 'interfaces/models/upsell';

export interface IUpsellFormContext {
  model?: Partial<IUpsell>;
  updateModel?: (handler: (model: Partial<IUpsell>, value: any) => void) => any;
}

export const UpsellFormContext: React.Context<IUpsellFormContext> = React.createContext({});