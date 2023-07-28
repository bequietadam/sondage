
type Answer = {
  answer: string;
  count: number;
}
type Sondage = {
  _id: string;
  title: string;
  description: string;
  answers: Answer[];
};
