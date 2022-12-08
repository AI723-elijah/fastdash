import React from 'react';
import { GeneralTab } from './General';
import { AttributesTab } from './Attributes';
import { KeywordsTab } from './Keywords';
import { ImagesTab } from './Images';
import { VideosTab } from './Videos';
import { CategoriesTab } from './Categories';
import { PricesTab } from './Prices';
import { ChannelsTab } from './Channels';
import { PromotionsTab } from './Promotions';
import { NotesTab } from './Notes';
import { QAsTab } from './QAs';
import { OptionsTab } from './options';
import { AccessoriesTab } from './accessories';
import { LightingCloseoutTab } from './LightingCloseout'

const VariationsTab = React.lazy(() => import(`./Variations/${process.env.REACT_APP_VARIATION}`));

const tabsList = [
  {
    Component: GeneralTab,
    title: 'General',
    key: 'general'
  },
  {
    Component: LightingCloseoutTab,
    title: 'Lighting Closeout',
    key: 'lighting-closeout'
  },
  {
    Component: AttributesTab,
    title: 'Attributes',
    key: 'attributes'
  },
  {
    Component: KeywordsTab,
    title: 'Keywords',
    key: 'keywords'
  },
  {
    Component:OptionsTab,
    title: 'Options',
    key: 'options',
  },
  {
    Component: AccessoriesTab,
    title: 'Accessories',
    key: 'accessories',
  },
  {
    Component: ImagesTab,
    title: 'Images',
    key: 'images'
  },
  {
    Component: VideosTab,
    title: 'Videos',
    key: 'videos'
  },
  {
    Component: VariationsTab,
    title: 'Variations',
    key: 'variations'
  },
  {
    Component: CategoriesTab,
    title: 'Categories',
    key: 'categories'
  },
  {
    Component: PricesTab,
    title: 'Tier Prices',
    key: 'prices'
  },
  {
    Component: ChannelsTab,
    title: 'Channels',
    key: 'channels'
  },
  {
    Component: PromotionsTab,
    title: 'Promotions',
    key: 'promotions'
  },
  {
    Component: NotesTab,
    title: 'Notes',
    key: 'notes'
  }  ,{
    Component:QAsTab,
    title:'QA',
    key:'QAs',
    feature: '/QAs'
  }
];

export { tabsList };
