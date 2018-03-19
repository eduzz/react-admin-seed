const courses = (state: any = [], action: any) => {
  switch (action.type) {
    case 'RECEIVE_COURSES':
      return [...action.courses];
    case 'RECEIVE_COURSES_ERROR':
      return [];
    case 'CLEAN_COURSES':
      return [];
    default:
      return state;
  }
};

export default courses;