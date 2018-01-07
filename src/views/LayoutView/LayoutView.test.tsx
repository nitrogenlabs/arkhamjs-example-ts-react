import {Arkham} from '@nlabs/arkhamjs-views-react';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {LayoutView} from '../../views';

describe('LayoutView', () => {
  let rendered;

  beforeAll(() => {
    // Render
    rendered = renderer.create(<Arkham><LayoutView /></Arkham>);
  });

  it('should render', () => {
    return expect(rendered).toBeDefined();
  });
});
