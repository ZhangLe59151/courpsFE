import {isNaN, isNil} from 'lodash';
import msg from '@/common/js/lang';
import React from 'react';
import dplen from 'antd/lib/locale/en_US';
import dplzh from 'antd/lib/locale/zh_CN';

export function querystring(name, url = window.location.href) {
  const n = name.replace(/[[]]/g, '\\$&');
  const regex = new RegExp(`[?&]${n}(=([^&#]*)|&|#|$)`, 'i');
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function fisrtToLowercase(str) {
  return str.charAt(0).toLowerCase() + str.substr(1);
}

export const formatDecimal = (number, digits = 0) => {
  if (isNil(number) || isNaN(number)) {
    return '--';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    signDisplay: 'never',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(number);
};

export const renderOrDash = (text) => {
  if (typeof text === 'string') {
    return (
      <span title={text} style={{whiteSpace: 'pre'}}>
        {text || '--'}
      </span>
    );
  }
  return <span title={text}>{text ?? '--'}</span>;
};

export const preprocessColumns = (columns) => {
  const copy = [...columns]; // avoid modifying the original columns

  return copy.map((column) => {
    if (column?.title) {
      if (typeof column?.title === 'function') {
        column?.title();
      } else {
        column.title = msg(column.title);
      }
    }

    if (!column?.render) {
      column.render = renderOrDash;
    }
    return column;
  });
};

export const download = (data, supportType, filename) => {
  const blob = new Blob([data], {type: supportType});
  const fileURL = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = fileURL;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(fileURL);
};

export const getDplLang = () => {
  if (getCemsLocale().toLowerCase().includes('en')) {
    return dplen;
  }
  return dplzh;
};

export const limitDecimals = (value) => value.replace(/^(0+)|[^\d]+/g, '');

export const getCemsLocale = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  querystring('locale') || localStorage.getItem('my_user_locale');

export const validateFileType = (
  fileType,
  filename,
  mineTypes = [],
  extNames = []
) => {
  let isCorrectFileType;
  if (fileType) {
    isCorrectFileType = mineTypes.includes(fileType);
  } else {
    const index = filename.lastIndexOf('.');
    const extName = filename.slice(index + 1);
    isCorrectFileType = extNames.includes(extName);
  }

  return isCorrectFileType;
};

export const getFIleNameFromHeader = (disposition) => {
  const str = disposition
    ? disposition.match(/filename\*=.*/g)[0].split('=')[1]
    : null;
  return decodeURIComponent(str.split("''")[1]);
};

export const formatDate = (date) => {
  if (date === null) {
    return null;
  }
  const newDate = new Date(date);
  const y = newDate.getFullYear();
  let m = newDate.getMonth() + 1;
  m = m < 10 ? `0${m}` : m;
  let d = newDate.getDate();
  d = d < 10 ? `0${d}` : d;
  return `${y}-${m}-${d}`;
};

const getChildren = (item) => {
  const obj = {
    value: '',
    title: '',
    disabled: true
  };
  obj.value = item?.nodeId;
  obj.title = item?.name;
  obj.disabled = !item?.authorized;
  if (item.children) {
    obj.children = item.children.map((c) => getChildren(c));
  }
  return obj;
};
export const processTree = (data) => {
  const siteTreeData = (data || []).map((item) => {
    const obj = {
      value: '',
      title: '',
      disabled: true
    };
    obj.value = item?.nodeId;
    obj.title = item?.name;
    obj.disabled = !item?.authorized;
    if (item.children) {
      obj.children = item.children.map((c) => getChildren(c));
    }
    return obj;
  });
  return siteTreeData;
};
