import { get, post } from 'agent';

const receiveRating = (rating: any) => ({
  type: 'RECEIVE_RATING',
  rating
});

export const sendRating = (lessonID: any, rating: any) =>
  (dispatch: Function) => {
    dispatch(receiveRating(rating));

    const data = {
      rating: rating.user_rating,
    };

    return post({ url: `/learner/lessons/${lessonID}/ratings`, data }).then(
      res => {
        console.log(res.data);
      }
    );
  };

export const fetchRating = (lessonID: any) =>
  (dispatch: Function) => {
    return get({ url: `/learner/lessons/${lessonID}/ratings` }).then(
      res => {
        dispatch(receiveRating(res.data.data));

        return res.data;
      }
    );
  };