export interface IUpsellList {
  id: number;
  title: string;
  small_image?: string;
  total_view?: number;
  total_click?: number;
}

export interface IUpsellCourses {
  id: number;
  title: string;
  hash: string;
}

export interface IUpsellProducts {
  id: number;
  title: string;
  hash: string;
}

export interface IUpsell {
  id: number;
  type: number;
  content: string;
  description: string;
  title: string;
  label_text: string;
  highlight_image?: any;
  small_image: string;
  highlight: boolean;
  offer_shelf: boolean;
  published: boolean;
  user_id: number;
  created_at: string;
  external_url: string;
  courses: {
    id: number;
    title: string;
    course_page: boolean;
    upc_cod: number;
    modules: {
      id: number;
      title: string;
      course_id: number;
      lessons: {
        id: number;
        title: string;
        module_id: number;
        checked: boolean;
      }[];
      checked: boolean;
    }[];
  }[];
}

export interface IUpsellCourse {
  id: number;
  title: string;
  course_page: boolean;
  modules: {
    id: number;
    title: string;
    lessons: {
      id: number;
      title: string;
      module_id: number;
      checked: boolean;
    }[];
    checked: boolean;
  }[];
}