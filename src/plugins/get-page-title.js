// import defaultSettings from '@/settings';

const title = 'HMP Management System';

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
