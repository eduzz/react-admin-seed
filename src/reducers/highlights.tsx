const highlights = (state: any = [], action: any) => {
  switch (action.type) {
    case 'RECEIVE_HIGHLIGHTS':
      return [...action.highlights];
    default:
      return state;
  }
};

export default highlights;
