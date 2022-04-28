import React from 'react';
import __ from 'I18N';
import Cards from 'views/cards';
import PDFEditor from 'views/pdfEditor';

const routes = [
  {
    title: __('Cards'),
    content: <Cards/>
  },
  {
    title: __('PDF Editor'),
    content: <PDFEditor/>
  },
];

export default routes;