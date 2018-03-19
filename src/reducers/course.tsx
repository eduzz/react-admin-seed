const initialState = {
  title: '',
  description: '',
  category: {
    id: 0,
  },
  author: {
    id: 0,
  },
  customizations: {
    image_cover: ''
  },
  published: 1
};

const course = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'CLEAN_COURSE':
      return initialState;
    case 'RECEIVE_COURSE':
      return {
        ...state,
        ...action.course,
      };
    case 'RECEIVE_COURSE_ERROR':
      return initialState;
    case 'DELETE_COURSE_SUCCESS':
      return {
        ...state,
        isDeleted: true
      };
    case 'DELETE_COURSE_ERROR':
      return state;
    case 'RECEIVE_AUTHOR':
      return {
        ...state,
        author: {
          ...state.author,
          id: action.author.id,
        },
      };
    case 'RECEIVE_COURSE_IMAGE_COVER':
      return {
        ...state,
        customizations: {
          ...state.customizations,
          image_cover: action.imageCover,
        },
      };
    case 'CREATE_COURSE':
      return {
        ...state,
        isDeleted: true
      };
    case 'UPDATE_COURSE':
      return {
        ...state,
        isDeleted: true
      };
    case 'CHANGE_COURSE_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    default:
      return state;
  }
};

export default course;