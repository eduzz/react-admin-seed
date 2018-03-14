import { post } from 'agent';

const receiveImage = (image: string, stateLabel: string) => ({
  type: 'RECEIVE_IMAGE',
  image,
  stateLabel,
});

const receiveImageError = (err: any) => ({
  type: 'RECEIVE_IMAGE_ERROR',
  err,
});

export const uploadImage = (image: string, stateLabel: string) =>
  (dispatch: any) => {
    dispatch({
      type: 'UPLOAD_IMAGE',
      stateLabel,
    });

    post({ url: '/courses/uploadimage', data: { data: image } }).then(
      res => dispatch(receiveImage(res.data.data, stateLabel)),
      err => dispatch(receiveImageError(err)),
    );
  };

const uploadLessonFileProgress = (progressEvent: any, fileIndex: number) => ({
  type: 'UPLOAD_LESSON_FILE_PROGRESS',
  progressEvent,
  fileIndex,
});

export const uploadLessonFile = (file: any, lessonID: number, fileIndex: number) =>
  (dispatch: any) => {
    const formData = new FormData();

    formData.append('file', file);

    post({
      url: `/lessons/${lessonID}/upload`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress(progressEvent: any) {
        dispatch(uploadLessonFileProgress(progressEvent, fileIndex));
      }
    });
  };