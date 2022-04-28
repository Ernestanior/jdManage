interface INoteAdd {
  content: string;
  courseCode: string;
  publishTime: string;
  title: string;
  uniId: number;
}
interface INoteEdit extends INoteAdd {
  id: number;
}
