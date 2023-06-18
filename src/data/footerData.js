import {
  Facebook,
  Twitter,
  
  Instagram,
  MailOutline,
  Phone,
  Room,
} from '@material-ui/icons';

// objects footer

export const e = [
  {
    id: 21,
    route: '/products/shirt',
    name: 'Shirts',
  },
  {
    id: 22,
    route: '/products/coat',
    name: 'Coats',
  },
  {
    id: 23,
    route: '/products/jacket',
    name: 'Jackets',
  },
  {
    id: 24,
    route: '/',
    name: 'Home',
  },

  {
    id: 25,
    route: '/Cart',
    name: 'Wishlist',
  },
  {
    id: 26,
    route: '/',
    name: 'My Account',
  },
  {
    id: 27,
    route: '/',
    name: 'Terms',
  },
  {
    id: 28,
    route: '/',
    name: 'Privacy Policy',
  },
];

export const social = [
  {
    id: 31,
    icon: <Facebook />,
    platform: 'Facebook',
    color: '3B5999',
    link: 'https://www.facebook.com',
  },
  {
    id: 32,
    icon: <Twitter />,
    platform: 'Tiwtter',
    color: '55ACEE',
    link: 'https://www.twitter.com',
  },
  {
    id: 33,
    icon: <Instagram />,
    platform: 'Instagram',
    color: 'E4405F',
    link: 'https://www.instagram.com',
  },
];

export const contact = [
  {
    id: 331,
    icon: <Room style={{ marginRight: '10px' }} />,
    text: '351 Jes Kasper ,South Tobhchanester 666',
    url: 'https://osm.org/go/N2AIN--?m=',
  },
  {
    id: 332,
    icon: <Phone style={{ marginRight: '10px' }} />,
    text: '+54 9 2234 556 5578',
    url: '',
  },
  {
    id: 333,
    icon: <MailOutline style={{ marginRight: '10px' }} />,
    text: 'y.kasper@protonmail.com',
    url: 'mailto:y.kasper@protonmail.com',
  },
];
