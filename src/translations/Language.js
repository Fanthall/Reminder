/* eslint-disable prettier/prettier */
import React from 'react';
import * as RNLocalize from '../../node_modules/react-native-localize';
import i18n from '../../node_modules/i18n-js';
import memoize from '../../node_modules/lodash.memoize';

import {I18nManager} from 'react-native';

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  // en: () => require('./en.json'),
  tr: () => require('./tr.json'),
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = {languageTag: 'tr', isRTL: false};

  const {languageTag, isRTL} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = {[languageTag]: translationGetters[languageTag]()};
  i18n.locale = languageTag;
};

export default class Language extends React.Component {
  static myInstance = null;
  static getInstance() {
    if (Language.myInstance == null) {
      Language.myInstance = new Language();
    }
    return Language.myInstance;
  }

  constructor(props) {
    super(props);
    setI18nConfig(); // set initial config
  }

  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };

  render(key) {
    return translate(key);
  }
}
