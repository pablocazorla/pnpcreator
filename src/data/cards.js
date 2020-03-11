import U from 'utils';

const data = {

  width: U.mmToPx(63),
  height: U.mmToPx(89),

  images: {
    'cuadro' : require('data/images/cards/cuadro.jpg'),
    'armor' : require('data/images/cards/armor.png'),
  }

 
};

data.cards = [
  {
    id:0,
    bgc: '#d00',
    image: 'armor',
  },
  {
    id:1,
    bgc: '#dc0'
  },
  {
    id:3,
    bgc: '#0d0',
    image: 'cuadro',
  },
  {
    id:4,
    bgc: '#00d'
  },
  {
    id:5,
    bgc: '#c0d'
  },
  {
    id:0,
    bgc: '#d00',
    image: 'armor',
  },
  {
    id:1,
    bgc: '#dc0'
  },
   {
    id:3,
    bgc: '#0d0',
    image: 'cuadro',
  },
  {
    id:4,
    bgc: '#00d'
  },
 {
    id:5,
    bgc: '#c0d'
  },
  {
    id:0,
    bgc: '#d00',
    image: 'armor',
  },
  {
    id:1,
    bgc: '#dc0'
  },
  {
    id:3,
    bgc: '#0d0',
    image: 'cuadro',
  },
  {
    id:4,
    bgc: '#00d'
  },
  {
    id:5,
    bgc: '#c0d'
  },
  {
    id:0,
    bgc: '#d00',
    image: 'armor',
  },
  {
    id:1,
    bgc: '#dc0'
  },
  {
    id:3,
    bgc: '#0d0',
    image: 'cuadro',
  },
  {
    id:4,
    bgc: '#00d'
  },
  {
    id:5,
    bgc: '#c0d'
  },
 /* {
    id:0,
    bgc: '#d00',
    image: 'armor',
  },
  {
    id:1,
    bgc: '#dc0'
  },
  {
    id:3,
    bgc: '#0d0',
    image: 'cuadro',
  },
  {
    id:4,
    bgc: '#00d'
  },
  {
    id:5,
    bgc: '#c0d'
  },
  {
    id:0,
    bgc: '#d00',
    image: 'armor',
  },
  {
    id:1,
    bgc: '#dc0'
  },
  {
    id:3,
    bgc: '#0d0',
    image: 'cuadro',
  },
  {
    id:4,
    bgc: '#00d'
  },
  {
    id:5,
    bgc: '#c0d'
  },
  {
    id:0,
    bgc: '#d00',
    image: 'armor',
  },
  {
    id:1,
    bgc: '#dc0'
  },
  {
    id:3,
    bgc: '#0d0',
    image: 'cuadro',
  },
  {
    id:4,
    bgc: '#00d'
  },
  {
    id:5,
    bgc: '#c0d'
  },
  {
    id:0,
    bgc: '#d00',
    image: 'armor',
  },
  {
    id:1,
    bgc: '#dc0'
  },
  {
    id:3,
    bgc: '#0d0',
    image: 'cuadro',
  },
  {
    id:4,
    bgc: '#00d'
  },
  {
    id:5,
    bgc: '#c0d'
  },
  {
    id:0,
    bgc: '#d00',
    image: 'armor',
  },
  {
    id:1,
    bgc: '#dc0'
  },
  {
    id:3,
    bgc: '#0d0',
    image: 'cuadro',
  },
  {
    id:4,
    bgc: '#00d'
  },
  {
    id:5,
    bgc: '#c0d'
  },
  {
    id:0,
    bgc: '#d00',
    image: 'armor',
  },
  {
    id:1,
    bgc: '#dc0'
  },
  {
    id:3,
    bgc: '#0d0',
    image: 'cuadro',
  },
  {
    id:4,
    bgc: '#00d'
  },
  {
    id:5,
    bgc: '#c0d'
  },
  {
    id:0,
    bgc: '#d00',
    image: 'armor',
  },
  {
    id:1,
    bgc: '#dc0'
  },
  {
    id:3,
    bgc: '#0d0',
    image: 'cuadro',
  },
  {
    id:4,
    bgc: '#00d'
  },
  {
    id:5,
    bgc: '#c0d'
  },
  {
    id:0,
    bgc: '#d00',
    image: 'armor',
  },
  {
    id:1,
    bgc: '#dc0'
  },
  {
    id:3,
    bgc: '#0d0',
    image: 'cuadro',
  },
  {
    id:4,
    bgc: '#00d'
  },
  {
    id:5,
    bgc: '#c0d'
  },
  {
    id:0,
    bgc: '#d00',
    image: 'armor',
  },
  {
    id:1,
    bgc: '#dc0'
  },
  {
    id:3,
    bgc: '#0d0',
    image: 'cuadro',
  },
  {
    id:4,
    bgc: '#00d'
  },
  {
    id:5,
    bgc: '#c0d'
  },
  {
    id:0,
    bgc: '#d00',
    image: 'armor',
  },
  {
    id:1,
    bgc: '#dc0'
  },
  {
    id:3,
    bgc: '#0d0',
    image: 'cuadro',
  },
  {
    id:4,
    bgc: '#00d'
  },
  {
    id:5,
    bgc: '#c0d'
  },
  {
    id:0,
    bgc: '#d00',
    image: 'armor',
  },
  {
    id:1,
    bgc: '#dc0'
  },
  {
    id:3,
    bgc: '#0d0',
    image: 'cuadro',
  },
  {
    id:4,
    bgc: '#00d'
  },
  {
    id:5,
    bgc: '#c0d'
  },*/
];

data.render = (L,cardData) => {
  const {width,height} = data;

  const {bgc,image} = cardData;

  

  L.rect({
    width,
    height,
    x:0,
    y:0,
    color: bgc
  });

  L.image({
    x:30,
    y:20,
    image,
   // width: width - 60,
    height:300
  });

};



export default data;