import ReactOnRails from 'react-on-rails';

import Pages from '../bundles/Pages/components/PagesServer';

// This is how react_on_rails can see the Pages in the browser.
ReactOnRails.register({
  Pages,
});
