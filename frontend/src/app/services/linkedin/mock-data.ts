import { Post } from '../../common/interfaces/post';
export const POSTS: Post[] = [
  {
    name: 'Mazzoni',
    photo: '../../../assets/profile.png',
    date: new Date(
      2019,
      Math.round(Math.random() * 2),
      Math.round(1 + Math.random() * 27),
      Math.round(Math.random() * 23),
      Math.round(Math.random() * 59)
    ),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
      'Nunc ut eleifend metus, sed lacinia ligula. ' +
      'Donec urna mi, hendrerit sed finibus vitae, pellentesque sed turpis. ' +
      'Nunc a libero imperdiet, lacinia risus sed, sodales nisl. ' +
      ' Morbi rutrum eu odio eget porta. Integer fringilla aliquam dui vitae finibus. ' +
      'Integer blandit diam molestie, dignissim ipsum ac, finibus orci.'
  },
  {
    name: 'Salesi',
    photo: '../../../assets/profile.png',
    date: new Date(
      2019,
      Math.round(Math.random() * 3),
      Math.round(Math.random() * 28),
      Math.round(Math.random() * 23),
      Math.round(Math.random() * 59)
    ),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
      'Nunc ut eleifend metus, sed lacinia ligula. ' +
      'Donec urna mi, hendrerit sed finibus vitae, pellentesque sed turpis. ' +
      'Nunc a libero imperdiet, lacinia risus sed, sodales nisl. ' +
      ' Morbi rutrum eu odio eget porta. Integer fringilla aliquam dui vitae finibus. ' +
      'Integer blandit diam molestie, dignissim ipsum ac, finibus orci.'
  },
  {
    name: 'Santa Lucia',
    photo: '../../../assets/profile.png',
    date: new Date(
      2019,
      Math.round(Math.random() * 3),
      Math.round(Math.random() * 28),
      Math.round(Math.random() * 23),
      Math.round(Math.random() * 59)
    ),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
      'Nunc ut eleifend metus, sed lacinia ligula. ' +
      'Donec urna mi, hendrerit sed finibus vitae, pellentesque sed turpis. ' +
      'Nunc a libero imperdiet, lacinia risus sed, sodales nisl. ' +
      ' Morbi rutrum eu odio eget porta. Integer fringilla aliquam dui vitae finibus. ' +
      'Integer blandit diam molestie, dignissim ipsum ac, finibus orci.'
  }
];
