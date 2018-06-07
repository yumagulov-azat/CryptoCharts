export interface News {
  date: string;
  title: string;
  anons: string;
  imageUrl: string;
  url: string;
  source: {
    name: string;
    img: string
  };
}
